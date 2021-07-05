
const slugify = require("slugify");
const {Product} = require("../../db/models")

exports.productFetch = async(req, res) => {
  try {const products = await Product.findAll ({
    attributes: {exclude: ["createdAt", "updatedAt"]},
  });
    res.json(products);
} catch(error){
  res.status(500).json({message: error.message});
}
  };

  
  exports.deleteProduct =  (req, res)=>{
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
    }};

 exports.createProduct =  (req, res) => {
    const id = products.length +1;
    const slug = slugify(req.body.name, {lower : true});
    const newProduct = {
        id, 
        slug, 
        ...req.body,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
 };
 
 exports.updateProduct = (req, res) => {
    const { productId } = req.params;
    const foundProduct = products.find((product) => product.id === +productId);
    if (foundProduct) {
      for (const key in req.body) foundProduct[key] = req.body[key];
      foundProduct.slug = slugify(foundProduct.name, { lower: true });
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
};

