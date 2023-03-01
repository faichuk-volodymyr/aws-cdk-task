import { DEFAULT_HEADERS } from "../constants";

const createProduct = async function (event: {
  queryStringParameters: {}; 
}) {
 
  return {
    body: JSON.stringify({
      message: "Product successfully created."
    }),
    headers: {
      ...DEFAULT_HEADERS
    },
    statusCode: 200,
  };
};

export default createProduct;