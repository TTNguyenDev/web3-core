import { useHookstate } from '@hookstate/core';
import { BlockchainState } from '../store';
export var useWallet = function () {
    var blockchainState = useHookstate(BlockchainState);
    return {
        wallet: blockchainState.wallet.value,
    };
};
