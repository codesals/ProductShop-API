let products = require("../data");
const slugify = require("slugify");

const { Product } = require("../db/models");
// const { response } = require("express"); //appeared automatically

exports.fetchProduct = async (productID, next) => {
  try {
    const product = await Product.findByPk(productID);
    return product;
  } catch (error) {
    next(error);
  }
};

//db List
exports.productList = async (_, response) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    console.log("products", products);
    response.json(products);
  } catch (error) {
    next(error);
  }
};

//db Create
exports.productCreate = async (request, response, next) => {
  try {
    const newProduct = await Product.create(request.body);
    response.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

//db Update
//yet to make it work with fetchProduct
//check try/catch logic
exports.productUpdate = async (request, response, next) => {
  const { productID } = request.params;
  try {
    const foundProduct = await Product.findByPk(productID);
    if (foundProduct) {
      await foundProduct.update(request.body);
      response.status(204).end();
    } else response.status(404).json({ message: "Product not found!" });
  } catch (error) {
    next(error);
  }
};

//db Delete
exports.productDelete = async (request, response) => {
  const { productID } = request.params;
  try {
    const foundProduct = await Product.findByPk(productID);
    if (foundProduct) {
      await foundProduct.destroy();
      response.status(204).end();
    } else response.status(404).json({ message: "Product not found!" });
  } catch (error) {
    next(error);
  }
};

//data.js List
// exports.productList = (_, response) => response.json(products);

// data.js Create
// exports.productCreate = (request, response) => {
//   const id = products[products.length - 1].id + 1;
//   const slug = slugify(request.body.name, { lower: true });
//   const newProduct = { id, slug, ...request.body };
//   products.push(newProduct);
//   response.status(201).json(newProduct);
// };

// data.js Update
// exports.productUpdate = (request, response) => {
//   const { productID } = request.params;
//   const foundProduct = products.find((product) => product.id === +productID);
//   if (foundProduct) {
//     for (const key in request.body) foundProduct[key] = request.body[key];
//     response.status(204).end();
//   } else response.status(404).json({ message: "Product not found!" });
// };

//data.js Delete

// exports.productDelete = (request, response) => {
//   const { productID } = request.params; // same as const productID  = request.params.productID;
//   const foundProduct = products.find((product) => product.id === +productID);
//   if (foundProduct) {
//     products = products.filter((product) => product.id !== +foundProduct.id);
//     response.status(204).end();
//   } else response.status(404).json({ message: "Product not found!" });
//   // response.json(products);
// };
