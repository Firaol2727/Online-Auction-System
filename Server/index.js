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
const adminRoutes = require("./routes/adminRoutes");
const buyerRoute = require("./routes/buyerRoute");
const sellerRoute = require("./routes/sellerRoute");
const {
  Admin,
  Auction,
  Banker,
  ReportedAuction,
  Buyer,
  Category,
  ClosedBid,
  Notification,
  Payment,
  Pictures,
  Product,
  Seller,
  Notifyme,
} = sequelize.models;

const http = require("http");
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server);
const { Op } = require("sequelize");
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "youremail@gmail.com",
    pass: "yourpassword",
  },
});
var mailOptions = {
  from: "youremail@gmail.com",
  to: "myfriend@yahoo.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
// trying the request

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);
// app.options('*', cors());
// app.use(express.json()); 
app.use(cookieParser());
app.use("/custom", buyerRoute);
app.use("/special", adminRoutes);
app.use("/sel", sellerRoute);

async function CreateDatabase() {
  // creating database structures
  await sequelize.sync({ alter: true });
  console.log("finished");
}
async function tableChange() {
  //  a function used to commit database changes just change name of model you want to update and call function
  // await Buyer.sync({ alter: true });

  await Seller.sync({ alter: true });
  console.log("finishedhh");
}

// tableChange();

async function addAdmin() {
  // adding  database
  const hash = await bcrypt.hashSync("123", bcrypt.genSaltSync(10));
  console.log(hash);
  return sequelize.models.Admin.create({
    id: "",
    email: "fraolgetachew2772@gmail.com",
    phone: "+251966003807",
    password: hash,
  }).on((data) => {
      console.log(data);
      console.log("finished");
    })
    .catch((err) => {
      console.log(err);
    });
}
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
  // Adding categories to database
  // await  Category.bulkCreate([
  //     {
  //         id:"0",
  //         name:"furnitures"
  //     },
  //     {
  //         id:"",
  //         name:"homes"
  //     },
  //     {
  //         id:"",
  //         name:"jewelleries"
  //     },
  //     {
  //         id:"",
  //         name:"artwork"
  //     },
  //     {
  //         id:"",
  //         name:"electronics"
  //     },
  //     {
  //         id:"",
  //         name:"manufacturing"
  //     },
  //     {
  //         id:"",
  //         name:"vehicles"
  //     },
  //     {
  //         id:"",
  //         name:"or"
  //     },
  // {
  //     id:"",
  //     name:"building"
  // }

  // ]);
  //adding categories

  console.log("Categories are added in to  database successfully");
}
// addCategories();
// main();

// addAdmin();

// CreateAuction();
// io.use((socket,next)=>{
//     console.log("handshake",socket.handshake);
//     next();
// })
let onlineUsers = [];
let reisStart = false;
let waitingchangeauctions = [];
// Getting image api
const authorizeSeller=async(req,res,next)=>{
  console.log(req.body);
  let {username,password}=req.body;
  console.log("username",username);
  console.log("password",password);

return Seller.findOne({
  where: {
    phonenumber: username,
  },
  attributes: ["id", "password"],
}).then(async (data) => {
    // console.log("data is ",data.Aid,data.password);
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
  }).then((find)=>{
    console.log("find is ", find);
    if (find.allow) {
      const user = find.uid;
      const accessToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      // console.log("accessToken",accessToken);
      res.cookie("u",accessToken,{maxAge: 7200000,httpOnly:true,sameSite:"none",secure:true});
      next();
    } else {
      console.log(find);
      res.status(400).send("error username or password");
    }
  })
  .catch((err) => {
    console.log(" error occures is  " + err);
    res.sendStatus(500);
  });
};
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
    where:{state:["open","waiting"]},
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

