/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-adapter-cordova-sqlite" />
/// <reference types="pouchdb-adapter-fruitdown" />
/// <reference types="pouchdb-adapter-http" />
/// <reference types="pouchdb-adapter-idb" />
/// <reference types="pouchdb-adapter-leveldb" />
/// <reference types="pouchdb-adapter-localstorage" />
/// <reference types="pouchdb-adapter-memory" />
/// <reference types="pouchdb-adapter-websql" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
/// <reference types="pouchdb-node" />
import { ApiGetListInput } from "../types";
export declare const cacheDataList: ({ dbClient, limitPerCacheHit, firstRecordQuery, compareKey, fetchList, override, }: {
    dbClient: PouchDB.Database;
    limitPerCacheHit?: number | undefined;
    firstRecordQuery?: PouchDB.Find.FindRequest<any> | undefined;
    compareKey?: string | undefined;
    fetchList: (payload: ApiGetListInput) => Promise<any[]>;
    override?: boolean | undefined;
}) => Promise<void>;
