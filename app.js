const express = require("express");
let products = require("./products");
const cors = require("cors");
const slugify = require("slugify");
const db = require("./db/models");

const app = express();

app.use(cors());
app.use(express.json()); //replacing body parser

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
  const { productID } = request.params; // same as const productID  = request.params.productID;
  const foundProduct = products.find((product) => product.id === +productID);
  if (foundProduct) {
    products = products.filter((product) => product.id !== +foundProduct.id);
    response.status(204).end();
  } else response.status(404).json({ message: "Product not found!" });
  // response.json(products);
});

app.post("/products", (request, response) => {
  const id = products[products.length - 1].id + 1;
  const slug = slugify(request.body.name, { lower: true });
  const newProduct = { id, slug, ...request.body };
  products.push(newProduct);
  response.status(201).json(newProduct);
});

//------Old listen-------
// app.listen(8000, () => {
//   console.log("The application is running on localhost: 8000");
// });

//with db connection
const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Successfully connected to database!");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost: 8000");
  });
};

run();
