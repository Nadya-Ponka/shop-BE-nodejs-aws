import { importProductsFile } from './importProductsFile'
import { event } from './../assets/mockedQuery';
import AWSMock from 'aws-sdk-mock';

const BUCKET = 'import-service-dev-serverlessdeploymentbucket-1twvr14t8nqk9';

test('Function importProductsFile exists', () => {
	console.log('FUNCTION: ', importProductsFile, event);
	expect(importProductsFile(event)).toBeDefined();
});

test('Get signedURL from s3', () => {
	importProductsFile(event).then(result => {
		expect(JSON.parse(result.body)).stringMatching(BUCKET);
	});
});

test('Get status code 200 if result correct', () => {
	importProductsFile(event).then(result => {
		expect(JSON.parse(result.statusCode)).toEqual(200);
	});
});

test('Get status code 200 if result correct and signedURL mocked', async () => {
	AWSMock.mock('S3', 'getSignedUrl', 'https://mocked-url.com');

	const response = await importProductsFile(event);
	expect(JSON.parse(response.statusCode)).toEqual(200);
});

test('Get correct mocked-url if result correct', async () => {
	const MOCKED_URL = 'https://mocked-url.com';
	AWSMock.mock('S3', 'getSignedUrl', MOCKED_URL);

	const response = await importProductsFile(event);
	expect(JSON.parse(response.body)).toEqual(MOCKED_URL);
});
