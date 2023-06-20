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

const deleteAuction=async (req,res)=>{
    let aid = req.body.aid;
    try {
      let bidders = await Bid.findAll({
        where: { AuctionId: aid },
      });
      if (bidders) {
        bidders.map(async (bidder) => {
          let prevbidprice = Number(bidder.bidprice);
          await Bid.update({
            bidprice: prevbidprice + 100,
            where: {
              id: bidder.id,
            },
          });
          await Notification.create({
            id: "",
            AuctionId: aid,
            BuyerId: bidder.BuyerId,
            message: `The auction you were  participating on has been deleted by the 
                auctioner, your account has been recharged by ${bidder.bidprice}`,
          });
        });
        await Auction.destroy({
            where: {
            id: aid,
        },
        });
        res.sendStatus(200);
      } else {
        await Auction.destroy({ where: { id: aid } });
        res.sendStatus(200);
      }
    } catch (error) {
      console.log("The error was ", err);
      res.sendStatus(500);
    }
}
module.exports=deleteAuction;