// import { Request, Response } from "express";
// import { QueryConfig } from "pg";
// import format from "pg-format";
// // import { defaultRoute, url } from "./app";
// import { client } from "./database";
// import { errorNotFound } from "./errors";
// import { iMovie, iMovieListPage, iMovieRequest, iMovieResult, iOrder } from "./interfaces/movies.interfaces";
// import { amountMovies } from "./validate";

// const defaultRoute = 3000;
// const url = "https://localhost/"

// export async function listMovies(request: Request, response: Response): Promise<Response> {
//     const quantityMovies: number = await amountMovies();
//     let perPage: number = Number(request.query.perPage);
//     perPage = isNaN(perPage) || perPage > 5 || perPage <= 0 ? 5 : perPage;
//     const maxPage: number = Math.ceil(quantityMovies / perPage);
//     let page: number = Number(request.query.page);
//     page = isNaN(page) || page <= 0 ? 0 : page - 1; 
//     let nextPage: number | null = page + 2;
//     let previousPage: number | null = page;
//     const minPage: number = 1;
//     if(page >= maxPage) {
//         previousPage = maxPage
//     } else {
//         previousPage = previousPage < minPage ? null : previousPage;
//     }
//     page *= perPage; 
//     nextPage = nextPage > maxPage ? null : nextPage;
    
//     const sort: iOrder | string = String(request.query.sort!) === "price" || String(request.query.sort!) === "duration" ? String(request.query.sort!) : "id";
//     const order: iOrder | string = sort != "id" && (String(request.query.order!) === "asc" || String(request.query.order!)) === "desc" ? String(request.query.order!) : "asc";
    
//     const queryString: string = format(`--sql
//         SELECT
//             *
//         FROM
//             movies
//         ORDER BY 
//             %s %s
//         LIMIT $1 OFFSET $2;
//         `, sort, order.toUpperCase()); 

//     const queryConfig: QueryConfig = {
//         text: queryString,
//         values: [perPage, page]
//     }; 

   
   

//     const queryResult: iMovieResult = await client.query(queryConfig);
//     const queryResponse: iMovieListPage = {
//         previousPage: previousPage != null ? `${url}${defaultRoute}?page=${previousPage}&perPage=${perPage}` : null, 
//         nextPage: nextPage !== null ? `${url}${defaultRoute}?page=${nextPage}&perPage=${perPage}` : null,
//         count: queryResult.rowCount,
//         data: queryResult.rows
//     }
    
//     return response.status(200).json(queryResponse);    
// }



