'use strict'

import csv from 'csv-parser';

const AWS = require('aws-sdk');
const BUCKET = 'import-service-dev-serverlessdeploymentbucket-1twvr14t8nqk9';

export const importFileParser = async (event) => {
	const s3 = new AWS.S3({ region: 'eu-west-1' });

	console.log('RECORDS: ', event.Records);
	const readedStream = [];

	for(const record of event.Records) {
		s3.getObject({
			Bucket: BUCKET,
			Key: record.s3.object.key
		}).createReadStream()
			.pipe(csv())
			.on('data', (chunk) => {
				console.log(chunk);
				readedStream.push(chunk);
			})
			.on('end', () => {
				console.log('END OF STREAM READING: ', readedStream);
			})
			.on('error', (error) => {
				console.error('ERROR READ STREAM: ', error);
			})

		await s3.copyObject({
			Bucket: BUCKET,
			CopySource: BUCKET + '/' + record.s3.object.key,
			Key: record.s3.object.key.replace('uploaded', 'parsed')
		}).promise();

		await s3.deleteObject({
			Bucket: BUCKET,
			Key: record.s3.object.key
		}).promise();

		console.log('COPIED OBJECT: ' + record.s3.object.key.split('/')[1]);
	}

	return { statusCode: 202 }
}
