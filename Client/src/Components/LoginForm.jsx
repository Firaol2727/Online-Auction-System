import React from "react";
import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

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

function LoginForm(props) {
  const navigate = useNavigate();

  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });

  const [savingLogin, setSavingLogin] = useState(false);
  const [responseLogin, setResponseLogin] = useState("");

  ////login Functions
  const handleUsernameChange = (e) => {
    setLoginState({
      ...loginState,
      username: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setLoginState({
      ...loginState,
      password: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    setSavingLogin(true);
    console.log("clicked logged", loginState);
    setResponseLogin("");
    axios({
      method: "POST",
      url: "http://localhost:5000/login",
      withCredentials: true,
      data: {
        ...loginState,
      },
    })
      .then((response) => {
        console.log("data from back ende ", response.data);
        if (response.status === 200) {
          setResponseLogin("login  succesffull");
          if (response.data === "BUYER") {
            console.log("buyerrrr");
            navigate(-1);
          } else if (response.data === "SELLER") {
            console.log("it is seller");
            setTimeout(() => {
              navigate("/sel/home");
            }, 2000);
          } else {
            console.log("none");
          }

          console.log("successss");
        } else {
          setResponseLogin("incorrect check your username or password");
          console.log("not success");
        }
        setSavingLogin(false);
      })
      .catch((error) => {
        console.log("catching error while database connection", error);
        setResponseLogin("incorrect check your username or password");
        setSavingLogin(false);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {" "}
      <Box
        sx={{
          p: 3,
          border: "1px solid #ccc",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Typography sx={{ m: "40px", color: "blue" }}>
          {" "}
          Welcome Back{" "}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Phone Number"
            type="number"
            variant="outlined"
            // margin="normal"

            value={loginState.username}
            onChange={handleUsernameChange}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={loginState.password}
            onChange={handlePasswordChange}
            required
          />

          <Typography sx={{ marginTop: "30px" }}>{responseLogin}</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ color: "white", backgroundColor: "red" }}
            disabled={savingLogin}
            type="submit"
          >
            {savingLogin ? (
              <>
                <CircularProgress size={24} />
                Cheking...
              </>
            ) : (
              "  Log in"
            )}
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default LoginForm;
