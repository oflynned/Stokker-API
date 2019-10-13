import Database from '../../src/common/db';

export const dropDb = async () => (await Database.client()).dropDatabase();
