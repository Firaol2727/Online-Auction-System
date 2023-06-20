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
const changepassword=async (req, res) => {
  let { pp, np, cp } = req.body;
  let uid = req.user;
  console.log(req.body);
  if (np == cp) {
    return Buyer.findOne({
      attributes: ["password"],
      where: { cid: uid },
    })
      .then(async (data) => {
        const check = await bcrypt.compare(pp, data.password);
        if (check) {
          console.log("true");
          const hash = await bcrypt.hashSync(np, bcrypt.genSaltSync(10));
          return Buyer.update(
            {
              password: hash,
            },
            {
              where: { id: uid },
            }
          ).then((data) => {
            console.log("succesful update");
            if (data) {
              res.status(200).send("ok");
            }
          });
        } else {
          console.log("false");
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(404);
      });
  }
}
module.exports=changepassword;