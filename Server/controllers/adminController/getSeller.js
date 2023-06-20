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

const getSeller=async(req,res)=>{
    let sid=req.body.sid;
    console.log("The input id is ",sid);
    return Seller.findOne({
        where:{id:sid},
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    })
    .then(async(data)=>{
        if(data){
            let auctioner=await Auction.findAndCountAll({
                where:{SellerId:sid},
                attributes:["id"]
            });
            let response={data:"",count:""};
            console.log("Auctioner",auctioner)
            response.count=auctioner.count;
            response.data=data;
            res.send(response)
        }else{
            console.log("No data")
            res.status(400).send("No seller with this id")
        }
    })
    .catch(err=>{
        console.log("The error is ",err);
        res.sendStatus(500)
    })
}
module.exports=getSeller;