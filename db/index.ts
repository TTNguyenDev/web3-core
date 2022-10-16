import { CategoryDB } from './category.db';

export class DB {
  private static _client: {
    category: CategoryDB;
  };

  static get client() {
    if (!this._client) throw new Error('DB client not initialize');
    return this._client;
  }

  static async init() {
    const category = new CategoryDB();

    await Promise.all([category.init()]);

    this._client = {
      category
    };
  }

  static async destroy() {
    await Promise.all([
      this.client.category.db.destroy(),
    ]);
  }
}
