import { iCountResult } from "./interfaces/movies.interfaces";

export async function amountMovies(): Promise<number> {
    // const queryString: string = `--sql
    //     SELECT
    //         COUNT(id)
    //     FROM
    //         movies;    
    //     `;
    
    // const queryResult: iCountResult = await client.query(queryString);
    // const amountMovies: number = Number(queryResult.rows[0].count);

    return 10;
}