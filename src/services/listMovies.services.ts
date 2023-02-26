import { FindOptionsOrderValue, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { iMovie, iMovieListPage, iParams } from "../interfaces/movies.interfaces";


export async function listMovies({ page, perPage, order, sort }: iParams): Promise<iMovieListPage> {
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
    const quantityMovies: number = await movieRepository.count();
  
    const maxPage: number = Math.ceil(quantityMovies / perPage);
    page -= 1
    let nextPage: number | null = page + 2;
    let previousPage: number | null = page;
    const minPage: number = 1;

    if(page >= maxPage) {
        previousPage = maxPage
    } else {
        previousPage = previousPage < minPage ? null : previousPage;
    }
    page *= perPage; 
    nextPage = nextPage > maxPage ? null : nextPage;

    if (sort === "id") {
        order = "asc"
    }



    const listSize = await movieRepository
        .count()

    const movies: Movie[] = await movieRepository
        .createQueryBuilder("movie")
        .select()
        .take(perPage)
        .skip(page)
        .orderBy("movie." + sort, order === "asc" ? "ASC" : "DESC")
        .getMany()
   
    const defaultRoute = "/movies";
    const url = "http://localhost:3000"

    return {
        prevPage: previousPage !== null ? `${url}${defaultRoute}?page=${previousPage}&perPage=${perPage}` : null, 
        nextPage: nextPage !== null ? `${url}${defaultRoute}?page=${nextPage}&perPage=${perPage}` : null,
        count: listSize,
        data: movies
    } 
}