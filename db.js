import 'dotenv/config'
import postgres from "postgres"

// Salvar as configs na variável global do node process.env

const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, ENDPOINT_ID } = process.env;
const URL = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

export const sql = postgres(URL, { ssl: 'require' });
