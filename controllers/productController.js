let products = require("../data");
const slugify = require("slugify");

const { Product } = require("../db/models");
// const { response } = require("express"); //appeared automatically

//old list
// exports.productList = (_, response) => response.json(products);

//db List
exports.productList = async (_, response) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    console.log("products", products);
    response.json(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

exports.productCreate = (request, response) => {
  const id = products[products.length - 1].id + 1;
  const slug = slugify(request.body.name, { lower: true });
  const newProduct = { id, slug, ...request.body };
  products.push(newProduct);
  response.status(201).json(newProduct);
};

exports.productUpdate = (request, response) => {
  const { productID } = request.params;
  const foundProduct = products.find((product) => product.id === +productID);
  if (foundProduct) {
    for (const key in request.body) foundProduct[key] = request.body[key];
    response.status(204).end();
  } else response.status(404).json({ message: "Product not found!" });
};

exports.productDelete = (request, response) => {
  const { productID } = request.params; // same as const productID  = request.params.productID;
  const foundProduct = products.find((product) => product.id === +productID);
  if (foundProduct) {
    products = products.filter((product) => product.id !== +foundProduct.id);
    response.status(204).end();
  } else response.status(404).json({ message: "Product not found!" });
  // response.json(products);
};
