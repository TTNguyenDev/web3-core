import { ApiGetListInput } from "../types";

const DEFAULT_LIMIT_PER_CACHE_HIT = 5000;

export const cacheDataList = async ({
  dbClient,
  limitPerCacheHit = DEFAULT_LIMIT_PER_CACHE_HIT,
  firstRecordQuery = {
    selector: {
      id: { $exists: true },
    },
  },
  compareKey = "id",
  fetchList,
  override = false,
}: {
  dbClient: PouchDB.Database;
  limitPerCacheHit?: number;
  firstRecordQuery?: PouchDB.Find.FindRequest<any>;
  compareKey?: string;
  fetchList: (payload: ApiGetListInput) => Promise<any[]>;
  override?: boolean;
}) => {
  // if (override) await DB.removeAll(dbClient);

  const { docs } = await dbClient.find({
    ...firstRecordQuery,
    skip: 0,
    limit: 1,
  });

  const firstRecord = docs ? docs[0] : null;

  let currentFromIndex = 0;
  let isCompleted = false;
  while (!isCompleted) {
    try {
      const res = await fetchList({
        from_index: currentFromIndex,
        limit: limitPerCacheHit,
      });

      if (res.length === 0) {
        isCompleted = true;
        break;
      }

      if (firstRecord) {
        const firstRecordIndex = res.findIndex(
          // @ts-ignore
          (item) => item[compareKey] === firstRecord[compareKey]
        );

        if (firstRecordIndex !== -1) {
          await dbClient.bulkDocs(res.slice(0, firstRecordIndex));
          isCompleted = true;
          break;
        }
      }

      await dbClient.bulkDocs(res);

      currentFromIndex += limitPerCacheHit;
    } catch (err) {
      console.error(err);
      isCompleted = true;
    }
  }
};
