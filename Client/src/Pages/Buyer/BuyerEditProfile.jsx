import NavBuyer from "../../Layouts/NavBar/NavBuyer";
import Footer from "../../Layouts/Footer/Footer";
import { useParams } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
// import BuyerEditProfileBody from "../../Components/BuyerEditProfileBody";
import { react, useState, useReducer, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Category from "../../Components/Category/Category";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

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
        email: action.emial,
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
    case "phone":
      return {
        ...state,
        phone: action.phone,
      };
    case "city":
      return {
        ...state,
        city: action.city,
      };
    case "region":
      return {
        ...state,
        region: action.region,
      };

    case "savedConfirmation":
      return {
        ...state,
        savedConfirmation: action.savedConfirmation,
      };
    default:
      return state;
  }
};
const initialState = {
  firstName: "yohannes",
  lastName: "dejene",
  email: "yohannesdejene23@gmail.com",
  password: "12345",
  confirmPassword: "12345",
  phone: "+251946951726",
  city: "Addis Ababa",
  region: "Oromia",
  savedConfirmation: "",
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          // sx={{
          //   position: 'absolute',
          //   right: 8,
          //   top: 8,
          //   // color: (theme) => theme.palette.grey[500],
          // }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const initialPassword = {
  oldPhoneNumber: "",
  newPhoneNumber: "",
  confirmPhoneNumber: "",
};

// function reducer(state, action) {
//   switch (action.type) {
//     case "oldPassword":
//       return { ...state, oldPassword: action.oldPassword };
//     case "newPassword":
//       return { ...state, newPassword: action.newPassword };
//     case "confirmPasswpr":
//       return { ...state, confirmPassword: action.confirmPassword };
//     default:
//       throw new Error();
//   }
// }

