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

const closedbid=(req,res)=>{
    let limit = 1;
    let no_response = 20;
    console.log("The page is ",req.query.page);
    let page = req.query.page == null ? 1 : req.query.page;
    let jumpingSet = (page - 1) * no_response;
    console.log("Fetching the closed bid")
    return ClosedBid.findAndCountAll({
        order: [["createdAt", "DESC"]], 
        offset: jumpingSet,
        limit: no_response,
    })
    .then((data) => {
        let nopage = parseInt(data.count / no_response) + 1;
        // console.log(data.rows);
        let response = {
        count: nopage,
        data: data.rows,
        };
        if (response) {
        console.log(response);
        res.send(response);
        } else {
        res.sendStatus(404);
        }
    })
    .catch((err)=>{
        console.log("The closed bid fetching error is  ",err);
        res.sendStatus(500)
    }) 
}
module.exports=closedbid;