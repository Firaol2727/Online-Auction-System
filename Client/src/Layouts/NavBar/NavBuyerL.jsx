import { useState, useReducer, useEffect } from "react";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import SignupFormBuyer from "../../Components/SignupForm/SignupFormBuyer";
import SignupFormSeller from "../../Components/SignupForm/SignupFormSeller";
import SignupForm from "../../Components/SignupForm/SignupForm";
// import SignupFormBuyer from "../../Components/SignupForm/SignupFormBuyer";
// import SignupFormSeller from "../../Components/SignupForm/SignupFormBuyer";
import LoginForm from "../../Components/LoginForm";

import FormControlLabel from "@mui/material/Dialog";

import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";

import Radio from "@mui/material/Radio";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

import InputLabel from "@mui/material/InputLabel";

import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
axios.create({
  baseURL: "http://localhost:5000",
});

const NotoficationText = [
  "Thank you for using this service",
  "Your auction is started now",
  "The first bid is given for your auction",
  "Hide all notification content",
];
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

const initialStateBuyer = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};
const initialStateSeller = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  region: "Oromia",
  city: "Addis Ababa",
};
const reducerBuyer = (stateBuyer, action) => {
  switch (action.type) {
    case "firstName":
      return {
        ...stateBuyer,
        firstName: action.firstName,
      };
    case "lastName":
      return {
        ...stateBuyer,
        lastName: action.lastName,
      };
    case "email":
      return {
        ...stateBuyer,
        email: action.email,
      };
    case "phoneNumber":
      return {
        ...stateBuyer,
        phoneNumber: action.phoneNumber,
      };
    case "password":
      return {
        ...stateBuyer,
        password: action.password,
      };
    case "confirmPassword":
      return {
        ...stateBuyer,
        confirmPassword: action.confirmPassword,
      };

    default:
      return stateBuyer;
  }
};
const reducerSeller = (stateSeller, action) => {
  switch (action.type) {
    case "firstName":
      return {
        ...stateSeller,
        firstName: action.firstName,
      };
    case "lastName":
      return {
        ...stateSeller,
        lastName: action.lastName,
      };
    case "email":
      return {
        ...stateSeller,
        email: action.email,
      };
    case "phoneNumber":
      return {
        ...stateSeller,
        phoneNumber: action.phoneNumber,
      };
    case "password":
      return {
        ...stateSeller,
        password: action.password,
      };
    case "confirmPassword":
      return {
        ...stateSeller,
        confirmPassword: action.confirmPassword,
      };
    case "region":
      return {
        ...stateSeller,
        region: action.region,
      };
    case "city":
      return {
        ...stateSeller,
        city: action.city,
      };

    default:
      return stateSeller;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "PROFILE_DATA":
      return { ...state, data: action.profile };
    default:
      return state;
  }
};

