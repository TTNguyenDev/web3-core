"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWallet = void 0;
var core_1 = require("@hookstate/core");
var store_1 = require("../store");
var useWallet = function () {
    var blockchainState = (0, core_1.useHookstate)(store_1.BlockchainState);
    return {
        wallet: blockchainState.wallet.value,
    };
};
exports.useWallet = useWallet;
