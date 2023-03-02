import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  editProduct as updateProductHandler,
  createProduct as createProductHandler,
  deleteProduct as deleteProductHandler,
  getProductList as getAllProductsHandler,
} from "./handlers";
import { ProductService } from './services/product-service';

const region = "eu-west-1";
const dynamoClient = new DynamoDBClient({ region });

const productService = new ProductService(dynamoClient);

export const getProductList = getAllProductsHandler(productService);
export const createProduct = createProductHandler(productService);
export const editProduct = updateProductHandler(productService);
export const deleteProduct = deleteProductHandler(productService);