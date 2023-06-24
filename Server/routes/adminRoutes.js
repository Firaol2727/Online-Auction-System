const {sequelize}=require('../models');
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
const router=require('express').Router();
const multer =require('multer');
const upload=multer({storage:multer.memoryStorage()})
var cookieParser = require('cookie-parser');
const bodyParser=require('body-parser');
var jsonParser=bodyParser.json();
const{Admin,Auction,Banker,ReportedAuction,Buyer,Category,ClosedBid,Notification,Payment,Pictures,Product,Seller,Transaction}=sequelize.models;

const {authorize,checkAuthorization}=require( '../controllers/adminController/authorizeAdmin');
const changepassword=require( '../controllers/adminController/changepassword');
const closedbid=require( '../controllers/adminController/closebid');
const deleteAuction=require( '../controllers/adminController/deleteAuctionA');
const deleteSeller=require( '../controllers/adminController/deleteSeller');
const getAuction=require( '../controllers/adminController/getAuction');
const getSeller=require( '../controllers/adminController/getSeller');
const myprofile=require( '../controllers/adminController/myprofile');
const reports=require( '../controllers/adminController/reports')
router.use(jsonParser);

// const authorize=async(req,res,next)=>{
//     let {username,password}=req.body;
//     console.log("The request body is ",req.body)
//     console.log(username,password);
//     return Admin.findOne(
//         {
//             where: {
//             phone:username,
//         },
//         attributes:['id','password']
//         }
//     ).then(async(data)=>{
//         // console.log("the data is ",data.Aid,data.password);
//         const find={
//             allow:false,
//             uid:null
//         }
//         if (data) {
//             const hashed=data.password;
//             const compared=await bcrypt.compare(password,hashed);
//             if(compared){
//                 find.uid=data.id;
//                 find.allow=true;
//             }
//         }
//             return find;
    
//     }).then(async (find)=>{
//         console.log("the find is ",find);
//     if(find.allow)
//     {  
//         const user=find.uid;
//         const accessToken=await jwt.sign(user,
//             process.env.ACCESS_TOKEN_SECRET);
//         console.log("accessToken",accessToken);
//         res.cookie("jwt",accessToken,{httpOnly:true});
//         next();
//     }
//     else {
//         console.log(find);
//         res.status(403).send("error username or password");
//     }
//     })
//     .catch((err)=>{
//         console.log("The error occures is  " +err);
//         res.sendStatus(500);
//     })
// }
// const checkAuthorization =async(req,res,next)=>{
//     console.log("The cookie is ",jwt)
//     if(req.cookies.jwt){
//         const token=req.cookies.jwt;
//         if(token==null){
//             res.status(403).send("not logged in")
//         }
//         jwt.verify(
//             token,process.env.ACCESS_TOKEN_SECRET,
//             (err,user)=>{
//                 if(err){
//                     res.send(err).status(404);
//                 }
//                 req.user=user;
//                 next();
//             }
//         )
//     }
// }
router.post('/login',authorize,(req,res)=>{
    res.sendStatus(200);
}) 
router.post("/seller",checkAuthorization,(req,res)=>{
    let sid=req.body.sid;
    console.log("The input id is ",sid);
    return Seller.findOne({
        where:{id:sid},
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    })
    .then(async(data)=>{
        if(data){
            let auctioner=await Auction.findAndCountAll({
                where:{SellerId:sid},
                attributes:["id"]
            });
            let response={data:"",count:""};
            console.log("Auctioner",auctioner)
            response.count=auctioner.count;
            response.data=data;
            res.send(response)
        }else{
            console.log("No data")
            res.status(400).send("No seller with this id")
        }
    })
    .catch(err=>{
        console.log("The error is ",err);
        res.sendStatus(500)
    })
})
router.post('/auction',checkAuthorization,(req,res)=>{
    let aid=req.body.aid;
    console.log("aid",aid)
    let response={
        detail:"",
        pictures:""};
    console.log("running get auction ");
    return Auction.findOne({
        where: { id: aid },
    })
        .then(async(data) => {
        if(data){
            console.log("data",data)
            response.detail=data;
            let pic=await Pictures.findAll({where:{AuctionId:data.id}})
            console.log("pic",pic)
            response.pictures=pic;
            res.send(response);
        }else{
            res.status(400).send("No auction with this id")
        }
        })
    .catch((err) => {
    res.sendStatus(500);
    });
})
router.get('/notification',checkAuthorization,async(req,res)=>{
    console.log("fetching notification");
  let page = req.query.page == null ? 1 : req.query.page;
  console.log("The page is ",page)
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
      console.log("Error fetching",err)
      res.sendStatus(500);
    });
}) 
router.get('/newnotification',checkAuthorization,async(req,res)=>{
    console.log("fetching notification")
    let uid=req.user;
    return Notification.findAndCountAll({
        where:{uid:uid,read:true
        }
    }).then( async data=>{
        if(data){
            console.log(data);
            let nopage = parseInt(data.count);
            res.send({"nopage":nopage});
          }else{
            res.send(0);
          }
    }).catch(err=>{
        res.sendStatus(500)
    })
  
  }) 
