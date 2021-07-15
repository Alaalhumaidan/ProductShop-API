const bcrypt = require("bcrypt");
const {User} = require("../../db/models");
const jwt = require("jsonwebtoken");
exports.signup = async (req,res,next)=>{
    const {password} = req.body;
    const saltRounds = 10;    
    try{7
    //hash pwd 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    req.body.password= hashedPassword;
    const newUser = await User.create(req.body);
    res.status(201).json({message: "User Created Successfully"});
    } catch (error){
        next(error);
    };
}

exports.signin = async ( req, res, next)=> {
    const {user} = req;
    const payload = {
        id:user.id,
        username: user.username,
        exp: Date.now()+ 90000000
    };
    const token = jwt.sign(JSON.stringify(payload),"secret")
    res.json({token});
};