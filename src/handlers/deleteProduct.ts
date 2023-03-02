import { winstonLogger } from "../utils/logger";
import { ProductServiceInterface } from "../services/products";
import { errorResponse, successResponse } from "../utils/responseBuilder";

const deleteProductHandler = (productService: ProductServiceInterface) => async (event: {
  pathParameters: { productId: string };
}) => {
  try {
    winstonLogger.logRequest(`Incoming event: ${ JSON.stringify( event ) }`);

    const { productId } = event.pathParameters;

    const deleteProductResponse = await productService.delete(productId);

    winstonLogger.logRequest(`"Deleted product: ${deleteProductResponse}`);

    return successResponse(deleteProductResponse);
  } catch (error) {
    return errorResponse(error as Error)
  }
}

export default deleteProductHandler;