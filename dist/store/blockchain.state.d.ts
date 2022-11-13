import { State } from "@hookstate/core";
import { AccountBalance } from "near-api-js/lib/account";
export declare type BlockchainState = {
    loading: boolean;
    ready: boolean;
    wallet: {
        loading: boolean;
        logged: boolean;
        account?: {
            id: string;
            username: string;
            balance: AccountBalance;
        };
    };
    accountId?: string;
};
export declare const BlockchainState: State<BlockchainState>;
