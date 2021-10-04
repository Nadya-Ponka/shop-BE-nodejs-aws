'use strict'
const AWS = require('aws-sdk');

import { createNewProduct } from '../../../product-service/src/functions/PostgresProductService';

export const catalogBatchProcess = async (event) => {
	const array = [];
	const sns = new AWS.SNS({ region: 'eu-west-1' });
	console.log('SNS: ', process.env.SNS_ARN, sns, array);

	for (let record of event.Records) {
		console.log('RECORD: ', record.body);
		const dataObject = JSON.parse(record.body);
		if (dataObject.hasOwnProperty('title') && dataObject.hasOwnProperty('description') && dataObject.hasOwnProperty('price') && dataObject.hasOwnProperty('count')) {
			array.push(await createNewProduct(dataObject));
			sns.publish({
				Subject: 'Product was created',
				Message: JSON.stringify('Everithing is all right: ', array[array.length - 1], dataObject),
				TopicArn: process.env.SNS_ARN,
				MessageAttributes: {
					title: {
						Data: 'String.Array',
						Value: ["interest","Happiness"]
					}
				}
			}, () => {
				console.log('SENDED SNS EMAIL: ');
			});
		} else {
			console.log('RECORD WAS NOT CREATED: ', record.body);
		}
	}
}
