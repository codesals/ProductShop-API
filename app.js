const express = require("express");
const products = require("./products");
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

app.listen(8000, () => {
  console.log("The application is running on localhost: 8000");
});
