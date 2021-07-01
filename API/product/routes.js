const express = require("express");

const {productFetch, deleteProduct, createProduct, updateProduct} = require("./controllers");
const router = express.Router();

router.get("/", productFetch );

router.delete("/:productId", deleteProduct);

router.post("/", createProduct);

router.put("/:productId", updateProduct);



module.exports = router;