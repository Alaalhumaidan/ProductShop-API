const express = require("express");
const multer = require("multer");
const {shopFetch, createShop, createProduct, fetchShop} = require("./controllers");
const router = express.Router();

//multer
const storage = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}${file.originalname}`);
    },
});
const upload = multer ({storage});

// by id
router.param("shopId", async(req, res, next, shopId) => {
    const shop = await fetchShop(shopId, next);
    if (shop) {
        req.shop=shop;
        next();
    } else {
        const error = new Error("Shop NOT Found.");
        error.status = 404;
        next(error);
    }
});
//List Route
router.get("/", shopFetch );

router.post("/", upload.single("image"), createShop);
// POST localhost8000/shops/:shopId/products

//Create Route
router.post("/:shopId/products", upload.single("image"), createProduct);

module.exports = router;