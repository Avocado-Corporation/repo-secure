/* eslint-disable import/no-import-module-exports */
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Webhooks } from '@octokit/webhooks';
import { RepositoryEvent } from '@octokit/webhooks-types';
import RepoEvents from './gh-repo-events';

exports.handler = async (event: APIGatewayProxyEventV2)
: Promise<APIGatewayProxyResultV2> => {
  // eslint-disable-next-line no-console
  console.log('My Events', event);
  const verified = await new Webhooks({
    secret: process.env?.GH_REPOSECURE_WEBHOOK || '',
  }).verify(event.body as any, event.headers['X-Hub-Signature'] as string);

  if (!verified) return { statusCode: 500 };

  const ghEvent = event.headers['X-GitHub-Event'] as string;
  const body = JSON.parse(event.body as any) as RepositoryEvent;
  console.log(`verified -> ${verified} event-> ${ghEvent}`);
  let result = { body: body.action, statusCode: 200 };
  try {
    if (ghEvent === 'repository') {
      RepoEvents(body);
    }
  } catch (error:any) {
    console.log('Error ', error);
    result = { body: error, statusCode: 500 };
  }
  return result;
  // ...
};
