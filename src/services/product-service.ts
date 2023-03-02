

import {
    DynamoDBClient,
    ScanCommand,
    PutItemCommand,
    PutItemCommandInput,
    UpdateItemCommand,
    DeleteItemCommand,
    UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { STATUS_CODES } from "../constants";
import { ProductServiceInterface, ProductInterface } from './products';

class ProductService implements ProductServiceInterface {

    private tableName = "PRODUCT_TABLE";

    constructor(private databaseClient: DynamoDBClient){}

    async getAllProducts() {
        const params = {
            TableName: this.tableName,
        };
        const getAllItemsCommand = new ScanCommand(params);
        const { Items = [] } = await this.databaseClient.send(getAllItemsCommand);
        const products = Items.map(item => unmarshall(item) as ProductInterface);
        return Promise.resolve(products);
    }

    async create(product: Pick<ProductInterface, 'title' | 'description' | 'price' | 'count'>) {

        const params: PutItemCommandInput = {
            TableName: this.tableName,
            Item: {
              id: { N: `${Date.now()}` },
              title: { S: product.title },
              description: { S: product.description },
              count: { N: `${product.count}` },
              price: { N: `${product.price}` }
            }
        };

        const putItemCommand = new PutItemCommand(params);
        const { "$metadata": { httpStatusCode } } = await this.databaseClient.send(putItemCommand);

        const massage = httpStatusCode === STATUS_CODES.OK 
            ? `Product - ${product.title} has been created.`
            : 'Error while creating product.'

        return Promise.resolve(massage);
    }

    async update(
        productId: string,
        product: Pick<ProductInterface, 'title' | 'description' | 'price'>
    ) {

        const updateExpression = "SET #title = :newTitle"

        const params: UpdateItemCommandInput = {
            TableName: this.tableName,
            Key: {
              id: { N: `${productId}` }
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: {
              "#title": "title",
            },
            ExpressionAttributeValues: {
              ":newTitle": { S: product.title },
            }
        };

        const updateItemCommand = new UpdateItemCommand(params);
        const { "$metadata": { httpStatusCode } } = await this.databaseClient.send(updateItemCommand);

        const massage = httpStatusCode === STATUS_CODES.OK 
            ? `Product - ${product.title} has been modified.`
            : 'Error while updating product.'

        return Promise.resolve(massage);
    };

    async delete(productId: string) {
        const params = {
            TableName: this.tableName,
            Key: {
                id: { N: productId }
            },
        };

        const deleteItemCommand = new DeleteItemCommand(params);
        const { "$metadata": { httpStatusCode } }  = await this.databaseClient.send(deleteItemCommand);

        const massage = httpStatusCode === STATUS_CODES.OK 
            ? `Product - ${productId} has been deleted.`
            : 'Error while deleting product.'

        return Promise.resolve(massage); 
    }
}

export { ProductService };