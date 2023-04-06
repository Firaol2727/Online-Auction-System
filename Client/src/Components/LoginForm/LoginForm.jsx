import React from "react";
import { useState, useEffect } from "react";
import "./LoginForm.css";
import axios from "../../Service/api";

function LoginForm() {
  // const [formData, setFormData] = useState({
  //   phone: "",
  //   password: "",
  // });
  // const [message, setMessage] = useState("");

  // function handleChange(event) {
  //   const { name, value, type, checked } = event.target;

  //   setFormData((prevFormData) => {
  //     return {
  //       ...prevFormData,
  //       [name]: value,
  //     };
  //   });
  // }

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   console.log(formData);
  // }
  const [state, setState] = useState([]);
  useEffect(() => {
    axios(
    { 
    method: 'GET',
    url: '/seller',
    data: {
      username,
      password,
    },}
    )
    .then((data) => {
        // console.log(data.data);
        console.log(data.data);
        setState(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="loginDiv">
      is 
     {/* <ul>
        {state.map((data) => (
         <li>{data.email}</li>
        ))}
   </ul> */}
      Hello
      {/* <form className="loginForm" onSubmit={handleSubmit}>
        <h1 className="headerLogin">Log in</h1>
        <div className="totalFormLogin">
          <input
            type="number"
            placeholder="Phone number"
            onChange={handleChange}
            name="phone"
            value={formData.phone}
            className="loginInput"
          />
          <label>number not found</label>
          <input
            type="password"
            placeholder="password"
            onChange={handleChange}
            name="password"
            value={formData.password}
            className="loginInput"
          />
          <label>this is lable</label>
          {formData.password !== "" && formData.phone !== "" && (
            <button
              style={{ backgroundColor: "Blue" }}
              id="loginPass"
              className="loginButton"
            >
              {" "}
              Log in
            </button>
          )}

          {(formData.password == "" || formData.phone === "") && (
            <button className="loginButton"> Log in</button>
          )}
        </div>
      </form> */}
    </div>
  );
}

export default LoginForm;
