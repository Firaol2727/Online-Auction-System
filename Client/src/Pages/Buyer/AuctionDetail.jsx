// import NavBuyer from "../../Layouts/NavBar/NavBuyer";
// import Footer from "../../Layouts/Footer/Footer";
// import { useState } from "react";

// import { useParams, NavLink } from "react-router-dom";

// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Divider from "@mui/material/Divider";
// import InputAdornment from "@mui/material/InputAdornment";
// import { styled } from "@mui/material/styles";
// import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
// import MuiAccordion from "@mui/material/Accordion";
// import MuiAccordionSummary from "@mui/material/AccordionSummary";
// import MuiAccordionDetails from "@mui/material/AccordionDetails";

// import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
// // import ExpandCircleUpOutlinedIcon from "@mui/icons-material/ExpandCircleUpOutlined";
// import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
// import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
// import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
// import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";

// const Accordion = styled((props) => (
//   <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//   border: `1px solid ${theme.palette.divider}`,
//   "&:not(:last-child)": {
//     borderBottom: 0,
//   },
//   "&:before": {
//     display: "none",
//   },
// }));

// const AccordionSummary = styled((props) => (
//   <MuiAccordionSummary
//     expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === "dark"
//       ? "rgba(255, 255, 255, .05)"
//       : "rgba(0, 0, 0, .03)",
//   flexDirection: "row-reverse",
//   "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//     transform: "rotate(90deg)",
//   },
//   "& .MuiAccordionSummary-content": {
//     marginLeft: theme.spacing(1),
//   },
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderTop: "1px solid rgba(0, 0, 0, .125)",
// }));

// function AuctionDetail() {
//   const [expanded, setExpanded] = useState("panel1");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [bid, setBid] = useState("");
//   function handleBidValue() {
//     if (bid < 1) {
//       console.log("clicked bid value", bid);
//     }
//   }

//   const handleChange = (panel) => (event, newExpanded) => {
//     setExpanded(newExpanded ? panel : false);
//   };

//   return (
//     <>
//       <NavBuyer />
//       <div
//         style={{
//           textAlign: "center",
//           paddingTop: "30px",
//           backgroundColor: "white",
//         }}
//       >
//         <Box sx={{ display: "flex", flexDirection: "row" }}>
//           <Box>
//             <NavLink to="/">
//               <IconButton
//                 // color="inherit"
//                 sx={{ color: "#081263 " }}
//               >
//                 <ChevronLeftOutlinedIcon />

//                 <Typography sx={{ margin: "8px" }}>
//                   {" "}
//                   Back to auctions
//                 </Typography>
//               </IconButton>
//             </NavLink>
//           </Box>
//         </Box>
//         <Box
//           className="productContainer"
//           sx={{
//             marginLeft: {
//               xs: "1%",
//               sm: "2%",
//               md: "3%",
//               lg: "4%",
//             },
//             marginRight: {
//               xs: "1%",
//               sm: "2%",
//               md: "3%",
//               lg: "4%",
//             },
//             position: "relative",
//             backgroundColor: "white",
//             paddingTop: "20px",
//             // display: "flow-root",

//             display: "flex",

//             flexDirection: {
//               lg: "row",
//               md: "row",
//               sm: "row",
//               xs: "column",
//             },
//           }}
//         >
//           <Divider sx={{ backgroundColor: "grey" }} />
//           <Box
//             className="leftContainer"
//             sx={{
//               float: {
//                 lg: "left",
//                 md: "left",
//                 sm: "left",
//               },
//               width: {
//                 lg: "50%",
//                 md: "50%",
//                 sm: "50%",
//                 xs: "100%",
//               },
//               backgroundColor: "#F7F7F7",
//               paddingTop: "10px",
//             }}
//           >
//             <Box
//               className="totalImageContainer"
//               sx={{
//                 width: {
//                   lg: "80%",
//                   md: "80%",
//                   sx: "100%",
//                   xs: "100%",
//                 },
//               }}
//             >
//               <Box
//                 sx={{
//                   width: "79%",
//                   height: "50%",
//                   float: "right",
//                   // borderLeft: "1px solid #D1D1D1",
//                   // height:"20%",
//                 }}
//               >
//                 <img
//                   style={{ width: "100%" }}
//                   src="/Imges/Auction/6.jpg"
//                   alt="photo"
//                 />
//               </Box>

