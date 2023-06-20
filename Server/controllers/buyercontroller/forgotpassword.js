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
const forgotPassword =async (req, res) => {
  let email = req.body.email;
  let buyer = Buyer.findOne({ where: { email: email } });
  if (buyer) {
    let verificationcode = uid(5);
    userverification.push({
      email: email,
      verificationcode: verificationcode,
    });
    var mailOptions = {
      from: "nuchereta@gmail.com",
      to: email,
      subject: "User verification",
      text: `Your Verification code is  ${verificationcode}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } else {
    res.send("invalid email").status(400);
  }
}
module.exports=forgotPassword;