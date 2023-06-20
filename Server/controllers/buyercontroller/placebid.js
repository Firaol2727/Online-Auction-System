const { sequelize } = require("../../models");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var nodemailer = require("nodemailer");
const { uid } = require("uid");
const { chapaVerify } = require(".././payment");
var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "Nucherata@gmail.com",
    pass: "nuchereta",
  },
});
const {
  ReportAuction,
  Auction,
  Banker,
  Bid,
  Buyer,
  Category,
  ClosedBid,
  Notification,
  Payment,
  Pictures,
  Product,
  Seller,
  Transaction,
} = sequelize.models;
const placeBid =async (req, res) => {
  /*
    id: 
    bidprice: 
    biddate:
    */
  let account;
  let name;
  let hammerprice;
  let paidresponse;
  let uid = "d09b7d05ee3ccb43";
   //req.user;
  console.log("The user id is ", uid);
  // let { bidprice, aid } = req.body;
  let bidprice=90000
  let aid="9b1e259afed2b3bf"
  try{

  let auction = await Auction.findOne({
    where: { id: aid,state:"open" },
    attributes: ["hammerprice", "name"],
  });
  if (auction !== null) {
    console.log("There is auction");
    name = auction.name;
    let now = Date();
    hammerprice = auction.hammerprice;
    console.log("hammerprice", hammerprice);
    console.log("bidprice", bidprice);
    if (bidprice > Number(hammerprice) + 100) {
      console.log("Valid price")
      paidresponse=await chapaVerify(uid);
      return Buyer.findOne({
        where: { id: uid },
        attributes: ["account"],
      })
      .then(async (data) => {
        console.log("Buyer account fetched ",data.account)
        let prevbid = await Bid.findOne({
          where: {
            BuyerId: uid,
            AuctionId: aid,
          },
        });
        
        if (prevbid !== null ) {
          console.log("There is previous bid");
          await Bid.update(
            {
              bidprice: bidprice,
              biddate: now,
            },
            { where: { id: prevbid.id } }
          );
          return true;
        } 
        else if (data.account >= 100 || paidresponse) {
          console.log("There is no previous bid  has paid onchap");
          account = data.account>0?Number(data.account ) - 100:0;
          await Transaction.create({
            id: "",
            amount: 100,
            date: now,
            AuctionId: aid,
            BuyerId: uid,
          });
          await Buyer.update(
            {
              account: account,
            },
            {
              where: { id: uid },
            }
          );
          await Bid.create({
            id: "",
            bidprice: bidprice,
            biddate: now,
            BuyerId: uid,
            AuctionId: aid,
          });
          return true;
        }
        else {
          return false;
        }
      })
      .then(async (has_bid) => {
        console.log("the bidder has made succesfull bid ",has_bid);
        if (has_bid) {
          await Auction.update(
            {
              hammerprice: bidprice,
            },
            { where: { id: aid } }
          );
          res.sendStatus(200);
        // Thing to be done after responding  
          if(paidresponse){
            await Notification.create({
              id: "",
              AuctionId: auction.id,
              BuyerId: uid,
              message: `Dear customer you have successfully charged your account`,
            });
          }
          let users = await Bid.findAll({
            where: { AuctionId: aid },
            attributes: ["BuyerId"],
          });
          console.log(users);
          users.map(async (user) => {
            console.log("the bidder is ", user);
            if (user.BuyerId !== uid) {
              await Notification.create({
                id: "",
                AuctionId: aid,
                BuyerId: user.BuyerId,
                message: `The auction ${name} you are participating has got an offer of ${bidprice}`,
                nottype: "bidupdate",
              });
            }
          });
          await Notification.create({
            id: "",
            AuctionId: aid,
            selid: auction.SellerId,
            message: `The auction ${name} you are participating has got an offer of ${bidprice}`,
            nottype: "bidupdate",
          });
        } else {
          console.log("There is no sufficient balance");
          res.status(402).send("balance_insufficient")
        }
      })
      .catch((err) => {
        console.log("The error is ", err);
        res.status(500).send("Internal server error");
      });
    } else {
      res.sendStatus(404).send("Invalid bidding price");
    }
  }else{
    res.sendStatus(404).send("Auction not found");
  }
}catch(err){
  console.log(err);
  res.status(500).send("Internal server error ")

}
}
module.exports=placeBid;