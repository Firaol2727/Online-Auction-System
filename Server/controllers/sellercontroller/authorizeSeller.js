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

const authorizeSeller=async(req,res,next)=>{
    console.log(req.body);
    let {username,password}=req.body;
    console.log("username",username);
    console.log("password",password);

  return Seller.findOne({
    where: {
      phonenumber: username,
    },
    attributes: ["id", "password"],
  })
    .then(async (data) => {
      // console.log("the data is ",data.Aid,data.password);
      const find = {
        allow: false,
        uid: null,
      };
      if (data) {
        const hashed = data.password;
        const compared = await bcrypt.compare(password, hashed);
        if (compared) {
          find.uid = data.id;
          find.allow = true;
          return find;
        } else {
          return find;
        }
      } else {
        return find;
      }
    })
    .then(async (find) => {
      console.log("the find is ", find);
      if (find.allow) {
        const user = find.uid;
        const accessToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        // console.log("accessToken",accessToken);
        res.cookie("u",accessToken,{maxAge: 7200000,httpOnly:true,sameSite:"none",secure:true});
        next();
      } else {
        console.log(find);
        res.status(400).send("error username or password");
      }
    })
    .catch((err) => {
      console.log("The error occures is  " + err);
      res.sendStatus(500);
    });

};
const checkAuthorizationSeller = async (req, res, next) => {
  // console.log("cookies", req.cookies);
  // console.log("headers",req.headers)

  if (req.cookies.u) {
    console.log("in the first check");
    const token = req.cookies.u;
    if (token == null) {
      res.status(403).send("not logged in");
    }
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      console.log("verifing");
      if (err) {
        console.log("Token error is ", err);
        res.status(403).send("not logged in");
      } else {
        req.user = user;
        next();
      }
    });
  } else if (req.headers.cookies) {
    console.log("in the second check");
    let contentincookie = req.headers.cookies;
    const token = contentincookie.slice(0);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      console.log("the request user is ", user);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(403);
  }
};
module.exports={authorizeSeller,checkAuthorizationSeller}