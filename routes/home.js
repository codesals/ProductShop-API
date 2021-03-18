const express = require("express");
const router = express.Router();

router.get("/", (_, response) => {
  response.json({
    message:
      "This is the homepage running on localhost:8000. Go to localhost:8000/products to view product data.",
  });
});

module.exports = router;
