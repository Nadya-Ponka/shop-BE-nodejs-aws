import { getProductById } from './getProductById';
import { products } from '../assets/products';

test('Function getProductById exists', () => {
	expect(getProductById()).toBeDefined();
});

test('Get product by Id', () => {
	let response = '';

	const obj = {
		pathParameters: { productId: '7567ec4b-3333-2222-9345-fc73c48a80a0' }
	};

	getProductById(obj).then(result => {
		expect(JSON.parse(result.body)).toStrictEqual(products[0]);
		expect(JSON.parse(result.statusCode)).toEqual(200);
	});
});

test('Get error if product doesn\'t exist', () => {
	let response = '';

	const obj = {
		pathParameters: { productId: '55555' }
	};

	getProductById(obj).then(result => {
		expect(JSON.parse(result.body)).toStrictEqual({"message": "Product not found"});
		expect(JSON.parse(result.statusCode)).toEqual(404);
	});
});
