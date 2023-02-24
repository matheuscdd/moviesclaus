import { z } from "zod";

const orderOption = Object.freeze(["asc", "desc"]);
const sortOption = Object.freeze(["price", "duration"]);

export const createMovieSchema = z.object({
    name: z.string().max(50),
    description: z.string().nullable().optional(), //pedir ajuda
    duration: z.number().int().positive(),
    price: z.number().int().positive()
});

export const returnMovieWithId = z.object({
    id: z.number().int()
}).merge(createMovieSchema);

export const updateMovieSchema = createMovieSchema.partial();

export const createParamsSchema = z.object({
    page: z.preprocess((value => {
        let num = Number(value);
        if (isNaN(num) || num < 1) return 1;
        return num;
    }), z.number().int().nonnegative().finite()).default(1),
    perPage: z.preprocess((value => {
        let num = Number(value);
        if (isNaN(num) || num < 1 || num > 5) return 5;
        return num
    }), z.number().int().nonnegative().finite()).default(5),
    order: z.preprocess((value => 
        !orderOption.includes(String(value)) ? "asc" : value
    ), z.string()).default("asc"),
    sort: z.preprocess((value => 
        !sortOption.includes(String(value)) ? "id" : value
    ), z.string()).default("id")
});