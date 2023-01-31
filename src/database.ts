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




// const queryString: string = `
//     INSERT INTO "movies"(name, description, duration, price)
//     VALUES ('As longas tranças dos carecas', 'Aenean non commodo sapien.', 6, 137');
// `;

// client.query(queryString).finally(async () => {
//     await client.end();
//     console.log("Conexão encerrada")
// });