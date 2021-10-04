import { catalogBatchProcess } from './catalogBatchProcess'
const AWS = require('aws-sdk');

jest.mock('aws-sdk', () => {
	const SQSMocked = {
		sendMessage: jest.fn().mockReturnThis(),
		promise: jest.fn()
	};
	return {
		SQS: jest.fn(() => SQSMocked)
	};
});

const sqs = new AWS.SQS({
	region: 'eu-west-1'
});

describe.only('Test case for SQS SendMessage', () => {
	beforeEach(() => {
		(sqs.sendMessage().promise).mockReset();
	});
	it('should return the UserEvent', async () => {
		expect(jest.isMockFunction(sqs.sendMessage)).toBeTruthy();
		expect(jest.isMockFunction(sqs.sendMessage().promise)).toBeTruthy();
		(sqs.sendMessage().promise).mockResolvedValueOnce('mocked data');
		const actualValue = await sqs.sendMessage('testURL', 'data');
		expect(actualValue).toEqual('mocked data');
		expect(sqs.sendMessage().promise).toBeCalledWith({ MessageBody: '"testURL"', QueueUrl: 'data' });
		expect(sqs.sendMessage().promise).toBeCalledTimes(1);
	});

	it('should throw an error when send message error', async () => {
		const sendMessageErrorMessage = 'network error';
		(sqs.sendMessage().promise).mockRejectedValueOnce(sendMessageErrorMessage);
		expect(sqs.sendMessage('testURL', 'data').promise).rejects.toThrowError(new Error(sendMessageErrorMessage));
		expect(sqs.sendMessage().promise).toBeCalledWith({ MessageBody: '"testURL"', QueueUrl: 'data' });
		expect(sqs.sendMessage().promise).toBeCalledTimes(1);
	});
});