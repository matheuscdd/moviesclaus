import { AppError } from "../errors";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";

export async function ensureIdExistsMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id: number = Number(req.params.id);
    
    if(isNaN(id) || id < 1) throw new AppError(`Id is not valid`, 400);
    
    req.id = id;
    
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie); //O método recebe a entidade e a partir dele vai carregar métodos de manipulação de dados

    const findMovie = await movieRepository.findOne({
        where: {
            id: id
        }
    });

    if(!findMovie) throw new AppError(`Movie not found`, 404);

    return next();
}