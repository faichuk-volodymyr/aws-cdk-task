exports.getProductList = async function (event: {
  queryStringParameters: {}; 
}) {
 
  return {
    body: JSON.stringify([
      {productId: 1, text: 'walk the dog 🐕'},
      {productId: 2, text: 'cook dinner 🥗'},
    ]),
    headers: {
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 200,
  };
};