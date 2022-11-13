import React from "react";
import { State, useHookstate } from "@hookstate/core";
import { BlockchainState } from "../store";
import { parseToUsername } from "../utils";
import { NearConnector } from "../blockchain/near";
import { getContainer } from "../container";

export const useBlockchain = ({
  connector,
  state,
}: {
  connector?: NearConnector;
  state?: State<BlockchainState>;
} = {}) => {
  const bcConnector: NearConnector = connector ?? getContainer().bcConnector;
  const blockchainState = useHookstate(state ?? BlockchainState);

  const _checkLogged = async () => {
    const isSignedIn = await bcConnector.isSignedIn();
    blockchainState.wallet.merge({
      logged: isSignedIn,
    });
    if (isSignedIn) {
      const accountId = bcConnector.wallet.getAccountId();
      blockchainState.accountId.set(accountId);
      // get account balance
      const accountBalance = await bcConnector.wallet
        .account()
        .getAccountBalance();

      // update wallet state
      blockchainState.wallet.account.merge({
        id: accountId,
        username: parseToUsername(accountId),
        balance: accountBalance,
      });
    }
    blockchainState.wallet.merge({
      loading: false,
    });
  };

  /////

  const connect = React.useCallback(async () => {
    await bcConnector.connect();
    blockchainState.merge({
      loading: false,
      ready: true,
    });
    await _checkLogged();
  }, []);

  const signIn = React.useCallback(async () => {
    if (blockchainState.ready.value) {
      BlockchainState.wallet.loading.set(true);
      await bcConnector.signIn();
    }
  }, []);

  const signOut = React.useCallback(async () => {
    if (blockchainState.ready.value) {
      BlockchainState.wallet.loading.set(true);
      await bcConnector.signOut();
    }
  }, []);

  return {
    blockchainState,
    blockchainMethods: {
      connect,
      signIn,
      signOut,
    },
  };
};
