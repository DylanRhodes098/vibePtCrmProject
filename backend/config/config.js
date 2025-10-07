'use strict';

// CommonJS config for sequelize-cli
// Loads env vars and supports both DB_URL and discrete connection params

const dotenv = require('dotenv');
dotenv.config();

const mysql2 = require('mysql2');

function buildConfig(env) {
  const {
    DB_URL,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST = 'localhost',
    DB_DIALECT = 'mysql',
    DB_PORT = 3306,
  } = process.env;

  const common = {
    logging: false,
    migrationStorageTableName: 'SequelizeMeta',
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeData',
  };

  if (DB_URL) {
    return {
      ...common,
      use_env_variable: 'DB_URL',
      dialect: DB_DIALECT,
      dialectModule: DB_DIALECT === 'mysql' ? mysql2 : undefined,
    };
  }

  return {
    ...common,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: DB_DIALECT,
    dialectModule: DB_DIALECT === 'mysql' ? mysql2 : undefined,
  };
}

module.exports = {
  development: buildConfig('development'),
  test: buildConfig('test'),
  production: buildConfig('production'),
};


