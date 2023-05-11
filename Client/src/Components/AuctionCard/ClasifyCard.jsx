import { useState, useEffect, useReducer } from "react";

import { useParams, NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Button, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import Drawer from "@mui/material/Drawer";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuIcon from "@mui/icons-material/Menu";
import ProductCard from "./ProductCard";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import data from "../../data.json";
import {
  DateCategory,
  RegionCategory,
  PriceRangeCategory,
  PriceInputCategory,
} from "../Category/SubCategory";
import Category from "../Category/Category";
const initialState = {
  search: "",
  products: data.auction,
  region: "Addis Ababa",
  index: 1,
  productPageNumber: 1,
  lowPrice: "66",
  highPrice: "",
  reported: false,
};
const mydata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

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
    case "productPageNumber":
      return {
        productPageNumber: action.productPageNumber,
      };
    case "page":
      return {
        page: action.page,
      };

    default:
      return state;
  }
};

function ClasifyCard(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [page, setPage] = useState(10);
  const [isSideClassifyOpen, setSideClassifyOpen] = useState(false);
  const handleChange = (event) => {
    setPage(event.target.value);
  };

  const { id } = useParams();
  function submitSearch() {
    console.log("search submitted");
    console.log(state.search);
  }
  function submitSearch() {
    console.log("search submitted");
    console.log(state.search);
  }
  function searchPrice() {
    console.log("prices", state.lowPrice);
  }
  console.log("the state", state);
  console.log(id);
  const SideClassify = (
    <>
      <Button
        onClick={() => setSideClassifyOpen(true)}
        sx={{
          color: "red",
          "&:hover": {
            backgroundColor: "#B54E47 ",
            color: "white",
          },
        }}
      >
        Categories
        <MenuIcon />
      </Button>
      <Drawer
        anchor="left"
        open={isSideClassifyOpen}
        onClose={() => setSideClassifyOpen(false)}
      >
        <Box p={2} width="200px" textAlign="center" role="presentation">
          <Typography sx={{ mt: "40px", mb: "20px", color: "#B54E47" }}>
            Categories
          </Typography>
          <Divider />
          <Accordion>
            <AccordionSummary
              id="panel1-header"
              aria-controls="panel1-content"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Date </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {" "}
              <DateCategory />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              id="panel1-header"
              aria-controls="panel1-content"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Auction region</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RegionCategory />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              id="panel1-header"
              aria-controls="panel1-content"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Price range</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {" "}
              <PriceRangeCategory />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              id="panel1-header"
              aria-controls="panel1-content"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Input Price range </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {" "}
              <PriceInputCategory />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Drawer>
    </>
  );
  return (
    <Box sx={{ marginTop: "25px" }} className="clasifyPageContainer">
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
          value={state.search}
          onChange={(e) => dispatch({ type: "search", search: e.target.value })}
        />
        <Button
          variant="outlined"
          onClick={submitSearch}
          className="searchButton"
          sx={{ fontSize: "12px", height: "40px", width: "15px", color: "red" }}
        >
          <SearchIcon sx={{ color: "red" }} />
        </Button>
      </Box>
      <Box className="mainClassify">
        <Category />
      </Box>
      <Box
        sx={{
          marginLeft: {
            lg: "5%",
            md: "4%",
            sm: "3%",
            xs: "1%",
          },
          marginRight: {
            lg: "5%",
            md: "4%",
            sm: "3%",
            xs: "1%",
          },
          marginTop: "30px",
        }}
      >
        <Box>
          <Typography
            variant="body"
            component="h6"
            // style={{ fontSize: "50px" }}

            sx={{
              fontSize: {
                xs: "16px",
                sm: "18px",
                md: "20px",
                lg: "24px",
              },
              fontWeight: 200,
            }}
          >
            {id.toUpperCase()}
          </Typography>
          <Divider />
          <Box
            className="classifyMenu"
            sx={{
              display: {
                lg: "none",
                md: "none",
                sm: "flex",
                xs: "flex",
              },
            }}
          >
            {SideClassify}
          </Box>
          <Box sx={{ height: "70px" }}>
            <Typography sx={{ float: "left", paddingTop: "20px" }}>
              400 Auctions
            </Typography>

            <Box sx={{ float: "right", display: "flex", flexWrap: "wrap" }}>
              <Typography sx={{ float: "left", paddingTop: "17px" }}>
                Per page :
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 70 }}>
                <Select
                  value={page}
                  onChange={handleChange}
                  // displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{ height: "40px" }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={50}>100</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Divider />
          <Box
            sx={{
              display: {
                lg: "flex",
                md: "flex",
                sm: "flex",
                xs: "block",
              },
              flexWrap: "wrap",
            }}
            className="categoryDisplay"
          >
            <Typography sx={{ display: "block", margin: "10px" }}>
              Categories :
            </Typography>
            <Box
              sx={{
                marginRight: "10px",
                height: "35px",
                paddingLeft: "20px",
                paddingRight: "5px",
                border: "1px solid black",
                borderRadius: "50px",
                backgroundColor: "BLACK",
                display: "flex",
                alignItems: "center",
                justify: "center",
              }}
            >
              <Typography sx={{ color: "white" }}> Date:All dates</Typography>
              <Button
                sx={{
                  fontSize: "20px",
                  width: "2px",
                  color: "white",
                }}
              >
                <CloseIcon size="small" />
              </Button>
            </Box>
            <Box
              sx={{
                marginRight: "10px",
                height: "35px",
                paddingLeft: "20px",
                paddingRight: "5px",
                border: "1px solid black",
                borderRadius: "50px",
                backgroundColor: "black",
                display: "flex",
                alignItems: "center",
                justify: "center",
              }}
            >
              <Typography sx={{ color: "white" }}> Region:All dates</Typography>
              <Button
                sx={{
                  fontSize: "20px",
                  width: "2px",
                  color: "white",
                }}
              >
                <CloseIcon size="small" />
              </Button>
            </Box>
            <Box
              sx={{
                marginRight: "10px",
                height: "35px",
                paddingLeft: "20px",
                paddingRight: "5px",
                border: "1px solid black",
                borderRadius: "50px",
                backgroundColor: "black",
                display: "flex",
                alignItems: "center",
                justify: "center",
              }}
            >
              <Typography sx={{ color: "white" }}>
                {" "}
                Price Range:All dates
              </Typography>
              <Button
                sx={{
                  fontSize: "20px",
                  width: "2px",
                  color: "white",
                }}
              >
                <CloseIcon size="small" />
              </Button>
            </Box>
            <Box
              sx={{
                marginRight: "10px",
                height: "35px",
                paddingLeft: "20px",
                paddingRight: "5px",
                border: "1px solid black",
                borderRadius: "50px",
                backgroundColor: "black",
                display: "flex",
                alignItems: "center",
                justify: "center",
              }}
            >
              <Typography sx={{ color: "white" }}>
                {" "}
                Price input:All dates
              </Typography>
              <Button
                sx={{
                  fontSize: "20px",
                  width: "2px",
                  color: "white",
                }}
              >
                <CloseIcon size="small" />
              </Button>
            </Box>
          </Box>
          <Divider />
        </Box>
      </Box>
      <Box
        className="catProduct"
        sx={{
          // backgroundColor: "black",
          position: "relative",
          display: "flex",
          flexDirection: {
            lg: "row",
            md: "row",
            sm: "row",
            xs: "column",
          },
          marginLeft: {
            lg: "5%",
            md: "4%",
            sm: "3%",
            xs: "1%",
          },
          marginRight: {
            lg: "5%",
            md: "4%",
            sm: "3%",
            xs: "1%",
          },
          // marginTop: "50px",
        }}
      >
        <Box
          className="category"
          sx={{
            width: {
              lg: "20%",
              md: "20%",
              sm: "20%",
              xs: "100%",
            },

            display: {
              xs: "none",
              sm: "none",
              md: "block",
              lg: "block",
            },
            flexDirection: "column",
          }}
        >
          <DateCategory data="transfering data" />
          <Divider />
          <h4>Auction region</h4>
          <RegionCategory />
          <Divider />

          <PriceRangeCategory />
          <PriceInputCategory />
        </Box>

        <Box
          className="auctions"
          sx={{
            width: {
              lg: "78%",
              md: "80%",
              sm: "95%",
              xs: "95%",
            },
            // backgroundColor: "yellow",
            height: "auto",

            paddingLeft: "10px",
          }}
        >
          <Divider />
          {mydata.map((x) => {
            return (
              <Box
                sx={{
                  borderRadius: "30px",
                  margin:"7px",
                  border: "1px solid #E8E5E5 ",
                  "&:hover": {
                    border: "1px solid red",
                  },
                }}
              >
                {" "}
                <ProductCard />
              </Box>
            );
          })}

          <Divider />
        </Box>
      </Box>
    </Box>
  );
}
export default ClasifyCard;
