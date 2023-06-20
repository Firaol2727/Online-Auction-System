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
import { NavLink, useNavigate } from "react-router-dom";
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
  editedPassword: {
    oldpassword: "",
    newpassword: "",
    confirmnewpassword: "",
  },
};
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
        ...state,
        editedPassword: action.payload,
      };
    default:
      throw new Error();
  }
}

function BuyerEditProfile() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const [loggedin, setLoggedIn] = useState(false);
  const [changePass, setChangePass] = useState(false);

  const [saving, setSaving] = useState(false);

  const [responseEdit, setResponseEdit] = useState("");

  const [savingPassChange, setSavingPassChange] = useState(false);
  const [responsePassChange, setResponsePassChange] = useState("");

  const handleOpenChangePass = () => {
    setChangePass(true);
  };
  const handleCloseChangePass = () => {
    setChangePass(false);
  };

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  //   console.log("state", state);
  useEffect(() => {
    console.log("in the priofile page buyer profile ");
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
      //
      .catch((err) => {
        setLoggedIn(false);
        navigate("/login");

        if (err.response.status === 403) {
          console.log("errr r");
        }
      });
  }, [loggedin]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    dispatch({
      type: "SET_EDITED_PROFILE_DATA",
      payload: { ...state.editedProfileData, [name]: value },
    });
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    dispatch({
      type: "SET_EDITED_PASSWORD",
      payload: { ...state.editedPassword, [name]: value },
    });
  };

  const handleSaveEditProfile = (event) => {
    event.preventDefault();
    setSaving(true);

    axios({
      method: "POST",
      url: "http://localhost:5000/custom/changeprofile",
      withCredentials: true,
      data: {
        ...state.editedProfileData,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setResponseEdit("succesufully updated ");
          console.log("succesffuly updated");
          setSaving(false);
        } else {
          setResponseEdit("incorrect check your username or password");
          setSaving(false);
          console.log("not success");
        }
      })
      .catch((err) => {
        setResponseEdit(
          "Check the phone number of password it shoukd be unique"
        );
        if (err.response.status === 403) {
          console.log("errr r", err);
        }
        console.log(err);
        setSaving(false);
      });
  };
  const handleSavePasswordChange = (event) => {
    event.preventDefault();

    setSavingPassChange(true);

    axios({
      method: "POST",
      url: "http://localhost:5000/custom/changepassword",
      withCredentials: true,
      data: {
        ...state.editedPassword,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setResponsePassChange("succesufully updated ");
          console.log("succesffuly updated");
          setSavingPassChange(false);
          setTimeout(() => {
            setChangePass(false);
          }, 3000);
        } else {
          setResponsePassChange("incorrect check the phone number");
          setSavingPassChange(false);
          console.log("not success");
        }
      })
      .catch((err) => {
        setSavingPassChange(false);
        setResponsePassChange("incorrect check the phone number");
        if (err.response.status === 403) {
          console.log("errr r");
        }
      });
  };

  const passwordDialoge = () => {
    return (
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
          <IconButton sx={{ float: "right" }} onClick={handleCloseChangePass}>
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
            <form
              style={{ display: "block" }}
              onSubmit={handleSavePasswordChange}
            >
              <TextField
                label=" Old Password"
                // variant="outlined"
                type="password"
                name="oldpassword"
                value={state.editedPassword.oldpassword}
                onChange={handlePasswordChange}
                sx={{
                  "& .MuiInputBase-input": {
                    height: "10px",
                    width: "250px", // Set the height of the input
                  },
                  display: "block",
                }}
                inputProps={{ required: true }}
              />
              <TextField
                label="New Password"
                variant="outlined"
                sx={{
                  "& .MuiInputBase-input": {
                    height: "10px",
                    width: "250px", // Set the height of the input
                  },
                  display: "block",
                }}
                margin="normal"
                name="newpassword"
                type="password"
                value={state.editedPassword.newpassword}
                onChange={handlePasswordChange}
                inputProps={{ required: true }}
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
                name="confirmnewpassword"
                value={state.editedPassword.confirmnewpassword}
                onChange={handlePasswordChange}
                required
              />
              <Typography sx={{ mt: "20px", mb: "20px" }}>
                {responsePassChange}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                sx={{ color: "white", backgroundColor: "red" }}
                // onClick={handleSavePasswordChange}
                type="submit"
                disabled={savingPassChange}
              >
                {savingPassChange ? (
                  <>
                    <CircularProgress size={24} />
                    Cheking...
                  </>
                ) : (
                  " Change passwod"
                )}
              </Button>
            </form>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    );
  };

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
              variant="outlined"
              label="First name"
              name="fname"
              value={state.editedProfileData.fname}
              onChange={handleInputChange}
            />

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
              variant="outlined"
              label="Last Name"
              name="lname"
              value={state.editedProfileData.lname}
              onChange={handleInputChange}
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
              label="Email"
              name="email"
              value={state.editedProfileData.email}
              onChange={handleInputChange}
            />
          </Box>

          <Box className="popUp" sx={{ marginLeft: "20px", marginTop: "20px" }}>
            <Button
              variant="outlined"
              onClick={handleOpenChangePass}
              sx={{
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

            {passwordDialoge()}
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
              label="Phone number"
              name="phonenumber"
              value={state.editedProfileData.phonenumber}
              onChange={handleInputChange}
            />
            <Typography
              style={{
                marginBottom: "10px",
                color: "red",
                fontSize: "15px",
                fontFamily: " Roboto",
                marginLeft: "50px",
              }}
            ></Typography>
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
              label="City"
              name="city"
              value={state.editedProfileData.city}
              onChange={handleInputChange}
              required
            />
            <Typography
              style={{
                marginBottom: "10px",
                color: "red",
                fontSize: "15px",
                fontFamily: " Roboto",
                marginLeft: "50px",
              }}
            ></Typography>
          </Box>

          <Box sx={{ marginTop: "20px", marginLeft: "10px" }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Region</InputLabel>
              <Select
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                required
                label="Region"
                name="region"
                value={state.editedProfileData.region}
                onChange={handleInputChange}
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
          <Typography sx={{ margin: "20px" }}>{responseEdit}</Typography>
          <Button
            variant="contained"
            sx={{ color: "white", backgroundColor: "red" }}
            onClick={handleSaveEditProfile}
            disabled={saving}
            type="submit"
          >
            {saving ? (
              <>
                <CircularProgress size={24} />
                Cheking...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>

          <Divider />
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default BuyerEditProfile;
