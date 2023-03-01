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

    // get products
    const getProductsLambda = new lambda.Function(this, 'get-products-lambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler.getProductList',
      code: lambda.Code.fromAsset('src'),
    });

    const products = api.root.addResource('products');

    products.addMethod(
      'GET',
      new apigateway.LambdaIntegration(getProductsLambda, {proxy: true}),
    );

    // create product
    const createProductLambda = new lambda.Function(this, 'create-product-lambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler.createProduct',
      code: lambda.Code.fromAsset('src'),
    });

    const createProduct = products.addResource('create');

    createProduct.addMethod(
      'POST',
      new apigateway.LambdaIntegration(createProductLambda, {proxy: true}),
    );

    // delete product
    const deleteProductLambda = new lambda.Function(this, 'delete-product-lambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler.deleteProduct',
      code: lambda.Code.fromAsset('src'),
    });

    const deleteProduct = products.addResource('{productId}');

    deleteProduct.addMethod(
      'DELETE',
      new apigateway.LambdaIntegration(deleteProductLambda),
    );

    // editProduct
    const editProductLambda = new lambda.Function(this, 'edit-product-lambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler.editProduct',
      code: lambda.Code.fromAsset('src'),
    });

    deleteProduct.addMethod(
      'PATCH',
      new apigateway.LambdaIntegration(editProductLambda),
    );

  }
}
