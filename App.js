const express = require("express");
const cors = require("cors");
const productRoutes = require ("./API/product/routes");
const shopRoutes = require ("./API/shop/routes");
const userRoutes = require ("./API/user/routes");
const passport = require("passport");
const LocalStrategy = require("./middleware/passport")
const db = require("./db/models/index");
const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(LocalStrategy);
//=====Product Routes====//
app.use("/products", productRoutes);
app.use("/shops", shopRoutes);
app.use(userRoutes);
app.use("/images", express.static("images"));

//handeling errors 
app.use((err, req, res, next) => {
    res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error."});
});

app.use((req, res, next)=>{
    res.status(404).json({message: "Path Not Found."});
});

const run = async () => {
    try {
        await db.sequelize.sync({alter: true});
        console.log("Connection successful");
        app.listen(8000, () => {
        console.log("The application is running on localhost:8000");
    });
}catch(error){
        console.error(error);
    }
};
run();