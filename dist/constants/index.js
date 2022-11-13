"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NearTransactionConfig = exports.NearProtocalConfig = void 0;
exports.NearProtocalConfig = {
    networkId: process.env.NEXT_PUBLIC_NEAR_NETWORK_ID || 'testnet',
    nodeUrl: process.env.NEXT_PUBLIC_NEAR_NODE_URL ||
        'https://rpc.testnet.internal.near.org',
    walletUrl: process.env.NEXT_PUBLIC_NEAR_WALLET_URL,
    helperUrl: process.env.NEXT_PUBLIC_NEAR_HELPER_URL,
    contractId: process.env.NEXT_PUBLIC_NEAR_CONTRACT_NAME,
};
exports.NearTransactionConfig = {
    defaultGas: '30000000000000',
};
