/* eslint-disable import/no-import-module-exports */
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Webhooks } from '@octokit/webhooks';

exports.handler = async (event: APIGatewayProxyEventV2)
: Promise<APIGatewayProxyResultV2> => {
  // eslint-disable-next-line no-console

  const verify = new Webhooks({
    secret: process.env?.GH_REPOSECURE_WEBHOOK || '',
  }).verify(event.body as any, event.headers['x-hub-signature-256'] as string);

  console.log('My Events', event);
  console.log('verified', verify);
  // ...
  return { body: '', statusCode: 200 };
};
