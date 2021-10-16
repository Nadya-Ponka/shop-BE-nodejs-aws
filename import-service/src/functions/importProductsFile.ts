'use strict'

const AWS = require('aws-sdk');
const BUCKET = 'import-service-dev-serverlessdeploymentbucket-1twvr14t8nqk9';

export const importProductsFile = async (event) => {
	const s3 = new AWS.S3({ region: 'eu-west-1'});
	let status = 200;
	let url = '';

	try {
		const fileName = event.queryStringParameters.name;
		const folderPath = `uploaded/${fileName}`;

		let params = {
			Bucket: BUCKET,
			Key: folderPath,
			ContentType: 'text/csv'
		};

		url = await s3.getSignedUrlPromise('putObject', params);
	} catch(error) {
		console.error(error);
		status = 500;
	}

	const response = {
		statusCode: status,
		headers: {
			'Access-Control-Allow-Origin': '*', 
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Credentials': 'true',
			'Content-Type': 'text/csv'
		},
		body: JSON.stringify(url)
	};

	return response;
}
