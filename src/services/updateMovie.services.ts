import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { iMovie, iMovieRequestUpdate } from "../interfaces/movies.interfaces";

export async function updateSomeInfoMovie(id: number, newMovieData: iMovieRequestUpdate): Promise<iMovie> {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

    const oldMovieData = await movieRepository.findOneBy({
        id: id
    });

    const movie = movieRepository.create({
        ...oldMovieData,
        ...newMovieData
    });

    await movieRepository.save(movie);

    return movie;
}