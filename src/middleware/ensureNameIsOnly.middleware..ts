import { NextFunction, Request, Response } from "express";
import { AppError  } from "../errors";
import { iMovieRequestCreate } from "../interfaces/movies.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { Repository } from "typeorm";

export async function ensureNameIsOnlyMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    if (!req.body.name) return next();
    
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

    const findMovie = await movieRepository.findOne({
        where: {
            name: req.body.name
        }
    });

    if (findMovie) throw new AppError(`Movie already exists.`, 409);

    return next();
}
