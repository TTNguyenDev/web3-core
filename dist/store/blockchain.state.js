import { hookstate } from "@hookstate/core";
export var BlockchainState = hookstate({
    loading: true,
    ready: false,
    wallet: {
        loading: true,
        logged: false,
    },
});
