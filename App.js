const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require ("./API/product/routes");

const db = require("./db/models/index");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/product", productRoutes);
const run = async () => {
    try {
        await db.sequelize.sync({force: true});
        console.log("Connection successful");
        app.listen(8000, () => {
        console.log("The application is running on localhost:8000");
    });
}catch(error){
        console.error(error);
    }
};
run();