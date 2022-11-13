import { Near, WalletConnection, Connection } from "near-api-js";
import { ChangeFunctionCallOptions, ViewFunctionCallOptions } from "near-api-js/lib/account";
import { NearConfig } from "near-api-js/lib/near";
import { TransactionAction } from "../../types";
import { IBlockchainConnector } from "../blockchain.connector";
export declare type NearConnectorConfig = NearConfig & {
    contractId: string;
};
export declare class NearConnector implements IBlockchainConnector<Near> {
    constructor(config: NearConnectorConfig);
    private _config;
    private _lastBlockHeight;
    private _archivalConnection;
    get config(): NearConnectorConfig;
    private _conn?;
    get conn(): Near;
    private _wallet?;
    get wallet(): WalletConnection;
    connect(): Promise<Near>;
    signIn(): Promise<void>;
    signOut(): Promise<void>;
    isSignedIn(): Promise<boolean>;
    get lastBlockHeight(): number;
    updateLastBlockHeight(): Promise<void>;
    get archivalConnection(): Connection;
    getBlock(payload: {
        blockId: number;
        methodName: string;
        args: Record<string, any>;
    }): Promise<any>;
    callViewMethod(payload: Omit<ViewFunctionCallOptions, "contractId"> & {
        contractId?: string;
    }): Promise<any>;
    callChangeMethod(payload: Omit<ChangeFunctionCallOptions, "contractId"> & {
        contractId?: string;
    }): Promise<import("near-api-js/lib/providers").FinalExecutionOutcome | undefined>;
    transaction(payload: {
        contractId?: string;
        actions: TransactionAction[];
        walletMeta?: string;
        walletCallbackUrl?: string;
        returnError?: boolean;
    }): Promise<import("near-api-js/lib/providers").FinalExecutionOutcome>;
}
