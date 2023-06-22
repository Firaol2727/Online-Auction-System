require("dotenv");
const { sequelize } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

const authorizecheck = async (req, res) => {
  let { username, password } = req.body;
  console.log(req.body);
  let find = {
    allow: false,
    uid: null,
    userType: null,
  };
  let temporayType = "";
  let responseBuyer = "";
  let responseSeller = "";

  console.log("username", username);
  console.log("password", password);

  const buyer = await Buyer.findOne({ where: { phonenumber: username } });
  const seller = await Seller.findOne({ where: { phonenumber: username } });

  if (buyer) {
    const hashed = buyer.password;
    const compared = await bcrypt.compare(password, hashed);
    if (compared) {
      console.log("correct password");
      find.uid = buyer.id;
      find.allow = true;
      find.userType = "buyer";
      const user = find.uid;
      const accessToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      console.log("accessToken", accessToken);
      res.cookie("u", accessToken, {
        maxAge: 720000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      // res.cookie("ab","refreshed token",{httpOnly:true,sameSite:"none",secure:"false"});
      res.status(200).send("BUYER");
    } else {
      responseBuyer = "error";
      console.log("error in buyer pass");
      res.status(400).send("error in password ");
    }
  } else if (seller) {
    const hashed = seller.password;
    const compared = await bcrypt.compare(password, hashed);
    if (compared) {
      console.log("correct password");
      find.uid = seller.id;
      find.allow = true;
      find.userType = "seller";
      const user = find.uid;
      const accessToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      console.log("accessToken", accessToken);

      res.cookie("u", accessToken, {
        maxAge: 720000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      // res.cookie("ab","refreshed token",{httpOnly:true,sameSite:"none",secure:"false"});
      res.status(200).send("SELLER");
    } else {
      console.log("error in buyer pass");
      res.status(400).send("error in password ");
    }
  } else {
    res.status(400).send("error in password or username");
  }
};
module.exports = authorizecheck;
