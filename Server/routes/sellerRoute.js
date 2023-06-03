require("dotenv");
const { sequelize } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();
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

let filname;
const multer = require("multer");
const path = require("path");
var jsonParser = bodyParser.json();
const { urlencoded } = require("express");
// const Deletefiles = require('../deletefile');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./dbImages");
  },
  filename: (req, file, cb) => {
    filname =
      Date.now() +
      Math.round(Math.random() * 1000) +
      path.extname(file.originalname);
    cb(null, filname);
  },
});
const multerFilter = (req, file, cb) => {
  console.log("The file is ", file);
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    return cb(new Error("type error"), false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
}).fields([{ name: "imgCollection", maxCount: 7 }]);
router.use(jsonParser);
router.use(
  cors({
    origin: [
      "http://localhost:7494",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
  })
);

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
        const accessToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
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
const checkAuthorizationSeller = async (req, res, next) => {
  console.log("cookies", req.cookies);
  // console.log("cookies",req.headers)

  if (req.cookies.u) {
    console.log("in the first check");
    const token = req.cookies.u;
    if (token == null) {
      res.status(403).send("not logged in");
    }
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      console.log("verifing");
      if (err) {
        console.log("Token error is ", err);
        res.status(403).send("not logged in");
      } else {
        req.user = user;
        next();
      }
    });
  } else if (req.headers.cookies) {
    console.log("in the second check");
    let contentincookie = req.headers.cookies;
    const token = contentincookie.slice(0);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      console.log("the request user is ", user);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(403);
  }
};

  // Seller registration
