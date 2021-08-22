import * as handlers from './src/functions/index';

console.log(process.env);

export const getProductById = handlers.getProductById;
export const getAllProducts = handlers.getAllProducts;
