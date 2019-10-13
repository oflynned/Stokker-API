require('dotenv')
  .load();

process.env.NODE_ENV = 'test';
process.env.ENVIRONMENT = 'test';

const { default: Database } = require('../src/common/db');
const { default: databaseConfig } = require('../src/config/databaseConfig');
const { dropDb } = require('./helpers/dbHelper');
const { isTestEnvironment } = require('../src/config/environmentConfig');

global.beforeAll(async () => {
  if (!isTestEnvironment()) {
    console.error(`Throwing error because environment is not 'test' (it's actually ${process.env.ENVIRONMENT})`);
    console.error('Otherwise your connected db would purge *REAL* data!');
    throw new Error('Not a test environment!');
  }

  await Database.connect();
  await dropDb();

  console.log(`Using ENVIRONMENT=${process.env.ENVIRONMENT}, db is connected on ${databaseConfig.databaseUri}`);
  console.log('Tests are good to go!');
});

global.afterAll(async () => {
  await dropDb();
  (await Database.client()).close();
});
