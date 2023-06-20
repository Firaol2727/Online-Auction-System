const {sequelize}=require('../../models');
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
const router=require('express').Router();
const multer =require('multer');
const upload=multer({storage:multer.memoryStorage()})
var cookieParser = require('cookie-parser');
const bodyParser=require('body-parser');
var jsonParser=bodyParser.json();
const{Admin,Auction,Banker,ReportedAuction,Buyer,Category,ClosedBid,Notification,Payment,Pictures,Product,Seller,Transaction}=sequelize.models;
router.use(jsonParser);

const authorize=async(req,res,next)=>{
    let {username,password}=req.body;
    console.log("The request body is ",req.body)
    console.log(username,password);
    return Admin.findOne(
        {
            where: {
            phone:username,
        },
        attributes:['id','password']
        }
    ).then(async(data)=>{
        // console.log("the data is ",data.Aid,data.password);
        const find={
            allow:false,
            uid:null
        }
        if (data) {
            const hashed=data.password;
            const compared=await bcrypt.compare(password,hashed);
            if(compared){
                find.uid=data.id;
                find.allow=true;
            }
        }
            return find;
    
    }).then(async (find)=>{
        console.log("the find is ",find);
    if(find.allow)
    {  
        const user=find.uid;
        const accessToken=await jwt.sign(user,
            process.env.ACCESS_TOKEN_SECRET);
        console.log("accessToken",accessToken);
        res.cookie("jwt",accessToken,{httpOnly:true});
        next();
    }
    else {
        console.log(find);
        res.status(403).send("error username or password");
    }
    })
    .catch((err)=>{
        console.log("The error occures is  " +err);
        res.sendStatus(500);
    })
}
const checkAuthorization =async(req,res,next)=>{
    console.log("The cookie is ",jwt)
    if(req.cookies.jwt){
        const token=req.cookies.jwt;
        if(token==null){
            res.status(403).send("not logged in")
        }
        jwt.verify(
            token,process.env.ACCESS_TOKEN_SECRET,
            (err,user)=>{
                if(err){
                    res.send(err).status(404);
                }
                req.user=user;
                next();
            }
        )
    }
}
module.exports={authorize,checkAuthorization};