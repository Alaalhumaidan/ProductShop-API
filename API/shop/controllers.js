const {Shop, Product} = require("../../db/models")

  // fetch one product by ID 
  exports.fetchShop = async (shopId, next) => {
    try {
      const shop = await Shop.findByPk(shopId);
      return shop;
    } catch (error) {
      next(error);
    }
  };
// fetching all the products 
  exports.shopFetch = async(req, res, next) => {
  try {
    const shops = await Shop.findAll ({
    attributes: {exclude: ["createdAt", "updatedAt"]},
    include:{
      model: Product,
      as: "products",
      attributes:  ["id"],
    },
  });
    res.json(shops);
} catch (error){
  next(error);
}
  };
 
 exports.createShop =  async(req, res, next) => {
    try {
      if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
      const newShop = await Shop.create(req.body); 
        res.status(201).json(newShop);
      } catch (error) {
        next(error);
          }
        };
  exports.createProduct =  async(req, res, next) => {
  
   // const slug = slugify(req.body.name, {lower : true});
    try {
      if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
      req.body.shopId = req.shop.id;
      const newProduct = await Product.create(req.body); 
      // response: 201 CREATED  
      res.status(201).json(newProduct);
      } catch (error) {
        next(error);
          }
        };
// to create one product 