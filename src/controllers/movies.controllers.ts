import { Request, Response } from "express";
import { iMovie } from "../interfaces/movies.interfaces";
import { insertMovie } from "../services/createMovie.services";
import { deleteMovie } from "../services/deleteMovie.services";
import { findMovie } from "../services/findMovie.services";
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