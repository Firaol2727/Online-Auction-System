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
import PlaceIcon from "@mui/icons-material/Place";
import Select from "@mui/material/Select";

const reducer = (state, action) => {
  switch (action.type) {
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

    case "date":
      return {
        ...state,
        date: action.date,
      };
    case "priceRange":
      return {
        ...state,
        priceRange: action.priceRange,
      };
    default:
      return state;
  }
};
const initialState = {
  region: "Addis Ababa",
  lowPrice: "3000",
  highPrice: "100,0000",
  date: "All Dates",

  priceRange: "A",
};

const DateCategory = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState.date);
  console.log("dates", state.date);

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
        {console.log(props)}
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="All Dates"
          name="radio-buttons-group"
          // value={state.date}

          onChange={(e) => dispatch({ type: "date", date: e.target.value })}
        >
          <FormControlLabel
            value="All Dates"
            control={
              <Radio
                color="primary"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 23,
                    color: "black",
                  },
                }}
              />
            }
            label={<Typography>All Dates</Typography>}
            color="primary"
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
  const [state, dispatch] = useReducer(reducer, initialState.region);
  console.log("reion", state.region);
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
          defaultValue="All region"
          name="radio-buttons-group"
          onChange={(e) => dispatch({ type: "region", region: e.target.value })}
        >
          <FormControlLabel
            value="All region"
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
            label={<Typography>All regions</Typography>}
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
  const [state, dispatch] = useReducer(reducer, initialState.priceRange);
  console.log("price range", state.priceRange);
  return (
    <Box className="price">
      <Box className="priceList">
        <h4> Choose price range </h4>
        <RadioGroup
          defaultValue="A"
          name="radio-buttons-group"
          onChange={(e) =>
            dispatch({ type: "priceRange", priceRange: e.target.value })
          }
        >
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
            label={<Typography>"100,000"</Typography>}
          />
        </RadioGroup>
      </Box>
    </Box>
  );
};

const PriceInputCategory = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  function searchPrice() {
    console.log("search for", state.highPrice, state.lowPrice);
  }
  return (
    <Box className="priceRange" sx={{ marginTop: "10px" }}>
      {/* <Typography sx={{ margin: "20px" }}>Price range</Typography> */}
      <h4>Price range</h4>
      <TextField
        label="lower price"
        value={state.lowPrice}
        variant="outlined"
        onChange={(e) =>
          dispatch({ type: "lowPrice", lowPrice: e.target.value })
        }
        sx={{
          width: 150,
          margin: "0px",
          "& .MuiInputBase-root": {
            height: 40,
          },
        }}
      />
      <TextField
        label="higher price"
        value={state.highPrice}
        sx={{
          width: 150,
          marginTop: "10px",
          "& .MuiInputBase-root": {
            height: 40,
          },
        }}
        variant="outlined"
        onChange={(e) =>
          dispatch({ type: "highPrice", highPrice: e.target.value })
        }
      />
      <Button onClick={searchPrice}>Search price</Button>
    </Box>
  );
};

export { DateCategory, RegionCategory, PriceRangeCategory, PriceInputCategory };
