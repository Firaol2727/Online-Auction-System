import React from "react";

import { useNavigate } from "react-router-dom";
import "./SignupForm.css";
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
function SignupFormSeller() {
  const [region, setRegion] = useState("Oromia");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    region: "",
    city: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  //   console.log(formData.favColor);
  const navigate = useNavigate();
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  const handleChangeRegion = (event) => {
    setRegion(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(formData);

    setFormErrors(validate(formData));
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
            ...formData,
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      setIsSubmit(false);
      errors.firstName = "firstaname is required!";
    }
    if (!values.lastName) {
      setIsSubmit(false);
      errors.lastName = "lastname is required!";
    }
    if (!values.email) {
      setIsSubmit(false);
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      setIsSubmit(false);
      errors.email = "This is not a valid email format!";
    }
    if (!values.phone) {
      setIsSubmit(false);
      errors.phone = "phone is required!";
    }

    if (!values.password) {
      setIsSubmit(false);
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
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

    if (!values.region) {
      setIsSubmit(false);
      errors.region = "region is required!";
    }
    if (!values.city) {
      setIsSubmit(false);
      errors.city = "city is required!";
    }
    return errors;
  };
  return (
    <Box sx={{margin:"30px"}}>
      <form  onSubmit={handleSubmit}>
        <Typography sx={{color:"blue"}}>Create an account</Typography>
        <hr />

        <Box sx={{display:"flex",flexDirection:"column",width:{
          
          lg:"30%",
          md:"40%",
          ms:"50%",
          xs:"90%",
        },textAlign:"center"}}>
          <TextField
            onChange={handleChange}
            value={formData.firstName}
            label="First Name"
            variant="standard"
          />
          <span>{formErrors.firstName}</span>
          <TextField
            onChange={handleChange}
            value={formData.lastName}
            label="Last Name"
            variant="standard"
          />
          <span>{formErrors.lastName}</span>
          <TextField
            onChange={handleChange}
            value={formData.email}
            label="Email"
            variant="standard"
          />
          <span>{formErrors.email}</span>
          <TextField
            onChange={handleChange}
            value={formData.phone}
            label="Phone Number"
            variant="standard"
          />
          <span>{formErrors.phone}</span>
          <TextField
            onChange={handleChange}
            value={formData.password}
            label="Password"
            variant="standard"
          />
          <span>{formErrors.password}</span>
          <TextField
            onChange={handleChange}
            value={formData.confirmPassword}
            label="Last Name"
            variant="standard"
          />
          <span>{formErrors.confirmPassword}</span>

          <Box sx={{ float: "right", display: "flex", flexWrap: "wrap" }}>
            <Typography sx={{ float: "left", paddingTop: "17px" }}>
              Select region:
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 70 }}>
              <Select
                value={region}
                onChange={handleChangeRegion}
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
            onChange={handleChange}
            value={formData.city}
            label="City"
            variant="standard"
          />
          <span>{formErrors.city}</span>
        </Box>

        <Button
          onClick={handleSubmit}
          sx={{
            height: "50px",
            fontSize: "5px",
            marginTop: "30px",
            textTransform: "unset",
            alignItems: "center",
            justify: "center",
            textAlign: "Center",
          }}
        >
          <Typography
            sx={{
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
              backgroundColor: "#FA2121 ",
              color: "white",
              alignItems: "center",
            }}
          >
            Create Account
          </Typography>
        </Button>
      </form>
    </Box>
  );
}

export default SignupFormSeller;
