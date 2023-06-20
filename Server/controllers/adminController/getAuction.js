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

const getAuction=async(req,res)=>{
    let aid=req.body.aid;
    console.log("aid",aid)
    let response={
        detail:"",
        pictures:""};
    console.log("running get auction ");
    return Auction.findOne({
        where: { id: aid },
    })
        .then(async(data) => {
        if(data){
            console.log("data",data)
            response.detail=data;
            let pic=await Pictures.findAll({where:{AuctionId:data.id}})
            console.log("pic",pic)
            response.pictures=pic;
            res.send(response);
        }else{
            res.status(400).send("No auction with this id")
        }
        })
    .catch((err) => {
    res.sendStatus(500);
    });
}
module.exports=getAuction;