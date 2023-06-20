const { sequelize } = require("../../models");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var nodemailer = require("nodemailer");
const { uid } = require("uid");
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
const register = async (req, res) => {
  let { firstName, lastName, phoneNumber, email, password } = req.body;
  console.log(req.body);
  // res.status(200).send("ok")
  //   res.send("data from the back end");
  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return Buyer.create({
    id: "",
    fname: firstName,
    lname: lastName,
    password: hash,
    email: email,
    phonenumber: phoneNumber,
    // type: "buyer",
  })
    .then(() => {
      res.send("registeration verified");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("Error username or password ");
    });
}
module.exports=register;