import "./selnav";
import "./selSidebar";
import SellerNavbar from "./selnav";
import SelSidebar from "./selSidebar";
import { useRef, useEffect, useState, useDebugValue } from "react";
import { Box, List, Stack, Typography, Button, Link } from "@mui/material";
import { Component } from "react";
import axios from "axios";
import PlaceIcon from "@mui/icons-material/Place";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import DoneIcon from "@mui/icons-material/Done";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
const getmarings = () => {
  let materialwidth = window.innerWidth;
  if (materialwidth > 800) {
    return "20%";
  } else {
    return "0%";
  }
};
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
const selHome = () => {
  const baseapi = axios.create({ baseURL: "http://localhost:5000/sel" });
  const [my_auc, setMy_auc] = useState([]);
  const [loading, setloading] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    setloading(false);
    baseapi
      .get("/myauction", { withCredentials: true })
      .then((response) => {
        console.log("The data fetched is ", response);

        if (response.data) {
          let datas = response.data;
          setMy_auc(datas);
          setloading(false);
        }
        if (response.status === 403) {
          nav("/sel/login");
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          nav("/sel/login");
        }
        setloading(false);
        console.log("The error found is", err);
      });
  }, []);

  return (
    <div>
      <SellerNavbar />
      <Box
        sx={{
          position: "absolute",
          marginTop: "80px",
          left: {
            sm: "15%",
            lg: "20%",
            xs: "0%",
          },
          right: {
            sm: "15%",
            xs: "0%",
          },
        }}
      >
        <div>
          <h2>Overview</h2>
          {!loading &&
            my_auc.map((auction) => (
              <Link
                to={`/sel/detail/${auction.id}`}
                key={auction.id}
                underline="none"
              >
                <Box
                  sx={{
                    borderRadius: "30px",
                    border: "1px solid #E8E5E5 ",
                    "&:hover": {
                      border: "1px solid red",
                    },
                  }}
                >
                  <Box
                    className="auction"
                    sx={{
                      display: "flex",
                      height: "90px",
                      paddingTop: "30px",
                      marginBottom: "100px",
                      // border:"1px solid black"
                    }}
                  >
                    <Box
                      className="imageBox"
                      sx={{
                        backgroundColor: "grey",
                        width: {
                          lg: "20%",
                          md: "30%",
                          sm: "30%",
                          xs: "40%",
                        },
                        marginRight: "10px",
                      }}
                    >
                      <Link
                        id="productlink"
                        underline="hover"
                        // sx={{ color: "black", fontweight: "bold" }}
                        href={`/singleauction/${1}`}
                      >
                        <img
                          className="auctionImage"
                          alt="auctionImage"
                          src={`http://localhost:5000/images/${auction.see}`}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </Link>
                    </Box>

                    <Box
                      className="detail"
                      sx={{ width: "60%", marginRight: "5px" }}
                    >
                      <Link
                        id="productlink"
                        underline="hover"
                        // sx={{ color: "black", fontweight: "bold" }}
                        href={`/sel/detail/${auction.id}`}
                      >
                        <Typography
                          sx={{
                            textDecoration: "none",
                            color: "black",
                            fontwight: "bold",
                            fontSize: {
                              lg: "19px",
                              md: "15px",
                              sm: "13px",
                              xs: "13px",
                            },
                            // margin: "3px",
                          }}
                          className="title"
                        >
                          {auction.name}
                        </Typography>
                      </Link>
                      <Typography
                        className="Price"
                        sx={{
                          marginTop: "10px",
                          color: "black",
                          fontSize: {
                            lg: "18px",
                            md: "15px",
                            sm: "13px",
                            xs: "12px",
                          },
                        }}
                      >
                        <b>ETB</b>
                        {auction.baseprice}
                      </Typography>
                      <Typography
                        className="Date"
                        sx={{
                          color: "grey",
                          marginTop: "10px",
                          fontSize: {
                            lg: "18px",
                            md: "15px",
                            sm: "13px",
                            xs: "12px",
                          },
                        }}
                      >
                        {getDateform(auction.startdate)}
                        {/* April 30, 2023 10:15 AM EST */}
                      </Typography>

                      <Box
                        className="location"
                        sx={{ display: "flex", marginTop: "15px" }}
                      >
                        <PlaceIcon sx={{ color: "black" }} />
                        <Typography
                          className="Location"
                          sx={{
                            color: "black",
                            fontSize: {
                              lg: "16px",
                              md: "15px",
                              sm: "13px",
                              xs: "12px",
                            },
                            // margin: "3px",
                          }}
                        >
                          New York, NY, US
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      className="Buttons"
                      sx={{
                        width: "20%",
                      }}
                    >
                      {auction.state === "open" && (
                        <Box
                          className="status"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <RssFeedIcon
                            size="small"
                            sx={{
                              color: "green",
                              fontSize: {
                                lg: "20px",
                                md: "20px",
                                sm: "18px",
                                xs: "15px",
                              },
                            }}
                          />
                          <Typography
                            className="status"
                            sx={{
                              color: "green",
                              fontSize: {
                                lg: "11px",
                                md: "10px",
                                sm: "9px",
                                xs: "7px",
                              },
                              display: "flex",
                              textAlign: "center",
                            }}
                          >
                            Live auction
                          </Typography>
                        </Box>
                      )}
                      {auction.state === "waiting" && (
                        <Box
                          className="status"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <TimelapseIcon
                            size="small"
                            sx={{
                              color: "#000080",
                              fontSize: {
                                lg: "20px",
                                md: "20px",
                                sm: "18px",
                                xs: "15px",
                              },
                            }}
                          />
                          <Typography
                            className="status"
                            sx={{
                              color: "#000080",
                              fontSize: {
                                lg: "11px",
                                md: "10px",
                                sm: "9px",
                                xs: "7px",
                              },
                              display: "flex",
                              textAlign: "center",
                            }}
                          >
                            Waiting auction
                          </Typography>
                        </Box>
                      )}
                      {auction.state === "closed" && (
                        <Box
                          className="status"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <DoneIcon
                            size="small"
                            sx={{
                              color: "blue",
                              fontSize: {
                                lg: "20px",
                                md: "20px",
                                sm: "18px",
                                xs: "15px",
                              },
                            }}
                          />
                          <Typography
                            className="status"
                            sx={{
                              color: "blue",
                              fontSize: {
                                lg: "11px",
                                md: "10px",
                                sm: "9px",
                                xs: "7px",
                              },
                              display: "flex",
                              textAlign: "center",
                            }}
                          >
                            Closed Auction
                          </Typography>
                        </Box>
                      )}
                      {auction.state === "suspended" && (
                        <Box
                          className="status"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <DoNotDisturbAltOutlinedIcon
                            size="small"
                            sx={{
                              color: "red",
                              fontSize: {
                                lg: "20px",
                                md: "20px",
                                sm: "18px",
                                xs: "15px",
                              },
                            }}
                          />
                          <Typography
                            className="status"
                            sx={{
                              color: "red",
                              fontSize: {
                                lg: "11px",
                                md: "10px",
                                sm: "9px",
                                xs: "7px",
                              },
                              display: "flex",
                              textAlign: "center",
                            }}
                          >
                            Suspended for while
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Link>
            ))}
          <Box
            sx={{
              borderRadius: "30px",
              border: "1px solid #E8E5E5 ",
              "&:hover": {
                border: "1px solid red",
              },
            }}
          >
            <Link
              to={`http://localhost:5173/sel/detail/dfgasdf`}
              underline="none"
            >
              <Box
                className="auction"
                sx={{
                  display: "flex",
                  height: "90px",
                  paddingTop: "30px",
                  marginBottom: "100px",
                }}
              >
                <Box
                  className="imageBox"
                  sx={{
                    width: {
                      lg: "20%",
                      md: "30%",
                      sm: "30%",
                      xs: "40%",
                    },
                    marginRight: "10px",
                  }}
                >
                  <Link
                    id="productlink"
                    underline="hover"
                    // sx={{ color: "black", fontweight: "bold" }}
                    href={`/singleauction/${1}`}
                  >
                    <img
                      className="auctionImage"
                      alt="auctionImage"
                      src="/Imges/Auction/7.jpg"
                      style={{ width: "100%" }}
                    />
                  </Link>
                </Box>

                <Box
                  className="detail"
                  sx={{ width: "60%", marginRight: "5px" }}
                >
                  <Link
                    id="productlink"
                    underline="hover"
                    // sx={{ color: "black", fontweight: "bold" }}
                    href={`/singleauction/${1}`}
                  >
                    <Typography
                      sx={{
                        textDecoration: "none",
                        color: "black",
                        fontwight: "bold",
                        fontSize: {
                          lg: "19px",
                          md: "15px",
                          sm: "13px",
                          xs: "13px",
                        },
                        // margin: "3px",
                      }}
                      className="title"
                    >
                      Coins US and Foreign Inherited Assets Special 3 Day
                      Auction
                    </Typography>
                  </Link>
                  <Typography
                    className="Price"
                    sx={{
                      marginTop: "10px",
                      fontSize: {
                        lg: "18px",
                        md: "15px",
                        sm: "13px",
                        xs: "12px",
                      },
                    }}
                  >
                    $500
                  </Typography>
                  <Typography
                    className="Date"
                    sx={{
                      marginTop: "10px",
                      fontSize: {
                        lg: "18px",
                        md: "15px",
                        sm: "13px",
                        xs: "12px",
                      },
                    }}
                  >
                    April 30, 2023 10:15 AM EST
                  </Typography>
                  <Box
                    className="location"
                    sx={{ display: "flex", marginTop: "15px" }}
                  >
                    <PlaceIcon />
                    <Typography
                      className="Location"
                      sx={{
                        fontSize: {
                          lg: "16px",
                          md: "15px",
                          sm: "13px",
                          xs: "12px",
                        },
                        // margin: "3px",
                      }}
                    >
                      New York, NY, US
                    </Typography>
                  </Box>
                </Box>
                <Box
                  className="Buttons"
                  sx={{
                    width: "20%",
                  }}
                >
                  <Box
                    className="status"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <DoneIcon
                      size="small"
                      sx={{
                        color: "blue",
                        fontSize: {
                          lg: "20px",
                          md: "20px",
                          sm: "18px",
                          xs: "15px",
                        },
                      }}
                    />
                    <Typography
                      className="status"
                      sx={{
                        color: "blue",
                        fontSize: {
                          lg: "11px",
                          md: "10px",
                          sm: "9px",
                          xs: "7px",
                        },
                        display: "flex",
                        textAlign: "center",
                      }}
                    >
                      closed auction
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Link>
          </Box>
        </div>
      </Box>
    </div>
  );
};
export default selHome;
