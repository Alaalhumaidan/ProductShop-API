const express = require("express");
let products = require("./products");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/products", (req, res)=>{
    res.json(products);
})
app.delete("/products/:productId", (req, res)=>{
    const {productId} = req.params;
   //if products exist
   const foundProduct = products.find(product => product.id === productId);
   if (foundProduct){
    products = products.filter((product) => product.id !== +productId);
    // console.log(products);
    res.status(204).end();
   } else {
     //else give 404 product not found  
     res.status(404).json({message: "Product Not Found."});
   }
    


});

app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
});