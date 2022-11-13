export declare const useWallet: () => {
    wallet: {
        loading: boolean;
        logged: boolean;
        account?: {
            id: string;
            username: string;
            balance: import("near-api-js/lib/account").AccountBalance;
        } | undefined;
    };
};
