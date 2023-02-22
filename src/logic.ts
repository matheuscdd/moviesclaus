import { Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
// import { defaultRoute, url } from "./app";
import { client } from "./database";
import { errorNotFound } from "./errors";
import { iMovie, iMovieListPage, iMovieRequest, iMovieResult, iOrder } from "./interfaces";
import { amountMovies } from "./validate";

const defaultRoute = 3000;
const url = "https://localhost/"

export async function listMovies(request: Request, response: Response): Promise<Response> {
    const quantityMovies: number = await amountMovies();
    let perPage: number = Number(request.query.perPage);
    perPage = isNaN(perPage) || perPage > 5 || perPage <= 0 ? 5 : perPage;
    const maxPage: number = Math.ceil(quantityMovies / perPage);
    let page: number = Number(request.query.page);
    page = isNaN(page) || page <= 0 ? 0 : page - 1; 
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
    
    const sort: iOrder | string = String(request.query.sort!) === "price" || String(request.query.sort!) === "duration" ? String(request.query.sort!) : "id";
    const order: iOrder | string = sort != "id" && (String(request.query.order!) === "asc" || String(request.query.order!)) === "desc" ? String(request.query.order!) : "asc";
    
    const queryString: string = format(`--sql
        SELECT
            *
        FROM
            movies
        ORDER BY 
            %s %s
        LIMIT $1 OFFSET $2;
        `, sort, order.toUpperCase()); 

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [perPage, page]
    }; 

   
   

    const queryResult: iMovieResult = await client.query(queryConfig);
    const queryResponse: iMovieListPage = {
        previousPage: previousPage != null ? `${url}${defaultRoute}?page=${previousPage}&perPage=${perPage}` : null, 
        nextPage: nextPage !== null ? `${url}${defaultRoute}?page=${nextPage}&perPage=${perPage}` : null,
        count: queryResult.rowCount,
        data: queryResult.rows
    }
    
    return response.status(200).json(queryResponse);    
}

export async function insertMovie(request: Request, response: Response): Promise<Response> {
    const movieDataRequest: iMovieRequest = request.data!;

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
    const id: number = request.id!;

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
    const id: number = request.id!;

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
    const id: number = request.id!;
    const movieRequest: iMovieRequest = request.data!;
        
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
    
    const queryConfig: QueryConfig = {
            text: queryString,
            values: [movieRequest.name, movieRequest.duration, movieRequest.price, (movieRequest.description ? movieRequest.description : null), id]
    }
    
    const queryResult: iMovieResult = await client.query(queryConfig);
    const movieUpdated: iMovie = queryResult.rows[0];
    
    return response.status(200).json(movieUpdated);
}

export async function updateSomeInfoMovie(request: Request, response: Response): Promise<Response> {
    const id: number = request.id!;
    const movieRequest: iMovieRequest = request.data!;

    if(request.body.id) {
        delete request.body.id;
    }

    const queryString: string  = format(`--sql
            UPDATE
                movies
            SET(%I)  = ROW(%L)
            WHERE
                id = $1
            RETURNING*;
    `, Object.keys(movieRequest), Object.values(movieRequest)
    );

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: iMovieResult = await client.query(queryConfig);
    const movieUpdated: iMovie = queryResult.rows[0];

    return response.status(200).json(movieUpdated);
}