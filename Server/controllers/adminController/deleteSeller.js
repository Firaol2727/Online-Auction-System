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

const deleteSeller=async(req,res)=>{
    let sid=req.body.sid;
    try {
        await Seller.destroy({
            where:{id:sid}
        })
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log("The error occuted is ",error)
    }
}
module.exports=deleteSeller;