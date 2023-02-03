import express, { Application, json } from "express";
import { startDatabase } from "./database";
import { deleteMovie, findMovie, insertMovie, listMovies, updateIntMovie, updateSomeInfoMovie } from "./logic";
import { ensureIdExistsMiddleware, ensureNameIsOnlyMiddleware, getIdMiddleware, verifyDataMiddleware, verifyOptionalDataMiddleware } from "./middlewares";

const app: Application = express();
app.use(json());

export const defaultRoute = "/movies";
const routeWithId = defaultRoute + "/:id";

app.post(defaultRoute, verifyDataMiddleware, ensureNameIsOnlyMiddleware, insertMovie);
app.get(defaultRoute, listMovies);
app.get(routeWithId, getIdMiddleware, ensureIdExistsMiddleware, findMovie);
app.delete(routeWithId, getIdMiddleware, ensureIdExistsMiddleware, deleteMovie);
app.put(routeWithId, getIdMiddleware, ensureIdExistsMiddleware, verifyDataMiddleware, ensureNameIsOnlyMiddleware, updateIntMovie);
app.patch(routeWithId, getIdMiddleware, ensureIdExistsMiddleware, verifyOptionalDataMiddleware, ensureNameIsOnlyMiddleware, updateSomeInfoMovie);

const PORT: number = 1234;
export const url: string = `http://localhost:${PORT}`;
const runningMsg: string = `Server running on ${url}`;
app.listen(PORT, async () => {
    await startDatabase();
    console.log(runningMsg);
});