require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const app = express();
const bcrypt = require("bcrypt");
var cookieParser = require("cookie-parser");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const auth = require("./routes/auth");

const pay = require("./controllers/payment");
const cookie = require("cookie");
const fetch = require("node-fetch");

const adminRoutes = require("./routes/adminRoutes");
const buyerRoute = require("./routes/buyerRoute");
const sellerRoute = require("./routes/sellerRoute");
const authorizecheck = require("./controllers/authentication/auth");

const {
  Passcode,
  Admin,
  Auction,
  Banker,
  Bid,
  Order,
  Buyer,
  Category,
  ClosedBid,
  Notification,
  Payment,
  Pictures,
  Product,
  Seller,
  Transaction,
  Notifyme,
} = sequelize.models;

const { paychapa, chapaVerify } = require("./controllers/payment");
const http = require("http").Server(app);
// const { Server, Socket } = require("socket.io");
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],

    credentials: true,
  },
});
const { Op } = require("sequelize");
var nodemailer = require("nodemailer");
const { uid } = require("uid");
const { authorize } = require("./controllers/adminController/authorizeAdmin");
var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "nuchereta27@gmail.com",
    pass: "vwckzzzmmmvobjpz",
  },
});

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],

    credentials: true,
  })
);
// app.use(express.json());
app.use(cookieParser());
app.use("/custom", buyerRoute);
app.use("/special", adminRoutes);
app.use("/sel", sellerRoute);

async function CreateDatabase() {
  // creating database structures
  await sequelize.sync({ force: true });
  console.log("finished");
}
async function tableChange() {
  //  a function used to commit database changes just change name of model you want to update and call function
  // await Buyer.sync({ alter: true });
  // await Order.sync({ alter: true });
  await Payment.sync({ alter: true });
  // await Passcode.sync({ alter: true });
  console.log("finished");
}
// CreateDatabase();
// tableChange();
// chapaVerify();

async function addAdmin() {
  // adding  database
  const hash = await bcrypt.hashSync("123", bcrypt.genSaltSync(10));
  console.log(hash);
  return Admin.create({
    id: "",
    email: "fraolgetachew2772@gmail.com",
    phone: "+251966003807",
    password: hash,
  })
    .then((data) => {
      console.log(data);
      console.log("finished");
    })
    .catch((err) => {
      console.log(err);
    });
}
// addAdmin();

async function selRegistrationTrial() {
  await Seller.create({
    id: "",
    fname: "Liul",
    lname: "Girma",
    password: "123",
    phonenumber: "0902312218",
    city: "Goba",
    region: "Oromia",
    type: "seller",
  });
}
async function addCategories() {
  //Adding categories to database
  await  Category.bulkCreate([
      {
          id:"0",
          name:"furnitures"
      },
      {
          id:"",
          name:"homes"
      },
      {
          id:"",
          name:"jewelleries"
      },
      {
          id:"",
          name:"artwork"
      },
      {
          id:"",
          name:"electronics"
      },
      {
          id:"",
          name:"manufacturing"
      },
      {
          id:"",
          name:"vehicles"
      },
      {
          id:"",
          name:"or"
      },
  {
      id:"",
      name:"building"
  }

  ]);
  //adding categories

  console.log("Categories are added in to  database successfully");
}
// addCategories()
let onlineUsers = [];
let reisStart = false;
let waitingchangeauctions = [];
// Getting image api

