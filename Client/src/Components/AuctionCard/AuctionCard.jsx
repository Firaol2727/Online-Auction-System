import { useState, useEffect, useReducer } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import data from "../../data.json";

import ProductCard from "./ProductCard";

import Category from "../Category/Category";
import { Button, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PlaceIcon from "@mui/icons-material/Place";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import ClosedCaptionDisabledIcon from "@mui/icons-material/ClosedCaptionDisabled";
import GppBadIcon from "@mui/icons-material/GppBad";
import "./AuctionCard";
import axios from "axios";
const initialState = {
  productData: [{}],
  searchData: {
    search: "",
  },
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        productData: action.payload,
      };
    case "SET_SEARCH":
      return {
        ...state,
        searchData: action.payload,
      };
    case "SET_PRODUCT_IMAGES":
      return {
        ...state,
        productImages: action.payload,
      };
    default:
      throw new Error();
  }
}

function AuctionCard() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [indexs, setIndexs] = useState(1);

  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentProductIndex(
      (currentProductIndex - 1 + state.productData.length) %
        state.productData.length
    );
  };

  const handleNextClick = () => {
    if (currentProductIndex === state.productData.length - 1) {
      return;
    }
    setCurrentProductIndex(currentProductIndex + 1);
  };

  const submitSearch = (event) => {
    event.preventDefault();
    console.log("search submitted");
    console.log(state.searchData.search);
  };

  const handleSearch = (event) => {
    const { name, value } = event.target;

    dispatch({
      type: "SET_SEARCH",
      payload: { ...state.editedPassword, [name]: value },
    });
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((response) => {
        dispatch({ type: "SET_PRODUCTS", payload: response.data.data });

        console.log("fetched data", response.data);
        console.log("state", state.productData);
      })
      .catch((err) => {
        console.log("errrr", err);
        if (err.response.status === 403) {
          console.log("errr r");
        }
      });
  }, [currentProductIndex]);

  return (
    <Box my={4}>
      <Box sx={{ textAlign: "center", alignItems: "center" }}>
        <form onSubmit={submitSearch}>
          <TextField
            type="text"
            sx={{
              width: {
                lg: 300,
                md: 300,
                sm: 200,
                xs: 200,
              },
              "& .MuiInputBase-root": {
                height: 40,
              },
            }}
            name="search"
            placeholder="Search for auctions"
            value={state.searchData.search}
            onChange={handleSearch}
            // onChange={(e) => dispatch({ type: "search", search: e.target.value })}
          />
          <Button
            variant="outlined"
            type="submit"
            sx={{
              fontSize: "12px",
              height: "40px",
              width: "15px",
              color: "red",
            }}
          >
            <SearchIcon sx={{ color: "red" }} />
          </Button>
        </form>
      </Box>
      <Category />

      <Box
        sx={{
          display: {
            lg: "block",
            md: "block",
            sm: "none",
            xs: "none",
          },
        }}
        className="advertContainer"
      >
        <Typography
          sx={{
            fontSize: "18px",
            marginLeft: {
              lg: "35px",
              md: "30px",
              sm: "25px",
              xs: "20px",
            },
          }}
        >
          Popular auctions
        </Typography>
        <Divider />
        <Box
          sx={{
            height: "40vh",

            display: "flex",
            justifyContent: "space-between",
          }}
          className="advert"
        >
          <Button
            sx={{
              width: "1px",
              backgroundColor: "white",
              fontSize: "10px",
              color: "blue",
            }}
            onClick={handlePrevClick}
          >
            <ChevronLeftIcon />
          </Button>
          <Box
            sx={{
              display: "flex",
              position: "relative",
              textAlign: "center",
              alignItems: "center",
              width: "100%",
              backgroundColor: "white",
            }}
            className="advertProductBox"
          >
            <Box sx={{ height: "40vh", width: "30%" }}>
              <Link
                href={`/detail/${state.productData[currentProductIndex].id}`}
              >
                <img
                  src={`http://localhost:5000/images/${state.productData[currentProductIndex].see}`}
                  className="advertImage"
                  alt="advertImage"
                  style={{ height: "40vh", width: "100%" }}
                />
              </Link>
            </Box>

            <Box sx={{ width: "70%", display: "flex" }}>
              <Box sx={{ width: "80%" }}>
                <Link
                  href={`/detail/${state.productData[currentProductIndex].id}`}
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    className="auctionName"
                    sx={{
                      color: "red",
                      fontSize: "1.5rem",
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "bold",
                      letterSpacing: "0.1rem",
                    }}
                  >
                    {state.productData[currentProductIndex].name}
                  </Typography>
                </Link>
                <Typography className="auctionTimeLeft" sx={{ margin: "10px" }}>
                  Opening date :{" "}
                  {formatDate(state.productData[currentProductIndex].startdate)}
                </Typography>
                <Typography className="auctionPrice" sx={{ margin: "1px" }}>
                  Base price :${" "}
                  {state.productData[currentProductIndex].baseprice}
                </Typography>
              </Box>

              <Button
                sx={{
                  width: "20%",
                  height: "50px",
                  fontSize: "5px",

                  textTransform: "unset",
                  alignItems: "center",
                  justify: "center",
                  textAlign: "Center",
                }}
              >
                <Link
                  href={`/detail/${state.productData[currentProductIndex].id}`}
                  sx={{
                    textDecoration: "none",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "red",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  Offer now
                </Link>
              </Button>
            </Box>
          </Box>

          <Button
            className="rightButton"
            onClick={handleNextClick}
            sx={{
              width: "1px",
              backgroundColor: "white",
              fontSize: "10px",
              color: "blue",
            }}
          >
            <ChevronRightIcon />
          </Button>
        </Box>
        <Divider />
      </Box>
      <Box className="auctions">
        <Typography
          variant="subtitle1"
          component="h6"
          sx={{
            fontSize: "18px",
            marginLeft: {
              lg: "35px",
              md: "30px",
              sm: "25px",
              xs: "20px",
            },
          }}
          my={2}
        >
          Up comming auction
        </Typography>
        <Divider />
        {/* <ProductsCard data={state} /> */}
        <Box
          my={1}
          sx={{
            marginLeft: {
              lg: "30px",
              md: "20px",
              sm: "20px",
              xs: "10px",
            },
            marginRight: {
              lg: "30px",
              md: "20px",
              sm: "20px",
              xs: "10px",
            },
          }}
          className="auctions"
        >
          <Grid container spacing={2}>
            {state.productData.map((products) => {
              return (
                <Grid item xs={12} sm={12} md={6} lg={6} key={products.id}>
                  <Box
                    sx={{
                      borderRadius: "30px",
                      border: "1px solid #E8E5E5 ",
                      "&:hover": {
                        border: "1px solid red",
                      },
                    }}
                  >
                    {/* <ProductCard /> */}

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
                          href={`/detail/${products.id}`}
                        >
                          <img
                            className="auctionImage"
                            alt="auctionImage"
                            src={`http://localhost:5000/images/${products.see}`}
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
                          href={`/detail/${products.id}`}
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
                            {products.name}
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
                          {products.baseprice}
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
                          {products.startdate}
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
                            {products.city}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        className="Buttons"
                        sx={{
                          width: "20%",
                        }}
                      >
                        {products.state == "open" && (
                          <Box
                            className="status"
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <RssFeedIcon
                              size="small"
                              sx={{
                                fontSize: {
                                  lg: "20px",
                                  md: "20px",
                                  sm: "20px",
                                  xs: "20px",
                                },
                              }}
                            />
                            <Typography
                              className="status"
                              sx={{
                                fontSize: {
                                  lg: "11px",
                                  md: "10px",
                                  sm: "10px",
                                  xs: "10px",
                                  margin: "2px",
                                },
                                display: "flex",
                                textAlign: "center",
                              }}
                            >
                              Live auction
                            </Typography>
                          </Box>
                        )}
                        {products.state == "waiting" && (
                          <Box
                            className="status"
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <TimelapseIcon
                              size="small"
                              sx={{
                                fontSize: {
                                  lg: "20px",
                                  md: "20px",
                                  sm: "20px",
                                  xs: "20px",
                                },
                              }}
                            />
                            <Typography
                              className="status"
                              sx={{
                                fontSize: {
                                  lg: "11px",
                                  md: "10px",
                                  sm: "10px",
                                  xs: "10px",
                                  margin: "2px",
                                },
                                display: "flex",
                                textAlign: "center",
                              }}
                            >
                              Pending
                            </Typography>
                          </Box>
                        )}
                        {products.state == "closed" && (
                          <Box
                            className="status"
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <ClosedCaptionDisabledIcon
                              size="small"
                              sx={{
                                fontSize: {
                                  lg: "20px",
                                  md: "20px",
                                  sm: "20px",
                                  xs: "20px",
                                },
                              }}
                            />
                            <Typography
                              className="status"
                              sx={{
                                fontSize: {
                                  lg: "11px",
                                  md: "10px",
                                  sm: "10px",
                                  xs: "10px",
                                  margin: "2px",
                                },
                                display: "flex",
                                textAlign: "center",
                              }}
                            >
                              Closed
                            </Typography>
                          </Box>
                        )}
                        {products.state == "suspended" && (
                          <Box
                            className="status"
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <GppBadIcon
                              size="small"
                              sx={{
                                fontSize: {
                                  lg: "20px",
                                  md: "20px",
                                  sm: "20px",
                                  xs: "20px",
                                },
                              }}
                            />
                            <Typography
                              className="status"
                              sx={{
                                fontSize: {
                                  lg: "11px",
                                  md: "10px",
                                  sm: "10px",
                                  xs: "10px",
                                  margin: "2px",
                                },
                                display: "flex",
                                textAlign: "center",
                              }}
                            >
                              Suspended
                            </Typography>
                          </Box>
                        )}
                        <Link
                          id="productlink"
                          underline="hover"
                          // sx={{ color: "black", fontweight: "bold" }}
                          href={`/detail/${products.id}`}
                        >
                          <Button
                            sx={{
                              color: "red",
                              textTransform: "unset",
                              marginTop: "10px",
                              marginRight: "5px",
                              border: "1px solid red",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: {
                                  lg: "15px",
                                  md: "11px",
                                  sm: "14px",
                                  xs: "10px",
                                },
                                fontWight: "bold",
                              }}
                            >
                              Place Bid
                            </Typography>
                          </Button>
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="center" mt="20px" mb="30px">
          <Link href="/auctions/furnitures">
            <Typography sx={{ color: "blue" }}>See more products</Typography>
          </Link>
        </Box>
      </Box>
      {/* })} */}
    </Box>
  );
}
export default AuctionCard;
