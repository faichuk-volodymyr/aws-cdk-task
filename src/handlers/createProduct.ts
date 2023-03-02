
import { ProductServiceInterface } from "../services/products";
import { winstonLogger } from "../utils/logger";
import { errorResponse, successResponse } from "../utils/responseBuilder";

export const createProductHandler = (productService: ProductServiceInterface) => async (event: {
  body: string
}) => {
  try {
    winstonLogger.logRequest(`Incoming event: ${ JSON.stringify( event ) }`);

    const productToCreate = JSON.parse(event.body);

    const { title, description, price, count } = productToCreate;

    if (!title || !description || price === undefined || count === undefined ) {
      throw new Error('Missing required field.');
    }

    const createProductResponseMessage = await productService.create(productToCreate);

    winstonLogger.logRequest(`"Created product: ${createProductResponseMessage}`);

    return successResponse({ massage: createProductResponseMessage });
  } catch (error) {
    return errorResponse(error as Error)
  }
}

export default createProductHandler;