function BuyerEditProfile() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [changePass, setChangePass] = useState(false);

  const [savingLogin, setSavingLogin] = useState(false);

  const handleOpenChangePass = () => {
    setChangePass(true);
  };
  const handleCloseChangePass = () => {
    setChangePass(false);
  };

  console.log("toggleState", toggleState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  //   console.log("state", state);

  const handleSaveEditProfile = (event) => {
    event.preventDefault();
    // console.log(formData);

    setFormErrors(validate(state));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log("in the priofile page ");
    axios
      .get("http://localhost:5000/custom/editprofile", {
        withCredentials: true,
      })
      .then((response) => {
        dispatch({ type: "PROFILE_DATA", profile: response.data });
        console.log("fetched data", response.data);
      })
      //

      .catch((err) => {
        if (err.response.status === 403) {
          console.log("errr r");
        }

        // nav('/login')
      });
  }, []);

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        axios({
          method: "POST",
          url: "/editprofile",
          data: {
            ...state,
          },
        })
          .then((response) => {
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
    if (!values.city) {
      setIsSubmit(false);
      errors.city = "city is required!";
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
  let { id } = useParams();

  return (
    <>
      <NavBuyer />
      <Box my={5}>
        <Category />

        <Box className="backtoHome">
          <NavLink to="/">
            <IconButton
              // color="inherit"
              sx={{ color: "red" }}
            >
              <ChevronLeftOutlinedIcon />

              <Typography> Back to auctions</Typography>
            </IconButton>
          </NavLink>
        </Box>

        <Box
          className="profile"
          my={5}
          sx={{
            alignItems: "center",

            marginLeft: {
              lg: "100px",
              md: "90px",
              sm: "30px",
              xs: "15px",
            },
            marginRight: {
              lg: "100px",
              md: "90px",
              sm: "30px",
              xs: "15px",
            },
          }}
        >
          <Typography my={2} sx={{ marginLeft: "10px" }}>
            {" "}
            Account info
          </Typography>
          <Divider />
          <Box
            className="name"
            my={4}
            sx={{
              diplay: {
                lg: "flex",
                md: "flex",
                sm: "block",
                xs: "block",
              },
            }}
          >
            <TextField
              className="firstName"
              sx={{
                margin: "10px",
                width: {
                  lg: 510,
                  md: 540,
                  sm: 420,
                  xs: 250,
                },
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              autoFocus
              id="outlined-basic"
              variant="outlined"
              label="First name"
              value={state.firstName}
              onChange={(e) =>
                dispatch({ type: "firstName", firstName: e.target.value })
              }
            />
            <Typography
              style={{
                marginBottom: "10px",
                color: "red",
                fontSize: "15px",
                fontFamily: " Roboto",
                marginLeft: "50px",
              }}
            >
              {formErrors.firstName}
            </Typography>

            <TextField
              className="lastName"
              sx={{
                margin: "10px",

                width: {
                  lg: 510,
                  md: 540,
                  sm: 420,
                  xs: 250,
                },
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              id="outlined-basic"
              variant="outlined"
              label="Last Name"
              value={state.lastName}
              onChange={(e) =>
                dispatch({ type: "lastName", lastName: e.target.value })
              }
            />
            <Typography
              style={{
                marginBottom: "10px",
                // color: "red",
                fontSize: "15px",
                fontFamily: " Roboto",
                marginLeft: "50px",
              }}
            >
              {formErrors.lastName}
            </Typography>
          </Box>

          <Box className="email">
            <TextField
              sx={{
                marginLeft: "10px",
                marginRight: "10px",

                width: {
                  lg: 510,
                  md: 540,
                  sm: 420,
                  xs: 250,
                },
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              id="outlined-basic"
              variant="outlined"
              label="Email"
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "email", email: e.target.value })
              }
            />
            <Typography
              style={{
                marginBottom: "10px",
                color: "red",
                fontSize: "15px",
                fontFamily: " Roboto",
                marginLeft: "50px",
              }}
            >
              {formErrors.email}
            </Typography>
          </Box>

          <Box className="popUp" sx={{ marginLeft: "20px" }}>
            <Button
              variant="outlined"
              onClick={handleOpenChangePass}
              sx={{
                color: "black",
                border: "none",
                backgroundColor: "red",
                textTransform: "unset",
                color: "white",
                "&:hover": {
                  backgroundColor: "red",
                  color: "white",
                },
              }}
            >
              Change Password
            </Button>
            <BootstrapDialog
              onClose={handleCloseChangePass}
              aria-labelledby="customized-dialog-title"
              open={changePass}
            >
              <Box
                sx={{
                  height: {
                    lg: "70px",
                    md: "100px",
                    sm: "80px",
                    xs: "100px",
                  },
                }}
                onClose={handleCloseChangePass}
              >
                <IconButton
                  sx={{ float: "right" }}
                  onClick={handleCloseChangePass}
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{
                    alignItem: "center",
                    // float: "left",
                    textAlign: "Center",

                    marginTop: "20px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Changing password
                </Typography>
              </Box>

              <DialogContent dividers>
                <Box className="changePassword" sx={{ display: "block" }}>
                  <form style={{ display: "block" }}>
                    <TextField
                      label=" Old Password"
                      type="number"
                      // variant="outlined"

                      // margin="normal"
                      // value={loginState.username}
                      // onChange={handleUsernameChange}
                      required
                      sx={{
                        "& .MuiInputBase-input": {
                          height: "10px",
                          width: "250px", // Set the height of the input
                        },
                        display: "block",
                      }}
                    />
                    <TextField
                      label="New Password"
                      type="number"
                      variant="outlined"
                      sx={{
                        "& .MuiInputBase-input": {
                          height: "10px",
                          width: "250px", // Set the height of the input
                        },
                        display: "block",
                      }}
                      margin="normal"
                      // value={loginState.username}
                      // onChange={handleUsernameChange}
                      required
                    />
                    <TextField
                      label="Confirm Password"
                      variant="outlined"
                      sx={{
                        "& .MuiInputBase-input": {
                          height: "10px",
                          width: "250px", // Set the height of the input
                        },
                        display: "block",
                      }}
                      margin="normal"
                      type="password"
                      // value={loginState.password}
                      // onChange={handlePasswordChange}
                      required
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ color: "white", backgroundColor: "red" }}
                      // disabled={savingLogin}
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
              </DialogContent>
            </BootstrapDialog>
          </Box>
          <Box className="phone">
            <TextField
              sx={{
                marginLeft: "10px",
                marginRight: "10px",

                marginTop: "20px",
                width: {
                  lg: 510,
                  md: 540,
                  sm: 420,
                  xs: 250,
                },
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              id="outlined-basic"
              variant="outlined"
              label="Phone number"
              value={state.phone}
              onChange={(e) =>
                dispatch({ type: "phone", phone: e.target.value })
              }
            />
            <Typography
              style={{
                marginBottom: "10px",
                color: "red",
                fontSize: "15px",
                fontFamily: " Roboto",
                marginLeft: "50px",
              }}
            >
              {formErrors.phone}
            </Typography>
          </Box>
          <Box className="City">
            <TextField
              sx={{
                marginLeft: "10px",
                marginRight: "10px",

                marginTop: "20px",
                width: {
                  lg: 510,
                  md: 540,
                  sm: 420,
                  xs: 250,
                },
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              id="outlined-basic"
              variant="outlined"
              label="City"
              value={state.city}
              onChange={(e) => dispatch({ type: "city", city: e.target.value })}
            />
            <Typography
              style={{
                marginBottom: "10px",
                color: "red",
                fontSize: "15px",
                fontFamily: " Roboto",
                marginLeft: "50px",
              }}
            >
              {formErrors.city}
            </Typography>
          </Box>

          <Box sx={{ marginTop: "20px", marginLeft: "10px" }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Region</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Region"
                value={state.region}
                onChange={(e) =>
                  dispatch({ type: "region", region: e.target.value })
                }
                sx={{ width: "250px" }}
                MenuProps={{
                  style: {
                    maxHeight: 400,
                  },
                }}
              >
                <MenuItem value="Addis Ababa">Addis Ababa</MenuItem>
                <MenuItem value="Dire Dawa">Dire Dawa</MenuItem>
                <MenuItem value="Amhara">Amhara</MenuItem>
                <MenuItem value="Oromia">Oromia</MenuItem>
                <MenuItem value="Tigray">Tigray</MenuItem>
                <MenuItem value="Somali">Somali</MenuItem>
                <MenuItem value="Benishangul-Gumuz">Benishangul-Gumuz</MenuItem>
                <MenuItem value="Gambela">Gambela</MenuItem>
                <MenuItem value="Harari">Harari</MenuItem>
                <MenuItem value="Sidama">Sidama</MenuItem>
                <MenuItem value="Afar">Afar</MenuItem>
                <MenuItem value="SWEPR">SWEPR</MenuItem>
                <MenuItem value="SNNEP">SNNPR</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              alignItems: "center",
              justify: "center",
              textAlign: "Center",
              backgroundColor: "red",
              marginTop: "30px",
              width: "200px",
              marginLeft: "10px",
            }}
          >
            <Button
              onClick={handleSaveEditProfile}
              sx={{
                fontSize: "15px",
                textTransform: "unset",
                color: "white",
              }}
            >
              Save changes
            </Button>
          </Box>

          <Divider />
        </Box>
      </Box>
      <Footer />
    </>
  );
}
export default BuyerEditProfile;
