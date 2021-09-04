'use strict'

import { getProductByIdFromDatabase } from './PostgresProductService';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { ProductInterface } from './inrerface';

export const getProductById: APIGatewayProxyHandler = async (event) => {

	try {
		const { productId = '' } = event.pathParameters;
		const product = await getProductByIdFromDatabase(productId);

		let bodyResponse: ProductInterface = { message: 'Product not found' };
		let statusCode: number = 404;
	
		if (product) {
			bodyResponse = product;
			statusCode = 200;
		}
	
		return {
			statusCode: statusCode,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify(bodyResponse)
		}
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