//               <Box
//                 className="ImageButtons"
//                 sx={{ width: "20%", float: "left", paddingTop: "1px" }}
//               >
//                 <Button
//                   sx={{
//                     textAlign: "center",
//                     marginRight: {
//                       lg: "20px",
//                       md: "15px",
//                       sm: "10px",
//                       xs: "5px",
//                     },
//                   }}
//                 >
//                   <KeyboardArrowUpOutlinedIcon
//                     size="large"
//                     sx={{ color: "red", fontSize: "40px" }}
//                   />
//                 </Button>
//                 <Box
//                   sx={{
//                     paddingRight: {
//                       lg: "20px",
//                       md: "15px",
//                       sm: "10px",
//                       xs: "5px",
//                     },

//                     "&:hover": {
//                       opacity: [1.5, 1.5, 1.5],
//                       scale: "1.2",
//                     },
//                   }}
//                 >
//                   <Button>
//                     <img
//                       style={{ width: "100%" }}
//                       src="/Imges/Auction/2.jpg"
//                       alt="photo"
//                     />
//                   </Button>
//                 </Box>
//                 <Box
//                   sx={{
//                     // display: "block",
//                     paddingRight: {
//                       lg: "20px",
//                       md: "15px",
//                       sm: "10px",
//                       xs: "5px",
//                     },

//                     "&:hover": {
//                       opacity: [1.5, 1.5, 1.5],
//                       scale: "1.2",
//                     },
//                   }}
//                 >
//                   <Button>
//                     <img
//                       style={{ width: "100%" }}
//                       src="/Imges/Auction/7.jpg"
//                       alt="photo"
//                     />
//                   </Button>
//                 </Box>
//                 <Box
//                   sx={{
//                     // display: "block",
//                     paddingRight: {
//                       lg: "20px",
//                       md: "15px",
//                       sm: "10px",
//                       xs: "5px",
//                     },

//                     "&:hover": {
//                       opacity: [1.5, 1.5, 1.5],
//                       scale: "1.2",
//                     },
//                   }}
//                 >
//                   <Button onClick={{}}>
//                     <img
//                       style={{ width: "100%" }}
//                       src="/Imges/Auction/2.jpg"
//                       alt="photo"
//                     />
//                   </Button>
//                 </Box>
//                 <Box
//                   sx={{
//                     // display: "block",
//                     paddingRight: {
//                       lg: "20px",
//                       md: "15px",
//                       sm: "10px",
//                       xs: "5px",
//                     },

//                     "&:hover": {
//                       opacity: [1.5, 1.5, 1.5],
//                       scale: "1.2",
//                     },
//                   }}
//                 >
//                   <Button onClick={{}}>
//                     <img
//                       style={{ width: "100%" }}
//                       src="/Imges/Auction/6.jpg"
//                       alt="photo"
//                     />
//                   </Button>
//                 </Box>

