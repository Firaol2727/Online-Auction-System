require("dotenv");
const { sequelize } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const fs = require("fs");
var bodyParser = require("body-parser");
const cors = require("cors");
const { uid } = require("uid");
const date = new Date();
const {
  Admin,
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
var cookieParser = require("cookie-parser");
let filname;
const multer = require("multer");
const path = require("path");
var jsonParser = bodyParser.json();
const { urlencoded } = require("express");
// const Deletefiles = require('../deletefile');

const deleteAuction= async (req, res) => {
  let aid = req.body.aid;
  
  try {
    await Auction.destroy({
      where: {
        id: aid,
      },
    });
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

      res.sendStatus(200);
    } else {
      await Auction.destroy({ where: { id: aid } });
      res.sendStatus(200);
    }
  } catch (error) {
    console.log("The error was ", err);
    res.sendStatus(500);
  }
};
module.exports=deleteAuction;