router.post('/deleteauction',checkAuthorization,async(req,res)=>{
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
})
router.post('/deletseller',checkAuthorization,async (req,res)=>{
    let sid=req.body.sid;
    try {
        await Seller.destroy({
            where:{id:sid}
        })
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log("The error occuted is ",error)
    }
}
)
router.get('/myprofile',checkAuthorization,(req,res)=>{
    let uid=req.user;
    return Admin.findOne({
        where:{id:uid},
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    }).then((data)=>{
        res.send(data);
    }).catch(err=>{
        console.log("The error occures is ",err);
        res.status(500).send("Internal Server Error");
    })
})
router.post('/changepassword',checkAuthorization,async(req,res)=>{
    let {pp, np, cp}=req.body;
    let uid=req.user;
    console.log(req.body)
    if(np==cp){
        return Admin.findOne({
            attributes:[
                "password"
            ],
            where:{cid:uid}
        })
        .then(async (data)=>{
            const check=await bcrypt.compare(pp,data.password);
            if(check){  
                console.log("true")
                const hash = await bcrypt.hashSync(np, bcrypt.genSaltSync(10));
                return Admin.update({
                    password:hash
                },{
                    where:{cid:uid}
                }).then((data)=>{
                    console.log("successful update")
                    if(data){
                        res.status(200).send("ok");
                    }
                })
            }else{
                console.log("false")
                res.status(404).send("password error");
            }
        })
        .catch((err)=>{
            console.log(err);
            res.status(404);
        })
    
    }else{
        res.status(400).send("Enter similar password")
    }
})
router.get('/closedbid',checkAuthorization,async(req,res)=>{
    let limit = 1;
    let no_response = 20;
    console.log("The page is ",req.query.page);
    let page = req.query.page == null ? 1 : req.query.page;
    let jumpingSet = (page - 1) * no_response;
    console.log("Fetching the closed bid")
    return ClosedBid.findAndCountAll({
        order: [["createdAt", "DESC"]], 
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
    .catch((err)=>{
        console.log("The closed bid fetching error is  ",err);
        res.sendStatus(500)
    }) 
})
router.get('/reports',(req,res)=>{
    // return ReportedAuction.findAll({
    //     include:{model:Auction}
    // })
    let limit = 1;
    let no_response = 20;
    console.log("The page is ",req.query.page);
    let page = req.query.page == null ? 1 : req.query.page;
    let jumpingSet = (page - 1) * no_response;
    console.log("Fetching the reports")
    return ReportedAuction.findAndCountAll({
        order: [["createdAt", "DESC"]], 
        offset: jumpingSet,
        limit: no_response,
        include:{model:Auction}
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
    .catch((err)=>{
        console.log("The closed bid fetching error is  ",err);
        res.sendStatus(500)
    }) 
})


module.exports=router;