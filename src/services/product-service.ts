

import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { ProductServiceInterface, ProductInterface } from './products';
import products from './products-data';

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

    create(product: Pick<ProductInterface, 'title' | 'description' | 'price' | 'count'>) {
        const createProduct: ProductInterface = {
            id: '1',
            ...product,
        };
        return Promise.resolve(createProduct);
    }

    update(productId: string) {
        return Promise.resolve(products);
    };
}

export { ProductService };