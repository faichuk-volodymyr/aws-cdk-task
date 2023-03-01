import { DEFAULT_HEADERS } from "../constants";
import { ProductServiceInterface } from "../services/products";

export const updateProductHandler = (productService: ProductServiceInterface) => async (event: {
  pathParameters: { productId: string };
}) => {
  try {
    const { productId } = event.pathParameters;
      const products = await productService.update(productId);
      return {
        body: JSON.stringify({
          products,
          event,
        }),
        headers: {
          ...DEFAULT_HEADERS
        },
        statusCode: 200,
      };
  } catch (err) {
    console.error(err);
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

export default updateProductHandler;
