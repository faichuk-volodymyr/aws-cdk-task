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
  create: (product: Omit<ProductInterface, 'id'>) => Promise<string>,
  update: (productId: string, product: Omit<ProductInterface, 'id' | 'count'>) => Promise<string>,
  delete: (productId: string) => Promise<string>
}