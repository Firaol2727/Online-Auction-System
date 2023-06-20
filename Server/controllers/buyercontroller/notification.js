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
const notification = (req, res) => {
  let uid = req.user;
  return Notification.findAll({
    where: { uid: uid },
  }).then(async (data) => {
    res.send(data);
    await Notification.update(
      {
        read: true,
      },
      {
        where: {
          read: false,
          BuyerId: uid,
        },
      }
    );
  });
}
module.exports=notification;