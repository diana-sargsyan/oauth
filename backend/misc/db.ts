import { ExtractTablesWithRelations } from "drizzle-orm";
import {
  drizzle,
  NodePgDatabase,
  NodePgQueryResultHKT,
} from "drizzle-orm/node-postgres";
import { PgTransaction } from "drizzle-orm/pg-core";
import { Client, ClientConfig } from "pg";
import * as schema from "../tables";

async function getDbClientConfig(): Promise<ClientConfig> {
  const creds = getDbCreds();

  return creds;
}

export async function getDatabaseFromEnv() {
  const creds = await getDbClientConfig();
  const client = new Client(creds);
  await client.connect();
  const db = drizzle(client, { schema });

  return { db, client };
}

export function getDbCreds() {
  return {
    // @todo fix process env variables to read from .env file
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER ,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    ssl: false,
  };
}

type Transaction = PgTransaction<
  NodePgQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;
type Database = NodePgDatabase<typeof schema>;
export type DatabaseOrTransaction = Database | Transaction;
