import { z } from "zod";

export const createMovieSchema = z.object({
    name: z.string().max(50),
    description: z.string().optional().nullable(),
    duration: z.number().int(),
    price: z.number().int()
});

export const returnMovieWithId = z.object({
    id: z.number().int()
}).merge(createMovieSchema);

export const updateMovieSchema = createMovieSchema.partial();