import express, { Application, json } from "express";
import { startDatabase } from "./database";
import { deleteMovie, findMovie, insertMovie, listMovies } from "./logic";
import { ensureIdExistsMiddleware, getIdMiddleware, verifyDataMiddleware } from "./middlewares";

const app: Application = express();
app.use(express.json());

const defaultRoute = "/movies";
const routeWithId = defaultRoute + "/:id";

app.post(defaultRoute, verifyDataMiddleware, insertMovie);
app.get(defaultRoute, listMovies);
app.get(routeWithId, getIdMiddleware, ensureIdExistsMiddleware, findMovie);
app.delete(routeWithId, getIdMiddleware, ensureIdExistsMiddleware, deleteMovie);

export const PORT: number = 1234;
export const url: string = `http://localhost:${PORT}`;
const runningMsg: string = `Server running on ${url}`;
app.listen(PORT, async () => {
    await startDatabase();
    console.log(runningMsg);
});