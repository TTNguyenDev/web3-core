"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainState = void 0;
var core_1 = require("@hookstate/core");
exports.BlockchainState = (0, core_1.hookstate)({
    loading: true,
    ready: false,
    wallet: {
        loading: true,
        logged: false,
    },
});
