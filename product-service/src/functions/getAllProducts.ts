'use strict'

import { APIGatewayProxyHandler } from 'aws-lambda';
import { getAllProductsFromDatabase } from './PostgresProductService';

export const getAllProducts: APIGatewayProxyHandler = async (event) => {
	console.log('GET ALL PRODUCTS EVENT: ', event);

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
			statusCode: 555,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ message: 'Something wrong with database' })
		}
	}
}
