import "express-async-errors";
import express, { Application } from "express";
import { movieRoutes } from "./routes/movie.routes";
import { handleError } from "./errors";

const app: Application = express();
app.use(express.json());

app.use("/movies", movieRoutes);

app.use(handleError);

export default app;