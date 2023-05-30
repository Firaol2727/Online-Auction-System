import React from "react";

import { useNavigate } from "react-router-dom";

import axios from "../../Service/api";
import { react, useState, useReducer, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  Divider,
  Button,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  region: "Oromia",
  city: "Addis Ababa",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "firstName":
      return {
        ...state,
        firstName: action.firstName,
      };
    case "lastName":
      return {
        ...state,
        lastName: action.lastName,
      };
    case "email":
      return {
        ...state,
        email: action.email,
      };
    case "phoneNumber":
      return {
        ...state,
        phoneNumber: action.phoneNumber,
      };
    case "password":
      return {
        ...state,
        password: action.password,
      };
    case "confirmPassword":
      return {
        ...state,
        confirmPassword: action.confirmPassword,
      };
    case "region":
      return {
        ...state,
        region: action.region,
      };
    case "city":
      return {
        ...state,
        city: action.city,
      };

    default:
      return state;
  }
};
function SignupFormSeller() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
 

  function handleSubmit(event) {
    event.preventDefault();
console.log("sent")
    setFormErrors(validate(state));
    setIsSubmit(true);
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData);

      try {
        axios({
          method: "POST",
          url: "/seller",
          data: {
            ...state,
          },
        })
          .then((response) => {
            navigate("");
            console.log("data sent");
          })
          .catch((error) => {
            console.log("catching error while database connection");
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (values.password.length < 4) {
      setIsSubmit(false);
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      setIsSubmit(false);
      errors.password = "Password cannot exceed more than 10 characters";
    }

    if (values.password !== values.confirmPassword) {
      setIsSubmit(false);
      errors.confirmPassword = "Password mismatch";
    }

    return errors;
  };
  return (
    <Box
      sx={{
        marginLeft: {
          lg: "30px",
          md: "30px",
          sm: "20px",
          xs: "0px",
        },
        marginRight: "30px",
        marginTop: "10px",
        marginBottom: "10px",
        width: {
          lg: "500px",
          md: "450px",
          sm: "300px",
          xs: "250px",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography sx={{ color: "black" }}>Create Seller account</Typography>
        <hr />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            onChange={(e) =>
              dispatch({ type: "firstName", firstName: e.target.value })
            }
            value={state.firstName}
            label="First Name"
            variant="standard"
            sx={{ margin: "5px" }}
            required
          />

          <TextField
            onChange={(e) =>
              dispatch({ type: "lastName", lastName: e.target.value })
            }
            value={state.lastName}
            label="Last Name"
            variant="standard"
            sx={{ margin: "5px" }}
            required
          />

          <TextField
            onChange={(e) => dispatch({ type: "email", email: e.target.value })}
            value={state.email}
            label="Email"
            variant="standard"
            sx={{ margin: "5px" }}
            required
            type="email"
          />

          <TextField
            onChange={(e) =>
              dispatch({ type: "phoneNumber", phoneNumber: e.target.value })
            }
            value={state.phoneNumber}
            label="Phone Number"
            variant="standard"
            sx={{ margin: "5px" }}
            required
            type="number"
          />

          <TextField
            onChange={(e) =>
              dispatch({ type: "password", password: e.target.value })
            }
            value={state.password}
            label="Password"
            variant="standard"
            sx={{ margin: "5px" }}
            required
            type="password"
          />
          <span style={{ color: "red" }}>{formErrors.password}</span>
          <TextField
            onChange={(e) =>
              dispatch({
                type: "confirmPassword",
                confirmPassword: e.target.value,
              })
            }
            value={state.confirmPassword}
            label="Confirm Password"
            variant="standard"
            sx={{ margin: "5px" }}
            required
            type="password"
          />
          <span style={{ color: "red" }}>{formErrors.confirmPassword}</span>

          <Box sx={{ float: "right", display: "flex", flexWrap: "wrap" }}>
            <Typography sx={{ float: "left", paddingTop: "17px" }}>
              Select region:
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 70 }}>
              <Select
                // value={region}
                required
                value={state.region}
                // onChange={handleChangeRegion}
                onChange={(e) =>
                  dispatch({ type: "region", region: e.target.value })
                }
                // displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{ height: "40px" }}
              >
                <MenuItem value={"Addis Ababa"}>Addis Ababa</MenuItem>
                <MenuItem value={"Dire Dawa"}>Dire Dawa</MenuItem>
                <MenuItem value={"Oromia"}>Oromia</MenuItem>
                <MenuItem value={"Amhara"}>Amhara</MenuItem>
                <MenuItem value={"Tigray"}>Tigray</MenuItem>
                <MenuItem value={"Afar"}>Afar</MenuItem>
                <MenuItem value={"Somali"}>Somali</MenuItem>
                <MenuItem value={"Gambela"}>Gambela</MenuItem>
                <MenuItem value={"Harari"}>Harari</MenuItem>
                <MenuItem value={"Benishangul-Gumuz"}>
                  Benishangul-Gumuz
                </MenuItem>
                <MenuItem value={"SWEP"}>SWEP</MenuItem>
                <MenuItem value={"SNNP"}>SNNP</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField
            onChange={(e) => dispatch({ type: "city", city: e.target.value })}
            value={state.city}
            label="City"
            variant="standard"
            sx={{ margin: "5px" }}
            required
          />
          <span style={{ color: "red" }}>{formErrors.city}</span>
        </Box>
        <Box>
          <Typography>

          </Typography>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            justify: "center",
            textAlign: "Center",
            backgroundColor: "red",
            marginTop: "30px",
          }}
        >
          <Button
            sx={{
              fontSize: "20px",
              textTransform: "unset",
              color: "white",
            }}
          >
            Create Account
          </Button>
        </Box>

      </form>
    </Box>
  );
}

export default SignupFormSeller;
