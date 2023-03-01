import { DEFAULT_HEADERS } from "../constants";
import { ProductServiceInterface } from "../services/products";

const getProductList = (productService: ProductServiceInterface) => async (event: {}) => {
  try {
      const products = await productService.getAllProducts();

      return {
        body: JSON.stringify(products),
        headers: {
          ...DEFAULT_HEADERS
        },
        statusCode: 200,
      };
  } catch (error) {
      console.error(error);
      return {
        body: JSON.stringify({
          message: "Something went wrong"
        }),
        headers: {
          ...DEFAULT_HEADERS
        },
        statusCode: 200,
    };
  }
}

export default getProductList;