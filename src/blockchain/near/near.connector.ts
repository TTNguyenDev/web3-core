import { NearTransactionConfig } from '@web3-core/constants';
import { BN } from 'bn.js';
import {
  connect,
  keyStores,
  Near,
  transactions,
  WalletConnection,
  Connection,
} from 'near-api-js';
import {
  ChangeFunctionCallOptions,
  ViewFunctionCallOptions,
} from 'near-api-js/lib/account';
import { NearConfig } from 'near-api-js/lib/near';
import { TransactionAction } from '../../types';
import { IBlockchainConnector } from '../blockchain.connector';

WalletConnection.prototype._completeSignInWithAccessKey = async function () {
  const currentUrl = new URL(window.location.href);
  const contractId = currentUrl.searchParams.get('contract_id') || '';
  if (contractId !== this._near.config.contractId) return;

  const publicKey = currentUrl.searchParams.get('public_key') || '';
  const allKeys = (currentUrl.searchParams.get('all_keys') || '').split(',');
  const accountId = currentUrl.searchParams.get('account_id') || '';
  // TODO: Handle errors during login
  if (accountId) {
    const authData = {
      accountId,
      allKeys,
    };
    window.localStorage.setItem(this._authDataKey, JSON.stringify(authData));
    if (publicKey) {
      await this._moveKeyFromTempToPermanent(accountId, publicKey);
    }
    this._authData = authData;
  }
  currentUrl.searchParams.delete('public_key');
  currentUrl.searchParams.delete('all_keys');
  currentUrl.searchParams.delete('account_id');
  currentUrl.searchParams.delete('meta');
  currentUrl.searchParams.delete('transactionHashes');
  window.history.replaceState({}, document.title, currentUrl.toString());
};

const NUM_BLOCKS_NON_ARCHIVAL = 4 * 12 * 3600;

export type NearConnectorConfig = NearConfig & {
  contractId: string;
};
export class NearConnector implements IBlockchainConnector<Near> {
  constructor(config: NearConnectorConfig) {
    this._config = config;
  }

  private _config: NearConnectorConfig;
  private _lastBlockHeight!: number;
  private _archivalConnection!: Connection;

  get config(): NearConnectorConfig {
    return this._config;
  }

  private _conn?: Near;
  get conn(): Near {
    if (!this._conn)
      throw new Error(`${this.constructor.name}: conn not initialize`);
    return this._conn;
  }

  private _wallet?: WalletConnection;
  get wallet(): WalletConnection {
    if (!this._wallet)
      throw new Error(`${this.constructor.name}: wallet not initialize`);
    return this._wallet;
  }

  async connect(): Promise<Near> {
    const keyStore = new keyStores.BrowserLocalStorageKeyStore(
      window.localStorage,
      this.config.contractId
    );
    this._conn = await connect({
      ...this._config,
      keyStore,
    });
    this._wallet = new WalletConnection(this.conn, this.config.contractId);
    this._archivalConnection = Connection.fromConfig({
      networkId: this.config.networkId,
      provider: {
        type: 'JsonRpcProvider',
        args: {
          url: this.config.nodeUrl,
        },
      },
      signer: { type: 'InMemorySigner', keyStore },
    });
    return this.conn;
  }

  async signIn() {
    return this.wallet.requestSignIn({
      contractId: this.config.contractId,
      successUrl: `${location.href}?contract_id=${this.config.contractId}`,
    });
  }

  async signOut() {
    return this.wallet.signOut();
  }

  async isSignedIn() {
    return this.wallet.isSignedInAsync();
  }

  public get lastBlockHeight(): number {
    return this._lastBlockHeight;
  }

  public async updateLastBlockHeight() {
    const block = await this.wallet.account().connection.provider.block({
      finality: 'optimistic',
    });

    this._lastBlockHeight = block.header.height;
  }

  public get archivalConnection(): Connection {
    return this._archivalConnection;
  }

  async getBlock(payload: {
    blockId: number;
    methodName: string;
    args: Record<string, any>;
  }) {
    const { blockId, methodName, args } = payload;

    // @ts-ignore
    this.wallet.account().validateArgs(args || {});
    const connection =
      blockId + NUM_BLOCKS_NON_ARCHIVAL < this._lastBlockHeight
        ? this.archivalConnection
        : this.wallet.account().connection;

    const res: any = await connection.provider.query({
      request_type: 'call_function',
      block_id: blockId,
      // @ts-ignore
      account_id: process.env.NEXT_PUBLIC_NEAR_CONTRACT_NAME,
      method_name: methodName,
      args_base64: new Buffer(JSON.stringify(args), 'utf8').toString('base64'),
    });

    return (
      res.result &&
      res.result.length > 0 &&
      JSON.parse(Buffer.from(res.result).toString())
    );
  }

  async callViewMethod(
    payload: Omit<ViewFunctionCallOptions, 'contractId'> & {
      contractId?: string;
    }
  ) {
    try {
      return this.wallet.account().viewFunctionV2({
        ...payload,
        contractId: payload.contractId ?? this.config.contractId,
      });
    } catch (error) {
      console.log({ payload });
    }
  }

  async callChangeMethod(
    payload: Omit<ChangeFunctionCallOptions, 'contractId'> & {
      contractId?: string;
    }
  ) {
    try {
      return this.wallet.account().functionCall({
        ...payload,
        contractId: payload.contractId ?? this.config.contractId,
      });
    } catch (error) {
      console.log({ payload });
    }
  }

  async transaction(payload: {
    contractId?: string;
    actions: TransactionAction[];
    walletMeta?: string;
    walletCallbackUrl?: string;
    returnError?: boolean;
  }) {
    const { walletMeta, walletCallbackUrl, returnError } = payload;
    const actions = payload.actions.map(
      ({
        methodName,
        args: body,
        gas = NearTransactionConfig.defaultGas,
        deposit = '0',
      }) =>
        transactions.functionCall(
          methodName,
          body,
          new BN(gas),
          new BN(deposit)
        )
    );

    // @ts-ignore
    return this.wallet.account().signAndSendTransaction({
      receiverId: payload.contractId ?? this.config.contractId,
      actions,
      walletMeta,
      walletCallbackUrl,
      returnError,
    });
  }
}
