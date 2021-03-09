const express = require("express");
let products = require("./products");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (request, response) => {
  response.json({
    message:
      "This is the homepage running on localhost:8000. Go to localhost:8000/products to view product data.",
  });
});

app.get("/products", (request, response) => {
  response.json(products);
});

app.delete("/products/:productID", (request, response) => {
  const { productID } = request.params;
  const foundProduct = products.find((product) => product.id === +productID);
  if (foundProduct) {
    products = products.filter((product) => product.id !== +foundProduct.id);
    response.status(204).end();
  } else response.status(404).json({ message: "Product not found!" });
  // response.json(products);
});

app.listen(8000, () => {
  console.log("The application is running on localhost: 8000");
});
