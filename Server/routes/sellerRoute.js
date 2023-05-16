require("dotenv");
const {sequelize}=require('../models');
const jwt =require('jsonwebtoken');
const bcrypt=require("bcrypt");
const router=require('express').Router();
const fs=require('fs');
var bodyParser = require('body-parser');
const cors=require("cors");

const date = new Date();
const{Admin,Auction,Banker,Bid,Buyer,Category,ClosedBid,Notification,Payment,Pictures,Product,Seller,Transaction}=sequelize.models;

let filname;
const multer =require('multer');
const path=require("path");
var jsonParser = bodyParser.json();
const { urlencoded } = require('express');
// const Deletefiles = require('../deletefile');
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
            cb(null,'./dbImages')
    }
    ,filename:(req,file,cb)=>{
        filname=Date.now()+ Math.round(Math.random()*1000)+ path.extname(file.originalname) ;
        cb(null,filname)
    }
})
const multerFilter=(req,file,cb)=>{
    console.log("The file is ",file)
    if(file.mimetype=="image/png"|| file.mimetype=="image/jpg"|| file.mimetype=="image/jpeg" ){
        cb(null,true);
    }else{
        return cb(new Error("type error"),false);
    }
}
const upload=multer({
    storage:storage,
    fileFilter:multerFilter,
    
}).fields([
    {name:"imgCollection",maxCount:7}
]);
router.use(jsonParser);
router.use(cors({
    origin: ['http://localhost:7494','http://127.0.0.1:3000','http://127.0.0.1:5173'],
    credentials:true,
}));
const authorizeSeller=async(req,res,next)=>{
    console.log(req.body);
    
    let {username,password}=req.body;
    console.log("username",username);
    console.log("password",password);
    return Seller.findOne(
        {
            where: {
                phonenumber:username,
        },
        attributes:['id','password']
        }
    ).then(async(data)=>{
        console.log("the data is ",data);
        const find={
            allow:false,
            uid:null
        }
        if (data) {
            const hashed=data.password;
            const compared=await bcrypt.compare(password,hashed);
            if(compared){
                console.log("correct password")
                find.uid=data.id;
                find.allow=true;
                return find;
            }else{
                console.log("Invalid  password")
                return find;
            }
        }
        else{
            return find;
        }
    }).then(async (find)=>{
        console.log("the find is ",find);
    if(find.allow)
    {  
        const user=find.uid;
        const accessToken=await jwt.sign(user,
            process.env.REFRESH_TOKEN_SECRET);
        console.log("accessToken",accessToken);
        res.cookie("u",accessToken,{httpOnly:true,sameSite:"none",secure:"false",maxAge:7200000});
        // res.cookie("ab","refreshed token",{httpOnly:true,sameSite:"none",secure:"false"});
        next();
    }
    else {
        console.log(find);
        res.status(400).send("error username or password");
    }
    })
    .catch((err)=>{
        console.log("The error occures is  " +err);
        res.sendStatus(500);
    })
}
const checkAuthorizationSeller=async(req,res,next)=>{
    console.log("cookies",req.cookies)
    // console.log("cookies",req.headers)
    if(req.cookies.u){
        const token=req.cookies.u;
        if(token==null){
            res.status(403).send("not logged in")
        }
        jwt.verify(
            token,process.env.REFRESH_TOKEN_SECRET,
            (err,user)=>{
                if(err){
                    console.log("Token error is ",err)
                    res.status(403).send("not logged in");
                }
                req.user=user;
                next();
            }
        )
    }
    else if(req.headers.cookies){
        let contentincookie=req.headers.cookies;
        const token=contentincookie.slice(0);
        jwt.verify(
            token,process.env.ACCESS_TOKEN_SECRET,
            (err,user)=>{
                if(err){
                    res.sendStatus(403);
                }
                req.user=user;
                next();
            }
        )
    }
    else{
        res.sendStatus(403);
    }
}

// Seller registration
router.post('/register',async(req,res)=>{
    let {fname,lname,region,city,phonenumber,password}=req.body;
    console.log(req.body);
        const hash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        return Seller.create({
            id:"",
            fname:fname, 
            lname:lname,
            password:hash,
            phonenumber:phonenumber,
            city:city,
            region:region,
            type:"seller"
        }).then(()=>{
            res.status(200).send("registeration verified");
        }).catch((err)=>{
            console.log(err);
            res.status(500).send("some thing went wrong ");
        })
    
})
// change profile
router.post('/changepp',checkAuthorizationSeller,async(req,res)=>{
    let {fname,lname,email,region,city}=req.body;
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
    let uid=req.user;
    let=a=req.body;
    console.log("a",a);
    // console.log("fname",fname);
    // console.log("lname",lname);
    // res.sendStatus(200);
    return Seller.update({
        fname:fname,
        lname:lname,
        email:email,
        region:region,
        city:city
    },{
        where:{cid:uid}
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
  
})
// change password
router.post('/changepassword',checkAuthorizationSeller,async(req,res)=>{
    let {pp, np, cp}=req.body;
    let uid=req.user;
    console.log(req.body)
    if(np==cp){
        return Seller.findOne({
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
                return Customer.update({
                    password:hash
                },{
                    where:{cid:uid}
                }).then((data)=>{
                    console.log("succesful update")
                    if(data){
                        res.status(200).send("ok");
                    }
                })
            }else{
                console.log("false")
                res.sendStatus(404);
            }
        })
        .catch((err)=>{
            console.log(err);
            res.status(404);
        })
    
    }
})
// seller login
router.post('/login',authorizeSeller,(req,res)=>{
    res.sendStatus(200);
})

//seller notification
router.get('/notification',checkAuthorizationSeller,async(req,res)=>{
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
    })

}) 

