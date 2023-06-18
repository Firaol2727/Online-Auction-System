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
import axios from "../../Service/api";
import "./AuctionCard";
const initialState = {
  search: "",
  products: data.auction,
  index: 1,
  productPage: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "search":
      return {
        ...state,
        search: action.search,
      };
    case "products":
      return {
        ...state,
        products: action.products,
      };
    case "index":
      return {
        index: action.index,
      };
    case "productPage":
      return {
        productPage: action.productPage,
      };

    default:
      return state;
  }
};
const mydata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
function AuctionCard() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [indexs, setIndexs] = useState(1);
  console.log("data", data);

  function submitSearch() {
    console.log("search submitted");
    console.log(state.search);
  }
  function advertRight() {
    const added = indexs + 1;
    setIndexs(added);
    console.log("index", indexs);
  }
  function advertLeft() {
    const sub = indexs - 1;
    setIndexs(sub);
    console.log("index", indexs);
  }
  // useEffect(() => {
  //   const auctions = data.auction.map((auction) => {
  //     return auction;
  //   });
  //   state.products = auctions;

  //   console.log("state.product", state.products,indexs);
  // }, [data.auction, state.index,indexs]);
  useEffect(() => {
    console.log("in the useeffect");
    axios({
      method: "GET",
      url: "http://localhost:5000/mytest",
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("catching error", err);
      });
  }, []);
  return (
    <Box my={4} className="homeContainer">
      <Box sx={{ textAlign: "center", alignItems: "center" }}>
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
          placeholder="Search for auctions"
          // value={state.search}
          // onChange={(e) => dispatch({ type: "search", search: e.target.value })}
        />
        <Button
          variant="outlined"
          // onClick={submitSearch}
          className="searchButton"
          sx={{ fontSize: "12px", height: "40px", width: "15px", color: "red" }}
        >
          <SearchIcon sx={{ color: "red" }} />
        </Button>
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
            onClick={advertLeft}
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
              <Link href="#">
                <img
                  src={state.products[indexs].images}
                  className="advertImage"
                  alt="advertImage"
                  style={{ height: "40vh", width: "100%" }}
                />
              </Link>
            </Box>

            <Box sx={{ width: "70%", display: "flex" }}>
              <Box sx={{ width: "80%" }}>
                <Link href="#" sx={{ textDecoration: "none" }}>
                  <Typography
                    className="auctionName"
                    sx={{ margin: "10px", color: "black" }}
                  >
                    Coins US and Foreign Inherited Assets Special 3 Day Auction
                  </Typography>
                </Link>
                <Typography className="auctionTimeLeft" sx={{ margin: "10px" }}>
                  April 30, 2023 10:15 AM EST
                </Typography>
                <Typography className="auctionPrice" sx={{ margin: "1px" }}>
                  $1000
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
                <Typography
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "red",
                    color: "white",
                    alignItems: "center",
                    paddingTop: "9px",
                  }}
                >
                  Offer now
                </Typography>
              </Button>
            </Box>
          </Box>

          <Button
            className="rightButton"
            onClick={advertRight}
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
            {mydata.map((x) => {
              return (
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Box
                    sx={{
                      borderRadius: "30px",
                      border: "1px solid #E8E5E5 ",
                      "&:hover": {
                        border: "1px solid red",
                      },
                    }}
                  >
                    <ProductCard />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Divider />
        <Box className="paggination"></Box>
      </Box>
      {/* })} */}
    </Box>
  );
}
export default AuctionCard;
