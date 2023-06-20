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
const codSent =async (req, res) => {
  let { email, verificationcode } = req.body;
  let verified = userverification.filter((user) => {
    user.useremail == useremail && user.verificationcode == verificationcode;
  });
  let newpassword = uid(6);
  const hash = await bcrypt.hashSync(newpassword, bcrypt.genSaltSync(10));
  let buyer = await Buyer.findOne({ where: { email: email } });
  if (buyer) {
    if (verified) {
      Buyer.update({
        password: hash,
      });
      //send the new password to the user via email and remind him to change it after login
      var mailOptions = {
        from: "nuchereta@gmail.com",
        to: email,
        subject: "Password Changed",
        text: `Your password has been updated to ${newpassword} please Login and change it to a password that you will not forget `,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  } else {
    res.send("Invalide user email");
  }
}
module.exports=codSent;