export default function NavBuyerL(props) {
  const [state, dispatch] = useReducer(reducer, { data: null });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notify, setNotify] = React.useState(null);
  const [account, setAccount] = React.useState(null);
  const [loggedin, setLoggedin] = React.useState(false);
  const navigate = useNavigate();
  const [openRegister, setOpenRegister] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [personType, setPersonType] = useState("Seller");

  ////Buyer
  const [stateBuyer, dispatchBuyer] = useReducer(
    reducerBuyer,
    initialStateBuyer
  );
  const [formErrorsBuyer, setFormErrorsBuyer] = useState({});
  const [isSubmitBuyer, setIsSubmitBuyer] = useState(false);
  const [responseBuyer, setResponseBuyer] = useState("");
  const [savingBuyer, setSavingBuyer] = useState(false);

  ////seller
  const [stateSeller, dispatchSeller] = useReducer(
    reducerSeller,
    initialStateSeller
  );
  const [formErrorsSeller, setFormErrorsSeller] = useState({});
  const [isSubmitSeller, setIsSubmitSeller] = useState(false);
  const [responseSeller, setResponseSeller] = useState("");
  const [savingSeller, setSavingSeller] = useState(false);

  ////login

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

    try {
      console.log("in the try");
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

              setLoggedin(true);
            } else if (response.data === "SELLER") {
              console.log("it is seller");
              setTimeout(() => {
                navigate("/sel/home");
              }, 2000);
            } else {
              console.log("none");
            }

            console.log("successss");
            setResponseLogin(true);
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
    } catch (errr) {
      console.log("error trying");
      setSavingLogin(false);
    }
  };

  //buyer functions
  function handleSubmitBuyer(event) {
    event.preventDefault();

    setSavingBuyer(true);

    setFormErrorsBuyer(validateBuyer(stateBuyer));

    if (Object.keys(formErrorsBuyer).length == 0 && isSubmitBuyer) {
      console.log("lengths", Object.keys.length);
      try {
        axios({
          method: "POST",
          url: "http://localhost:5000/custom/register",
          data: {
            ...stateBuyer,
          },
        })
          .then((response) => {
            console.log("data ", response);
            if (response.status === 200) {
              setResponseBuyer("registration succesffull");
              setTimeout(() => {
                setLoggedin(true);
              }, 5000);
            } else {
              setResponseBuyer(
                "It seems you have alreay an account check your email and phone number"
              );
            }

            setSavingBuyer(false);
          })
          .catch((error) => {
            console.log("catching error while database connection", error);
            setResponseBuyer("It seems you have alreay an account");
            setSavingBuyer(false);
          });
      } catch (err) {
        console.log(err);

        setSavingBuyer(false);
      }
    } else {
      setSavingBuyer(false);
    }
    setIsSubmitBuyer(true);
    // setLoading(false);
    // setSavingBuyer(false);
  }

  const validateBuyer = (values) => {
    const errors = {};

    if (values.password.length < 4) {
      setIsSubmitBuyer(false);
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      setIsSubmitBuyer(false);
      errors.password = "Password cannot exceed more than 10 characters";
    }

    if (values.password !== values.confirmPassword) {
      setIsSubmitBuyer(false);
      errors.confirmPassword = "Password mismatch";
    }

    return errors;
  };
  ///////

  ///seller functions
  function handleSubmitSeller(event) {
    event.preventDefault();

    setSavingSeller(true);

    setFormErrorsSeller(validateSeller(stateSeller));

    if (Object.keys(formErrorsSeller).length == 0 && isSubmitSeller) {
      console.log("lengths", Object.keys.length);
      try {
        axios({
          method: "POST",
          url: "http://localhost:5000/sel/register",
          data: {
            ...stateSeller,
          },
        })
          .then((response) => {
            console.log("data ", response);
            if (response.status === 200) {
              setResponseSeller("registration succesffull");
              setTimeout(() => {
                console.log("redirecting to sel home");
                navigate("/sel/home");
              }, 3000);
            } else {
              setResponseSeller(
                "It seems you have alreay an account check your email and phone number"
              );
            }

            setSavingSeller(false);
          })
          .catch((error) => {
            console.log("catching error while database connection", error);
            setResponseSeller("Error while connecting ");
            setSavingSeller(false);
          });
      } catch (err) {
        console.log(err);
        setResponseSeller("somthing went wrong");
        setSavingSeller(false);
      }
    } else {
      setSavingSeller(false);
    }
    setIsSubmitSeller(true);
    // setLoading(false);
    // setSavingBuyer(false);
  }

  const validateSeller = (values) => {
    const errors = {};

    if (values.password.length < 4) {
      setIsSubmitSeller(false);
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      setIsSubmitSeller(false);
      errors.password = "Password cannot exceed more than 10 characters";
    }

    if (values.password !== values.confirmPassword) {
      setIsSubmitSeller(false);
      errors.confirmPassword = "Password mismatch";
    }

    return errors;
  };
  ///////
  ////login
  function LoginForm() {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          // label={
          //   isEmail
          //     ? "Email"
          //     : isPhoneNumber
          //     ? "Phone number"
          //     : "Email or Phone number"
          // }
          label="Phone Number"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={loginState.username}
          onChange={handleUsernameChange}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
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
    );
  }

  const isMenuOpen = Boolean(anchorEl);
  const notifyOpen = Boolean(notify);
  const accountOpen = Boolean(account);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const notifyClose = () => {
    setNotify(null);
  };
  const handleNotification = (event) => {
    setNotify(event.currentTarget);
  };
  const accountClose = (event) => {
    setAccount(null);
  };
  const handleAccount = (event) => {
    setAccount(event.currentTarget);
  };

  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };
  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handlePersonType = (event) => {
    setPersonType(event.target.value);
  };

  function BuyerForm() {
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
        <form onSubmit={handleSubmitBuyer}>
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
                dispatchBuyer({ type: "firstName", firstName: e.target.value })
              }
              value={stateBuyer.firstName}
              label="First Name"
              variant="standard"
              sx={{ margin: "5px" }}
              required
            />

            <TextField
              onChange={(e) =>
                dispatchBuyer({ type: "lastName", lastName: e.target.value })
              }
              value={stateBuyer.lastName}
              label="Last Name"
              variant="standard"
              sx={{ margin: "5px" }}
              required
            />

            <TextField
              onChange={(e) =>
                dispatchBuyer({ type: "email", email: e.target.value })
              }
              value={stateBuyer.email}
              label="Email"
              variant="standard"
              sx={{ margin: "5px" }}
              required
              type="email"
            />

            <TextField
              onChange={(e) =>
                dispatchBuyer({
                  type: "phoneNumber",
                  phoneNumber: e.target.value,
                })
              }
              value={stateBuyer.phoneNumber}
              label="Phone Number"
              variant="standard"
              sx={{ margin: "5px" }}
              required
              type="number"
            />

            <TextField
              onChange={(e) =>
                dispatchBuyer({ type: "password", password: e.target.value })
              }
              value={stateBuyer.password}
              label="Password"
              variant="standard"
              sx={{ margin: "5px" }}
              type="password"
              required
            />
            <span style={{ color: "red" }}>{formErrorsBuyer.password}</span>
            <TextField
              onChange={(e) =>
                dispatchBuyer({
                  type: "confirmPassword",
                  confirmPassword: e.target.value,
                })
              }
              value={stateBuyer.confirmPassword}
              label="Confirm Password"
              variant="standard"
              type="password"
              sx={{ margin: "5px" }}
              required
            />
            <span style={{ color: "red" }}>
              {formErrorsBuyer.confirmPassword}
            </span>
            <Box>
              <Typography sx={{ color: "red" }}>{responseBuyer}</Typography>
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
                disabled={savingBuyer}
                type="submit"
              >
                {savingBuyer ? (
                  <>
                    <CircularProgress size={24} />
                    Saving...
                  </>
                ) : (
                  " Create Account"
                )}
              </Button>
              <span style={{ color: "red" }}>{responseBuyer}</span>
            </Box>
          </Box>
        </form>
      </Box>
    );
  }

  function SellerForm() {
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
        <form onSubmit={handleSubmitSeller}>
          <Typography sx={{ color: "black" }}>Create Seller account</Typography>
          <hr />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              onChange={(e) =>
                dispatchSeller({ type: "firstName", firstName: e.target.value })
              }
              value={stateSeller.firstName}
              label="First Name"
              variant="standard"
              sx={{ margin: "5px" }}
              required
            />

            <TextField
              onChange={(e) =>
                dispatchSeller({ type: "lastName", lastName: e.target.value })
              }
              value={stateSeller.lastName}
              label="Last Name"
              variant="standard"
              sx={{ margin: "5px" }}
              required
            />

            <TextField
              onChange={(e) =>
                dispatchSeller({ type: "email", email: e.target.value })
              }
              value={stateSeller.email}
              label="Email"
              variant="standard"
              sx={{ margin: "5px" }}
              required
              type="email"
            />

            <TextField
              onChange={(e) =>
                dispatchSeller({
                  type: "phoneNumber",
                  phoneNumber: e.target.value,
                })
              }
              value={stateSeller.phoneNumber}
              label="Phone Number"
              variant="standard"
              sx={{ margin: "5px" }}
              required
              type="number"
            />

            <TextField
              onChange={(e) =>
                dispatchSeller({ type: "password", password: e.target.value })
              }
              value={stateSeller.password}
              label="Password"
              variant="standard"
              sx={{ margin: "5px" }}
              required
              type="password"
            />
            <span style={{ color: "red" }}>{formErrorsSeller.password}</span>
            <TextField
              onChange={(e) =>
                dispatchSeller({
                  type: "confirmPassword",
                  confirmPassword: e.target.value,
                })
              }
              value={stateSeller.confirmPassword}
              label="Confirm Password"
              variant="standard"
              sx={{ margin: "5px" }}
              required
              type="password"
            />
            <span style={{ color: "red" }}>
              {formErrorsSeller.confirmPassword}
            </span>

            <Box sx={{ float: "right", display: "flex", flexWrap: "wrap" }}>
              <Typography sx={{ float: "left", paddingTop: "17px" }}>
                Select region:
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 70 }}>
                <Select
                  // value={region}
                  required
                  value={stateSeller.region}
                  // onChange={handleChangeRegion}
                  onChange={(e) =>
                    dispatchSeller({ type: "region", region: e.target.value })
                  }
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
              onChange={(e) =>
                dispatchSeller({ type: "city", city: e.target.value })
              }
              value={stateSeller.city}
              label="City"
              variant="standard"
              sx={{ margin: "5px" }}
              required
            />
            <span style={{ color: "red" }}>{formErrorsSeller.city}</span>
          </Box>
          <Box>
            <Typography sx={{ color: "red", marginTop: "30px" }}>
              {responseSeller}
            </Typography>
          </Box>
          <span></span>
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
              disabled={savingSeller}
              type="submit"
            >
              {savingSeller ? (
                <>
                  <CircularProgress size={24} />
                  Saving...
                </>
              ) : (
                " Create Account"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    );
  }

  const menuId = "primary-search-account-menu";

  const Notification = (
    <Menu
      // notify={notify}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={notifyOpen}
      onClose={notifyClose}
      sx={{ marginTop: "50px" }}
    >
      {NotoficationText.map((option, index) => (
        <MenuItem key={option}>{option}</MenuItem>
      ))}
    </Menu>
  );
  const Account = (
    <Menu
      // notify={notify}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      keepMounted
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      open={accountOpen}
      onClose={accountClose}
      sx={{
        marginTop: "50px",
        marginLeft: {
          lg: "250px",
          md: "100px",
          sm: "190px",
          xs: "50px",
        },
      }}
    >
      <MenuItem onClose={accountClose}>
        <Box className="account" sx={{ display: "block" }}>
          <Box sx={{ display: "flex", margin: "10px" }}>
            <PersonIcon size="large" />
            <Typography className="account name">Yohannes dejene</Typography>
          </Box>
          <Box sx={{ margin: "20px" }}>
            <Typography className="balance">Balance :$500</Typography>
          </Box>
          <Box sx={{ margin: "20px" }}>
            <Link href="/payment">
              <Typography sx={{ color: "red" }}>Deposite</Typography>
            </Link>
          </Box>
        </Box>
      </MenuItem>
    </Menu>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ marginTop: "5px" }}
    >
      <MenuItem onClick={handleMenuClose}>
        <Box>
          <NavLink to="/profile">
            <Typography>My profile</Typography>
          </NavLink>
        </Box>
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        <Box>
          <NavLink to="/buyerauctions">
            <Typography>My auctions</Typography>
          </NavLink>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Box>
          <NavLink to="/payment">
            <Typography>Deposite</Typography>
          </NavLink>
        </Box>
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleMenuClose}>
        <NavLink to="/logout" sx={{ display: "flex" }}>
          <IconButton
            // color="inherit"
            sx={{ color: "#081263 " }}
          >
            <LogoutIcon sx={{ color: "black" }} />
            <Typography sx={{ margin: "8px" }}>Logout</Typography>
          </IconButton>
        </NavLink>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    setOpenLogin(!props.checkProfilePage);
    // setLoggedin(!props.checkEditProfilePage);
    console.log("running", loggedin);
    console.log("open", openLogin);
    setOpenLogin(!props.checkEditProfilePage);
  }, [openLogin]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {console.log("check log in profile", props.checkProfilePage)}
      {console.log("check log in Editprofile", props.checkEditProfilePage)}

      <AppBar
        position="relative"
        elevation={1}
        sx={{ backgroundColor: "white " }}
      >
        <Toolbar>
          <Box
            sx={{
              height: "15px",

              textAlign: "center",
              alignItems: "center",
              display: {
                lg: "flex",
                md: "flex",
                sm: "flex",
                xs: "flex",
              },
            }}
          >
            {/* <img src="air.jpg" alt="images_place" /> */}
            <Box
              sx={{
                display: {
                  lg: "block",
                  md: "block",
                  sm: "block",
                  xs: "none",
                },
              }}
            >
              <img
                alt="Home Page"
                src="https://oaresources.azureedge.net/images/oa-gavel-sm.png"
                style={{
                  width: "40px",
                  margin: "10px 15px ",
                  backgroundColor: "black",
                }}
              ></img>
            </Box>
            <Typography
              sx={{
                marginLeft: {
                  lg: "10px",
                  md: "10px",
                  sm: "8px",
                  xs: "0px",
                },
                fontWeight: "800",
                color: "black",
              }}
            >
              {" "}
              NU CHARETA
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex" }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleAccount}
            >
              <AccountBalanceWalletIcon sx={{ color: "black" }} />

              <Typography
                sx={{
                  marginLeft: "20px",
                  fontFamily: "Monospace",
                  fontWieght: "900",
                  display: { xs: "none", md: "flex", color: "black" },
                }}
              >
                Balance
              </Typography>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotification}
            >
              <Badge badgeContent={16} color="error" sx={{}}>
                <NotificationsIcon sx={{ color: "black" }} />
              </Badge>
              <Typography
                sx={{
                  marginLeft: "20px",
                  fontFamily: "Monospace",
                  fontWieght: "900",
                  display: { xs: "none", md: "flex", color: "black" },
                }}
              >
                Notification
              </Typography>
            </IconButton>
            {/* <p sx={{}}>Notifications</p> */}
            {!loggedin && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    marginLeft: "10px",
                    flexDirection: {
                      lg: "row",
                      md: "row",
                      sm: "row",
                      xs: "column",
                    },
                  }}
                >
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={handleClickOpenRegister}
                      sx={{
                        color: "black",
                        border: "none",

                        textTransform: "unset",
                        "&:hover": {
                          backgroundColor: "black",
                          color: "white",
                        },
                      }}
                    >
                      <Typography
                        sx={{ fontFamily: "Monospace", fontWieght: "900" }}
                      >
                        {" "}
                        Sign Up
                      </Typography>
                    </Button>
                    <BootstrapDialog
                      onClose={handleCloseRegister}
                      aria-labelledby="customized-dialog-title"
                      open={openRegister}
                    >
                      <Box
                        sx={{ height: "150px" }}
                        onClose={handleCloseRegister}
                      >
                        <IconButton
                          sx={{ float: "right" }}
                          onClick={handleCloseRegister}
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
                          Get Started
                        </Typography>
                        <Typography
                          sx={{
                            alignItem: "center",
                            // float: "left",
                            marginLeft: "20px",
                            marginTop: "20px",
                            fontSize: "20px",
                            display: "flex",
                          }}
                        >
                          Create an account to make bidding fast and easy!
                        </Typography>
                      </Box>

                      <DialogContent dividers>
                        <FormControl sx={{ m: 1, width: "200px" }}>
                          <InputLabel id="demo-simple-select-autowidth-label">
                            Choose Account Type
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={personType}
                            onChange={handlePersonType}
                            autoWidth
                            label="Choose Account Type"
                            defaultValue={"Seller"}
                            inputProps={{
                              name: "age",
                              id: "uncontrolled-native",
                              height: "20px",
                            }}
                            sx={{ height: "50px" }}
                          >
                            <MenuItem value={"Seller"}>Seller</MenuItem>
                            <MenuItem value={"Buyer"}>Buyer</MenuItem>
                          </Select>
                        </FormControl>
                        <Box className="buyerForm">
                          {personType == "Buyer" && BuyerForm()}
                          {personType == "Seller" && SellerForm()}
                        </Box>
                      </DialogContent>
                    </BootstrapDialog>
                  </Box>

                  <Box>
                    <Button
                      variant="outlined"
                      onClick={handleClickOpenLogin}
                      sx={{
                        color: "black",
                        border: "none",

                        textTransform: "unset",
                        "&:hover": {
                          backgroundColor: "black",
                          color: "white",
                        },
                      }}
                    >
                      <Typography
                        sx={{ fontFamily: "Monospace", fontWieght: "900" }}
                      >
                        {" "}
                        Login
                      </Typography>
                    </Button>
                    <BootstrapDialog
                      onClose={handleCloseLogin}
                      aria-labelledby="customized-dialog-title"
                      open={openLogin}
                    >
                      <Box
                        sx={{
                          height: "100px",
                        }}
                        onClose={handleCloseLogin}
                      >
                        <IconButton
                          sx={{ float: "right" }}
                          onClick={handleCloseLogin}
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
                          Welcome Back
                        </Typography>
                        <Typography
                          sx={{
                            alignItem: "center",
                            // float: "left",
                            marginLeft: "20px",
                            marginTop: "20px",
                            fontSize: "20px",
                            display: "flex",
                          }}
                        >
                          Log in to view your account
                        </Typography>
                      </Box>

                      <DialogContent dividers>{LoginForm()}</DialogContent>
                    </BootstrapDialog>
                  </Box>
                </Box>
              </>
            )}
            {loggedin == "yes" && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                // aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle sx={{ color: "black" }} />
                <Typography
                  sx={{
                    marginLeft: "20px",
                    fontFamily: "Monospace",
                    fontWieght: "900",
                    display: { xs: "none", md: "flex", color: "black" },
                  }}
                >
                  {" "}
                  {/* {state &&  state.data.fname} */}
                  {state !== null ? <>state.data.fname</> : <>Profile</>}
                  // {console.log("check state", state)}
                  // {!state && "Profile"}
                </Typography>
              </IconButton>
            )}
          </Box>
        </Toolbar>
        <Divider />
      </AppBar>
      {renderMenu}
      {Notification}
      {Account}
    </Box>
  );
}
