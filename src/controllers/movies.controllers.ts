import { Request, Response } from "express";
import { iMovie } from "../interfaces/movies.interfaces";
import { createParamsSchema } from "../schemas/movies.schemas";
import { insertMovie } from "../services/createMovie.services";
import { deleteMovie } from "../services/deleteMovie.services";
import { findMovie } from "../services/findMovie.services";
import { listMovies } from "../services/listMovies.services";
import { updateSomeInfoMovie } from "../services/updateMovie.services";

export async function findMovieController(req: Request, res: Response): Promise<Response> {
    const movie: iMovie = await findMovie(req.id!);
    
    return res.status(200).json(movie);
}

export async function updateMovieController(req: Request, res: Response): Promise<Response> {
    const movieUpdated: iMovie = await updateSomeInfoMovie(req.id!, req.body);

    return res.status(200).json(movieUpdated);
}

export async function createMovieController(req: Request, res: Response): Promise<Response> {
    const movieCreated: iMovie = await insertMovie(req.body);
    
    return res.status(201).json(movieCreated);
}

export async function removeMovieController(req: Request, res: Response): Promise<Response> {
    await deleteMovie(req.id!);
    
    return res.status(204).send();
}

export async function listUsersController(req: Request, res: Response): Promise<Response> {
    const movies = await listMovies(createParamsSchema.parse(req.query));

    return res.status(200).json(movies);
}