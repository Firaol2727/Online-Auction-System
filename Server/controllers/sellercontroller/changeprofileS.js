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

const changeProfile=async(req,res)=>{
  let {fname,lname,email,region,city,telUsername}=req.body;

  let uid=req.user;

  console.log("userid",uid);
  // res.sendStatus(200);
  if(email!=null&&fname!=null&&lname!=null&&city!=null&&region!=null){
return Seller.update({
      fname:fname,
      lname:lname,
      email:email,
      telUsername:telUsername,
      region:region,
      city:city
  },{
      where:{id:uid}
  })
  .then(data=>{
      if(data){
          res.sendStatus(200);
      }else{
          res.sendStatus(404);
      }
  })
  .catch((err)=>{
      console.log(err);
      res.sendStatus(500);
  })
  }
  

}
module.exports=changeProfile;