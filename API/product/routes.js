const express = require("express");
const {productFetch, 
       deleteProduct, 
       updateProduct,
       fetchProduct} = require("./controllers");
const multer = require("multer");
const router = express.Router();

router.param("productId", async(req, res, next, productId) => {
    const product = await fetchProduct(productId, next);
    if (product) {
        req.product=product;
        next();
    } else {
        const error = new Error("Product NOT Found.");
        error.status = 404;
        next(error);
    }
});

//multer cb is a callback function
const storage = multer.diskStorage({
    destination:"./images",
    filename:(req,file,cb)=>{
    cb(null,`${Date.now()}${file.originalname}`) //name should be unique using time  
    },
})

const upload = multer({storage})

// List Router
router.get("/", productFetch );
// Delete Route
router.delete("/:productId", deleteProduct);

// Update Route
router.put("/:productId", upload.single("image"), updateProduct);



module.exports = router;