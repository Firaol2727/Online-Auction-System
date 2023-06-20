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
const changeProfile =async (req, res) => {
  let { fname, lname, telUname, email, region, city } = req.body;

  let uid = req.user;
  let = a = req.body;
  console.log("a", a);
  // console.log("fname",fname);
  // console.log("lname",lname);
  // res.sendStatus(200);
  return Buyer.update(
    {
      fname: fname,
      lname: lname,
      telUname: telUname,
      email: email,
      region: region,
      city: city,
    },
    {
      where: { cid: uid },
    }
  )
    .then((data) => {
      if (data) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
}
module.exports=changeProfile;