import { useHookstate } from '@hookstate/core';
import { BlockchainState } from '../store';
import { parseToUsername } from '../utils';
export var useWalletAccountId = function () {
    var _a;
    var blockchainState = useHookstate(BlockchainState);
    return {
        accountId: (_a = blockchainState.accountId.value) !== null && _a !== void 0 ? _a : null,
        username: blockchainState.accountId.value
            ? parseToUsername(blockchainState.accountId.value)
            : null,
    };
};
