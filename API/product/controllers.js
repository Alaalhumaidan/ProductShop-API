
const slugify = require("slugify");
const {Product, Shop} = require("../../db/models");


  // fetch one product by ID 
  exports.fetchProduct = async (productId, next) => {
    try {
      const product = await Product.findByPk(productId);
      return product;
    } catch (error) {
      next(error);
    }
  };

// fetching all the products 
exports.productFetch = async(req, res, next) => {
  try {const products = await Product.findAll ({
    attributes: {exclude: ["createdAt", "updatedAt"]},
    include: {
      model: Shop,
      as: "shop",
      attributes: ["name"],
    }
  });
    res.json(products);
} catch(error){
 next(error);
}
  };

  exports.deleteProduct =  async(req, res, next)=>{
    //if products exist
      try{
        await req.product.destroy();
        res.status(204).end();
      } catch (error) {
        next(error);
          }
    };
 
 exports.createProduct =  async(req, res, next) => {
  
   // const slug = slugify(req.body.name, {lower : true});
    try {
      if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
      const newProduct = await Product.create(req.body); 
        res.status(201).json(newProduct);
      } catch (error) {
        next(error);
          }
        };
 exports.updateProduct = async(req, res, next) => {
    // const { productId } = req.params;
    try{
      if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
      const updatedProduct = await req.product.update(req.body);
      res.json(updatedProduct);
    } catch (error) {
      next(error);
        }
 };