import { Client } from "pg";

export const client: Client = new Client({
    user: "Claus",
    password: "0528",
    host: "localhost",
    database: "movies_database",
    port: 5432
});

export async function startDatabase(): Promise<void>  {
    await client.connect();
    console.log("Database connected!");
};