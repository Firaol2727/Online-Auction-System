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

const changePassword=async(req,res)=>{
  let {pp, np,cp}=req.body;
  console.log(req.body);
  let uid=req.user;
      return Seller.findOne({
          attributes:[
              "password"
          ],
          where:{id:uid}
      })
      .then(async (data)=>{
          const check=await bcrypt.compare(pp,data.password);
          if(check){  
              console.log("true")
              const hash = await bcrypt.hashSync(np, bcrypt.genSaltSync(10));
              return Seller.update({
                  password:hash
              },{
                  where:{id:uid}
              }).then((data)=>{
                  console.log("succesful update")
                  if(data){
                      res.status(200).send("ok");
                  }
              })
          }else{
              console.log("false")
              res.sendStatus(500);
          }
      })
      .catch((err)=>{
          console.log(err);
          res.status(404);
      })
  
}
module.exports=changePassword;