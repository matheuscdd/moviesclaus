import { Router } from "express";
import { createMovieController, findMovieController, removeMovieController, updateMovieController } from "../controllers/movies.controllers";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { ensureIdExistsMiddleware } from "../middleware/ensureIdExists.middleware";
import { ensureNameIsOnlyMiddleware } from "../middleware/ensureNameIsOnly.middleware.";
import { createMovieSchema, updateMovieSchema } from "../schemas/movies.schemas";

export const movieRoutes: Router = Router();

movieRoutes.get("/:id", ensureIdExistsMiddleware, findMovieController);
movieRoutes.delete("/:id", ensureIdExistsMiddleware, removeMovieController);
movieRoutes.post("", ensureDataIsValidMiddleware(createMovieSchema), ensureNameIsOnlyMiddleware, createMovieController);
movieRoutes.patch("/:id", ensureIdExistsMiddleware, ensureDataIsValidMiddleware(updateMovieSchema, ["name", "price", "duration"]), ensureNameIsOnlyMiddleware, updateMovieController);