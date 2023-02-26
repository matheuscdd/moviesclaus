import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class AppError extends Error { //Crio a classe AppError pegando os atributos da classe Error
    message: string; //Defino os tipos de dados que ela vai receber
    statusCode: number;

    constructor(message: string, statusCode: number = 400) { //É método que será executado toda vez que criou um objeto da classe pela primeira vez
        super(); //Existe para acessar os atributos da classe pai
        this.message = message; //Essa parte salva as informações
        this.statusCode = statusCode;
    }

}

export function handleError(error: Error, req: Request, res: Response, _: NextFunction) { //Funciona como um middleware global que sempre que um erro é lança para cá que devolve a response para o usuário
    if (error instanceof AppError) { //Estou verificando se o erro que estou recebendo faz da
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