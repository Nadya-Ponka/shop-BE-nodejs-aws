import { getAllProducts} from './getAllProducts';
import { products } from '../assets/products';

test('Получить все продукты', () => {
	let response = '';
	getAllProducts().then(result => {
		response = result.body;
		expect(JSON.parse(response)).toStrictEqual(products);
	});
	
});