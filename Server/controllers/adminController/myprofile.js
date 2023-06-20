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

const myprofile=async()=>{
    let uid=req.user;
    return Admin.findOne({
        where:{id:uid},
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    }).then((data)=>{
        res.send(data);
    }).catch(err=>{
        console.log("The error occures is ",err);
        res.status(500).send("Internal Server Error");
    })
}
module.exports=myprofile;