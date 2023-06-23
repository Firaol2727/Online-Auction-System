require("dotenv").config();
const axios = require("axios");
const fetch = require("node-fetch");
const { uid } = require("uid");
const { sequelize } = require("../models");
const { verify } = require("jsonwebtoken");
const { Buyer, Payment, Seller, Order, Notifyme } = sequelize.models;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
};
const paychapa = async (aid, req, res) => {
  const bid = req.user;
  let user = await Buyer.findOne({
    where: {
      id: bid,
    },
  });
  if (user) {
    console.log("User found");
    var myHeaders = new fetch.Headers();
    myHeaders.append(
      "Authorization",
      "Bearer CHASECK_TEST-ulpl5C8atPD1UqnYqrKifXF6D4qUgZli"
    );
    myHeaders.append("Content-Type", "application/json");
    let a = uid(10);
    a = "CHASECK_TEST-" + a;
    var raw = JSON.stringify({
      amount: "100",
      currency: "ETB",
      email: user.email,
      phone_number: "0966003807",
      tx_ref: a,
      callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
      return_url: `http://localhost:5173/detail/${aid}`,
      "customization[title]": "Payment for the auction",
      "customization[description]":
        "I want to participate on Nuchereta Auctions",
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log("waiting for paychapa reponse");
    fetch("https://api.chapa.co/v1/transaction/initialize", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result);
        console.log("result", result);
        console.log("success", result.message);
        console.log("checklut", result.data);
        if (result.status == "success") {
          Order.create({
            id: "",
            textref: a,
            userid: user.id,
            email: user.email,
            phone: user.phonenumber,
          });
          console.log("It was successfull");
          res.status(202).send(result.data.checkout_url);
        } else {
          res.status(400).send("The payment has failed");
        }
      })
      .catch((error) => {
        console.log("error", error);
        res.status(500).send("Internal server error ");
      });
  } else {
    console.log("user not found");
    res.status(400).send("User not found ");
  }
};
const verifyOrders = async (order) => {
  let verify_success = false;
  try {
    if (!order.textref) {
      console.log("No text ref");
      return verify_success;
      // return res.status(400).json({ error: "That order isn't paid yet" });
    }
    const tx_ref = order.textref;
    console.log("textreff", tx_ref);
    return axios
      .get(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, { headers })
      .then(async (data) => {
        const verifySession = data.data;
        console.log("Chapa response is ", verifySession);
        if (verifySession.status === "success") {
          await Order.update(
            {
              verified: true,
            },
            {
              where: { id: order.id },
            }
          );
          let buyer = await Buyer.findOne({
            where: { id: order.userid },
          });
          let paidamount =
            verifySession.data.amount == null ? 0 : verifySession.data.amount;
          let prev_amount = Number(buyer.account);
          console.log("The prev account", prev_amount);
          console.log("The paid amount", paidamount);
          let newamount = prev_amount + paidamount;
          console.log("THe new amount is ", newamount);
          await Buyer.update(
            {
              account: newamount,
            },
            {
              where: { id: order.userid },
            }
          );
          let payingdate = verifySession.created_at;
          await Payment.create({
            id: "",
            bankerId: "chapa_id",
            BuyerId: order.userid,
            paymentid: order.textref,
            paymentreference: verifySession.data.reference,
            date: payingdate,
          });
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log("error", err);
        verify_success = false;
        return verify_success;
      });
  } catch (error) {
    console.log("Error occured ", error);
    verify_success = false;
    return verify_success;
  }
};
const chapaVerify = async (userid) => {
  let haspaid = false;
  let unverifiedorders = await Order.findOne({
    where: {
      userid: userid,
      verified: false,
    },
  });

  console.log("There are unverified orders", unverifiedorders);
  if (unverifiedorders) {
    let result = await verifyOrders(unverifiedorders);
    console.log("The result from verifing orders is ", result);
    if (result == true) {
      haspaid = true;
    }
  }
  console.log("The value of haspaid is ", haspaid);
  return haspaid;
};

const ServerCheckChapa = async () => {
  let unverifiedorders = await Order.findAll({
    where: { verified: false },
  });
  let result = await verifyOrders(uvorder);
};
module.exports = { paychapa, chapaVerify, verifyOrders };