app.get("/images/:picid", (req, res) => {
  let id = req.params.picid;
  console.log("fetch image - ", id);
  return Pictures.findOne({
    where: { id: id },
  })
    .then((data) => {
      // console.log("The data found is ", data);
      if (data) {
        return data.picpath;
      }
    })
    .then((data) => {
      if (data) {
        res.sendFile(__dirname + "/dbImages/" + data);
      } else {
        res.status(404).send("Image not found");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
// Displaying home page
app.get("/", (req, res) => {
  console.log("running");
  console.log("the query is", req.query);
  let page = req.query.page == null ? 1 : req.query.page;
  // let type=req.query.subname==null?"electronics":req.query.subname;
  let no_response = 10;
  let limit = 1;
  let jumpingSet = (page - 1) * no_response;
  console.log(page);

  return Auction.findAndCountAll({
    order: [["createdAt", "DESC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: { state: ["open", "waiting"] },
    offset: jumpingSet,
    limit: no_response,
  })
    .then((data) => {
      let nopage = parseInt(data.count / no_response) + 1;
      // console.log(data.rows);
      let response = {
        count: nopage,
        data: data.rows,
      };
      if (response) {
        console.log(response);
        res.send(response);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/forgotpassword", async (req, res) => {
  let email = req.body.email;
  let buyer = await Buyer.findOne({ where: { email: email } });
  let seller = await Seller.findOne({ where: { email: email } });
  if (buyer) {
    console.log("It is the buyer ");
    try {
      let code = uid(5);
      var mailOptions = {
        from: "nuchereta27@gmail.com",
        to: email,
        subject: "User verification",
        text: `Your Verification code is  ${code}`,
      };
      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          console.log(error);
          res.status(500).send("Error in sending email verification");
        } else {
          Passcode.create({
            id: "",
            email: email,
            code: code,
          });
          console.log("Email sent: " + info.response);
          res.status(200).send("Verification has been sent to your Email");
        }
      });
    } catch (err) {
      console.log("Email sending error", err);
      res.status(400).send("Unknown email error");
    }
  } else if (seller) {
    console.log("It is the seller ");
    try {
      let verificationcode = uid(5);

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
      console.log("Email sending error", err);
      res.status(400).send("Unkown email error");
    }
  } else {
    res.status(400).send("invalid email");
  }
});
app.post("/verifycode", async (req, res) => {
  let { email, code } = req.body;
  return Passcode.findOne({
    where: {
      email: email,
      code: code,
    },
  }).then(async (data) => {
    if (data) {
      console.log("There is user ", data);
      let newpassword = uid(6);
      const hash = await bcrypt.hashSync(newpassword, bcrypt.genSaltSync(10));
      let buyer = await Buyer.findOne({ where: { email: email } });
      let seller = await Seller.findOne({ where: { email: email } });
      if (buyer) {
        Buyer.update(
          {
            password: hash,
          },
          {
            where: { id: buyer.id },
          }
        );
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
            res.status(400).send("Error email");
          } else {
            console.log("Email sent: " + info.response);
            res.status(200).send("Email send");
          }
        });
      } else if (seller) {
        Seller.update(
          {
            password: hash,
          },
          {
            where: { id: seller.id },
          }
        );
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
            res.status(400).send("Error email");
          } else {
            console.log("Email sent: " + info.response);
            res.status(200).send("Email sent ");
          }
        });
      } else {
        res.send("Invalide user email");
      }

      app.post("/login", authorizecheck);
    } else {
      console.log("Ther is no data");
      res.status(400).send("Invalide Verification code");
    }
  });
});
// fetching by category price region  date
app.get("/cat/:cname", async (req, res) => {
  console.log(req.params);
  let { phigh, plow, region, daterange } = req.query;
  console.log("running");
  console.log("the query is", req.query);
  let page = req.query.page == null ? 1 : req.query.page;
  // let type=req.query.subname==null?"electronics":req.query.subname;
  let no_response = 10;
  let price = phigh == null && plow == null ? null : phigh - plow;
  let limit = 1;
  let jumpingSet = (page - 1) * no_response;
  console.log(page);
  const type = req.params.cname;

  console.log("type", type);
  let category = await Category.findOne({ where: { name: type } });

  if (category) {
    console.log("category data", category.id);
    let cid = category.id;
    console.log("price", price);
    console.log("region", region);
    console.log("daterange", daterange);
    if (cid) {
      if (price != null && region != null && daterange != null) {
        console.log("step 1");
        return Auction.findAndCountAll({
          order: [["createdAt", "DESC"]],
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: {
            baseprice: {
              [Op.between]: [plow, phigh],
            },
            region: region,
            CategoryId: cid,
            startdate: {
              [Op.lt]: new Date(),
              [Op.gt]: new Date(new Date() - daterange * 24 * 60 * 60 * 1000),
            },
            state: ["open", "waiting"],
          },
          offset: jumpingSet,
          limit: no_response,
        })
          .then((data) => {
            let nopage = parseInt(data.count / no_response) + 1;
            // console.log(data.rows);
            let response = {
              count: nopage,
              data: data.rows,
            };
            if (response) {
              console.log(response);
              res.send(response);
            } else {
              res.sendStatus(404);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (price != null && region != null) {
        console.log("step 2");
        return Auction.findAndCountAll({
          order: [["createdAt", "DESC"]],
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: {
            baseprice: {
              [Op.between]: [plow, phigh],
            },
            region: region,
            categoryId: cid,
            startdate: {
              [Op.lt]: new Date(),
              [Op.gt]: new Date(new Date() - daterange * 24 * 60 * 60 * 1000),
            },
            state: ["open", "waiting"],
          },
          offset: jumpingSet,
          limit: no_response,
        })
          .then((data) => {
            let nopage = parseInt(data.count / no_response) + 1;
            // console.log(data.rows);
            let response = {
              count: nopage,
              data: data.rows,
            };
            if (response) {
              console.log(response);
              res.send(response);
            } else {
              res.sendStatus(404);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (price != null && daterange != null) {
        console.log("step 3");
        return Auction.findAndCountAll({
          order: [["createdAt", "DESC"]],
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: {
            baseprice: {
              [Op.between]: [plow, phigh],
            },
            categoryId: cid,
            startdate: {
              [Op.lt]: new Date(),
              [Op.gt]: new Date(new Date() - daterange * 24 * 60 * 60 * 1000),
            },
            state: ["open", "waiting"],
          },
          offset: jumpingSet,
          limit: no_response,
        })
          .then((data) => {
            let nopage = parseInt(data.count / no_response) + 1;
            // console.log(data.rows);
            let response = {
              count: nopage,
              data: data.rows,
            };
            if (response) {
              console.log(response);
              res.send(response);
            } else {
              res.sendStatus(404);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (region != null && daterange != null) {
        console.log("step 4");
        return Auction.findAndCountAll({
          order: [["createdAt", "DESC"]],
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: {
            region: region,
            categoryId: cid,
            startdate: {
              [Op.lt]: new Date(),
              [Op.gt]: new Date(new Date() - daterange * 24 * 60 * 60 * 1000),
            },
            state: ["open", "waiting"],
          },
          offset: jumpingSet,
          limit: no_response,
        })
          .then((data) => {
            let nopage = parseInt(data.count / no_response) + 1;
            // console.log(data.rows);
            let response = {
              count: nopage,
              data: data.rows,
            };
            if (response) {
              console.log(response);
              res.send(response);
            } else {
              res.sendStatus(404);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (price != null) {
        console.log("step 5");
        return Auction.findAndCountAll({
          order: [["createdAt", "DESC"]],
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: {
            baseprice: {
              [Op.between]: [plow, phigh],
            },
            categoryId: cid,
            state: ["open", "waiting"],
          },
          offset: jumpingSet,
          limit: no_response,
        })
          .then((data) => {
            let nopage = parseInt(data.count / no_response) + 1;
            console.log("data.rows", data);
            let response = {
              count: nopage,
              data: data.rows,
            };
            if (response) {
              console.log(response);
              res.send(response);
            } else {
              res.sendStatus(404);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (region != null) {
        console.log("step 6");
        return Auction.findAndCountAll({
          order: [["createdAt", "DESC"]],
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: {
            region: region,
            categoryId: cid,
            state: ["open", "waiting"],
          },

          offset: jumpingSet,
          limit: no_response,
        })
          .then((data) => {
            let nopage = parseInt(data.count / no_response) + 1;
            // console.log(data.rows);
            let response = {
              count: nopage,
              data: data.rows,
            };
            if (response) {
              console.log(response);
              res.send(response);
            } else {
              res.sendStatus(404);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (daterange != null) {
        console.log("step 7");
        return Auction.findAndCountAll({
          order: [["createdAt", "DESC"]],
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: {
            startdate: {
              [Op.lt]: new Date(),
              [Op.gt]: new Date(new Date() - daterange * 24 * 60 * 60 * 1000),
            },
            categoryId: cid,
            state: ["open", "waiting"],
          },
          offset: jumpingSet,
          limit: no_response,
        })
          .then((data) => {
            let nopage = parseInt(data.count / no_response) + 1;
            // console.log(data.rows);
            let response = {
              count: nopage,
              data: data.rows,
            };
            if (response) {
              console.log(response);
              res.send(response);
            } else {
              res.sendStatus(404);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return Auction.findAndCountAll({
          order: [["createdAt", "DESC"]],
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: {
            state: ["open", "waiting"],
            categoryId: cid,
          },
          offset: jumpingSet,
          limit: no_response,
        })
          .then((data) => {
            let nopage = parseInt(data.count / no_response) + 1;
            // console.log(data.rows);
            let response = {
              count: nopage,
              data: data.rows,
            };

            if (response) {
              console.log("response", response);
              res.send(response);
            } else {
              res.sendStatus(404);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      res.status(400).send("No auction in defined category");
    }
    // Auction.findAll({
    //   attributes: { exclude: ["createdAt", "updatedAt"] },
    //   include: {
    //     model: Auction,
    //     attributes: { exclude: ["createdAt", "updatedAt"] },
    //   },
    //   where: { name: type },
    // })
    //   .then(async (data) => {
    //     if (data) {
    //       res.json(data);
    //     } else {
    //       res.sendStatus(404);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  } else {
    console.log("Not found");
    res.status(404).send("not found");
  }
});
/// searching a product

app.post("/login", authorizecheck);
app.post("/logout", (req, res) => {
  console.log("loggin out");
  // Clear the session data and delete the session cookie
  // req.session.destroy((err) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     res.clearCookie("u"); // Delete the "session" cookie
  //     res.redirect("/login");
  //   }
  // });
  res.clearCookie("u", {
    path: "/login",
    domain: "http://localhost:5173/sel/login",
    secure: true,
    httpOnly: true,
  });
  res.redirect("/sel/login");
});

app.get("/category/:cname", async (req, res) => {
  console.log(req.params);
  const name = req.params.cname;
  Category.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Auction,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
    where: { name: name },
  })
    .then(async (data) => {
      if (data) {
        res.json(data);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/paychapa", paychapa);

app.get("/search", async (req, res) => {
  let item = req.query.item;
  let page = req.query.page != null ? req.query.page : 1;
  let no_response = 10;
  let limit = 1;
  // blue tshirt
  let jumpingSet = (page - 1) * no_response;
  if (item) {
    console.log(page, item);
    return Auction.findAndCountAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt", "categoryId"] },
      offset: jumpingSet,
      limit: no_response,
      where: {
        [Op.or]: [
          // {name:
          //     {[Op.match]: item}
          // },
          // {name:
          //     {[Op.startsWith]: item}
          // },
          { name: { [Op.substring]: item } },
          { description: { [Op.substring]: item } },
        ],
      },
    })
      .then((data) => {
        // console.log(data);
        if (data) {
          let nopage = parseInt(data.count / no_response);
          data.count = nopage;
          res.send(data);
        } else res.sendStatus(404);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  } else {
    res.sendStatus(404);
  }
  // console.log(count);
  // console.log(rows);
});
app.get("/cookiecheck", async (req, res) => {
  // console.log("The cookie is",req.headers);
  console.log("The cookie is", req.cookies);
  res.sendStatus(400);
  // console.log(rows);
});
app.post("/hele", (req, res) => {
  console.log(req.body);
  console.log("Connected successfully");

  res.sendStatus(200);
});

app.get("/details/:id", async (req, res) => {
  let id = req.params.id;
  console.log("the id is ", id);
  let response={data:"",nobidder:""}
  return Auction.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: { id: id },
    include: [
      {
        model: Pictures,
        attributes: { exclude: ["createdAt", "updatedAt", "picpath"] },
      },

      {
        model: Seller,
        attributes: { exclude: ["fname", "lname", "phonenumber", "city"] },
      },
    ],
  })
    .then(async (data) => {
      if (data) {
        const tempbiddders=await Bid.findAndCountAll({where:{AuctionId:data.id}})
        response.data=data;
        if(tempbiddders){
          response.nobidder=tempbiddders.count;
        }
        
        res.send(response);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log("the error is ", err);
      res.sendStatus(404);
    });
});
app.post("/chargeaccount", async (req, res) => {
  console.log(req.body);
  let bankerId = req.body.bankerId;
  let userphone = req.body.userphone;
  let amount = req.body.amount;
  console.log("Banker id ", bankerId);
  console.log("Buyer phonenumber ", userphone);
  console.log("Amount", amount);
  let now = Date();
  if (bankerId != null && userphone != null && amount != null) {
    let buy = await Buyer.findOne({
      where: { phonenumber: userphone },
      attributes: ["id", "account"],
    });
    console.log(amount, buy.account);
    let recharge = Number(amount) + Number(buy.account);
    console.log(recharge);
    let buyer = await Buyer.findOne({
      where: { phonenumber: phonenumbere },
    });
    if (buyer) {
      return Buyer.update(
        {
          account: recharge,
        },
        {
          where: {
            phonenumber: userphone,
          },
        }
      )
        .then(async (data) => {
          if (data) {
            await Notification.create({
              id: "",
              AuctionId: "",
              BuyerId: winner.BuyerId,
              message: `Dear customer you have successfully charged your account`,
            });
            await Payment.create({
              id: "",
              bankerId: bankerId,
              BuyerId: buy.id,
              date: now,
            });
          }
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          console.log("Some error has occured");
          res.sendStatus(400);
        });
    } else {
    }
  } else {
    res.sendStatus(400);
  }
});

app.get("/checkijg", (req, res) => {
  console.log("Function before respond");
  res.send("Helloe");
  setTimeout(() => {
    console.log("Function after respond");
  }, 3000);
});

http.listen(5000, () => {
  console.log("The server is running on 5000");
});
const auctionManage = async () => {
  console.log("auction manage");
  const date = new Date();
  let tempseller;
  let auctions = await Auction.findAll({
    where: {
      [Op.or]: [{ state: "open" }, { state: "waiting" }],
    },
  });
  let i = 0;
  auctions.map(async (auction) => {
    if (auction.startdate == date || auction.startdate < date) {
      console.log("There is an auction waiting ", auction.id);
      i++;
      await Auction.update(
        {
          state: "open",
        },
        { where: { id: auction.id } }
      );
      console.log(" auction updated ");
      let notifimies = await Notifyme.findAll({
        aid: auction.id,
      });
      notifimies.map(async (notifime) => {
        await Notification.create({
          id: "",
          AuctionId: auction.id,
          uid: notifime.BuyerId,
          message: `The auction  ${auction.name} you want to participate on has been opened }`,
          nottype: "start",
        });
      });
      await Notification.create({
        id: "",
        AuctionId: auction.id,
        uid: auction.SellerId,
        message: `your auction ${auction.name} has been opened }`,
        nottype: "start",
      });
       tempseller=await Seller.findOne({where:{id:auction.SellerId}})
      var mailOptions = {
        from: "nuchereta27@gmail.com",
        to: tempseller.email,
        subject: "User verification",
        text: `Dear ${tempseller.fname+" "+tempseller.lname} your auction ${auction.name} has been opened`,
      };
      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          console.log(error);
        } else {
          
        }
      });
    }
    if (auction.enddate == date || auction.enddate > date) {
      await auction.update({
        state: "closed",
      },{where: { id: auction.id }});
      tempseller=await Seller.findOne({where:{id:auction.SellerId}})
      waitingchangeauctions.push(auction);
      let winner = await Bid.findOne({
        where: {
          AuctionId: auction.id,

          bidprice: auction.hammerprice?auction.hammerprice:-1,
        },
      });
      var mailOptions = {
        from: "nuchereta27@gmail.com",
        to: tempseller.email,
        subject: "Bid Close",
        text: `Dear Mr/Mrs ${tempseller.fname+" "+tempseller.lname} your auction ${auction.name} 
        has been closed check your auction on "http://localhost:5000/sel/detail/:${auction.id}" ${tempseller.email}`,
      };
      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          console.log(error);
        }})
      if(winner){
        await auction.update({
          winnerId: winner.buyerId != null ? winner.buyerId : "",
        },{where: { id: auction.id }});
        var mailOptions = {
          from: "nuchereta27@gmail.com",
          to: tempseller.email,
          subject: "Bid close",
          text: `Congratulations Mr/Mrs ${winner.fname+" "+winner.lname} your auction ${auction.name} 
          you were participating on  has been closed and you are the winner,  contact the seller through ${tempseller.email}`,
        };
        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log(error);
          } else {
            
          }

        });

      await Notification.create({
        id: "",
        AuctionId: auction.id,
        uid: winner.BuyerId,
        message: `Congratulations you have won the auction ${auction.name} you can reach the vendor with phonenumber - ${auction.Seller.phonenumber} `,
      });
      }
      await Notification.create({
        id: "",
        AuctionId: auction.id,
        uid: auction.SellerId,
        message: `Your auction has been ${auction.name} completed  with winning bid ${auction.hammerprice}`,
      });
      let bidders = await Bid.findAll({
        where: { AuctionId: auction.id },
        attributes: ["BuyerId"],
      });
      console.log("bidders", bidders);
      if (bidders) {
        bidders.map(async (bid) => {
          await Notification.create({
            id: "",
            AuctionId: auction.id,
            uid: bid.BuyerId,
            nottype: "close",
            message: `The auction ${auction.name} you were participating on has been closed with winning price ${auction.hammerprice}`,
          });
        });
      }
      console.log("Finished");
    }
  });
};

// setInterval(()=>{
//     console.log("The function is running")
    // auctionManage();
// },[20000])

const addOnlineUser = (userid, socketid) => {
  console.log("The user id is ", userid);
  console.log("The user socket id is ", socketid);
  !onlineUsers.some((user) => user.userid === userid) &&
    onlineUsers.push({ userid, socketid });
  console.log("Online users", onlineUsers);
};

const removeonlineUser = (socketid) => {
  onlineUsers = onlineUsers.filter((user) => user.socketid !== socketid);
};

io.use((socket, next) => {
  const { headers } = socket.handshake;

  const cookieString = socket.handshake.headers.cookie;

  // console.log("socket hand shake ",socket.handshake);
  // console.log("headers",headers);
  // extract cookie from header
  if (cookieString) {
    const cookies = cookie.parse(cookieString);
    const myCookieValue = cookies.u;
    jwt.verify(myCookieValue, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      console.log("verifing");
      if (err) {
        // console.log("Token error is ", err);

        socket.disconnect();
      } else {
        socket.user = user;
        next();
      }
    });
  } else {
    console.log("No cookies found!");
    socket.disconnect();
  }
  // verify session ID and associate socket with authenticated user
});
io.on("connection", (socket) => {
  // console.log("The socket id is ", socket.id);
  // console.log("The socket user is ", socket.user);
  console.log("The number of users are ", io.engine.clientsCount);

  addOnlineUser(socket.user, socket.id);

  let data = [];
  // bidplaced notification
  socket.on("bidupdate", async (auctionid) => {
    console.log("the auction id is", auctionid);
    let bidders = await Bid.findAll({
      where: { AuctionId: auctionid },
    });
    let seller = await Auction.findOne({
      attributes: ["id", "SellerId"],

      where: { id: auctionid },
    });
    console.log("online users ", onlineUsers);
    console.log("The seller", seller.SellerId);
    onlineUsers.map((user) => {
      if (user.userid == seller.SellerId) {
        console.log("yess there is a seller");
        let a = user.socketid;

        io.to(a).emit("bidupdate", "new notification");
        // socket.broadcast.emit('bidupdate',data);
        socket.emit('bidupdate',"new notification");
        console.log("notified");
      }
      bidders.map((bid) => {
        if (user.userid == bid.BuyerId && user.userid != socket.user) {

          let a=user.socketid;

          console.log("yes there is active bidders");
          // socket.to(user.socketid).emit("bidupdate", "new notification");
          io.to(a).emit("bidupdate", "new notification");
        }
      });
    });
    // socket.broadcast.emit("message", data);
  });
  // socket.on("message",(data)=>{
  //     console.log(data);
  //     socket.emit('message',data);

  // })
  // var i=0;
  // setInterval(() => {
  //     socket.emit('bidupdate', {
  //         message: i++
  //       });
  // }, 3000);
  // setInterval(() => {
  //     socket.emit('message', {
  //         message: i++
  //       });
  // }, 3000);
  socket.on("disconnect", () => {
    console.log("Some one has disconnected");
    removeonlineUser(socket.id);
  });
});
