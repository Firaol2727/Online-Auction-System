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
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { NavLink, useNavigate, useLocation } from "react-router-dom";

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
import io from "socket.io-client";

import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

axios.create({
  baseURL: "http://localhost:5000",
});
const socket = io("http://localhost:5000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "my-custom-value",
  },
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

function reducer(state, action) {
  switch (action.type) {
    case "SET_PROFILE_DATA":
      return {
        ...state,
        profileData: action.payload,
      };
    case "SET_BUYER__DATA":
      return {
        ...state,
        buyerData: action.payload,
      };
    case "SET_SELLER_DATA":
      return {
        ...state,
        sellerData: action.payload,
      };
    default:
      throw new Error();
  }
}
const initialState = {
  profileData: {},
  buyerData: {
    id: "",
    fname: "",
    lname: "",
    password: "",
    confirmpassword: "",
    phonenumber: "",
    email: "",
    account: "",
  },
  sellerData: {
    id: "",
    fname: "",
    lname: "",
    password: "",
    confirmpassword: "",
    phonenumber: "",
    email: "",
    region: "",
    city: "",
    account: "",
  },
};
function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${month}/${day} ${time}`;
}

export default function NavBuyer(props) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notify, setNotify] = React.useState(null);
  const [account, setAccount] = React.useState(null);
  const [loggedin, setLoggedin] = React.useState(false);

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

  //////notifications
  const [Notifications, setNotifications] = useState([]);
  const [seemore, setseemore] = useState(false);
  const [hasnotification, sethasnotifications] = useState(0);
  const [no_of_notification, setNo_of_notification] = useState(0);
  let [page, setpage] = useState(1);

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
              navigate("");
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    dispatch({
      type: "SET_SELLER_DATA",
      payload: { ...state.sellerData, [name]: value },
    });
  };

  const handleInputChangeBuyer = (event) => {
    const { name, value } = event.target;

    dispatch({
      type: "SET_BUYER_DATA",
      payload: { ...state.buyerData, [name]: value },
    });
  };

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
    console.log(state.sellerData);
    setFormErrorsSeller(validateSeller(state.sellerData));

    if (Object.keys(formErrorsSeller).length == 0 && isSubmitSeller) {
      console.log("lengths", Object.keys.length);
      try {
        axios({
          method: "POST",
          url: "http://localhost:5000/sel/register",
          data: {
            ...state.sellerData,
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

    if (values.password !== values.confirmpassword) {
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
    if (!notifyOpen) {
      fetchNotifications(1);
    } else {
      setNotifications([]);
      setpage(1);
      setseemore(false);
    }
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
              onChange={handleInputChangeBuyer}
              value={state.buyerData.fname}
              name="fname"
              label="First Name"
              variant="standard"
              sx={{ margin: "5px" }}
              required
            />

            <TextField
              onChange={handleInputChangeBuyer}
              value={state.buyerData.lname}
              name="lname"
              label="Last Name"
              variant="standard"
              sx={{ margin: "5px" }}
              required
            />

            <TextField
              onChange={handleInputChangeBuyer}
              value={state.buyerData.email}
              name="email"
              label="Email"
              variant="standard"
              sx={{ margin: "5px" }}
              required
              type="email"
            />

            <TextField
              onChange={handleInputChangeBuyer}
              value={state.buyerData.phonenumber}
              name="phonenumber"
              label="Phone Number"
              variant="standard"
              sx={{ margin: "5px" }}
              required
              type="number"
            />

            <TextField
              onChange={handleInputChangeBuyer}
              value={state.buyerData.password}
              name="password"
              label="Password"
              variant="standard"
              sx={{ margin: "5px" }}
              type="password"
              required
            />

            <TextField
              onChange={handleInputChangeBuyer}
              value={state.buyerData.confirmpassword}
              name="confirmpassword"
              label="Confirm Password"
              variant="standard"
              type="password"
              sx={{ margin: "5px" }}
              required
            />

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
              // onChange={(e) =>
              //   dispatchSeller({ type: "firstName", firstName: e.target.value })
              // }
              // value={stateSeller.firstName}\
              onChange={handleInputChange}
              value={state.sellerData.fname}
              name="fname"
              label="First Name"
              variant="standard"
              sx={{ margin: "5px" }}
              required
            />

            <TextField
              //
              onChange={handleInputChange}
              value={state.sellerData.lname}
              name="lname"
              label="Last Name"
              variant="standard"
              sx={{ margin: "5px" }}
              required
            />

            <TextField
              onChange={handleInputChange}
              value={state.sellerData.email}
              name="email"
              label="Email"
              variant="standard"
              sx={{ margin: "5px" }}
              required
              type="email"
            />

            <TextField
              onChange={handleInputChange}
              value={state.sellerData.phonenumber}
              name="phonenumber"
              label="Phone Number"
              variant="standard"
              sx={{ margin: "5px" }}
              required
              type="number"
            />

            <TextField
              onChange={handleInputChange}
              value={state.sellerData.password}
              name="password"
              label="Password"
              variant="standard"
              sx={{ margin: "5px" }}
              required
              type="password"
            />
            <span style={{ color: "red" }}>{formErrorsSeller.password}</span>
            <TextField
              onChange={handleInputChange}
              value={state.sellerData.confirmpassword}
              name="confirmpassword"
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
                  onChange={handleInputChange}
                  value={state.sellerData.region}
                  name="region"
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
              onChange={handleInputChange}
              value={state.sellerData.city}
              name="city"
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
  const handleLogout = () => {
    console.log("in the logout");
    axios
      .post("http://localhost:5000/logout")
      .then((reponse) => {
        console.log("logout response", reponse);
        navigate("/sel/login");
      })
      .catch((err) => {
        navigate("/sel/login");
        console.log("logout errrio ", err);
      });
  };
  const menuId = "primary-search-account-menu";
  socket.on("connect", () => {
    console.log("successfully connected to the server socket to connect");
  });
  socket.on("bidupdate", (data) => {
    console.log("New server", data);
    setNo_of_notification(no_of_notification + 1);
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/custom/newnotification", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setNo_of_notification(res.data.nopage);
        }
      })
      .catch((err) => {
        console.log("The error is ", err);
      });
  }, []);

  // useEffect(() => {
  //   if (!notifyOpen) {
  //     fetchNotifications(1);
  //   } else {
  //     setNotifications([]);
  //     setpage(1);
  //     setseemore(false);
  //   }
  // }, [notifyOpen]);
  function fetchNotifications(page) {
    if (page == 1) {
      sethasnotifications(0);
    }
    setseemore(true);

    axios
      .get(`http://localhost:5000/custom/notification?page=${page}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setNo_of_notification(0);
          setseemore(false);
          let data = response.data;
          console.log("response data", data);
          if (data.length > 0) {
            let tempnotification = [];
            let tempdata = response.data;
            tempnotification.push(...Notifications);
            tempnotification.push(...tempdata);
            setNotifications([...tempnotification]);
            sethasnotifications(2);
          } else {
            sethasnotifications(1);
          }
        } else if (response.status === 403) {
          nav("/login");
        } else {
          setseemore(false);
          sethasnotifications(1);
        }
        console.log("hasnotification", hasnotification);
      })
      .catch((err) => {
        console.log(err);
        setseemore(false);
        sethasnotifications(1);
      });
  }
  console.log("Notifications", Notifications[0]);
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
      sx={{
        marginTop: "50px",
        // width: {
        //   xs: "80%",
        //   sm: "80%",
        //   md: "100%",
        //   lg: "1500px",
        //   xl: "100%",
        // },
      }}
    >
      {hasnotification == 0 && (
        <Box
          sx={{
            border: 1,
            p: 1,
            width: {
              sm: "400px",
              xs: "300px",
              backgroundColor: "white",
              height: "100px",
              marginTop: "20px",
            },
          }}
        >
          <center>
            <CircularProgress />
          </center>
        </Box>
      )}
      {hasnotification == 1 && (
        <ListItem alignItems="flex-start" sx={{ backgroundColor: "white" }}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "brown" }}>W</Avatar>
          </ListItemAvatar>
          <ListItemText
            color="brown"
            primary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="#061746 "
                fontSize={"15px"}
              >
                Welcome
              </Typography>
            }
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="brown"
                >
                  Welcome to our auction web system!
                </Typography>
                With our platform, you can sell a variety of items to interested
                buyers from all over the world.
              </React.Fragment>
            }
          />
        </ListItem>
      )}
      {hasnotification == 2 && (
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            maxHeight: "80%",
            bgcolor: "background.paper",
            overflow: "scroll",
          }}
        >
          {Notifications.map((notification) =>
            notification.nottype === "bidupdate" ? (
              <Link
                underline="none"
                href={`/detail/${notification.AuctionId}`}
                key={notification.id}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "brown" }}>B</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    color="brown"
                    primary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="#061746 "
                        fontSize={"15px"}
                      >
                        Bid update
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="brown"
                        >
                          New offer -
                        </Typography>
                        {notification.message}
                        <Typography
                          sx={{
                            marginRigth: "5px",
                            float: "right",
                            fontSize: "10px",
                            mt: "7px",
                            color: "blue",
                          }}
                        >
                          {formatDate(notification.createdAt)}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </Link>
            ) : notification.nottype === "accountupdate" ? (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "brown" }}>A</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    color="brown"
                    primary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="#061746 "
                        fontSize={"15px"}
                      >
                        Account update
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>{notification.message}</React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ) : notification.nottype === "start" ? (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "brown" }}>S</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    color="brown"
                    primary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="#061746 "
                        fontSize={"15px"}
                      >
                        Auction update
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="brown"
                        >
                          Auction started -
                        </Typography>
                        {notification.message}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ) : notification.nottype === "close" ? (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "brown" }}>C</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    color="brown"
                    primary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="#061746 "
                        fontSize={"15px"}
                      >
                        Auction update
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="brown"
                        >
                          Auction closed -
                        </Typography>
                        {notification.message}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ) : (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "brown" }}>N</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    color="brown"
                    primary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="#061746 "
                        fontSize={"15px"}
                      >
                        Nuchereta
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>{notification.message}</React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            )
          )}
          <center>
            <button
              onClick={async () => {
                let nextpage = page + 1;
                setpage(nextpage);
                setseemore(true);
                console.log("Fetching another one ", nextpage);
                await fetchNotifications(nextpage);
                setseemore(false);
              }}
              sx={{
                color: "black",
                borderRadius: "12px",
                border: "0.5px gray solid",
                ":hover": { backgroundColor: "lightblue" },
                width: "60%",
                height: "25px",
                backgroundColor: "white",
              }}
            >
              {seemore ? "...loading" : "See more Results"}
            </button>
          </center>
        </List>
      )}
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
          {loggedin && (
            <>
              {" "}
              <Box sx={{ display: "flex", margin: "10px" }}>
                <PersonIcon size="large" />

                <Typography className="account name">
                  {state.profileData.fname} {state.profileData.lname}
                </Typography>
              </Box>
              <Box sx={{ margin: "20px" }}>
                <Typography className="balance">
                  Balance :ETB {state.profileData.account}
                </Typography>
              </Box>
              <Box sx={{ margin: "20px" }}>
                <Link href="/payment">
                  <Typography sx={{ color: "red" }}>Deposite</Typography>
                </Link>
              </Box>
            </>
          )}
          {!loggedin && (
            <>
              <Link href="/sel/login">
                <Typography sx={{ color: "red" }}>Login First</Typography>
              </Link>
            </>
          )}
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
          <NavLink to="/payment">
            <Typography>Deposite</Typography>
          </NavLink>
        </Box>
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleMenuClose}>
        <Button onClick={handleLogout}>
          <IconButton
            // color="inherit"
            sx={{ color: "#081263 " }}
          >
            <LogoutIcon sx={{ color: "black" }} />
            <Typography sx={{ margin: "8px" }}>Logout</Typography>
          </IconButton>
        </Button>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    axios
      .get("http://localhost:5000/custom/profile", {
        withCredentials: true,
      })
      .then((response) => {
        setLoggedin(true);
        dispatch({ type: "SET_PROFILE_DATA", payload: response.data });
        console.log("fetched data", response.data);
        console.log("profileData", state.profileData);
      })
      //
      .catch((err) => {
        setLoggedin(false);
      });
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
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
                  xs: "block",
                },
              }}
            >
              <img
                src="/logo2.png"
                href=""
                width="40px"
                height={"60px"}
                style={{ width: "40px", margin: "6px 10px " }}
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
                color: "brown",
              }}
            >
              {" "}
              NUCHARETA
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex" }}>
            <IconButton size="large" color="inherit" onClick={handleAccount}>
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
              color="inherit"
              onClick={handleNotification}
            >
              <Badge badgeContent={no_of_notification} color="error">
                {notifyOpen ? (
                  <NotificationsIcon sx={{ color: "brown" }} />
                ) : (
                  <NotificationsNoneIcon sx={{ color: "black" }} />
                )}
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
            {loggedin && (
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
                  {/* {state !== null ? <>{state.data.fname}</> : <>Profile</>} */}
                  {/* {"Profile"} */}
                  Profile
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
