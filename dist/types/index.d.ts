/// <reference types="pouchdb-find" />
import { NearConnector } from "../blockchain";
export declare type Container = {
    bcConnector: NearConnector;
};
export declare type ApiGetListInput = {
    from_index: number;
    limit: number;
};
export declare type GetListInput<T extends {} = {}> = Omit<PouchDB.Find.FindRequest<T>, "selector"> & {
    selector?: PouchDB.Find.Selector;
};
export declare type ModalStateType = {
    onOpen: (...args: any) => any;
    onClose: (...args: any) => any;
};
export declare type TransactionAction = {
    methodName: string;
    args: object;
    gas?: string;
    deposit?: string;
};
export declare type Optional<T> = T | undefined;
export declare type Nullable<T> = T | null;
export declare type StateWithLoading<T = {}> = T & {
    loading: boolean;
    error?: string | object;
};
