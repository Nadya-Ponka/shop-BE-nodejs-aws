import { importProductsFile } from './importProductsFile'
import { event } from './../assets/mockedQuery';

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

test('Get signedURL from s3', () => {
	importProductsFile(event).then(result => {
		expect(JSON.parse(result.statusCode)).toEqual(200);
	});
});
