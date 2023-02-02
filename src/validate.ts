import { Request } from "express";
import { QueryConfig } from "pg";
import { client } from "./database";
import { iMovie, iMovieRequest, iMovieResult } from "./interfaces";

export async function validateIntMovie(request: Request): Promise<boolean> {
    const id: number = request.movieOption.id!;
    const movie: iMovieRequest = request.movieOption.data!;
    if(movie.description === undefined) {
        return false
    }
    return true
}
