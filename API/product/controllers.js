
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

  
  exports.deleteProduct =  async(req, res)=>{
    const {productId} = req.params;
    //if products exist
    try{
      const foundProduct = await Product.findByPk(productId);
      if (foundProduct){
        await foundProduct.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Product Not Found."});
      }
    } catch (error){
      res.status(500).json({ message: error.message});
    }
    };
 
 exports.createProduct =  async(req, res) => {
  
   // const slug = slugify(req.body.name, {lower : true});
    try {const newProduct = await Product.create(req.body); 
     res.status(201).json(newProduct);
    }catch (error) {

    res.status(500).json({message: error.message});
    }  
 };
 
 exports.updateProduct = async(req, res) => {
    const { productId } = req.params;
    try {
      const foundProduct =  await Product.findByPk(productId);

    if (foundProduct) {

      await foundProduct.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
} catch (error){
  res.status(500).json({message: error.message});
}
 };