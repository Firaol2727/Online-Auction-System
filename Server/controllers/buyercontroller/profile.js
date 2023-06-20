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
const profile = (req, res) => {
  let uid = req.user;
  console.log("running get profile ");
  return Buyer.findOne({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    where: { id: uid },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
}
module.exports=profile;