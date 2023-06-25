import { useState, useEffect, useReducer } from "react";

import { useParams, NavLink, useNavigate } from "react-router-dom";
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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PlaceIcon from "@mui/icons-material/Place";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import ClosedCaptionDisabledIcon from "@mui/icons-material/ClosedCaptionDisabled";
import GppBadIcon from "@mui/icons-material/GppBad";

import Pagination from "@mui/material/Pagination";
// import { Pagination } from "@material-ui/lab";

import Category from "../Category/Category";
import axios from "axios";
const initialState = {
  productData: [],
  searchData: {
    search: "",
  },

  category: {
    date: "",
    plow: "",
    phigh: "",
    region: "",
    page: 1,
  },
  priceTrail: {
    pthigh: "",
    ptlow: "",
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
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
    case "SET_PRICETRAIL":
      return {
        ...state,
        priceTrail: action.payload,
      };

    default:
      throw new Error();
  }
}

function ClasifyCard(props) {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [page, setPage] = useState(10);
  const [isSideClassifyOpen, setSideClassifyOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    dispatch({
      type: "SET_CATEGORY",
      payload: { ...state.category, [name]: value },
    });
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;

    dispatch({
      type: "SET_PRICETRAIL",
      payload: { ...state.priceTrail, [name]: value },
    });
  };

  const handleSubmitprice = (event) => {
    event.preventDefault();

    if (state.priceTrail.ptlow > state.priceTrail.pthigh) {
      dispatch({
        type: "SET_CATEGORY",
        payload: {
          ...state.category,
          plow: state.priceTrail.pthigh,
          phigh: state.priceTrail.ptlow,
        },
      });
    } else {
      dispatch({
        type: "SET_CATEGORY",
        payload: {
          ...state.category,
          plow: state.priceTrail.ptlow,
          phigh: state.priceTrail.pthigh,
        },
      });
    }
    console.log("price input test", state);
  };

  const handleInputChangePrice = (event) => {
    const { name, value } = event.target;
    if (value == "ALL") {
      dispatch({
        type: "SET_CATEGORY",
        payload: { ...state.category, plow: 0, phigh: 100000000000 },
      });
    }
    if (value == "A") {
      dispatch({
        type: "SET_CATEGORY",
        payload: { ...state.category, plow: 3000, phigh: 10000 },
      });
    }
    if (value == "B") {
      dispatch({
        type: "SET_CATEGORY",
        payload: { ...state.category, plow: 10001, phigh: 25000 },
      });
    }
    if (value == "C") {
      dispatch({
        type: "SET_CATEGORY",
        payload: { ...state.category, plow: 25001, phigh: 50000 },
      });
    }
    if (value == "D") {
      dispatch({
        type: "SET_CATEGORY",
        payload: { ...state.category, plow: 50001, phigh: 75000 },
      });
    }
    if (value == "E") {
      dispatch({
        type: "SET_CATEGORY",
        payload: { ...state.category, plow: 75001, phigh: 100000 },
      });
    }
    if (value == "F") {
      dispatch({
        type: "SET_CATEGORY",
        payload: { ...state.category, plow: 100001, phigh: 1000000000 },
      });
    }
  };
  const DateCategory = () => {
    // const [state, dispatch] = useReducer(reducer, initialState.date);
    return (
      <Box
        className="date"
        sx={{
          marginBottom: "20px",
          marginLeft: "0px",
          // backgroundColor: "red",
        }}
      >
        <FormControl>
          <h4>Dates</h4>

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="All Dates"
            name="date"
            value={state.category.date}
            onChange={handleInputChange}
          >
            <FormControlLabel
              value=""
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>ALL days</Typography>}
            />
            <FormControlLabel
              value="7"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>Next 7 days</Typography>}
            />
            <FormControlLabel
              value="30"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>Next 30 days</Typography>}
            />
            <FormControlLabel
              value="60"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>Next 60 days</Typography>}
            />
            <FormControlLabel
              value="90"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>Next 90 days</Typography>}
            />
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };
  const RegionCategory = () => {
    return (
      <Box
        className="region"
        style={{
          // border: "2px solid black",

          marginTop: "20px",
          display: "flex",
          height: "200px",
          width: {
            xs: "100%",
          },
          overflow: "hidden",
          overflowY: "scroll", // added scroll
        }}
      >
        <FormControl>
          <RadioGroup
            defaultValue=""
            name="region"
            value={state.category.region}
            onChange={handleInputChange}
          >
            <FormControlLabel
              value=""
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>All Regions </Typography>}
            />
            <FormControlLabel
              value="Addis Ababa"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>Addis Ababa</Typography>}
            />
            <FormControlLabel
              value="Dire Dawa"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>Dire Dawa</Typography>}
            />
            <FormControlLabel
              value="Oromia"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>Oromia</Typography>}
            />
            <FormControlLabel
              value="Amhara"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>Amhara</Typography>}
            />
            <FormControlLabel
              value="Tigray"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>Tigray</Typography>}
            />
            <FormControlLabel
              value="Somali"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>Somali</Typography>}
            />
            <FormControlLabel
              value="SNNPR"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>SNNPR</Typography>}
            />
            <FormControlLabel
              value="Benishangul-Gumuz"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>Benishangul-Gumuz</Typography>}
            />
            <FormControlLabel
              value="Gambela"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>Gambela</Typography>}
            />
            <FormControlLabel
              value="Harari"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>Harari</Typography>}
            />
            <FormControlLabel
              value="Sidama"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>Sidama</Typography>}
            />
            <FormControlLabel
              value="Afar"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>Afar</Typography>}
            />
            <FormControlLabel
              value="SWEPR"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>SWEPR</Typography>}
            />
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };
  const PriceRangeCategory = () => {
    // const [state, dispatch] = useReducer(reducer, initialState.priceRange);
    // console.log("price range", state.priceRange);
    return (
      <Box className="price">
        <Box className="priceList">
          <h4> Choose price range </h4>
          <RadioGroup
            defaultValue="A"
            name="price"
            onChange={handleInputChangePrice}
          >
            <FormControlLabel
              value="ALL"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>All price</Typography>}
            />
            <FormControlLabel
              value="A"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>3000-10,000</Typography>}
            />
            <FormControlLabel
              value="B"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>10,000-25,0000</Typography>}
            />
            <FormControlLabel
              value="C"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>25,000-50,000</Typography>}
            />
            <FormControlLabel
              value="D"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>50,000-75,000</Typography>}
            />
            <FormControlLabel
              value="E"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>75,000-100,000</Typography>}
            />
            <FormControlLabel
              value="F"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "black",
                    },
                  }}
                />
              }
              label={<Typography>Over 100,000</Typography>}
            />
          </RadioGroup>
        </Box>
      </Box>
    );
  };

  const PriceInputCategory = () => {
    return (
      <Box className="priceRange" sx={{ marginTop: "10px" }}>
        <h4>Price range</h4>
        <form onSubmit={handleSubmitprice}>
          <TextField
            label="Lower price"
            name="ptlow"
            value={state.priceTrail.ptlow}
            variant="outlined"
            onChange={handlePriceChange}
            sx={{
              width: 150,
              margin: "0px",
              "& .MuiInputBase-root": {
                height: 40,
              },
            }}
            type="number"
          />
          <TextField
            label="higher price"
            sx={{
              width: 150,
              marginTop: "10px",
              "& .MuiInputBase-root": {
                height: 40,
              },
            }}
            variant="outlined"
            name="pthigh"
            value={state.priceTrail.pthigh}
            onChange={handlePriceChange}
            type="number"
          />
          <Button type="submit">Search price</Button>
        </form>
      </Box>
    );
  };

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
            <AccordionDetails> {DateCategory()}</AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              id="panel1-header"
              aria-controls="panel1-content"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Auction region</Typography>
            </AccordionSummary>
            <AccordionDetails>{RegionCategory()}</AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              id="panel1-header"
              aria-controls="panel1-content"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Price range</Typography>
            </AccordionSummary>
            <AccordionDetails> {PriceRangeCategory()}</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              id="panel1-header"
              aria-controls="panel1-content"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Input Price range </Typography>
            </AccordionSummary>
            <AccordionDetails> {PriceInputCategory()}</AccordionDetails>
          </Accordion>
        </Box>
      </Drawer>
    </>
  );

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  const handlePage = (event, value) => {
    dispatch({
      type: "SET_CATEGORY",
      payload: { ...state.category, page: value },
    });
    console.log("state.category.page", state.category.page);
  };
  const submitSearch = (event) => {
    event.preventDefault();
    console.log("search submitted", state.searchData.search);
    let x = state.searchData.search;
    // let url = `/search?page=1&item=bed`;
    let url = `/search?item=${x}&page=1`;
    navigate(url);
  };
  useEffect(() => {
    console.log("in the classify effect");

    if (
      id == "artwork" ||
      id == "electronics" ||
      id == "manufacturing" ||
      id == "vehicles" ||
      id == "building" ||
      id == "furnitures" ||
      id == "homes" ||
      id == "other" ||
      id == "jewelleries" ||
      id == "other"
    ) {
      const query = [
        {
          str: "",
          value: "",
        },
        {
          str: "",
          value: "",
        },
        {
          str: "",
          value: "",
        },
        {
          str: "",
          value: "",
        },
        {
          str: "",
          value: "",
        },
      ];

      if (state.category.date !== "") {
        query[0].str = `daterange`;
        query[0].value = state.category.date;
      } else {
        query[0].str = "";
        query[0].value = "";
      }
      if (state.category.region !== "") {
        query[1].str = `region`;
        query[1].value = state.category.region;
      } else {
        query[1].str = "";
        query[1].value = "";
      }

      if (state.category.plow !== "") {
        query[2].str = `plow`;
        query[2].value = state.category.plow;
      } else {
        query[2].str = "";
        query[2].value = "";
      }
      if (state.category.phigh !== "") {
        query[3].str = `phigh`;
        query[3].value = state.category.phigh;
      } else {
        query[3].str = "";
        query[3].value = "";
      }
      if (state.category.page !== "") {
        query[4].str = `page`;
        query[4].value = state.category.page;
      } else {
        query[4].str = "";
        query[4].value = "";
      }
      console.log("query", query);
      // `http://localhost:5000/cat/${id}?daterange=${state.category.date}&region=/${state.category.region}&plow=/${state.category.plow}&phigh=/${state.category.phigh}`
      axios
        .get(
          `http://localhost:5000/cat/${id}?${query[0].str}=${query[0].value}&${query[1].str}=${query[1].value}&${query[2].str}=${query[2].value}&${query[3].str}=${query[3].value}&${query[4].str}=${query[4].value}`
        )
        .then((response) => {
          if (response.status == 404) {
            console.lof("No data");
          } else if (response.status == 200) {
            dispatch({ type: "SET_PRODUCTS", payload: response.data.data });
            console.log("data form back end", response.data);
          } else {
            console.log("in the else");
          }
        })
        .catch((err) => {
          console.log("errrr", err);

          if (err.response.status === 403) {
            console.log("errr r");
          }
        });
    } else {
      console.log("erro");
    }
  }, [
    id,
    state.category.date,
    state.category.region,
    state.category.plow,
    state.category.phigh,
    state.category.page,
  ]);
  return (
    <Box sx={{ marginTop: "25px" }} className="clasifyPageContainer">
      <form onSubmit={submitSearch}>
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
            value={state.searchData.search}
            onChange={(event) => {
              dispatch({
                type: "SET_SEARCH",
                payload: { ...state.searchData, search: event.target.value },
              });
            }}
          />
          <Button
            variant="outlined"
            type="submit"
            className="searchButton"
            sx={{
              fontSize: "12px",
              height: "40px",
              width: "15px",
              color: "red",
            }}
          >
            <SearchIcon sx={{ color: "red" }} />
          </Button>
        </Box>
      </form>
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
            {id == "artwork" ||
            id == "electronics" ||
            id == "manufacturing" ||
            id == "vehicles" ||
            id == "building" ||
            id == "furnitures" ||
            id == "homes" ||
            id == "jewelleries" ? (
              <Typography> {id.toUpperCase()}</Typography>
            ) : (
              <>
                <Typography> Not Found</Typography>
              </>
            )}
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
            {state.category.date !== "" && (
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
                <Typography sx={{ color: "white" }}>
                  {" "}
                  Date:Last {state.category.date} days
                </Typography>
                <Button
                  sx={{
                    fontSize: "20px",
                    width: "2px",
                    color: "white",
                  }}
                  onClick={() => {
                    dispatch({
                      type: "SET_CATEGORY",
                      payload: { ...state.category, date: "" },
                    });
                  }}
                >
                  <CloseIcon size="small" />
                </Button>
              </Box>
            )}
            {state.category.region !== "" && (
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
                  Region: {state.category.region}
                </Typography>
                <Button
                  sx={{
                    fontSize: "20px",
                    width: "2px",
                    color: "white",
                  }}
                  onClick={() => {
                    dispatch({
                      type: "SET_CATEGORY",
                      payload: { ...state.category, region: "" },
                    });
                  }}
                >
                  <CloseIcon size="small" />
                </Button>
              </Box>
            )}
            {state.category.plow !== "" && (
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
                  Price range: {state.category.plow}-{state.category.phigh}
                </Typography>
                <Button
                  sx={{
                    fontSize: "20px",
                    width: "2px",
                    color: "white",
                  }}
                  onClick={() => {
                    dispatch({
                      type: "SET_CATEGORY",
                      payload: { ...state.category, plow: "", phigh: "" },
                    });
                  }}
                >
                  <CloseIcon size="small" />
                </Button>
              </Box>
            )}
            {/* {state.category.plow !== "" && (
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
                  Price range inp: {state.category.plow}-{state.category.phigh}
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
            )} */}
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
          {DateCategory()}
          <Divider />
          <h4>Auction region</h4>
          {RegionCategory()}
          <Divider />

          {PriceRangeCategory()}
          {PriceInputCategory()}
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
          {state.productData.length > 0 ? (
            <div>
              <Box sx={{ height: "70px" }}>
                <Typography sx={{ float: "left", paddingTop: "20px" }}>
                  {state.productData.length} Auctions
                </Typography>
              </Box>

              {state.productData.map((products) => {
                return (
                  // <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Box
                    sx={{
                      borderRadius: "30px",
                      border: "1px solid #E8E5E5 ",
                      "&:hover": {
                        border: "1px solid red",
                      },
                      marginTop: "10px",
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
                          Base price : $ {products.baseprice}
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
                          {products.state == "open" && (
                            <Typography>Live auction</Typography>
                          )}
                          {products.state == "waiting" && (
                            <Typography>
                              Opening date :{formatDate(products.startdate)}
                            </Typography>
                          )}
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
                                color: "green",
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
                                color: "green",
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
                  // </Grid>
                );
              })}
            </div>
          ) : (
            <>NOT FOUND</>
          )}

          <Box
            display="flex"
            justifyContent="center"
            sx={{ marginTop: "30px", marginBottom: "30px" }}
          >
            <Pagination
              count={10}
              page={state.category.page}
              onChange={handlePage}
              sx={{
                "& .Mui-selected": {
                  color: "red",
                  fontSize: "20px",
                },
                // "& .Mui-selected:hover": { backgroundColor: "#ba000d" },
                // "& .MuiPaginationItem-page:hover": {},
                // "& .MuiPaginationItem-page.Mui-selected:hover": {
                //   backgroundColor: "#ba000d",
                // },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default ClasifyCard;