router.post("/register", async (req, res) => {
  let { firstName, lastName, email, password, phoneNumber, region, city } = req.body;

  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return Seller.create({
    id: "",
    fname: firstName,
    lname: lastName,
    password: hash,
    email: email,
    phonenumber: phoneNumber,
    city: city,
    region: region,
    account: 0,
  })
    .then(() => {
      res.status(200).send("registeration verified");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("some thing went wrong ");
    });
});
// change profile
router.post("/changepp", checkAuthorizationSeller, async (req, res) => {
  let { fname, lname, email, region, city } = req.body;
  /**
    fname,
    lname,
    phonenumber,
    email,
    city,
    password,
    account, 
    region
     * 
     */
  let uid = req.user;
  let = a = req.body;
  console.log("a", a);
  // console.log("fname",fname);
  // res.sendStatus(200);
  return Seller.update(
    {
      fname: fname,
      lname: lname,
      email: email,
      region: region,
      city: city,
    },
    {
      where: { cid: uid },
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
//get profile 
router.get('/profile', checkAuthorizationSeller, (req,res)=>{
  let uid=req.user;
  console.log("running get profile ");
  return Seller.findOne({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    where: { id: uid },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
})
// get detail  of the auction seller perspective
router.get('/moreon/:id', checkAuthorizationSeller,async (req,res)=>{
  let uid=req.user;
  let aid=req.params.id;
  let response={
    detail:"",
    pictures:""};
  console.log("running get profile ");
  return Auction.findOne({
    include: [
      {
        model: Pictures,
      },
    ],
    where: { id: aid },
  })
    .then(async(data) => {
      if(data){
        response.detail=data;
      }
      let pic=await Pictures.findAll({where:{AuctionId:data.id}})
      response.pictures=pic;
      res.send(response);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
})
// change password
router.post("/changepassword", checkAuthorizationSeller, async (req, res) => {
  let { pp, np, cp } = req.body;
  console.log(req.body);
  if (np == cp) {
    return Seller.findOne({
      attributes: ["password"],
      where: { cid: uid },
    })
      .then(async (data) => {
        const check = await bcrypt.compare(pp, data.password);
        if (check) {
          console.log("true");
          const hash = await bcrypt.hashSync(np, bcrypt.genSaltSync(10));
          return Customer.update(
            {
              password: hash,
            },
            {
              where: { cid: uid },
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
router.post('/changepp',checkAuthorizationSeller,async(req,res)=>{
    let {fname,lname,email,region,city,telUsername}=req.body;

    let uid=req.user;
  
    console.log("userid",uid);
    // res.sendStatus(200);
    if(email!=null&&fname!=null&&lname!=null&&city!=null&&region!=null){
return Seller.update({
        fname:fname,
        lname:lname,
        email:email,
        telUsername:telUsername,
        region:region,
        city:city
    },{
        where:{id:uid}
    })
    .then(data=>{
        if(data){
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    })
    .catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
    }
    
  
})
// change password
router.post('/changepassword',checkAuthorizationSeller,async(req,res)=>{
    let {pp, np,cp}=req.body;
    console.log(req.body);
    let uid=req.user;
        return Seller.findOne({
            attributes:[
                "password"
            ],
            where:{id:uid}
        })
        .then(async (data)=>{
            const check=await bcrypt.compare(pp,data.password);
            if(check){  
                console.log("true")
                const hash = await bcrypt.hashSync(np, bcrypt.genSaltSync(10));
                return Seller.update({
                    password:hash
                },{
                    where:{id:uid}
                }).then((data)=>{
                    console.log("succesful update")
                    if(data){
                        res.status(200).send("ok");
                    }
                })
            }else{
                console.log("false")
                res.sendStatus(500);
            }
        })
        .catch((err)=>{
            console.log(err);
            res.status(404);
        })
    
})
// seller login
router.post("/login", authorizeSeller, (req, res) => {
  res.sendStatus(200);
});

//seller notification
router.get('/notification',checkAuthorizationSeller,async(req,res)=>{
    console.log("fetching notification")
    let uid=req.user;
    return Notification.findAll({
        where:{selid:uid}
    }).then( async data=>{
        res.send(data);
        await Notification.update({
            read:true
        },{
            where:{
                read:false,
                selid:uid
            }
        })
    }).catch(err=>{
        res.sendStatus(500)
    })

}) 

// create auction
router.post("/upload", checkAuthorizationSeller, (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("error occured");
      console.log(err);
      res.status(404).send("file uploading error");
    } else if (err) {
      console.log("we are in this this shit");
      res.status(404).send("file uploading error");
    }
    const savedfiles = req.files;
    console.log("body", req.body);
    // console.log("saved",savedfiles)
    let userid = req.user;
    let picturess = [];
    let {
      name,
      baseprice,
      startdate,
      enddate,
      type,
      category,
      region,
      city,
      description,
    } = req.body;
    baseprice = Number(baseprice);
    let x = uid(16);
    let aid = uid(16);
    let letmeSee = savedfiles.imgCollection[0].filename;
    console.log(picturess);
    let letid;
    return Category.findOne({
      where: { name: category },
    })
      .then((data) => {
        if (data.id) {
          return Auction.create({
            id: "",
            name: name,
            baseprice: baseprice,
            startdate: startdate,
            enddate: enddate,
            type: type,
            CategoryCid: data.id,
            region: region,
            city: city,
            description: description,
            hammerprice: 0,
            see: x,
            state: "waiting",
            SellerId: userid,
          });
        } else {
          res.status(404).send("Invalid category");
        }
      })
      .then(async (data) => {
        let aid = data.id;
        letid = aid;
        let picturess = [];
        for (let index = 0; index < savedfiles.imgCollection.length; index++) {
          if (index == 0) {
            picturess.push({
              id: x,
              picpath: savedfiles.imgCollection[0].filename,
              type: "image",
              AuctionId: aid,
            });
          } else {
            picturess.push({
              id: "",
              picpath: savedfiles.imgCollection[index].filename,
              type: "image",
              AuctionId: aid,
            });
          }
        }
        // savedfiles.imgCollection.map((item)=>{
        //     picturess.push({
        //         'id':"",
        //         "picpath":item.filename,
        //         "type":"image",
        //         "ProductPid":pid
        //     })
        // })
        await Pictures.bulkCreate(picturess);
      })
      .then(async (data) => {
        // await Auction.update({
        //     see:data[0].id
        // },{where:{
        //     pid:letid
        // }})
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  });
});
// delete auction
router.post("/deleteauction", async (req, res) => {
  let aid = req.body.aid;
  try {
    let bidders = await Bid.findAll({
      where: { AuctionId: aid },
    });
    if (bidders) {
      bidders.map(async (bidder) => {
        let prevbidprice = Number(bidder.bidprice);
        await Bid.update({
          bidprice: prevbidprice + 100,
          where: {
            id: bidder.id,
          },
        });
        await Notification.create({
          id: "",
          AuctionId: aid,
          BuyerId: bidder.BuyerId,
          message: `The auction you were  participating on has been deleted by the 
                auctioner, your account has been recharged by ${bidder.bidprice}`,
        });
      });
      await Auction.destroy({
        where: {
          id: aid,
        },
      });

      res.sendStatus(200);
    } else {
      await Auction.destroy({ where: { id: aid } });
      res.sendStatus(200);
    }
  } catch (error) {
    console.log("The error was ", err);
    res.sendStatus(500);
  }
});
// my auction
router.get("/myauction", checkAuthorizationSeller, (req, res) => {
  let uid = req.user;
  console.log("The user is ", uid);
  return Auction.findAll({
    where: { SellerId: uid },
  }).then((data) => {
    res.send(data);
  });
});

router.get("/h", (req, res) => {
  let now = formatDate(new Date());
  console.log("The current date is", now);
  res.sendStatus(200);
});
function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}
module.exports = router;
