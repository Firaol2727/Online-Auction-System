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

const register=async (req, res) => {
  let { firstName, lastName, email, password, phoneNumber, region, city } = req.body;

  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return Seller.create({
    id: "",
    fname: firstName,
    lname: lastName,
    password: hash,
    email: email,
    phonenumber: phoneNumber,
    city: city,
    region: region,
    account: 0,
  })
    .then(() => {
      res.status(200).send("registeration verified");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("some thing went wrong ");
    });
}
module.exports=register;