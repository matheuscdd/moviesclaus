import { Response } from "express";

export function errorNotFound(response: Response) {
    return response.status(404).json({
        message: `Not found`
    });
}