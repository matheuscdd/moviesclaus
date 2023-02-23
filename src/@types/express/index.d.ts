import * as express from "express";
import { iMovieRequest } from "../../interfaces/movies.interfaces";

declare global {
    namespace Express {
        interface Request {
            id?: number;
        }
    }
}