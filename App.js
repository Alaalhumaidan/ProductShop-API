const express = require("express");
let products = require("./products");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const slugify = require("slugify");

const App = express();

app.use(cors());
app.use(bodyParser.json());
// {
//     "name": "Bridal Set",
//     "description": "Set for brides"
// }
app.get("/products", (req, res) => {
    res.json(products);
  });

app.put("/products/:productId", (req, res) => {
    const { productId } = req.params;
    const foundProduct = products.find((product) => product.id === +productId);
    if (foundProduct) {
      for (const key in req.body) foundProduct[key] = req.body[key];
      foundProduct.slug = slugify(foundProduct.name, { lower: true });
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });
  
  

app.delete("/products/:productId", (req, res)=>{
   const {productId} = req.params;
   //if products exist
   const foundProduct = products.find(product => product.id === +productId);
   if (foundProduct){
   for(const key in req.body) foundProduct[key] = req.body[key];
       foundProduct.slug = slugify(foundProduct.name, {lower: true });
    products = products.filter((product) => product.id !== +productId);
    // console.log(products);
    res.status(204).end();
   } else {
     //else give 404 product not found  
     res.status(404).json({message: "Product Not Found."});
   }
    
});
app.post("/products", (req, res) => {
   const id = products.length + 1;
   const slug = slugify(req.body.name, {lower : true});
   const newProduct = {
       id, 
       slug, 
       ...req.body,
   };
   products.push(newProduct);
   res.status(201).json(newProduct);
});
app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
});