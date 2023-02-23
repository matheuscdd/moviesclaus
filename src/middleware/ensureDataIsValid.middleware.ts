import { NextFunction, Response, Request } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors";

export const ensureDataIsValidMiddleware = (schema: ZodTypeAny, arrKeys: string[] = []) => (req: Request, res: Response, next: NextFunction): void => {
    if (!Object.keys(req.body).length) throw new AppError(`Body is empty`, 400);
    
    const validatedData = schema.parse(req.body);
    console.log(typeof validatedData)
    if (!Object.keys(validatedData).length) throw new AppError(`Some optional keys are missing: ${arrKeys}`, 400);
    req.body = validatedData;

    return next();
}


