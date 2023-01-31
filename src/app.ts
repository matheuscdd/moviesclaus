import express, { Application, json } from "express";
import { Client, ClientConfig } from "pg";
import { startDatabase } from "./database";
import { insertMovie, insertMovieFormat, listMovies } from "./logic";
// import { ClientConfig } from "./interfaces";

const app: Application = express();
app.use(express.json());

app.post("/movies", insertMovie);
app.post("/movies", insertMovieFormat);
app.get("/movies", listMovies);

const PORT: number = 1234;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, async () => {
    await startDatabase();
    console.log(runningMsg);
});