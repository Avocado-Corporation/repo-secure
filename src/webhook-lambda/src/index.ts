/* eslint-disable import/no-import-module-exports */
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

exports.handler = async (event: APIGatewayProxyEventV2)
: Promise<APIGatewayProxyResultV2> => {
  // eslint-disable-next-line no-console
  console.log('My Events', event);
  // ...
  return { body: '', statusCode: 200 };
};
