
import { iCanRun } from "./interfaces/movies.interfaces";

export function errorNotFound(response: Response): Response {
    return response.status(404).json({
        message: `Not found`
    });
}

export function errorMessage(containsAllReqKeys: boolean, containsJustRightTypes: boolean, reqKeys: string[]): iCanRun {
    const canRun: iCanRun = {
        msg: "",
        error: false
    }
    if(!containsAllReqKeys) {
        canRun.msg = `You need put at least required keys, they are: ${reqKeys} and, with want, description is optional. Don"t try put more info than this`;
    } else if(!containsJustRightTypes) {
        canRun.msg = `Some values are out of format. Read the documentation`;
    }
    if(canRun.msg !== "") {
        canRun.error = true;
    }
    return canRun
}

//Tenho que formular essa parte

import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }

}

export function handleError(error: Error, req: Request, res: Response, _: NextFunction) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    }

    if (error instanceof ZodError) {
        return res.status(400).json({
            message: error.flatten().fieldErrors
        });
    }

    console.log(error);
    return res.status(500).json({
        message: `Internal server error`
    });
}