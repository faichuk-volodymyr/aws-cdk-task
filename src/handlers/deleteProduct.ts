import { DEFAULT_HEADERS } from "../constants";

const deleteProduct = async function (event: {
  queryStringParameters: {}; 
  pathParameters: { productId: string };
}) {
  const { productId } = event.pathParameters;

  return {
    body: JSON.stringify({
      message: `Product ${productId} successfully deleted.`
    }),
    headers: {
      ...DEFAULT_HEADERS
    },
    statusCode: 200,
  };
};

export default deleteProduct;