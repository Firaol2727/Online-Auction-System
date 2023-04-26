import { useState, useEffect, useReducer } from "react";
import "./AuctionCard.css";
import { useParams, NavLink, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import data from "../../data.json";
import ProductsCard from "./ProductsCard";
import Category from "../Category/Category";
import { Button, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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
function handleProductPage(){
  
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

  return (
    <div className="homeContainer">
      <div className="search">
        <input
          className="searchInput"
          type="text"
          placeholder="Search for auction"
          value={state.search}
          onChange={(e) => dispatch({ type: "search", search: e.target.value })}
        />
        <button onClick={submitSearch} className="searchButton">
          Search
        </button>
      </div>
      <Category />
      <div className="sideCategory"></div>
      <div className="advertContainer">
        <Typography>Live auctions</Typography>
        <Divider />
        <div className="advert">
          <Button
            sx={{
              width: "1px",
              backgroundColor: "white",
              fontSize: "10px",
              color: "blue",
            }}
            className="leftButton"
            onClick={advertLeft}
          >
            LEFT button
          </Button>
          <Box className="advertProductBox">
            <img
              src={state.products[indexs].images}
              className="advertImage"
              alt="advertImage"
            />
            <Box sx={{ display: "inline" }}>
              <Typography>{state.products[indexs].name}</Typography>
              <Typography>{state.products[indexs].baseprice} </Typography>
              <Button>Offer Now</Button>
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
            RIGHT button
          </Button>
        </div>
        <Divider />
      </div>
      <div className="gridDivMain">
        <Typography
          variant="subtitle1"
          component="h6"
          style={{ fontSize: "18px" }}
        >
          Up comming auction
          <Divider className="divider" />
        </Typography>
        <ProductsCard data={state} />
        <Button>ShowMore</Button>
      </div>
      {/* })} */}
    </div>
  );
}
export default AuctionCard;
