import "express-async-errors"; //Estou importante para ajudar no tratamento de error sem precisar utilizar um try/catch
import express, { Application } from "express";
import { movieRoutes } from "./routes/movie.routes";
import { handleError } from "./errors";

const app: Application = express();
app.use(express.json());

app.use("/movies", movieRoutes);

app.use(handleError); //Para que ele execute corretamente precisa estar depois de todas as rotas, para que caso não caía em nenhuma das rotas venha para cá

export default app;