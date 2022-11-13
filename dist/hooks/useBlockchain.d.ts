import { State } from "@hookstate/core";
import { BlockchainState } from "../store";
import { NearConnector } from "../blockchain/near";
export declare const useBlockchain: ({ connector, state, }?: {
    connector?: NearConnector | undefined;
    state?: State<BlockchainState, {}> | undefined;
}) => {
    blockchainState: State<BlockchainState, {}>;
    blockchainMethods: {
        connect: () => Promise<void>;
        signIn: () => Promise<void>;
        signOut: () => Promise<void>;
    };
};
