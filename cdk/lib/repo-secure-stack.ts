import { lambda_layer_awscli, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';

export class RepoSecureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
  // The code that defines your stack goes here
    const githubWebhook = new lambda.NodejsFunction(this, 'githubWebhook',{
      memorySize: 1024,
      entry: '././src/webhook-lambda/src/index.ts'
    })
  
  }
}
