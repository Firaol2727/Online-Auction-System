import { useState, useEffect, useReducer } from "react";

import { useParams, NavLink, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Button, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProductsCard from "./ProductsCard";
import "./ClasifyCard.css";
import data from "../../data.json";

const initialState = {
  search: "",
  products: data.auction,
  region: "Addis Ababa",
  index: 1,
  productPageNumber: 1,
  lowPrice: "",
  highPrice: "",
  reported: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "search":
      return {
        ...state,
        search: action.search,
      };
    case "lowPrice":
      return {
        ...state,
        lowPrice: action.lowPrice,
      };
    case "highPrice":
      return {
        ...state,
        highPrice: action.highPrice,
      };
    case "region":
      return {
        ...state,
        region: action.region,
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
  console.log("the state", state);
  console.log(id);
  return (
    <div className="clasifyPageContainer">
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

      <div className="classifyContainer">
        <Box
          sx={{
            height: "130px",
            marginTop: "0px",
            margin: "",
          }}
        >
          <Typography
            variant="body"
            component="h6"
            // style={{ fontSize: "50px" }}
            className="categoryTitleTypography"
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

          <Box sx={{ height: "70px", position: "relative" }}>
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
        </Box>
        <div className="mainAuctions">
          <Divider />

          <ProductsCard data={state} />
          <Divider />
          <Pagination
            className="pagination"
            sx={{
              textAlign: "center",
              position: "relative",
              alignItem: "center",
            }}
            count={10}
            color="primary"
          />
        </div>
        <div className="classification">
          <Divider className="divider" />
          {/* <Divider orientation="vertical" flexItem/> */}
          <form>
            <Typography
              variant="body"
              component="h6"
              // style={{ fontSize: "15px", textAlign: "center" }}
              sx={{
                fontSize: {
                  xs: "14px",
                  sm: "16px",
                  md: "17px",
                  lg: "18px",
                },
              }}
            >
              Categories
            </Typography>
            <Divider />
            <Typography
              variant="subtitle1"
              component="h6"
              style={{
                fontSize: "14px",
                textAlign: "center",
                marginTop: "10px",
              }}
              className="regionTypography"
            >
              Region
            </Typography>

            <select
              id="region"
              value={state.region}
              onChange={(e) =>
                dispatch({ type: "region", region: e.target.value })
              }
              name="region"
              className="regionCategory"
              placeholder="Region"
            >
              <option className="options" value="">
                <pre>-----Choose Region---</pre>
              </option>
              <option className="options" value="Addis Ababa">
                Addis Ababa
              </option>
              <option className="options" value="Dire dawa">
                Dire dawa
              </option>
              <option className="options" value="Oromia">
                Oromia
              </option>
              <option className="options" value="Amhara">
                Amhara
              </option>
              <option className="options" value="Tigray">
                Tigray
              </option>
              <option className="options" value="Sidama">
                Sidama
              </option>
              <option className="options" value="Afar">
                Afar
              </option>
              <option className="options" value="Somali">
                Somali
              </option>
              <option className="options" value="Gambela">
                {" "}
                Gambela{" "}
              </option>
              <option className="options" value="Harari">
                Harari
              </option>
              <option className="options" value="Benishangul-Gumuz">
                Benishangul-Gumuz
              </option>
              <option className="options" value="South West Ethiopia Peoples'">
                South West Ethiopia Peoples'
              </option>
              <option value="Southern Nations, Nationalities, and Peoples'">
                Southern Nations, Nationalities, and Peoples'
              </option>
              {/* <span>{formErrors.region}</span> */}
            </select>
            <Typography
              variant="subtitle1"
              component="h6"
              style={{
                fontSize: "14px",
                textAlign: "center",
                marginTop: "10px",
              }}
              className="pricerangeTypography"
            >
              Price range
            </Typography>
            <Box className="priceBox">
              <input
                className="priceInput"
                name="upperInteval"
                type="number"
                min="12"
                max="30"
                placeholder="lower range"
                value={state.lowPrice}
                onChange={(e) =>
                  dispatch({ type: "lowPrice", lowPrice: e.target.value })
                }
              ></input>
              <input
                className="priceInput"
                name="higherInterval"
                type="number"
                min="12"
                max="30"
                placeholder="higher range"
                value={state.highPrice}
                onChange={(e) =>
                  dispatch({ type: "highPrice", highPrice: e.target.value })
                }
              ></input>
            </Box>
            <Button>filter</Button>
            <Divider className="divider" />
          </form>
        </div>
      </div>
    </div>
  );
}
export default ClasifyCard;
