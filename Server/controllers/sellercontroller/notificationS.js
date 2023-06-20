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

const notification=async(req,res)=>{
  console.log("fetching notification")
  let uid=req.user;
  return Notification.findAll({
      where:{uid:uid}
  }).then( async data=>{
      res.send(data);
      await Notification.update({
          read:true
      },{
          where:{
              read:false,
              selid:uid
          }
      })
  }).catch(err=>{
      res.sendStatus(500)
  })

}
module.exports=notification;