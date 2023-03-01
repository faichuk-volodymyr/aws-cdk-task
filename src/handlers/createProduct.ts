
import { DEFAULT_HEADERS } from "../constants";
import { ProductInterface, ProductServiceInterface } from "../services/products";

export const createProductHandler = (productService: ProductServiceInterface) => async (event: {
  body: string
}) => {
  try {

    console.info("EventBody", event.body);

      const product = await productService.create(JSON.parse(event.body));

      return {
        body: JSON.stringify(product),
        headers: {
          ...DEFAULT_HEADERS
        },
        statusCode: 200,
      };

  } catch (err) {
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

export default createProductHandler;