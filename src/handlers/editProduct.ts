import { DEFAULT_HEADERS } from "../constants";

const editProduct = async function (event: {
  queryStringParameters: {}; 
  pathParameters: { productId: string };
}) {
  const { productId } = event.pathParameters;

  return {
    body: JSON.stringify({
      message: `Product ${productId} successfully edited.`
    }),
    headers: {
      ...DEFAULT_HEADERS
    },
    statusCode: 200,
  };
};

export default editProduct;