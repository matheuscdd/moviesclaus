import { DeepPartial, Repository } from "typeorm";
import { Movie } from "../entities";
import { movieCreateSchema } from "../schemas";
import { z } from "zod";

type iMovieCreate = z.infer<typeof movieCreateSchema>;
type iMovieUpdate = DeepPartial<Movie>;
type iMovieRepo = Repository<Movie>;

export { iMovieCreate, iMovieUpdate, iMovieRepo };