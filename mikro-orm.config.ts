import * as dotenv from 'dotenv'
import * as path from 'path'
import { EntityMap } from './src/model.entities'


dotenv.config({ path: '.env' })

const config = {
  type: process.env.DATABASE_TYPE === 'mariadb'
    ? 'mysql'
    : process.env.DATABASE_TYPE,
  host : process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  user : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_NAME,
  dbName: process.env.DATABASE_NAME,
  entities: [
    ...EntityMap,
  ],
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: path.resolve('migrations'),
    pattern: /^[\w-]+\d+\.ts$/,
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    emit: 'ts',
  },
}

export = config
