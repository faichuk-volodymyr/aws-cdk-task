import { winstonLogger } from "../utils/logger";
import { ProductServiceInterface } from "../services/products";
import { errorResponse, successResponse } from "../utils/responseBuilder";

const getProductList = (productService: ProductServiceInterface) => async (event: {}) => {
  try {
    winstonLogger.logRequest(`Incoming event: ${ JSON.stringify( event ) }`);

    const products = await productService.getAllProducts();

    winstonLogger.logRequest(`"Received products: ${ JSON.stringify( products ) }`);

    return successResponse(products)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

export default getProductList;