import { Repository } from "typeorm";
import { AppDataSource } from "./data-source";
import { Movie } from "./entities/movie.entity";


export async function amountMovies(): Promise<number> {
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

    const rowCount: number = await movieRepository.count();

    return rowCount;
}