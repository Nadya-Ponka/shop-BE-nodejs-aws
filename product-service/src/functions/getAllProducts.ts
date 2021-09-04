'use strict'

import { APIGatewayProxyHandler } from 'aws-lambda';
import { getAllProductsFromDatabase } from './PostgresProductService';

// export const invoke = async event => {
// 	console.log('WE ARE HERE');
// 	const client = new Client(dbOptions);
// 	await client.connect();

// 	try {
// 		// const ddlResult = await client.query(`
// 		// 	create table if not exists product_model (
// 		// 		id uuid primary key default uuid_generate_v4(),
// 		// 		title text,
// 		// 		description text,
// 		// 		price integer
// 		// 	)`
// 		// );

// 		// const ddlResult2 = await client.query(`
// 		// 	create table if not exists stock_model (
// 		// 		product_id uuid primary key default uuid_generate_v4(),
// 		// 		count integer,
// 		// 		foreign key ("product_id") references "product_model" ("id")
// 		// 	)`
// 		// );

// 		// const dmlResult = await client.query(`
				
// 		// `);
// 		const { rows: products } = await client.query(`select * from product_model`);
// 		console.log('PRODUCTS: ', products);
// 	} catch (err) {
// 		console.error('Error during database executing: ', err);
// 	} finally {
// 		client.end();
// 	}
// }

export const getAllProducts: APIGatewayProxyHandler = async (event) => {
	try {
		const products = await getAllProductsFromDatabase();
		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify(products)
		};
	} catch (error) {
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ message: error })
		}
	}
}
