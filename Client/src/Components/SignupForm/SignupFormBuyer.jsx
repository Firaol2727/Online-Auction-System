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
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
axios.create({
  baseURL: "http://localhost:5000",
});
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
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
function SignupFormBuyer(props) {
  const {open,onclose}=props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("my error 1", formErrors);
    setLoading(true);
    setSaving(true);
    console.log("my error 1", formErrors);
    setFormErrors(validate(state));
    console.log("my error 2", formErrors);

    //   if(formData.password !== formData.confirmPassword){
    //     alert('passwords do not match')
    //     return;
    // }
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      console.log("lengths", Object.keys.length);
      try {
        axios({
          method: "POST",
          url: "http://localhost:5000/custom/register",
          data: {
            ...state,
          },
        })
          .then((response) => {
            console.log("data ", response);
            if(response.status===200){
                
            }else{
              setResponse("It seems you have alreay an account")
            }
     
            setSaving(false);
          })
          .catch((error) => {
            console.log("catching error while database connection", error);
            setLoading(false);
            setSaving(false);
          });
      } catch (err) {
        console.log(err);
        setLoading(false);
        setSaving(false);
      }
    } else {
      setSaving(false);
    }
    setIsSubmit(true);
    // setLoading(false);
    // setSaving(false);
  }

  // useEffect(() => {
  //   console.log(formErrors);
  // }, [formErrors]);

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
        <Typography sx={{ color: "black" }}>Create Buyer account</Typography>
        <hr />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            textAlign: "center",
          }}
        >
          <TextField
            id="standard-basic"
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
            type="password"
            required
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
            type="password"
            sx={{ margin: "5px" }}
            required
          />
          <span style={{ color: "red" }}>{formErrors.confirmPassword}</span>
          <Box>
            <Typography sx={{ color: "red" }}>{response}</Typography>
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
              disabled={saving}
              type="submit"
            >
              {saving ? (
                <>
                  <CircularProgress size={24} />
                  Saving...
                </>
              ) : (
                " Create Account"
              )}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default SignupFormBuyer;
