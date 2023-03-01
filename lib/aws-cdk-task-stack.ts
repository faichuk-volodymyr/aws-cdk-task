import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkTaskStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, 'products-api', {
      description: 'example api gateway',
      deployOptions: {
        stageName: 'dev',
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowOrigins: ['http://localhost:3000'],
      },
    });

    new cdk.CfnOutput(this, 'apiUrl', {value: api.url});

    const getProductsLambda = new lambda.Function(this, 'get-products-lambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler.getProductList',
      code: lambda.Code.fromAsset('api'),
    });

    const products = api.root.addResource('products');

    products.addMethod(
      'GET',
      new apigateway.LambdaIntegration(getProductsLambda, {proxy: true}),
    );
  }
}