app.post('/slogin',authorizeSeller,(req,res)=>{
    res.sendStatus(200)
})
// fetching by category price region  date
app.get("/cat/:cname", async (req, res) => {
  console.log(req.params);
  let {phigh,plow,region,daterange}=req.query;
  console.log("running");
  console.log("the query is", req.query);
  let page = req.query.page == null ? 1 : req.query.page;
  // let type=req.query.subname==null?"electronics":req.query.subname;
  let no_response = 10;
  let price= (phigh== null && plow==null)? phigh-plow:null;
  let limit = 1;
  let jumpingSet = (page - 1) * no_response;
  console.log(page);
  const type = req.params.cname;
  let category=await Category.findOne({where:{name:type}});
  let cid=category.id;
  if( price!= null &&  region!=null && daterange!=null ){
    return Auction.findAndCountAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where:{
        baseprice:price,
        region:region,
        state:["open","waiting"]},
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
  
  }
  else if( price!= null &&  region!=null ){
    return Auction.findAndCountAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where:{
        baseprice:price,
        region:region,
        state:["open","waiting"]},
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
  }
  else if( price!= null &&  daterange!=null){
     return Auction.findAndCountAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where:{state:["open","waiting"]},
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
  }
  else if(  region!=null && daterange!=null ){
    return Auction.findAndCountAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where:{state:["open","waiting"]},
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
  }
  else if( price!= null ){
    return Auction.findAndCountAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where:{state:["open","waiting"]},
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
  }
  else if( region!=null ){
    return Auction.findAndCountAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where:{state:["open","waiting"]},
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
  }
  else if( daterange!=null ){
    return Auction.findAndCountAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where:{state:["open","waiting"]},
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
  }
  else{
    return Auction.findAndCountAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where:{state:["open","waiting"]},
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

  }
  Auction.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Auction,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
    where: { name: type },
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
/// searching a product
app.get("/search", async (req, res) => {
  let item = req.query.item;
  let page = req.query.page != null ? req.query.page : 1;
  let no_response = 6;
  let limit = 1;
  // blue tshirt
  let jumpingSet = (page - 1) * no_response;
  if (item) {
    console.log(page, item);
    return Auction.findAndCountAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt", "CategoryCid"] },
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

app.get("/search", async (req, res) => {
  let item = req.query.item;
  let page = req.query.page != null ? req.query.page : 1;
  let no_response = 6;
  let limit = 1;
  // blue tshirt
  let jumpingSet = (page - 1) * no_response;
  if (item) {
    console.log(page, item);
    return Auction.findAndCountAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt", "CategoryCid"] },
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
  console.log("The cookie is",req.cookies);
  res.sendStatus(400)
  // console.log(rows);
});
app.post("/hele", (req, res) => {
  console.log(req.body);
  console.log("Connected successfully");
 
  res.sendStatus(200);
});
// app.get('/subcategory/',async(req,res)=>{
//     const cname=req.query.cname;
//     const page=req.query.page!=null?req.query.page:1;
//     console.log(cname,page);
//     let no_response=6;
//     let jumpingSet=(page-1)*no_response;
//     Category.findOne({
//         attributes:["cid"],
//         where:{cname:cname}
//     }).then((data)=>{
//         if(data){
//             let cid=data.cid;
//         return  Product.findAndCountAll({
//             order:[
//                 ["createdAt","DESC"]
//             ],
//             attributes:{exclude:["createdAt","updatedAt"]},
//             offset: jumpingSet,
//             limit: no_response,
//             where:{CategoryCid:cid}
//         });
//         }
//         return null;
//     })
//     .then(data=>{
//         // console.log(data);
//         if(data){
//         let nopage=parseInt(data.count/no_response);
//         data.count=nopage;
//         console.log(data.count);
//         res.send(data);
//         }else res.sendStatus(404);

//     })
//     .catch(err=>{
//         console.log(err);
//         res.sendStatus(404);
//     })
// })

app.get("/details/:id", async (req, res) => {
  let id = req.params.id;
  console.log("the id is ", id);
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
        res.send(data);
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
              message: `Dear customer you have successfully recharged your account`,
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

// app.listen(5000,()=>{
//     console.log("server running at port on 5000");
// })
server.listen(5000, () => {
  console.log("The server is running on 5000");
});
const auctionManage = async () => {
  const date = new Date();
  let auctions = await Auction.findAll({
    attributes: ["id", "startdate", "enddate"],
    where: {
      [Op.or]: [{ status: "started" }, { pname: "notstarted" }],
    },
  });
  auctions.map(async (auction) => {
    if (auction.startdate == date) {
      waitingchangeauctions.push(auction);
      await Auction.update({
        status: "started",
        include: {
          model: Seller,
          attributes: ["phonenumber"],
        },
        where: { id: auction.id },
      });
      let notifimies = await Notifyme.findAll({
        aid: auction.id,
      });
      notifimies.map(async (notifime) => {
        await Notification.create({
          id: "",
          AuctionId: auction.id,
          BuyerId: winner.BuyerId,
          message: `The auction  ${auction.name} you want to participate on has started }`,
          nottype: "start",
        });
      });
      await Notification.create({
        id: "",
        AuctionId: auction.id,
        selid: auction.SellerId,
        message: `your auction ${auction.name} has started }`,
        nottype: "start",
      });
    }
    if (auction.enddate == date) {
      waitingchangeauctions.push(auction);
      let winner = await Bid.findOne({
        where: {
          AuctionId: auction.id,
          bidprice: auction.hammerprice,
        },
      });
      await auction.update({
        status: "closed",
        winnerId: winner.buyerId,
        where: { id: auction.id },
      });
      await Notification.create({
        id: "",
        AuctionId: auction.id,
        BuyerId: winner.BuyerId,
        message: `Congratulations you have won the auction ${auction.name} you can reach the vendor with phonenumber - ${auction.Seller.phonenumber} `,
      });
      await Notification.create({
        id: "",
        AuctionId: auction.id,
        BuyerId: auction.Seller.id,
        message: `Congratulations you have won the auction ${auction.name} you can reach the vendor with phonenumber - ${auction.Seller.phonenumber} `,
      });
      let bidders = Bid.findAll({
        where: { AuctionId: auction.id },
        attributes: ["BuyerId"],
      });
      bidders.map(async (bid) => {
        await Notification.create({
          id: "",
          AuctionId: auction.id,
          BuyerId: bid.BuyerId,
          message: `The auction ${auction.name} you were participating on has been closed with winning price ${auction.hammerprice}`,
        });
      });

      // await ClosedBid.create({

      // })
    }
  });
};

const addOnlineUser = (userid, socketid) => {
  !onlineUsers.some((user) => user.userid === userid) &&
    onlineUsers.push({ userid, socketid });
};

const removeonlineUser = (socketid) => {
  onlineUsers = onlineUsers.filter((user) => user.socketid !== socketid);
};

const authSocketMiddleware = (socket, next) => {
  // since you are sending the token with the query
  console.log(socket.handshake);
  const token = socket.handshake.query?.token;
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    socket.user = decoded;
  } catch (err) {
    return next(new Error("NOT AUTHORIZED"));
  }
  next();
};

io.on("connection", async (socket) => {
  console.log(socket.handshake);
  addOnlineUser();
  console.log("The socket id is ", socket.id);
  console.log("The number of users are ", io.engine.clientsCount);
  let data = [];
  // bidplaced notification
  socket.on("bidupdate", async (userid, auctionid) => {
    let bidders = await Bid.findAll({
      where: { AuctionId: auctionid },
    });
    onlineUsers.map(async (user) => {
      bidders.map((bid) => {
        if (user.userid == bid.BuyerId) {
          socket.to(user.socketid).emit("bidupdate", "new notification");
        }
      });
    });
    socket.broadcast.emit("message", data);
  });
  // socket.on("message",(data)=>{
  //     console.log(data);
  //     socket.broadcast.emit('message',data);

  // })
  // var i=0;
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
