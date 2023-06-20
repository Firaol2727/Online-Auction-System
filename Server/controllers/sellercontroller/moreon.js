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

const moreOn=async (req,res)=>{
  let uid=req.user;
  let aid=req.params.id;
  let response={
    detail:"",
    pictures:""};
  console.log("running get profile ");
  return Auction.findOne({
    include: [
      {
        model: Pictures,
      },
    ],
    where: { id: aid,SellerId:uid },
  })
    .then(async(data) => {
      if(data){
        response.detail=data;
      }
      let pic=await Pictures.findAll({where:{AuctionId:data.id}})
      response.pictures=pic;
      res.send(response);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
}
module.exports=moreOn;