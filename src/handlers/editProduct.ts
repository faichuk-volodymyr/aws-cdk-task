import { DEFAULT_HEADERS } from "../constants";
import { ProductServiceInterface } from "../services/products";
import { winstonLogger } from "../utils/logger";
import { errorResponse, successResponse } from "../utils/responseBuilder";

export const updateProductHandler = (productService: ProductServiceInterface) => async (event: {
  pathParameters: { productId: string };
  body: string,
}) => {
  try {
    winstonLogger.logRequest(`Incoming event: ${ JSON.stringify( event ) }`);
    
    const { productId } = event.pathParameters;

    const productToUpdate = JSON.parse(event.body);

    const { title, description, price } = productToUpdate;

    if (!title || !description || price === undefined ) {
      throw new Error('Missing required field.');
    }

    const updatedProductResponse = await productService.update(productId, productToUpdate);

    winstonLogger.logRequest(`"Update product: ${updatedProductResponse}`);

    return successResponse(updatedProductResponse);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

export default updateProductHandler;
