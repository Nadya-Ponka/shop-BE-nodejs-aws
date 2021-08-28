import { getAllProducts} from './getAllProducts';
import { products } from '../assets/products';

test('Function getAllProducts exists', () => {
	expect(getAllProducts()).toBeDefined();
});

test('Get all products', () => {
	let response = '';
	getAllProducts().then(result => {
		response = result.body;
		expect(JSON.parse(response)).toStrictEqual(products);
	});
});