//                 <Button
//                   sx={{
//                     textAlign: "center",
//                     marginRight: {
//                       lg: "20px",
//                       md: "15px",
//                       sm: "10px",
//                       xs: "5px",
//                     },
//                   }}
//                   onClick={{}}
//                 >
//                   <ExpandMoreOutlinedIcon
//                     size="large"
//                     sx={{ color: "red", fontSize: "40px" }}
//                   />
//                 </Button>
//               </Box>
//             </Box>
//           </Box>
//           <Box
//             className="rightContainer"
//             sx={{
//               float: {
//                 lg: "right",
//                 md: "right",
//                 ms: "right",
//               },
//               width: {
//                 lg: "49%",
//                 md: "49%",
//                 sx: "49%",
//                 xs: "100%",
//               },
//               paddingTop: "20px",
//               backgroundColor: "#F7F7F7",
//               // textAlign: "center",
//             }}
//           >
//          <Box className="Topic">
//               <Typography sx={{ float: "right", color: "red" }}>
//                 Active
//               </Typography>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "row",
//                   paddingLeft: "1%",
//                 }}
//               >
//                 <AccessTimeOutlinedIcon sx={{ color: "red" }} />
//                 <Typography sx={{ paddingLeft: "5px", paddingRight: "1%" }}>
//                   Remaining Time
//                 </Typography>
//                 <Typography sx={{ paddingLeft: "10px" }}>23.45.23</Typography>
//               </Box>
//               <Typography sx={{ paddingTop: "30px" }} className="title">
//                 Lot 4: ANTIQUE/VINTAGE EMPIRE DESK "PICKUP ONLY"
//               </Typography>
//             </Box>
//             <Divider />
//             <Typography
//               sx={{
//                 backgroundColor: "#E1DDDD ",
//                 float: "right",
//                 width: "100px",
//               }}
//             >
//               16 bids
//             </Typography>
//             <Box
//               className="bid"
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 paddingTop: "30px",
//                 textAlign: "center",
//               }}
//             >
//               <div>
//                 Leading Price
//                 <Typography sx={{ color: "red" }}>$300</Typography>
//               </div>
//               <div>
//                 Minimum increase
//                 <Typography sx={{ color: "red" }}>$300</Typography>
//               </div>
//               <Box className="placeBid" sx={{ alignItem: "center" }}>
//                 <Typography sx={{ marginTop: "10px", marginRight: "10px" }}>
//                   {" "}
//                   Place your bid
//                 </Typography>

//                 <TextField
//                   type="number"
//                   onChange={(e) => setBid(e.target.value)}
//                   value={bid}
//                   inputProps={{
//                     style: {
//                       height: "10px",
//                     },
//                   }}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">$</InputAdornment>
//                     ),
//                   }}
//                 />
//               </Box>
//               <Button
//                 sx={{ textTransform: "unset", fontSize: "20px" }}
//                 onClick={handleBidValue}
//               >
//                 Submit{" "}
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//         <Divider
//           sx={{
//             marginTop: "20px",
//             marginLeft: {
//               xs: "1%",
//               sm: "2%",
//               md: "3%",
//               lg: "4%",
//             },
//             marginRight: {
//               xs: "1%",
//               sm: "2%",
//               md: "3%",
//               lg: "4%",
//             },
//           }}
//         />

//         <Box className="Description">
//           <Typography>Description</Typography>
//           <Accordion
//             expanded={expanded === "panel1"}
//             onChange={handleChange("panel1")}
//           >
//             <AccordionSummary
//               aria-controls="panel1d-content"
//               id="panel1d-header"
//             >
//               <Typography> Item overview</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//                 eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//                 eget.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//           <Accordion
//             expanded={expanded === "panel2"}
//             onChange={handleChange("panel2")}
//           >
//             <AccordionSummary
//               aria-controls="panel2d-content"
//               id="panel2d-header"
//             >
//               <Typography>Auction detail</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//                 eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//                 eget.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//           <Accordion
//             expanded={expanded === "panel3"}
//             onChange={handleChange("panel3")}
//           >
//             <AccordionSummary
//               aria-controls="panel3d-content"
//               id="panel3d-header"
//             >
//               <Typography>Seller detail</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//                 eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//                 eget.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//         </Box>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default AuctionDetail;

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
  Typography,
  Divider,
} from "@mui/material";

import NavBuyer from "../../Layouts/NavBar/NavBuyer";
import Footer from "../../Layouts/Footer/Footer";

