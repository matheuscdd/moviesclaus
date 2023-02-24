import { z } from "zod";
import { createMovieSchema, createParamsSchema, returnMovieWithId, updateMovieSchema } from "../schemas/movies.schemas";
import { DeepPartial } from "typeorm";

export type iMovieRequestCreate = z.infer<typeof createMovieSchema>;
export type iMovieRequestUpdate = DeepPartial<iMovie>;

export type iMovie = z.infer<typeof returnMovieWithId>;

export interface iMovieListPage {
    previousPage: string | null;
    nextPage: string | null;
    count: number;
    data: iMovie[];
}

export type iParams = z.infer<typeof createParamsSchema>;


