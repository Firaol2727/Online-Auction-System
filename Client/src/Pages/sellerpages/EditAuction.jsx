import { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Button,
  List,
  Link,
  ListItem,
  IconButton,
  LinearProgress,
} from "@mui/material";
import SellerNavbar from "./selnav";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChartDisplay from './chartDisplay';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const getDateform = (formdate) => {
  const date = new Date(formdate);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};
const EditAuction = () => {
  let itemid = useParams();
  const api = axios.create({ baseURL: "http://localhost:5000/sel" });
  const [auct, setauct] = useState();
  const [pics, setpics] = useState();
  let auctioner;
  let picter;
  let item;
  const [bidders, setbidders] = useState();
  const [error, seterror] = useState(false);
  const [hasdata, sethasdata] = useState(false);
  const nav = useNavigate();
  const [id, setid] = useState(0);
  const [imglength, setimglength] = useState(0);
  const [loading, setloading] = useState(true);
  const [imgdisplay, setimgdisplay] = useState("");
  const [dload, setdload] = useState(false);
  const handledelete=(id)=>{
    setdload(true)
    api.post('/deleteauction',{"aid":id},{withCredentials:true}).then(res=>{
        if (res.status==200) {
            setdload(false);
            nav('/sel/home')
        }
    }).catch(err=>{
        setdload(false);
        console.log(err)
    })
}
  useEffect(() => {
    setloading(true);
    let id = itemid.id;
    api
      .get(`/moreon/${id}`, { withCredentials: true })
      .then((response) => {
        console.log("The item id is ", itemid);
        console.log("response", response.status);
        if (response.status == 200) {
          console.log("response", response.data);
          let hasdat = response.data;
          if (hasdat) {
            setauct(hasdat.detail);
            item = hasdat.detail;
            picter = hasdat.pictures;
            auctioner = hasdat.bidders;
            sethasdata(true);
            setpics(hasdat.pictures);
            setimgdisplay(item.see);
            setimglength(hasdat.pictures.length);
            setloading(false);
            setbidders(hasdat.bidders)
          } else {
            sethasdata(false);
            setloading(false);
          }
          console.log("auct", auct);
          console.log("pictures", pics);
        } else if (res.status == 403) {
          nav("/sel/login");
        } else {
          seterror(true);
          setloading(false);
          sethasdata(false);
        }
      })
      .catch((err) => {
        console.log("The item id is err ", itemid);
        if (err.response != null) {
          if (err.response.status === 403) {
            nav("/sel/login");
          }
        }
        console.log("Error", err);
        seterror(true);
        setloading(false);
        sethasdata(false);
      });
  }, []);
  function changePictures(type) {
    if (id == 0 && type == 0) {
      return;
    } else if (type == 1 && id == imglength - 1) {
      return;
    } else if (id <= imglength) {
      if (type == 0) {
        let a = id - 1;
        setid(a);
        console.log("decrement", a);
        setimgdisplay(pics[a].id);
        console.log("new id ", pics[id].id);
      } else if (type == 1) {
        let a = id + 1;
        setid(a);
        console.log("increment", a);
        setimgdisplay(pics[a].id);
        console.log("new id ", pics[id].id);
      }
    } else {
      return;
    }
  }
  function onchangepic(index) {
    setimgdisplay(index);
  }
  return (
    <div>
      <SellerNavbar />
      <chartDisplay />
      {!loading && hasdata && 
        <Box
          sx={{
            position: "absolute",
            marginTop: "50px",
            height: "130%",
            backgroundColor: "white",
            left: {
              sm: "10%",
              xs: "0px",
            },
            width: {
              sm: "80%",
              xs: "100%",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              marginTop: "50px",
              backgroundColor: "white",
            }}
          >
            <Stack direction={{ sm: "row", xs: "column" }} spacing={3}>
              <Box
                className="picture"
                style={{
                  backgroundColor: "white",
                }}
              >
                <Stack direction={"column"} gap={2}>

                
                <Stack
                  direction={{ sm: "row", xs: "column-reverse" }}
                  spacing={1}
                >
                  <Box
                    sx={{
                      // position:"relative",
                      marginTop: "6px",
                      marginRight: "6px",

                      border: "1px grey solid",
                      width: { sm: "82px", xs: "100%" },
                      // display:"flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: { sm: "column", xs: "row" },
                      maxHeight: { sm: "400px", xs: "90px" },
                      overflow: "scroll",
                      overflowX: "hidden",
                      overflowY: "hidden",
                    }}
                  >
                    {pics.map((pic) => (
                      // <Box sx={{
                      //     position:"relative",

                      //     marginTop:"5px",
                      //     backgroundColor:"pink",
                      // }
                      // }>
                                        // </Box>
                                        <img
                                        className="auctionImage"
                                        key={pic.id}
                                        alt="auctionImage"
                                        src={`http://localhost:5000/images/${pic.id}`}
                                        onClick={()=>{onchangepic(pic.id)}}
                                        style={{
                                            position:"relative",
                                            marginTop:"5px",
                                            marginRight:"5px",
                                            width:"80px",
                                            height:"80px" }}
                                    />
                                    ))}
                  </Box>
                  <Box className="picture" sx={{
                      position:"relative",
                      display:"flex",
                      width:{sm:"370px",xs:"100%"},
                      height:"400px",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor:"lightgrey"
                  }}><center><img
                  className="auctionImage"
                  alt="auctionImage"
                  src={`http://localhost:5000/images/${imgdisplay}`}
                  style={{ width:"100%" }}
              /></center>
                        
                      <IconButton onClick={()=>{changePictures(0)}} sx={{position:"absolute",top:"40%",left:"0%"
                  }}><NavigateBeforeIcon/></IconButton>
                      <IconButton onClick={()=>{changePictures(1)}} sx={{position:"absolute",top:"40%",right:"0%"
                  }}><NavigateNextIcon/></IconButton>
                  </Box>
                  
                </Stack>
                <h2>Hello Nuchereta members </h2>
                <ChartDisplay />
                </Stack>
                            </Box>
                        <Box  className="description"style={{
                            height:"120%",
                            padding:"5px",
                            backgroundColor:"white"
                        }}>
                            <Stack direction={"row"} spacing={2}> 
                                <div style={{fontSize:"18px",color:"black",fontWeight:"bold"  }}>Name</div> 
                                <div style={{fontSize:"17px",color:"black"  }}>{auct.name}</div> 
                            </Stack> <br />
                            <Stack direction={"row"} spacing={2}> 
                                <div style={{fontSize:"18px",color:"black" ,fontWeight:"bold"   }}>Base price</div> 
                                <div style={{fontSize:"17px",color:"black"  }}>{auct.baseprice} ETB</div> 
                            </Stack> <br />
                            <Stack direction={"row"} spacing={2}> 
                                <div style={{fontSize:"18px",color:"black" ,fontWeight:"bold"   }}>Hammer price</div> 
                                <div style={{fontSize:"17px",color:"black"  }}>{auct.hammerprice} ETB</div> 
                            </Stack>
                            <br />
                            <Stack direction={"row"} spacing={2}> 
                                <div style={{fontSize:"18px",color:"black" ,fontWeight:"bold"   }}>Status</div> 
                                <div style={{fontSize:"17px",color:"black"  }}>{auct.state}</div> 
                            </Stack>
                            <br />
                            <Stack direction={"row"} spacing={1}> 
                                <LocationOnIcon />
                                {/* <div style={{fontSize:"18px",color:"black" ,fontWeight:"bold"   }}>Location</div>  */}
                                <div style={{fontSize:"17px",color:"black" }}>{auct.city},{auct.region}</div> 
                            </Stack>
                            <br />
                            <Stack direction={"row"} spacing={1}> 
                                <div style={{fontSize:"18px",color:"black" ,fontWeight:"bold"   }}>Start Date</div> 
                                {/* <div style={{fontSize:"18px",color:"black" ,fontWeight:"bold"   }}>Location</div>  */}
                                <div style={{fontSize:"17px",color:"green"  }}>{ getDateform(auct.createdAt)}</div> 
                            </Stack>
                            <br />
                            <Stack direction={"row"} spacing={1}> 
                                <div style={{fontSize:"18px",color:"black" ,fontWeight:"bold"   }}>End Date</div> 
                                {/* <div style={{fontSize:"18px",color:"black" ,fontWeight:"bold"   }}>Location</div>  */}
                                <div style={{fontSize:"17px",color:"red" }}> {getDateform(auct.enddate) }</div> 
                            </Stack>
                            <br></br>
                            <h3>Decription</h3>
                            <p>{auct.description}</p>
                            <br />
                            
                            { bidders &&
                            <div><h3>Bidders</h3>
                            <table id="report">
                            <thead >
                                <th>No</th>
                                <th>Name</th>
                                <th>Offer</th>
                                <th>phone</th>
                                <th>Date</th>
                            </thead>
                                {
                                    bidders.map((bidder)=>(
                                        <thead  key={bidder.id}>
                                            <tr>
                                            <td>1</td>
                                            <td>{bidder.fname?bidder.fname+bidder.lname:""}</td>
                                            <td>{bidder.Bid.bidprice?bidder.Bid.bidprice :""}</td>
                                            <td>{bidder.phonenumber?bidder.phonenumber:""}</td>
                                            <td>{bidder.Bid.biddate? new Date(bidder.Bid.biddate).toLocaleString():""}</td>
                                        </tr>
                                        
                                        </thead>
                                    ))
                                }
                            </table>
                            <br />  <br />
                            </div>}
                            <h4>Final Bid Report </h4> 
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta, quisquam. Omnis suscipit, maiores, sapiente odio libero nostrum ex corrupti nemo nesciunt repudiandae at mollitia dolore, quaerat excepturi! Illum, vero laudantium.</p>
                            
                            <br />  <br /> 
                            <Button color="error" variant='contained' disabled={dload} onClick={()=>{
                                handledelete(auct.id)}}> {dload? <p>Deleting...</p>: <p>Delete</p>}</Button>
                            <br />  <br /> <br />  <br />
                            
                            </Box>
                        </Stack>

                </Box>
            </Box>}
        {(!loading && !hasdata) && <center><h2> Page Not found</h2></center>}
          {loading && <center><h2 sx={{position:"absolute",top:"48%",width:"100px"}}><LinearProgress/> </h2></center>}
           
        </div>
  );}
export default EditAuction;
