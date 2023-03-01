import { DEFAULT_HEADERS } from "../constants";

const getProductList = async function (event: {
  queryStringParameters: {}; 
}) {
 
  return {
    body: JSON.stringify([
      {productId: 1, description: 'walk the dog 🐕'},
      {productId: 2, description: 'cook dinner 🥗'},
    ]),
    headers: {
      ...DEFAULT_HEADERS
    },
    statusCode: 200,
  };
};

export default getProductList;