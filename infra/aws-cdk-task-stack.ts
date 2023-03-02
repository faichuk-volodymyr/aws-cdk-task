import { Stack, StackProps, Construct, CfnOutput } from '@aws-cdk/core';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import { RestApi, LambdaIntegration } from '@aws-cdk/aws-apigateway';
import { Role } from "@aws-cdk/aws-iam";

const dynamoDbAccessRoleArn = "arn:aws:iam::581741678738:role/DynamoDBLambdaAccessRole";

const DEFAULT_DEPLOYMENT_ENV = 'dev';

export class AwsCdkTaskStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const stage = process.env.DEPLOYMENT_ENV || DEFAULT_DEPLOYMENT_ENV;
    
    const dynamoDbAccessRole = Role.fromRoleArn(this, "DynamoDBLambdaAccessRole", dynamoDbAccessRoleArn);

    const api = new RestApi(this, `products-api-${stage}`, {
      description: 'Products api gateway',
      deployOptions: {
        stageName: stage,
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowOrigins: ['http://localhost:3000'],
      },
    });

    new CfnOutput(this, 'apiUrl', {value: api.url});

    // get products
    const getProductsLambda = new Function(this, `get-products-${stage}`, {
      runtime: Runtime.NODEJS_16_X,
      handler: 'handler.getProductList',
      code: Code.fromAsset('src'),
      role: dynamoDbAccessRole,
    });

    const productsResource = api.root.addResource('products');

    productsResource.addMethod(
      'GET',
      new LambdaIntegration(getProductsLambda, {proxy: true}),
    );

    // create product
    const createProductLambda = new Function(this, `create-product-${stage}`, {
      runtime: Runtime.NODEJS_16_X,
      handler: 'handler.createProduct',
      code: Code.fromAsset('src'),
      role: dynamoDbAccessRole
    });

    const createProductResource = productsResource.addResource('create');

    createProductResource.addMethod(
      'PUT',
      new LambdaIntegration(createProductLambda, {proxy: true}),
    );

    // delete product
    const deleteProductLambda = new Function(this, `delete-product-${stage}`, {
      runtime: Runtime.NODEJS_16_X,
      handler: 'handler.deleteProduct',
      code: Code.fromAsset('src'),
      role: dynamoDbAccessRole
    });

    const productByIdResource = productsResource.addResource('{productId}');

    productByIdResource.addMethod(
      'DELETE',
      new LambdaIntegration(deleteProductLambda),
    );

    // updateProduct
    const updateProductLambda = new Function(this, `update-product-${stage}`, {
      runtime: Runtime.NODEJS_16_X,
      handler: 'handler.editProduct',
      code: Code.fromAsset('src'),
      role: dynamoDbAccessRole,
    });

    productByIdResource.addMethod(
      'PATCH',
      new LambdaIntegration(updateProductLambda),
    );
  }
}
