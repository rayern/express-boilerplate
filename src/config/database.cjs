const dotenv = require('dotenv')

dotenv.config()

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DIALECT,
} = process.env

module.exports = {
  development: {
    url: DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: DATABASE_URL,
    dialect: 'postgres',
  },
}
