const express = require("express");
const router = express.Router();
let products = require("../data");
const {
  productCreate,
  productList,
  productUpdate,
  productDelete,
} = require("../controllers/productController");

router.get("/", productList);

router.use((_, __, next) => {
  console.log("I'm another middleware method");
  next();
});

router.post("/", productCreate);

router.put("/:productID", productUpdate);

router.delete("/:productID", productDelete);

module.exports = router;
