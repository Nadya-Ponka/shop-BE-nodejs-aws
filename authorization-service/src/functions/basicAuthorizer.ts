'use strict'

export const basicAuthorizer = async (event, context, callback) => {
    console.log('EVENT: ', JSON.stringify(event));

    if(event['type'] !== 'TOKEN') {
        callback('UnauthorizeDDDd');
    }

    try {
        const authorizationToken = event.authorizationToken;
        console.log('AUTH TOKEN: ', authorizationToken);
        const encodedCreds = authorizationToken.split(' ')[1];
        const buff = Buffer.from(encodedCreds,'base64')
        const plainCreds = buff.toString('utf-8').split(':');
        const userName = plainCreds[0];
        const userPassword = plainCreds[1];

        console.log('USER NAME: ', userName, ', PASSWORD: ', userPassword);

        const storedUserPassword = process.env[userName];
        const effect = !storedUserPassword || storedUserPassword != userPassword ? 'Deny' : 'Allow';

        const policy = generatePolicy(encodedCreds, event.methodArn, effect);

        callback(null, policy);
    } catch (e) {
        callback('UNAUTHORIZED: ', e.message);
    }
}

const generatePolicy = function(principalId, resource, effect = 'Allow') {
    return {
        principalId: principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [{
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource
            }]
        }
    };
}
