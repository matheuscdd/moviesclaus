import * as express from "express";
import { iMovieRequest } from "../../interfaces";

declare global {
    namespace Express {
        interface Request {
            movieOption: {
                id?: number;
                data?: iMovieRequest;
            }
        }
    }
}