import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
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
const AuctionDetail = () => {
  let itemid = useParams();

  const api = axios.create({ baseURL: "http://localhost:5000/" });
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
  useEffect(() => {
    setloading(true);
    let id = itemid.id;

    api
      .get(`/details/${id}`, { withCredentials: true })
      .then((response) => {
        console.log("The item id is ", itemid);
        console.log("response", response.status);
        if (response.status == 200) {
          console.log("response", response.data);
          let hasdat = response.data;
          if (hasdat) {
            setauct(hasdat);
            item = hasdat.detail;
            picter = hasdat.Pictures;
            auctioner = hasdat.bidders;
            sethasdata(true);
            setpics(hasdat.Pictures);
            setimgdisplay(hasdat.see);
            setimglength(hasdat.Pictures.length);
            setloading(false);
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
        console.log("The item id is err ", err);

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
  const handledelete = (id) => {
    setdload(true);
    api
      .post("/delete", { id })
      .then((res) => {
        if (res.status == 200) {
          setdload(false);
          nav("/sel/selhome");
        }
      })
      .catch((err) => {
        setdload(false);
        nav("/sel/selhome");
        console.log(err);
      });
  };
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
      <NavBuyer />

      {!loading && hasdata && (
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
                        onClick={() => {
                          onchangepic(pic.id);
                        }}
                        style={{
                          position: "relative",
                          marginTop: "5px",
                          marginRight: "5px",
                          width: "80px",
                          height: "80px",
                        }}
                      />
                    ))}
                  </Box>
                  <Box
                    className="picture"
                    sx={{
                      position: "relative",
                      display: "flex",
                      width: { sm: "370px", xs: "100%" },
                      height: "400px",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "lightgrey",
                    }}
                  >
                    <center>
                      <img
                        className="auctionImage"
                        alt="auctionImage"
                        src={`http://localhost:5000/images/${imgdisplay}`}
                        style={{ width: "100%" }}
                      />
                    </center>

                    <IconButton
                      onClick={() => {
                        changePictures(0);
                      }}
                      sx={{ position: "absolute", top: "40%", left: "0%" }}
                    >
                      <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        changePictures(1);
                      }}
                      sx={{ position: "absolute", top: "40%", right: "0%" }}
                    >
                      <NavigateNextIcon />
                    </IconButton>
                  </Box>
                </Stack>
              </Box>
              <Box
                className="description"
                style={{
                  height: "120%",
                  padding: "5px",
                  backgroundColor: "white",
                }}
              >
                <Box className="Topic">
                  <Typography sx={{ float: "right", color: "red" }}>
                    Active
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      paddingLeft: "1%",
                    }}
                  >
                    <AccessTimeOutlinedIcon sx={{ color: "red" }} />
                    <Typography sx={{ paddingLeft: "5px", paddingRight: "1%" }}>
                      Remaining Time
                    </Typography>
                    <Typography sx={{ paddingLeft: "10px" }}>
                      23.45.23
                    </Typography>
                  </Box>
                  <Typography sx={{ paddingTop: "30px" }} className="title">
                    Lot 4: ANTIQUE/VINTAGE EMPIRE DESK "PICKUP ONLY"
                  </Typography>
                </Box>
                <Divider />
                <Typography
                  sx={{
                    backgroundColor: "#E1DDDD ",
                    float: "right",
                    width: "100px",
                  }}
                >
                  16 bids
                </Typography>
                <Box
                  className="bid"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "30px",
                    textAlign: "center",
                  }}
                >
                  <div>
                    Leading Price
                    <Typography sx={{ color: "red" }}>$300</Typography>
                  </div>
                  <div>
                    Minimum increase
                    <Typography sx={{ color: "red" }}>$300</Typography>
                  </div>
                  <Box className="placeBid" sx={{ alignItem: "center" }}>
                    <Typography sx={{ marginTop: "10px", marginRight: "10px" }}>
                      {" "}
                      Place your bid
                    </Typography>

                    <TextField
                      type="number"
                      // onChange={(e) => setBid(e.target.value)}
                      // value={bid}
                      inputProps={{
                        style: {
                          height: "10px",
                        },
                      }}
                      // InputProps={{
                      //   startAdornment: (
                      //     <InputAdornment position="start">$</InputAdornment>
                      //   ),
                      // }}
                    />
                  </Box>
                  <Button
                    sx={{ textTransform: "unset", fontSize: "20px" }}
                    // onClick={handleBidValue}
                  >
                    Submit{" "}
                  </Button>
                </Box>
                <h4>Final Bid Report </h4>
                <br /> <br />
                <br /> <br /> <br /> <br />
              </Box>
            </Stack>
          </Box>
        </Box>
      )}
      {!loading && !hasdata && (
        <center>
          <h2> Page Not found</h2>
        </center>
      )}
      {loading && (
        <center>
          <h2 sx={{ position: "absolute", top: "48%", width: "100px" }}>
            <LinearProgress />{" "}
          </h2>
        </center>
      )}
    </div>
  );
};
export default AuctionDetail;
