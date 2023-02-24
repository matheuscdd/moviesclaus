import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { iMovie } from "../interfaces/movies.interfaces";
import { amountMovies } from "../validate";

export async function findMovie(id: number): Promise<iMovie> {
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

    const findMovie = await movieRepository.findOne({
        where: {
            id: id
        }
    });

    return findMovie!;
}