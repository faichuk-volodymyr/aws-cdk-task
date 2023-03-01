import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export interface ProductInterface {
  id: string,
  title: string,
  description: string,
  price: number,
  count: number,
}

export interface ProductInterface {
  title: string,
  description: string,
  price: number,
  count: number,
}

export interface ProductServiceInterface {
  getAllProducts: () => Promise<ProductInterface[]>,
  create: (product: Omit<ProductInterface, 'id'>) => Promise<ProductInterface>,
  update: (productId: string) => Promise<ProductInterface[]>,
}