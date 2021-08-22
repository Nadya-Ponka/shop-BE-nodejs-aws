'use strict'

import { APIGatewayProxyHandler } from 'aws-lambda';

import { products } from '../assets/products';

export const getAllProducts: APIGatewayProxyHandler = async (event) => {

	try {
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
