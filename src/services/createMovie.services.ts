import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { iMovie, iMovieRequestCreate } from "../interfaces/movies.interfaces";

export async function insertMovie(movieRequest: iMovieRequestCreate): Promise<iMovie> {
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

    const movie: Movie = movieRepository.create(movieRequest); 

    await movieRepository.save(movie);

    return movie;
}