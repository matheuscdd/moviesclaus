import { z } from "zod";
import { QueryResult } from "pg";
import { createMovieSchema, returnMovieWithId, updateMovieSchema } from "../schemas/movies.schemas";
import { DeepPartial } from "typeorm";

export type iMovieRequestCreate = z.infer<typeof createMovieSchema>;
export type iMovieRequestUpdate = DeepPartial<iMovie>;

export type iMovie = z.infer<typeof returnMovieWithId>;

interface iCount {
    count: string;
}

export type iCountResult = QueryResult<iCount>;

export type iMovieResult = QueryResult<iMovie>;

export interface iMovieListPage {
    previousPage: string | null;
    nextPage: string | null;
    count: number;
    data: iMovie[];
}

export type iOrder = "price" | "duration";

export interface iCanRun {
    error: boolean,
    msg: string
}