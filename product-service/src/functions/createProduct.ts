'use strict'

import { createNewProduct } from './PostgresProductService';

import { APIGatewayProxyHandler } from 'aws-lambda';

export const createProduct: APIGatewayProxyHandler = async (event) => {
	console.log('CREATE PRODUCT EVENT: ', event);
	let bodyResponse = { message: 'Product was NOT created' };
	let statusCode: number = 404;

	try {
		const dataObject = JSON.parse(event.body);
		
		if (dataObject.hasOwnProperty('title') && dataObject.hasOwnProperty('description') && dataObject.hasOwnProperty('price') && dataObject.hasOwnProperty('count')) {
			const response = await createNewProduct(dataObject);
			bodyResponse = response;
			statusCode = 200;
		} else {
			statusCode = 400;
			bodyResponse = { message: 'Product data is invalid, Can\'t save product in database' };
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
			body: JSON.stringify({ message: 'Unhandled error' })
		}
	}
}
