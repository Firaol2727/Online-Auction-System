import React from "react";
import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import axios from "../../Service/api";
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

function LoginForm() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

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

  useEffect(() => {
    
  }, [state.response]);

  return (
    <div className="loginDiv">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1 className="headerLogin">Log in</h1>
        <div className="totalFormLogin">
          <label>{state.response}</label>
          <input
            type="number"
            placeholder="Phone number"
            name="phone"
            value={state.phone}
            className="loginInput"
            onChange={(e) =>
              dispatch({ type: "inputPhone", phone: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="password"
            name="password"
            value={state.password}
            className="loginInput"
            onChange={(e) =>
              dispatch({ type: "inputPassword", password: e.target.value })
            }
            required
          />

          {state.password !== "" && state.phone !== "" && (
            <button
              style={{ backgroundColor: "rgb(93,138,168)" }}
              id="loginPass"
              className="loginButton"
            >
              {" "}
              Log in
            </button>
          )}

          {(state.password == "" || state.phone === "") && (
            <button className="loginButton"> Log in</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