// create auction
router.post('/upload',
(req,res)=>{
    // console.log("REWq",req)
    // let {name,region,city,baseprice,startdate,enddate,description}=req.body;
    // return Auction.create({
    //     id:"",
    //     name:name,
    //     description:description,
    //     region:region,
    //     city:city,
    //     baseprice: baseprice,
    //     startdate:startdate,
    //     enddate:enddate,
    //     hammerprice:0,
    //     see:"",
    //     state:"",
    //     SellerId:"2255c9691651bede"
    // }).then(async data=>{
    //     res.status(200).send(' <div style="color:red; position:absolute;left:20%;top:20%;width:50%;height:50%"> <h1> SuccessFull Upload <h1>  <hr>  <a href="http://localhost:3000/selhome"> back<a/> </div> ')
    // }).catch(err=>{
    //     console.log(err);  // 2023-03-24 07:42:30
    //     res.sendStatus(500);
    // }) 
    upload(req,res,function (err) {
        // console.log(err);
    // if(err instanceof multer.MulterError){
    //     console.log("error occured");
    //     console.log(err);
    //     res.send("error file type");
    // }
    // else if(err){
    //     console.log("we are in this this shit");
    //     res.send(err);
    // }
        const savedfiles=req.files;
        console.log("body",req.body);
        console.log("files",req.file);
        console.log("files",req.files);
        console.log("saved",savedfiles)
        let uid=req.user;
        // let {name,location,baseprice,startdate,enddate,description}=req.body;
        // baseprice=Number(baseprice);
        let picturess=[];
        let pid=0; 
        // let letmeSee=savedfiles.image[0].filename;
        console.log(picturess)
        let letid;
        res.sendStatus(200);
        // return Auction.create({
        //     name:name,
        //     description:description,
        //     location:location,
        //     baseprice: baseprice,
        //     startdate:startdate,
        //     enddate:enddate,
        //     hammerprice:0,
        //     see:letmeSee,
        //     state:"",
        //     SellerId:"2255c9691651bede"
        // }).then(data=>{
        //         let pid=data.pid;
        //         letid=pid;
        //         let picturess=[];
        //         savedfiles.image.map((item)=>{
        //             picturess.push({
        //                 "picpath":item.filename,
        //                 "type":"image",
        //                 "ProductPid":pid
        //             })
        //         })
        //         return  Pictures.bulkCreate(picturess)
        // }).then(async data=>{
        //     await Product.update({
        //         letmeSee:data[0].id
        //     },{where:{
        //         pid:letid
        //     }})
        //     res.status(200).send(' <div style="color:red; position:absolute;left:20%;top:20%;width:50%;height:50%"> <h1> SuccessFull Upload <h1>  <hr>  <a href="http://localhost:3000/selhome"> back<a/> </div> ')
        // }).catch(err=>{
        //     console.log(err);
        //     res.sendStatus(500);
        // }) 

    }
    )}
)
// delete auction
router.post('/deleteauction',async(req,res)=>{
    let aid=req.body.aid;
    try {
    let bidders=await Bid.findAll(
        {
            where:{AuctionId:aid}
        }
    )
    if(bidders){
        bidders.map(async(bidder)=>{
            let prevbidprice=Number(bidder.bidprice);
        await Bid.update({
                bidprice:prevbidprice+100,
                where:{
                    id:bidder.id
                }
            })
        await Notification.create({
                id:"",
                AuctionId:aid,
                BuyerId:bidder.BuyerId,
                message:`The auction you were  participating on has been deleted by the 
                auctioner, your account has been recharged by ${bidder.bidprice}`
        })
        })
        await Auction.destroy({
            where:{
                id:aid
            }
        })
        
        res.sendStatus(200);
    }else{
        await Auction.destroy({where:{id:aid}});
        res.sendStatus(200);
    }
} catch (error) {
      console.log("The error was ",err);
      res.sendStatus(500);  
}
})
// my auction
router.get("/myauction",checkAuthorizationSeller,(req,res)=>{
    let uid=req.user;
    return Auction.findAll({
        where:{id:uid}
    }).then((data=>{
        res.send(data);
        }))
})
/
router.get('/h',(req,res)=>{
    let now=formatDate(new Date());
    console.log("The current date is" ,now);
    res.sendStatus(200)
})
function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }
function padTo2Digits(num) {
return num.toString().padStart(2, '0');
}
module.exports=router;