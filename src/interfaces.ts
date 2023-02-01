import { QueryResult } from "pg";

export interface iMovieRequest {
    name: string;
    duration: number;
    price: number;
    description?: string;
}

export interface iMovie extends iMovieRequest {
    id: number;
}

export type iMovieResult = QueryResult<iMovie>;

export interface iMovieListPage {
    previousPage: string | null;
    nextPage: string | null;
    count: number;
    data: iMovie[];
}

export type iMovieKeys = "name" | "description" | "duration" | "price";

export interface iCanRun {
    error: boolean,
    msg: string
}