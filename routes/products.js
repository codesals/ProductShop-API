const express = require("express");
const router = express.Router();
let products = require("../data");
const {
  productCreate,
  productList,
  productUpdate,
  productDelete,
} = require("../controllers/productController");

router.post("/", productCreate);

router.get("/", productList);

router.put("/:productID", productUpdate);

router.delete("/:productID", productDelete);

module.exports = router;
