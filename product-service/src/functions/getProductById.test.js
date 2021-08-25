import { getProductById } from './getProductById';
import { products } from '../assets/products';

test('Получить продукт по Id', () => {
	let response = '';

	const obj = {
		pathParameters: { productId: '7567ec4b-3333-2222-9345-fc73c48a80a0' }
	};

	getProductById(obj).then(result => {
		response = result.body;
		expect(JSON.parse(response)).toStrictEqual(products[0]);
	});

});