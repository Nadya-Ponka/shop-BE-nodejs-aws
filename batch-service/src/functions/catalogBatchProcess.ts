'use strict'

import { createNewProduct } from '../../../product-service/src/functions/PostgresProductService';
// import fetch from 'isomorphic-fetch'

export const catalogBatchProcess = async (event) => {
	console.log('BATCH EVENT: ', event);

	const products = event.Records.map(async ({body}) => {
		console.log('BODY: ', body);

		const dataObject = body;
		console.log('EVENT OBJECT: ', dataObject);
		// if (dataObject.hasOwnProperty('title') && dataObject.hasOwnProperty('description') && dataObject.hasOwnProperty('price') && dataObject.hasOwnProperty('count')) {
			console.log('WE ARE HERE');
			const response = await createNewProduct(dataObject);
			console.log('RESPONCE FROM DB: ', response);
		// } else {
		// 	console.log('NOT CREATE');

		// }
		// return fetch('https://msp12wf5x1.execute-api.eu-west-1.amazonaws.com/dev/products', {
		// 	method: 'POST',
		// 	mode: 'cors', // no-cors, *cors, same-origin
		// 	cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		// 	credentials: 'same-origin', // include, *same-origin, omit
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 		// 'Content-Type': 'application/x-www-form-urlencoded',
		// 	},
		// 	redirect: 'follow', // manual, *follow, error
		// 	referrerPolicy: 'no-referrer',
		// 	body: JSON.stringify(body)
		// }).then((response) => {
		// 	console.log('FETCH RRESPONSE: ', response);
		// 	return response.json();
		// }).then((data) => {
		// 		console.log('DATA: ', data);
		// }).catch((e) => {
		// 	console.log('BATCH CATCH: ', e);
		// }).finally(() => {
		// 	console.log('BATCH FINALLY');
		// });
	});


	// Promise.allSettled(products).then(result => {
	// 	console.log('ALL SETTLED REsult; ', result);
	// })
		// console.log('PRODUCTS: ', products);
}
