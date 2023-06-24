import NavBuyer from "../../Layouts/NavBuyer";
import Footer from "../../Layouts/Footer";
import { styled } from "@mui/material/styles";
import { react, useState, useReducer, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  Divider,
  Button,
  IconButton,
  Link,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

// import Category from "./Category/Category";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";

import axios from "axios";
function reducer(state, action) {
  switch (action.type) {
    case "SET_PROFILE_DATA":
      return {
        ...state,
        profileData: action.payload,
      };
    case "SET_EDITED_PROFILE_DATA":
      return {
        ...state,
        editedProfileData: action.payload,
      };
    case "SET_EDITED_PASSWORD":
      return {
        editedPassword: action.payload,
      };

    default:
      throw new Error();
  }
}
const initialState = {
  profileData: {},
  editedProfileData: {
    id: "",
    fname: "",
    lname: "",
    phonenumber: "",
    email: "",
    region: "",
    city: "",
    account: "",
  },
  editedPassword: {},
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

export default function BuyerProfile() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loggedin, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/custom/profile", {
        withCredentials: true,
      })
      .then((response) => {
        setLoggedIn(true);
        dispatch({ type: "SET_PROFILE_DATA", payload: response.data });
        dispatch({ type: "SET_EDITED_PROFILE_DATA", payload: response.data });
        console.log("fetched data", response.data);
      })
      .catch((err) => {
        console.group("errrrr", err);
        navigate("/login");
        setLoggedIn(false);
        console.log("heyy", loggedin);
        if (err.response.status === 403) {
          console.log("errr r");
        }
        saving(false);
      });
  }, []);

  return (
    <div>
      <NavBuyer />
      {/* {state.data.fname} */}
      <Box my={5}>
        {/* <Category /> */}

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
          <Box sx={{ display: "flex" }}>
            <Typography my={2} sx={{ marginLeft: "10px" }}>
              {" "}
              Account info
            </Typography>
            <Button
              sx={{
                height: "50px",
                fontSize: "5px",
                textTransform: "unset",
                alignItems: "center",
                justify: "center",
                textAlign: "Center",
                marginLeft: {
                  xs: "60px",
                  sm: "200px",
                  md: "300px",
                  lg: "300px",
                },
              }}
            >
              <Link href="/editprofile" sx={{ textDecoration: "none" }}>
                {" "}
                <Typography
                  sx={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    backgroundColor: "#FA2121 ",
                    color: "white",
                    alignItems: "center",
                  }}
                >
                  Edit Profile
                </Typography>
              </Link>
            </Button>
          </Box>
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
              sx={{
                margin: "10px",
                color: "red",
                width: {
                  lg: 245,
                  md: 260,
                  sm: 200,
                  xs: 200,
                },
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              autoFocus
              variant="outlined"
              value={state.profileData.fname}
              label="First name"
              // disabled={true}
            />

            <TextField
              sx={{
                margin: "10px",

                width: {
                  lg: 245,
                  md: 260,
                  sm: 200,
                  xs: 200,
                },
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              variant="outlined"
              value={state.profileData.lname}
              label="Last Name"
            />
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
              variant="outlined"
              value={state.profileData.email}
              label="Email"
            />
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
              variant="outlined"
              value={state.profileData.phonenumber}
              label="Phone number"
            />
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
              variant="outlined"
              value={state.profileData.city}
              label="City"
            />
          </Box>
          <Box className="Region">
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
              variant="outlined"
              value={state.profileData.region}
              label="Region"
            />
          </Box>

          {/* <Box sx={{ marginTop: "20px", marginLeft: "0px" }}>
            <Button
              sx={{
                height: "50px",
                fontSize: "5px",

                textTransform: "unset",
                alignItems: "center",
                justify: "center",
                textAlign: "Center",
              }}
              disabled
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
                Save changes
              </Typography>
            </Button>
          </Box> */}
          <Divider />
        </Box>
      </Box>
      <Footer />
    </div>
  );
}
