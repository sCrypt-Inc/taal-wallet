import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { AccountType } from '../types';

const CURRENT_DB_VERSION = 1;

const DB_NAME = `Shared`;

export const storeNames = {
  ACCOUNT_LIST: 'accountList',
  KEY_VAL: 'keyVal',
} as const;

type KeyVal = {
  isTosInAgreement: boolean;
  activeAccountId: string;
  walletLockPeriod: number;
};

interface TaalSharedDB extends DBSchema {
  [storeNames.ACCOUNT_LIST]: {
    key: string; // accountId
    value: AccountType;
    indexes: {
      'by-name': string;
    };
  };
  [storeNames.KEY_VAL]: {
    key: string;
    value: string | number | boolean | null;
  };
}

class SharedDb {
  private _db: IDBPDatabase<TaalSharedDB> | null;

  constructor() {
    this._getDB().then(db => (this._db = db));
  }

  private async _getDB() {
    return (
      this._db ||
      openDB<TaalSharedDB>(DB_NAME, CURRENT_DB_VERSION, {
        upgrade(db) {
          db.createObjectStore(storeNames.KEY_VAL);
          const accountListStore = db.createObjectStore(storeNames.ACCOUNT_LIST, {
            keyPath: 'id',
          });
          accountListStore.createIndex('by-name', 'name');
        },
      })
    );
  }

  public async insertAccount(account: AccountType) {
    const db = await this._getDB();
    return db.put(storeNames.ACCOUNT_LIST, account);
  }

  public async getAccountMap() {
    const db = await this._getDB();
    return db.getAll(storeNames.ACCOUNT_LIST);
  }

  public async getAccountList() {
    const originsMap = await this.getAccountMap();
    return Object.values(originsMap);
  }

  public async renameAccount(accountId: string, newName: string) {
    const db = await this._getDB();
    const account = await db.get(storeNames.ACCOUNT_LIST, accountId);
    return db.put(storeNames.ACCOUNT_LIST, { ...account, name: newName });
  }

  public async getAccount(accountId: string) {
    const db = await this._getDB();
    return db.get(storeNames.ACCOUNT_LIST, accountId);
  }

  public async deleteAccount(accountId: string) {
    const db = await this._getDB();
    return db.delete(storeNames.ACCOUNT_LIST, accountId);
  }

  public async getKeyVal<T extends keyof KeyVal>(key: T) {
    const db = await this._getDB();
    return db.get(storeNames.KEY_VAL, key) as Promise<KeyVal[typeof key]>;
  }

  public async setKeyVal<T extends keyof KeyVal>(key: T, value: KeyVal[typeof key]) {
    const db = await this._getDB();
    return db.put(storeNames.KEY_VAL, value, key);
  }
}

export const sharedDb = new SharedDb();
