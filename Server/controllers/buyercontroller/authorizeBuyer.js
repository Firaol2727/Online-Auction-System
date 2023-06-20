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

const authorizeCustomer = async (req, res, next) => {
    let { phonenumber, password } = req.body;
    console.log(phonenumber, password);
    console.log(req.body);
    if (phonenumber == null || password == null) {
      return;
    }
    return Buyer.findOne({
      where: {
        phonenumber: phonenumber,
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
          const accessToken = await jwt.sign(
            user,
            process.env.REFRESH_TOKEN_SECRET
          );
          // console.log("accessToken",accessToken);
          res.cookie("u", accessToken, { httpOnly: true });
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
const checkAuthorizationCustomer = async (req, res, next) => {
if (req.cookies.u) {
    const token = req.cookies.u;
    if (token == null) {
    res.sendStatus(400);
    }
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
        res.sendStatus(403);
    }
    req.user = user;
    next();
    });
} else if (req.headers.cookies) {
    let contentincookie = req.headers.cookies;
    const token = contentincookie.slice(2);
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
        res.sendStatus(403);
    }
    req.user = user;
    next();
    });
} else {
    res.sendStatus(403);
}
};
module.exports={authorizeCustomer,checkAuthorizationCustomer};