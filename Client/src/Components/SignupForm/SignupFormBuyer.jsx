import { useNavigate, NavLink } from "react-router-dom";
import { react, useState, useReducer, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  Divider,
  Button,
  IconButton,
} from "@mui/material";

import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import axios from "axios";
function SignupFormBuyer() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(formData);

    setFormErrors(validate(formData));
    //   if(formData.password !== formData.confirmPassword){
    //     alert('passwords do not match')
    //     return;
    // }
    setIsSubmit(true);
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData);

      try {
        axios({
          method: "POST",
          url: "http://localhost:5000/mine",
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

    return errors;
  };
  return (
    <Box sx={{margin:"30px"}} >
      <form onSubmit={handleSubmit}>
        <Typography sx={{ color: "blue" }}>Create an account</Typography>
        <hr />
        <Box className="totalForm">
          <Box className="commonForm">
            <TextField
              id="standard-basic"
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
              value={formData.passwod}
              label="Password"
              variant="standard"
            />
            <span>{formErrors.password}</span>
            <TextField
              onChange={handleChange}
              value={formData.confirmPassword}
              label="Confirm Password"
              variant="standard"
            />
            <span>{formErrors.confirmPassword}</span>
          </Box>
        </Box>

        <Button
          onClick={handleSubmit}
          sx={{
            height: "50px",
            fontSize: "5px",
            marginTop: "30px",
            textTransform: "unset",
            // alignItems: "center",
            // justify: "center",
            // textAlign: "Center",
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

export default SignupFormBuyer;
