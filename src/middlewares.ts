import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "./database";
import { errorMessage, errorNotFound } from "./errors";
import { iCanRun, iMovie, iMovieKeys, iMovieRequest, iMovieResult } from "./interfaces";

export async function getIdMiddleware(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    const id: number = Number(request.params.id);
    
    if(isNaN(id) || id < 1) {
        return errorNotFound(response);
    }

    request.id = id;

    return next();
}

export async function ensureIdExistsMiddleware(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    const id = request.id;
    
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

    if(!queryResult.rowCount) {
        return errorNotFound(response);
    }

    return next();
}

export async function verifyDataMiddleware(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    const movieRequest: iMovieRequest = request.body;
    const movieRequestKeys: string[] = Object.keys(movieRequest);
    const requiredKeysRaw: iMovieKeys[] = ["name",  "duration", "price"];
    const requiredKeys: string[] = movieRequestKeys.length <= 3 ? [...requiredKeysRaw] : [...requiredKeysRaw, "description"];
  
    const requestContainsAllRequiredKeys = movieRequestKeys.every((key) => requiredKeys.includes(key));
    const movieHasDescription: boolean = movieRequest.description !== undefined;
     
    const testTypes = (): boolean => {
        return (
            typeof movieRequest.name === "string" &&
            typeof movieRequest.duration === "number" &&
            typeof movieRequest.price === "number" &&
            (movieHasDescription ? typeof movieRequest.description === "string" : true)
        );
    }
    
    const testsResult: iCanRun = errorMessage(requestContainsAllRequiredKeys, testTypes(), requiredKeys.filter((key: string) => key != "description"));
    if(testsResult.error) {
        return response.status(404).json({
            message: testsResult.msg
        });
    }

    request.data = {...movieRequest};

    return next();
}


export async function ensureNameIsOnlyMiddleware(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    const movieRequest: iMovieRequest = request.data!;
    
    const queryString: string = `--sql
        SELECT
            *
        FROM
            movies
        WHERE
            name = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [movieRequest.name]
    }

    const queryResult: iMovieResult = await client.query(queryConfig);
    const moviesFound: number = queryResult.rowCount;
    if(moviesFound != 0) {
        return response.status(409).json({
            message: `Movie already exists.`
        });
    }

    return next();
}

export async function verifyOptionalDataMiddleware(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    const movieRequest: iMovieRequest = request.body;
    const movieRequestKeys: string [] = Object.keys(movieRequest);
    const requiredKeysRaw: iMovieKeys[] = ["name", "description", "price", "duration"];
    const requiredKeys: string[] = [...requiredKeysRaw];

    const requestContainsAllRequiredKeys = movieRequestKeys.every((key) => requiredKeys.includes(key));

    const testTypes = (): boolean => {
        return (
            movieRequest.name ? typeof movieRequest.name === "string" : true &&
            movieRequest.duration ? typeof movieRequest.duration === "number" : true &&
            movieRequest.price ? typeof movieRequest.price === "number" : true &&
            movieRequest.description ? typeof movieRequest.description === "string" : true
        );
    }

    const testsResult: iCanRun = errorMessage(requestContainsAllRequiredKeys, testTypes(), requiredKeys);
    if(testsResult.error) {
        return response.status(404).json({
            message: testsResult.msg
        });
    }

    request.data = {...movieRequest};

    return next();
}