const { sequelize } = require("../models");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var nodemailer = require("nodemailer");

const { uid } = require("uid");
const { chapaVerify, paychapa } = require("../controllers/payment");
var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "nuchereta27@gmail.com",
    pass: "vwckzzzmmmvobjpz",
  },
});
let userverification = [];
function ClearVerificationCodes() {
  setInterval(() => {
    userverification = [];
  }, 3000000);
}
const {
  authorizeCustomer,
  checkAuthorizationCustomer,
} = require("../controllers/buyercontroller/authorizeBuyer");
const changepassword = require("../controllers/buyercontroller/changepassword");
const changeProfile = require("../controllers/buyercontroller/changeprofile");
const codSent = require("../controllers/buyercontroller/codesend");
const forgotPassword = require("../controllers/buyercontroller/forgotpassword");
const notification = require("../controllers/buyercontroller/notification");
const placeBid = require("../controllers/buyercontroller/placebid");
const profile = require("../controllers/buyercontroller/profile");
const register = require("../controllers/buyercontroller/register");
const report = require("../controllers/buyercontroller/report");
const { Op } = require("sequelize");
const {
  Passcode,
  ReportedAuction,
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
// const authorizeCustomer = async (req, res, next) => {
//   let { phonenumber, password } = req.body;
//   console.log(phonenumber, password);
//   console.log(req.body);
//   if (phonenumber == null || password == null) {
//     return;
//   }
//   return Buyer.findOne({
//     where: {
//       phonenumber: phonenumber,
//     },
//     attributes: ["id", "password"],
//   })
//     .then(async (data) => {
//       // console.log("the data is ",data.Aid,data.password);
//       const find = {
//         allow: false,
//         uid: null,
//       };
//       if (data) {
//         const hashed = data.password;
//         const compared = await bcrypt.compare(password, hashed);
//         if (compared) {
//           find.uid = data.id;
//           find.allow = true;
//           return find;
//         } else {
//           return find;
//         }
//       } else {
//         return find;
//       }
//     })
//     .then(async (find) => {
//       console.log("the find is ", find);
//       if (find.allow) {
//         const user = find.uid;
//         const accessToken = await jwt.sign(
//           user,
//           process.env.REFRESH_TOKEN_SECRET
//         );
//         // console.log("accessToken",accessToken);
//         res.cookie("u", accessToken, { httpOnly: true });
//         next();
//       } else {
//         console.log(find);
//         res.status(400).send("error username or password");
//       }
//     })
//     .catch((err) => {
//       console.log("The error occures is  " + err);
//       res.sendStatus(500);
//     });
// };
// const checkAuthorizationCustomer = async (req, res, next) => {
//   if (req.cookies.u) {
//     const token = req.cookies.u;
//     if (token == null) {
//       res.sendStatus(400);
//     }
//     jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//       if (err) {
//         res.sendStatus(403);
//       }
//       req.user = user;
//       next();
//     });
//   } else if (req.headers.cookies) {
//     let contentincookie = req.headers.cookies;
//     const token = contentincookie.slice(2);
//     jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//       if (err) {
//         res.sendStatus(403);
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(403);
//   }
// };
router.use(jsonParser);
router.post("/register", async (req, res) => {
  let { firstName, lastName, phoneNumber, email, password } = req.body;
  console.log(req.body);

  let buyer=await Buyer.findOne({
    where:{
     [Op.or]:
         [ { phonenumber: phoneNumber } ,{email: email } 
         ]
}});
  let seller=await Seller.findOne({
    where:{
     [Op.or]:
         [ { phonenumber: phoneNumber } ,{email: email } 
         ]
}});
  if(buyer || seller){
    console.log("Ther is a user");
    res.status(400).send("Their is a defined user previously")
  }
  else{
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
      .then(async (data) => {
        const user = data.id;
        console.log(data);
        const accessToken = await jwt.sign(
          user,
          process.env.REFRESH_TOKEN_SECRET
        );
        // console.log("accessToken",accessToken);
        res
          .cookie("u", accessToken, { httpOnly: true })
          .send("registeration verified");
      })
      .catch((err) => {
        console.log(err);

        res.status(500).send("It looks like you have already an account");
      });
  }
  // res.status(200).send("ok")
  //   res.send("data from the back end");
  
});
router.post("/changeprofile", checkAuthorizationCustomer, async (req, res) => {
  let { fname, lname, phonenumber, email, region, city } = req.body;

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
      phonenumber: phonenumber,
      email: email,
      region: region,
      city: city,
    },
    {
      where: { id: uid },
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
});
router.post("/changepassword", checkAuthorizationCustomer, async (req, res) => {
  let { pp, np, cp } = req.body;
  let uid = req.user;
  console.log(req.body);
  if (np == cp) {
    return Buyer.findOne({
      attributes: ["password"],
      where: { id: uid },
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
});

router.post("/placebid", checkAuthorizationCustomer, async (req, res) => {
  let account;
  let name;
  let hammerprice;
  let paidresponse;
  let uid = req.user;
  // "d09b7d05ee3ccb43";
  //req.user;
  console.log("The user id is ", uid);
  let { bidprice, aid } = req.body;
  // let bidprice=90000
  // let aid="9b1e259afed2b3bf"
  try {
    let auction = await Auction.findOne({
      where: { id: aid, state: "open" },
    });
    if (auction !== null) {
      console.log("There is auction");
      name = auction.name;
      let now = Date();
      hammerprice = auction.hammerprice;
      console.log("hammerprice", hammerprice);
      console.log("bidprice", bidprice);
      if (bidprice > Number(hammerprice) + 100) {
        console.log("Valid price");
        paidresponse = await chapaVerify(uid);
        return Buyer.findOne({
          where: { id: uid },
        })
          .then(async (data) => {
            console.log("Account", data);
            let prevbid = await Bid.findOne({
              where: {
                BuyerId: uid,
                AuctionId: aid,
              },
            });

            if (prevbid !== null) {
              console.log("There is previous bid");
              await Bid.update(
                {
                  bidprice: bidprice,
                  biddate: now,
                },
                { where: { id: prevbid.id } }
              );
              return true;
            } else if (Number(data.account) >= 100 || paidresponse) {
              console.log("There is no previous bid  has paid onchap");
              account = data.account > 0 ? Number(data.account) - 100 : 0;
              await Transaction.create({
                id: "",
                amount: 100,
                date: now,
                AuctionId: aid,
                BuyerId: uid,
              });
              await Buyer.update(
                {
                  account: account,
                },
                {
                  where: { id: uid },
                }
              );
              await Bid.create({
                id: "",
                bidprice: bidprice,
                biddate: now,
                BuyerId: uid,
                AuctionId: aid,
              });
              return true;
            } else {
              return false;
            }
          })
          .then(async (has_bid) => {
            console.log("the bidder has made succesfull bid ", has_bid);
            if (has_bid) {
              await Auction.update(
                {
                  hammerprice: bidprice,
                },
                { where: { id: aid } }
              );
              res.status(200).send("success");
              // Thing to be done after responding
              if (paidresponse) {
                await Notification.create({
                  id: "",
                  AuctionId: auction.id,
                  uid: uid,
                  nottype: "accountupdate",
                  message: `Dear customer you have successfully charged your account`,
                });
              }
              let users = await Bid.findAll({
                where: { AuctionId: aid },
                attributes: ["BuyerId"],
              });
              console.log(users);
              users.map(async (user) => {
                console.log("the bidder is ", user);
                if (user.BuyerId !== uid) {
                  await Notification.create({
                    id: "",
                    AuctionId: aid,
                    uid: user.BuyerId,
                    message: `The auction ${name} you are participating has got an offer of ${bidprice}`,
                    nottype: "bidupdate",
                  });
                }
              });
              console.log("The auctioner id is ", auction.SellerId);
              await Notification.create({
                id: "",
                AuctionId: aid,
                uid: auction.SellerId,
                message: `Your auction ${name} has got an offer of ${bidprice}`,
                nottype: "bidupdate",
              });
            } else {
              console.log("There is no sufficient balance");
              paychapa(aid, req, res);
              // res.status(402).send("balance_insufficient")
            }
          })
          .catch((err) => {
            console.log("The error is ", err);
            res.status(500).send("Internal server error");
          });
      } else {
        res.status(404).send("Invalid bidding price");
      }
    } else {
      res.status(404).send("Auction not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error ");
  }
});

router.post("/login", authorizeCustomer, (req, res) => {
  res.sendStatus(200);
});
router.get("/profile", checkAuthorizationCustomer, (req, res) => {
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
});
router.post("/report", (req, res) => {
  let aid = req.body.aid;
  let type = req.body.type;

  console.log(req.body);
  console.log(aid);
  return ReportedAuction.create({
    id: "",
    AuctionId: aid,

    type: type,
  })
    .then((data) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(200);
    });
});
router.get("/notification", checkAuthorizationCustomer, (req, res) => {
  console.log("fetching notification");
  let page = req.query.page == null ? 1 : req.query.page;
  console.log("The page is ", page);
  // let type=req.query.subname==null?"electronics":req.query.subname;
  let no_response = 10;
  let limit = 1;
  let jumpingSet = (page - 1) * no_response;
  let uid = req.user;

  return Notification.findAll({
    where: { uid: uid },
    order: [["createdAt", "DESC"]],
    offset: jumpingSet,
    limit: no_response,
  })
    .then(async (data) => {
      // console.log("data",data)
      res.send(data);
      await Notification.update(
        {
          read: true,
        },
        {
          where: {
            read: false,
            uid: uid,
          },
        }
      );
    })
    .catch((err) => {
      console.log("Error fetching", err);
      res.sendStatus(500);
    });
});
router.get("/newnotification", checkAuthorizationCustomer, async (req, res) => {
  console.log("fetching notification");
  let uid = req.user;
  return Notification.findAndCountAll({
    where: { uid: uid, read: false },
  })
    .then(async (data) => {
      if (data) {
        console.log(data);
        let nopage = parseInt(data.count);
        res.send({ nopage: nopage });
      } else {
        res.send(0);
      }
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});
router.post("/forgotpassword", async (req, res) => {
  let email = req.body.email;
  let buyer = Buyer.findOne({ where: { email: email } });
  if (buyer) {
    try {
      let verificationcode = uid(5);
      userverification.push({
        email: email,
        verificationcode: verificationcode,
      });
      var mailOptions = {
        from: "nuchereta27@gmail.com",
        to: email,
        subject: "User verification",
        text: `Your Verification code is  ${verificationcode}`,
      };
      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          console.log(error);
          res.status(500).send("Error in sending email verification");
        } else {
          Passcode.create({
            id: "",
            email: email,
            code: verificationcode,
          });
          console.log("Email sent: " + info.response);
          res.status(200).send("Verification has been sent to your Email");
        }
      });
    } catch (err) {
      console.log("Email sending error");
    }
  } else {
    res.status(400).send("invalid email");
  }
});

// router.get('/send-code/:email', (req, res) => {
//   const { email } = req.params;
//   const verificationCode = generateVerificationCode();
//   // Create a Nodemailer transport
//   // Send the verification code to the user's email
//   transporter.sendMail({
//     from: 'Nucherata@gmail.com',
//     to: email,
//     subject: 'Verification Code',
//     text: `Your verification code is ${verificationCode}. It will expire in 4 minutes.`
//   }, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send('Error sending verification code');
//     } else {
//       console.log('Verification code sent:', info.response);
//       res.status(200).send({ code: verificationCode });
//     }
//   });
// });

router.post("/verifycode", async (req, res) => {
  let { email, verificationcode } = req.body;
  return Passcode.findOne({
    email: email,
    code: verificationcode,
  }).then(async (data) => {
    if (data) {
      console.log("Ther is a sent code ");
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
    } else {
      res.status(400).send("Invalide Verification code");
    }
  });
});
module.exports = router;
