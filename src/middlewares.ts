import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "./database";
import { errorNotFound } from "./errors";
import { iMovieRequest, iMovieResult } from "./interfaces";

export async function getIdMiddleware(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    const id: number = Number(request.params.id);

    if (isNaN(id) || id < 1) {
        return errorNotFound(response);
    }

    request.movieOption = {
        id: id
    }

    return next();
}

export async function ensureIdExistsMiddleware(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    const id = request.movieOption.id;

    const queryString: string = `
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

    if (!queryResult.rowCount) {
        return errorNotFound(response);
    }

    return next();
}

export async function verifyDataMiddleware(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    const movieRequest: iMovieRequest = request.body;
    const movieRequestKeys = Object.keys(movieRequest);
    const movieRequestValues = Object.values(movieRequest);
    


    return next();
}


// export async function ensureNameIsOnly(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
//     const 



//     return next();
// }