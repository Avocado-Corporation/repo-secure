import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as api from 'aws-cdk-lib/aws-apigateway';

export default class RepoSecureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    // The code that defines your stack goes here
    // eslint-disable-next-line no-unused-vars
    const githubWebhook = new lambda.NodejsFunction(this, 'githubWebhook', {
      memorySize: 1024,
      entry: '././src/webhook-lambda/src/index.ts',
      environment: {
        GH_APP_ID: process.env?.GH_APP_ID || '',
        GH_REPOSECURE_WEBHOOK: process.env?.GH_REPOSECURE_WEBHOOK || '',
        GH_REPOSECURE_PK: process.env?.GH_REPOSECURE_PK || '',
        CLIENT_ID: process.env?.CLIENT_ID || '',
        CLIENT_SECRET: process.env?.CLIENT_SECRET || '',
      },

    });
    // eslint-disable-next-line no-unused-vars
    const test = new lambda.NodejsFunction(this, 'test', {
      memorySize: 1024,
      entry: '././src/webhook-lambda/src/test.ts',
      environment: {
        GH_APP_ID: process.env?.GH_APP_ID || '',
        GH_REPOSECURE_WEBHOOK: process.env?.GH_REPOSECURE_WEBHOOK || '',
        GH_REPOSECURE_PK: process.env?.GH_REPOSECURE_PK || '',
        CLIENT_ID: process.env?.CLIENT_ID || '',
        CLIENT_SECRET: process.env?.CLIENT_SECRET || '',
      },

    });

    // eslint-disable-next-line no-unused-vars
    const apiWebhook = new api.RestApi(this, 'github-app-webhook-api', {
      description: 'GitHub enpoint for webhook events',
      deployOptions: {
        stageName: 'production',
      },
    });

    apiWebhook.root.addResource('gh-webhook').addMethod('POST', new api.LambdaIntegration(githubWebhook));
  }
}
