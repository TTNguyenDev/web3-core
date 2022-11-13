"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWalletAccountId = void 0;
var core_1 = require("@hookstate/core");
var store_1 = require("../store");
var utils_1 = require("../utils");
var useWalletAccountId = function () {
    var _a;
    var blockchainState = (0, core_1.useHookstate)(store_1.BlockchainState);
    return {
        accountId: (_a = blockchainState.accountId.value) !== null && _a !== void 0 ? _a : null,
        username: blockchainState.accountId.value
            ? (0, utils_1.parseToUsername)(blockchainState.accountId.value)
            : null,
    };
};
exports.useWalletAccountId = useWalletAccountId;
