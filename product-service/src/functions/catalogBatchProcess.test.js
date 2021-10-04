import { catalogBatchProcess } from './catalogBatchProcess'
const AWS = require('aws-sdk');
import * as createNewProductObject from './PostgresProductService';
import { createNewProduct } from './PostgresProductService';

jest.mock('aws-sdk', () => {
	const SNSMocked = {
		publish: jest.fn().mockReturnThis(),
		promise: jest.fn()
	};

	return {
		SNS: jest.fn(() => SNSMocked)
	};
});


const mockedRecords = { "Records": [{body: JSON.stringify({ "title": "Adoration", "description": "Emotion of Adoration", "price": "9", "count": "4"})}] };
const mockedResponse = { message: 'everithing is OK' };

// jest.spyOn(createNewProduct, (object) => {
// 	return { message: 'everithing is OK' };
// });

const sns = new AWS.SNS({
	region: 'eu-west-1'
});

describe.only('Test for catalogBatchProcess: ', () => {
	beforeEach(() => {
		(sns.publish().promise).mockReset();
	});
	
	it('Function catalogBatchProcess exists', async () => {
		expect(catalogBatchProcess(mockedRecords)).toBeDefined();
	});

	it('Function createNewProduct should be called', async () => {
		const spyAddProduct = jest.spyOn(createNewProductObject, "createNewProduct");
		spyAddProduct.mockReturnValue(mockedResponse);

		await catalogBatchProcess(mockedRecords);
		expect(spyAddProduct).toHaveBeenCalled();
	});

	// it('Function catalogBatchProcess should return result [ { message: \'everithing is OK\' } ]', async () => {
	// 	await expect(catalogBatchProcess(mockedRecords)).toEqual([mockedResponse]);
	// });

	it('should throw an error when send message error', async () => {
		const sendMessageErrorMessage = 'Cannot read property \'Records\' of null';
		await expect(catalogBatchProcess(null)).rejects.toThrowError(new Error(sendMessageErrorMessage));
	});
});