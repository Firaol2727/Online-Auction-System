require("dotenv");
const { sequelize } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const fs = require("fs");
var bodyParser = require("body-parser");
const cors = require("cors");
const { uid } = require("uid");
const date = new Date();
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
// const Deletefiles = require('../deletefile');

const uploadAuction= (req, res) => {
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
}
module.exports=uploadAuction;