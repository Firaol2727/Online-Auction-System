import React from "react";
import { useState, useEffect, useReducer } from "react";

import axios from "../Service/api";
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
  isLoggedIn: false,
  phone: "",
  password: "",
  response: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "inputPhone":
      return {
        ...state,
        phone: action.phone,
      };
    case "inputPassword":
      return {
        ...state,
        password: action.password,
      };

    default:
      return state;
  }
};

function LoginForm(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loggedin, setLoggedin] = useState("no");
  const data = "Hello from child";
  props.sendData(loggedin);
  function handleSubmit(event) {
    event.preventDefault();
    try {
      axios({
        method: "GET",
        url: "/seller",
        data: {
          phone: state.phone,
          password: state.password,
        },
      })
        .then((response) => {
          if (response == true) {
            navigate("/");
          } else {
            state.response = "User name or password not correct";
          }
          console.log("data sent", response);
        })
        .catch((error) => {
          // navigate("/");

          state.response = "User name or password not correct";
          console.log("catching error while database connection");

          return;
        });
    } catch (err) {
      console.log("err", err);
    }
    console.log(state);
  }
  const loginHandler = () => {
    console.log("this is loginHandler");
    setLoggedin("yes");
  };
  useEffect(() => {}, [state.response]);

  return (
    <Box
      sx={{
        marginTop: "0px",
        width: {
          lg: "500px",
          md: "450px",
          sm: "300px",
          xs: "250px",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <label>{state.response}</label>
          <TextField
            id="standard-basic"
            onChange={(e) =>
              dispatch({ type: "inputPhone", phone: e.target.value })
            }
            value={state.phone}
            label="Phone"
            variant="standard"
            sx={{ margin: "5px" }}
          />

          <span style={{ color: "red" }}>{formErrors.phone}</span>
          <TextField
            id="standard-basic"
            onChange={(e) =>
              dispatch({ type: "inputPassword", password: e.target.value })
            }
            value={state.password}
            label="Password"
            variant="standard"
            sx={{ margin: "5px" }}
          />

          <span style={{ color: "red" }}>{formErrors.password}</span>

          {state.password !== "" && state.phone !== "" && (
            <Button
              sx={{ backgroundColor: "red", color: "white" }}
              id="loginPass"
              className="loginButton"
            >
              {" "}
              Log in
            </Button>
          )}

          {(state.password == "" || state.phone === "") && (
            <Box
              sx={{
                alignItems: "center",
                justify: "center",
                textAlign: "Center",
                backgroundColor: "red",
                marginTop:"20px"
              }}

            >
              <Button
                sx={{
                 
                  fontSize: "20px",
                  width: "30px",
                  textTransform: "unset",
                  color:"white"
                }}
                onClick={loginHandler}
              >
                Login
              </Button>
            </Box>
          )}
        </Box>
      </form>
    </Box>
  );
}

export default LoginForm;
