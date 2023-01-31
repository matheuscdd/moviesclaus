import { Request, Response } from "express";
import { client } from "./database";

export async function insertMovie(request: Request, response: Response): Promise<Response> {
    return response.status(201).json();
}

export async function listMovies(request: Request, response: Response): Promise<Response> {
    
    const query: string = `
        SELECT
            *
        FROM
            movies;
    `;

    const queryResult = await client.query(query);
    console.log(queryResult)

    return response.status(200).json();
}

export async function insertMovieFormat(request: Request, response: Response): Promise<Response> {
    return response.status(201).json();
}