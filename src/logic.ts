import { Request, Response } from "express";
import { Query, QueryConfig } from "pg";
import format from "pg-format";
import { client } from "./database";
import { errorNotFound } from "./errors";
import { iMovie, iMovieListPage, iMovieRequest, iMovieResult } from "./interfaces";
import { validateIntMovie } from "./validate";

export async function listMovies(request: Request, response: Response): Promise<Response> {
    let perPage: number = Number(request.query.perPage);
    perPage = isNaN(perPage) || perPage > 5 || perPage <= 0 ? 5 : perPage;
    let page: number = Number(request.query.page);
    page = isNaN(page) || page <= 0 ? 0 : page - 1; 
    page *= perPage;
    //Falta  adicionar o sort e o order

    const queryString: string = `--sql
        SELECT
            *
        FROM
            movies
        LIMIT $1 OFFSET $2;
        `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: Object.values([perPage, page])
    }; 

    const queryResult: iMovieResult = await client.query(queryConfig);
    const queryResponse: iMovieListPage = {
        previousPage: null, //Preciso ajustar isso
        nextPage: `http://localhost:3000/movies?page=2&perPage5`,
        count: queryResult.rowCount,
        data: queryResult.rows
    }

    return response.status(200).json(queryResponse);    
}

export async function insertMovie(request: Request, response: Response): Promise<Response> {
    const movieDataRequest: iMovieRequest = request.movieOption.data!;

    const queryString: string = format(`--sql
        INSERT INTO
            movies(%I)
        VALUES
            (%L)
        RETURNING *;
        `, Object.keys(movieDataRequest), Object.values(movieDataRequest)
        );

    const queryResult: iMovieResult = await client.query(queryString);
    const movieCreated: iMovie = queryResult.rows[0];

    return response.status(201).json(movieCreated);    
}

export async function findMovie(request: Request, response: Response): Promise<Response> {
    const id: number = request.movieOption.id!;

    const queryString: string = `--sql
        SELECT
            *
        FROM
            movies
        WHERE
            id = $1;
        `;
 
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: iMovieResult = await client.query(queryConfig);
    const movieFound: iMovie = queryResult.rows[0];
    if(!movieFound) {
        return errorNotFound(response);
    }

    return response.status(200).json(movieFound);
}

export async function deleteMovie(request: Request, response: Response): Promise<Response> {
    const id: number = request.movieOption.id!;

    const queryString: string = `--sql
            DELETE FROM
                movies
            WHERE
                id = $1
            RETURNING *;
        `;
    
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    await client.query(queryConfig);

    return response.status(204).send();
} 

export async function updateIntMovie(request: Request, response: Response): Promise<Response> {
    const id: number = request.movieOption.id!;
    const movieRequestValues = Object.values(request.movieOption.data!);
    const movieHasDescription = await validateIntMovie(request);
    let queryConfig: QueryConfig;
    
    const queryString = `--sql
        UPDATE
            movies
        SET
            name = $1,
            duration = $2,
            price = $3,
            description = $4
        WHERE
            id = $5
        RETURNING *;    
    `;
    
    if(movieHasDescription) {
        queryConfig = {
            text: queryString,
            values: [...movieRequestValues, id]
        }
    } else {
        const valuesWithoutDescription = movieRequestValues.slice(0,3)
        queryConfig = {
            text: queryString,
            values: [...valuesWithoutDescription, null, id]
        }
    }
    
    const queryResult: iMovieResult = await client.query(queryConfig);
    const movieFound: iMovie = queryResult.rows[0];
    
    return response.status(200).json(movieFound);
}