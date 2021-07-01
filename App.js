const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const productRoutes = require ("./API/product/routes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/product", productRoutes);
app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
});