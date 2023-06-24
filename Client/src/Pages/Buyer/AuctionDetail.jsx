import { useState, useEffect, useReducer } from "react";
import {
  Stack,
  Box,
  Button,
  List,
  Link,
  ListItem,
  IconButton,
  LinearProgress,
  Typography,
  Divider,
  InputLabel,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  Menu,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";

import NavBuyer from "../../Layouts/NavBar/NavBuyer";
import Footer from "../../Layouts/Footer/Footer";

import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PlaceIcon from "@mui/icons-material/Place";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import ClosedCaptionDisabledIcon from "@mui/icons-material/ClosedCaptionDisabled";
import GppBadIcon from "@mui/icons-material/GppBad";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TimerIcon from "@mui/icons-material/Timer";
import TelegramIcon from "@mui/icons-material/Telegram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ReportProblemOutlined } from "@mui/icons-material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
const socket = io("http://localhost:5000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "my-custom-value",
  },
}); // replace with your server URL

const getDateform = (formdate) => {
  const date = new Date(formdate);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

const RemainingTime = ({ endDate }) => {
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;
      if (distance < 0) {
        clearInterval(interval);
        setRemainingTime("Auction ended");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  return <div>{remainingTime}</div>;
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
    pp: "",
    np: "",
    cp: "",
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
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)({
  borderRadius: "50px",
  padding: "10px 20px",
  fontWeight: "bold",
  fontSize: "1.1rem",
  textTransform: "none",

  boxShadow: "none",
});

function AuctionTimer({ endDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <Typography variant="h5" component="span" key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </Typography>
    );
  });

  return (
    <div style={{ fontSize: "2px" }}>
      {timerComponents.length ? timerComponents : "Auction Ended"}
    </div>
  );
}
function AuctionCountdown({ startDate }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const startTime = new Date(startDate).getTime();
      const now = new Date().getTime();
      const timeLeftInMs = startTime - now;

      if (timeLeftInMs < 0) {
        setTimeLeft("Auction has already started");
        clearInterval(interval);
      } else {
        const daysLeft = Math.floor(timeLeftInMs / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor(
          (timeLeftInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutesLeft = Math.floor(
          (timeLeftInMs % (1000 * 60 * 60)) / (1000 * 60)
        );
        const secondsLeft = Math.floor((timeLeftInMs % (1000 * 60)) / 1000);
        setTimeLeft(
          `${daysLeft} days, ${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds `
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
      {" "}
      Time Left : {timeLeft}
    </Typography>
  );
}
const AuctionDetail = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [notify, setNotify] = useState(false);
  const [bidPrice, setBidPrice] = useState("");
  const [loggedin, setLoggedIn] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [leadingPrice, setLeadingPrice] = useState(0);
  const [openReport, setOpenReport] = useState(false);
  const [reasonReport, setReasonReport] = useState("");
  const [reload, setReload] = useState(false);
  const [minIncrease, setMinIncrease] = useState(0);
  const itemid = useParams();

  const api = axios.create({ baseURL: "http://localhost:5000/" });
  const [auct, setauct] = useState();
  const [pics, setpics] = useState();

  const [hasdata, sethasdata] = useState(false);

  let auctioner;
  let picter;
  let item;

  const nav = useNavigate();
  const [id, setid] = useState(0);
  const [imglength, setimglength] = useState(0);
  const [loading, setloading] = useState(true);
  const [imgdisplay, setimgdisplay] = useState("");
  function roundNumber(number) {
    return Math.round(Number(number));
  }

  const submitBid = (event) => {
    event.preventDefault();
    console.log("submiteded");
    console.log("bid Price", bidPrice);
    setauct({ ...auct, hammarprice: 4000 });
    console.log(auct.hammarprice);
    axios({
      method: "POST",
      url: "http://localhost:5000/custom/placebid",
      withCredentials: true,
      data: {
        aid: itemid.id,
        bidprice: bidPrice,
      },
    })
      .then((response) => {
        console.log("response", response);
        if (response.status == 200) {
          setLeadingPrice(bidPrice);

          socket.emit("bidupdate", itemid.id);
        } else if (response.status == 202) {
          window.location.replace(response.data);
        } else if (response.status == 403) {
          nav("/sel/login");
        } else {
          console.log("error in chapa", response);
        }
      })
      .catch((error) => {
        if (error.response.status == 404) {
          setReload(!reload);
        }
        console.log("error", error);
      });
  };
  const handleClickOpen = () => {
    setOpenReport(true);
  };

  const handleClose = () => {
    setOpenReport(false);
  };

  const handleReasonChange = (event) => {
    setReasonReport(event.target.value);
  };

  const handleReport = () => {
    // handle report submission here

    const data = { aid: itemid.id, type: reasonReport };
    console.log(`Report submitted for reason: ${reasonReport}`);

    axios({
      method: "POST",
      url: "http://localhost:5000/custom/report",
      withCredentials: true,
      data: {
        ...data,
      },
    })
      .then((response) => {
        console.log("response", response);
        console.log("id", itemid);
      })
      .catch((error) => {
        console.log("error", error);
      });
    handleClose();
  };

  const handleClick = () => {
    setClicked(true);
    setNotify(!notify);
  };

  useEffect(() => {
    console.log("use effect i the auction detail ");
    axios
      .get("http://localhost:5000/custom/profile", {
        withCredentials: true,
      })
      .then((response) => {
        setLoggedIn(true);
        dispatch({ type: "SET_PROFILE_DATA", payload: response.data });
        console.log("fetched data", response.data);
      })
      //
      .catch((err) => {
        setLoggedIn(false);
        if (err.response.status === 403) {
          console.log("errr r");
        }
      });
  }, [loggedin, reload]);
  console.log("the auct is", auct);
  console.log("th has data", hasdata);
  useEffect(() => {
    setloading(true);
    let id = itemid.id;
    socket.on("connect", () => {
      console.log("the io connected");
    });
    api
      .get(`/details/${id}`, { withCredentials: true })
      .then((response) => {
        console.log("The item id is ", itemid);
        console.log("response", response.status);
        if (response.status == 200) {
          console.log("response", response.data);
          let data = response.data;

          if (data) {
            console.log("in the has ", data);
            setauct(data);

            sethasdata(true);
            console.log("hasdata", hasdata);
            setpics(data.Pictures);

            setimgdisplay(data.see);
            setimglength(data.length);
            setloading(false);
            setLeadingPrice(data.hammerprice);
          } else {
            sethasdata(false);
            setloading(false);
          }
          console.log("auct", auct);
          console.log("pictures", pics);
        } else if (res.status == 403) {
          nav("/sel/login");
        } else {
          seterror(true);
          setloading(false);
          sethasdata(false);
        }
      })
      .catch((err) => {
        console.log("The item id is err ", err);

        if (err.response != null) {
          if (err.response.status === 403) {
            nav("/sel/login");
          }
        }
        console.log("Error", err);
        // seterror(true);
        setloading(false);
        sethasdata(false);
      });
  }, []);

  function changePictures(type) {
    if (id == 0 && type == 0) {
      return;
    } else if (type == 1 && id == imglength - 1) {
      return;
    } else if (id <= imglength) {
      if (type == 0) {
        let a = id - 1;
        setid(a);
        console.log("decrement", a);
        setimgdisplay(pics[a].id);
        console.log("new id ", pics[id].id);
      } else if (type == 1) {
        let a = id + 1;
        setid(a);
        console.log("increment", a);
        setimgdisplay(pics[a].id);
        console.log("new id ", pics[id].id);
      }
    } else {
      return;
    }
  }
  function onchangepic(index) {
    setimgdisplay(index);
  }
  const inputProps = {
    min:
      leadingPrice == 0
        ? Math.round(minIncrease + (minIncrease * 2) / 100)
        : Math.round(leadingPrice + (Number(leadingPrice) * 2) / 100),
  };

  return (
    <div>
      <NavBuyer data={loggedin} />

      {!loading && hasdata && (
        <>
          <Box>
            <Link href="/">Back to Home</Link>
          </Box>
          <Box
            sx={{
              // position: "relative",
              // marginTop: "50px",
              height: "130%",
              backgroundColor: "white",
              width: {
                xs: "100%",
                md: "93%",
                lg: "90%",
                sm: "90%",
              },
              marginLeft: {
                lg: "80px",
                md: "50px",
                sm: "20px",
              },
              marginRight: {
                sm: "20px",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                marginTop: "50px",
                backgroundColor: "white",
              }}
            >
              <Stack
                direction={{ sm: "column", xs: "column", lg: "row", md: "row" }}
                spacing={3}
              >
                <Box
                  className="picture"
                  style={{
                    backgroundColor: "white",
                  }}
                >
                  <Stack
                    direction={{
                      sm: "row",
                      md: "row",
                      xs: "column-reverse",
                    }}
                    spacing={1}
                  >
                    <Box
                      sx={{
                        // position:"relative",
                        marginTop: "6px",
                        marginRight: "6px",

                        border: "1px grey solid",
                        width: { sm: "82px", xs: "100%" },
                        // display:"flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: { sm: "column", xs: "row" },
                        maxHeight: { sm: "400px", xs: "90px" },
                        overflow: "scroll",
                        overflowX: "hidden",
                        overflowY: "hidden",
                      }}
                    >
                      {pics.map((pic) => (
                        <img
                          className="auctionImage"
                          key={pic.id}
                          alt="auctionImage"
                          src={`http://localhost:5000/images/${pic.id}`}
                          onClick={() => {
                            onchangepic(pic.id);
                          }}
                          style={{
                            position: "relative",
                            marginTop: "5px",
                            marginRight: "5px",
                            width: "80px",
                            height: "80px",
                          }}
                        />
                      ))}
                    </Box>
                    <Box
                      className="picture"
                      sx={{
                        position: "relative",
                        display: "flex",
                        width: {
                          sm: "100%",
                          xs: "100%",
                          lg: "500px",
                          md: "450px",
                        },
                        // height: "400px",

                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "lightgrey",
                      }}
                    >
                      {/* <center> */}
                      <img
                        className="auctionImage"
                        alt="auctionImage"
                        src={`http://localhost:5000/images/${imgdisplay}`}
                        style={{ width: "85%" }}
                      />
                      {/* </center> */}

                      <IconButton
                        onClick={() => {
                          changePictures(0);
                        }}
                        sx={{ position: "absolute", top: "40%", left: "0%" }}
                      >
                        <NavigateBeforeIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          changePictures(1);
                        }}
                        sx={{ position: "absolute", top: "40%", right: "0%" }}
                      >
                        <NavigateNextIcon />
                      </IconButton>
                    </Box>
                  </Stack>
                  <Box
                    className="description"
                    sx={{
                      display: {
                        xs: "none",
                        sm: "none",
                        md: "block",
                        lg: "block",
                      },
                      width: {
                        lg: "550px",
                        md: "500px",
                      },
                      marginTop: "50px",
                      marginLeft: "20px",
                      marginRight: "20px",
                    }}
                  >
                    <Typography
                      display="flex"
                      justifyContent="center"
                      sx={{ marginTop: "10px", fontWeight: "bold" }}
                    >
                      Description
                    </Typography>

                    <Typography sx={{ display: "flex" }}>
                      {auct.description}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    border: "1px solid ",
                    borderColor: "#EBECEC",
                    width: "100%",
                    height: "auto",
                  }}
                >
                  <Box
                    sx={{
                      float: "right",
                      mt: "-30px",
                    }}
                  >
                    <Tooltip
                      title={
                        reasonReport
                          ? "You have reported"
                          : "Report on this auction"
                      }
                    >
                      <Button
                        startIcon={<ReportProblemOutlined />}
                        onClick={handleClickOpen}
                        sx={{
                          color: "grey",
                          fontWight: "bold",
                          textTransform: "none",
                        }}
                      ></Button>
                    </Tooltip>
                    <Dialog open={openReport} onClose={handleClose}>
                      <DialogTitle>Reason for report</DialogTitle>
                      <DialogContent>
                        <FormControl component="fieldset">
                          <RadioGroup
                            value={reasonReport}
                            onChange={handleReasonChange}
                          >
                            <FormControlLabel
                              value="spam"
                              control={<Radio />}
                              label=" spam"
                            />
                            <FormControlLabel
                              value="Violance"
                              control={<Radio />}
                              label=" Violance"
                            />
                            <FormControlLabel
                              value="Child Abuse"
                              control={<Radio />}
                              label="Child Abuse"
                            />
                            <FormControlLabel
                              value="Pornogaphy"
                              control={<Radio />}
                              label="Pornogaphy"
                            />
                            <FormControlLabel
                              value="Copyright"
                              control={<Radio />}
                              label=" Copyright"
                            />
                            <FormControlLabel
                              value="Illegal Drug"
                              control={<Radio />}
                              label="Illegal Drug"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              label="Other reason"
                            />
                          </RadioGroup>
                        </FormControl>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleReport} sx={{ color: "red" }}>
                          Report
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>

                  <Box sx={{ marginTop: "0px" }}>
                    {auct.state == "waiting" && (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "5px",
                          }}
                        >
                          <Box
                            className="status"
                            sx={{
                              display: "flex",

                              marginLeft: "10px",
                            }}
                          >
                            <TimelapseIcon
                              size="large"
                              sx={{
                                fontSize: {
                                  lg: "20px",
                                  md: "20px",
                                  sm: "20px",
                                  xs: "20px",
                                  color: "red",
                                },
                              }}
                            />
                            <Typography
                              className="status"
                              sx={{
                                fontSize: {
                                  lg: "13px",
                                  md: "10px",
                                  sm: "10px",
                                  xs: "10px",
                                  margin: "2px",
                                },
                                display: "flex",
                                textAlign: "center",
                              }}
                            >
                              Pending
                            </Typography>
                          </Box>
                          <Box>
                            <Tooltip
                              title={
                                !notify
                                  ? "Notify me when Open"
                                  : "you will be notified"
                              }
                            >
                              <Button
                                onClick={handleClick}
                                endIcon={
                                  notify ? (
                                    <NotificationsActiveIcon
                                      size="large"
                                      sx={{ color: "red" }}
                                    />
                                  ) : (
                                    <NotificationsIcon
                                      size="large"
                                      sx={{ color: "black" }}
                                    />
                                  )
                                }
                                // sx={{
                                //   color: "white",
                                //   // backgroundColor: notify ? "grey" : "#7F1705",
                                // }}
                              >
                                <Typography sx={{ fontSize: "15px" }}>
                                  {/* {notify ? "Notified !" : "Notify me"} */}
                                </Typography>
                              </Button>
                            </Tooltip>
                          </Box>
                        </Box>

                        <Box
                          className="name"
                          display="flex"
                          justifyContent="center"
                        >
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: "20px",
                              marginTop: "10px",
                            }}
                          >
                            {" "}
                            {auct.name}
                          </Typography>
                        </Box>

                        <Box
                          className="name"
                          display="flex"
                          justifyContent="center"
                        >
                          <LocationOnIcon sx={{ marginTop: "12px" }} />
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: "20px",
                              marginTop: "10px",
                            }}
                          >
                            {" "}
                            {auct.city}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "20px",
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: "bold", fontSize: "20px" }}
                          >
                            Base Price :{" "}
                          </Typography>
                          <Typography
                            sx={{
                              color: "black",
                              fontWeight: "bold",
                              marginLeft: "5px",
                              fontSize: "20px",
                            }}
                          >
                            {/* ETB :{auct.hammerprice} */}
                            ETB :{auct.baseprice}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            // marginTop: "10px",
                            // marginTop: "30px",
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "50px",
                            marginBottom: "50px",
                          }}
                        >
                          <TimerIcon
                            sx={{
                              marginRight: "10px",
                              fontSize: "30px",
                            }}
                          />

                          <Typography
                            sx={{
                              fontSize: {
                                lg: "50px",
                                md: "50px",
                                sm: "30px",
                                xs: "30px",

                                // color: "red",
                              },
                            }}
                          >
                            <AuctionCountdown startDate={auct.startdate} />
                          </Typography>
                        </Box>
                      </>
                    )}
                    {auct.state == "open" && (
                      <>
                        <Box
                          sx={{
                            display: "block",
                            // justifyContent: "space-between",
                            marginTop: "20px",
                          }}
                        >
                          <Box
                            className="status"
                            sx={{
                              display: "flex",
                              marginRight: "10px",
                              float: "right",
                            }}
                          >
                            <RssFeedIcon
                              size="large"
                              sx={{
                                fontSize: {
                                  lg: "20px",
                                  md: "20px",
                                  sm: "20px",
                                  xs: "20px",
                                },
                                color: "red",
                                marginLeft: "10px",
                                marginTop: "-4px",
                              }}
                            />
                            <Typography
                              className="status"
                              sx={{
                                fontSize: {
                                  lg: "11px",
                                  md: "10px",
                                  sm: "10px",
                                  xs: "10px",

                                  // color: "red",
                                },
                              }}
                            >
                              Live Auction
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              marginLeft: "10px",
                              // marginTop: "10px",
                              marginTop: "10px",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: {
                                  lg: "15px",
                                  md: "15px",
                                  sm: "15px",
                                  xs: "15px",

                                  // color: "red",
                                },
                              }}
                            >
                              Remaining Time :
                              <AuctionTimer endDate={auct.enddate} />
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          className="name"
                          display="flex"
                          justifyContent="center"
                        >
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: "20px",
                              marginTop: "10px",
                            }}
                          >
                            {" "}
                            {auct.name}
                          </Typography>
                        </Box>
                        <Box
                          className="name"
                          display="flex"
                          justifyContent="center"
                        >
                          <LocationOnIcon sx={{ marginTop: "12px" }} />
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: "20px",
                              marginTop: "10px",
                            }}
                          >
                            {" "}
                            {auct.city}
                          </Typography>
                        </Box>
                        <Box
                          display="block"
                          justifyContent="center"
                          sx={{
                            marginTop: "50px",
                            fontSize: "15px",

                            marginLeft: "18%",
                          }}
                        >
                          <Box sx={{ display: "flex" }}>
                            <Typography sx={{ fontWeight: "bold" }}>
                              Base Price :{" "}
                            </Typography>
                            <Typography
                              sx={{
                                color: "black",
                                fontWeight: "bold",
                                marginLeft: "5px",
                              }}
                            >
                              {/* ETB :{auct.hammerprice} */}
                              ETB :{auct.baseprice}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", marginTop: "10px" }}>
                            <Typography sx={{ fontWeight: "bold" }}>
                              Leading price :{" "}
                            </Typography>
                            <Typography
                              sx={{
                                color: "black",
                                fontWeight: "bold",
                                marginLeft: "5px",
                              }}
                            >
                              {/* ETB :{auct.hammerprice} */}
                              ETB :{leadingPrice}
                            </Typography>
                          </Box>
                          <br />
                          <Box sx={{ display: "flex" }}>
                            <Typography sx={{ fontWeight: "bold" }}>
                              Minimum increase :
                            </Typography>
                            <Typography
                              sx={{
                                color: "black",
                                fontWeight: "bold",
                                marginLeft: "5px",
                              }}
                            >
                              {leadingPrice == 0 && (
                                <div>
                                  {" "}
                                  ETB :
                                  {roundNumber(Number(auct.baseprice) * 2) /
                                    100}
                                </div>
                              )}
                              {leadingPrice != 0 && (
                                <div>
                                  {" "}
                                  ETB :
                                  {roundNumber(Number(leadingPrice) * 2) / 100}
                                </div>
                              )}
                            </Typography>
                          </Box>
                          <Box>
                            {!loggedin && (
                              <Box
                                className="login"
                                sx={{
                                  width: "80%",
                                  backgroundColor: "#951003",
                                  marginTop: "10px",
                                }}
                              >
                                <Button sx={{ width: "100%" }}>
                                  <Link
                                    href="/sel/login"
                                    sx={{
                                      textDecoration: "none",

                                      color: "white",
                                    }}
                                  >
                                    Log in to bid
                                  </Link>
                                </Button>
                              </Box>
                            )}
                            {loggedin && (
                              <Box
                                className="placeBid"
                                sx={{ marginTop: "20px", marginBottom: "40px" }}
                              >
                                <form onSubmit={submitBid}>
                                  <InputLabel
                                    htmlFor="placebid"
                                    sx={{ color: "black" }}
                                  >
                                    Place Bid
                                  </InputLabel>
                                  <TextField
                                    id="placebid"
                                    variant="outlined"
                                    required
                                    sx={{ width: "80%" }}
                                    type="number"
                                    inputProps={inputProps}
                                    value={bidPrice}
                                    onChange={(event) => {
                                      setBidPrice(event.target.value);
                                    }}
                                  />
                                  <Box
                                    sx={{
                                      width: "80%",
                                      backgroundColor: "#951003",
                                      marginTop: "10px",
                                    }}
                                  >
                                    <Button
                                      sx={{
                                        color: "white",
                                        width: "100%",
                                      }}
                                      type="submit"
                                    >
                                      Submit Bid
                                    </Button>
                                  </Box>
                                </form>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </>
                    )}
                  </Box>

                  <Box>
                    <Divider sx={{ marginLeft: "18%", marginRight: "18%" }} />

                    <Box
                      className="contactSeller"
                      display="block"
                      justifyContent="center"
                      sx={{
                        marginTop: "10px",
                        marginLeft: "18%",
                        marginRight: "18%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Open Sans, sans-serif",
                          fontWeight: 600,
                          color: "#06688A",
                          // textAlign: "center",
                          marginTop: "20px",
                        }}
                      >
                        Contact the Seller
                      </Typography>
                      <br />

                      <Box sx={{ marginRight: "25px" }}>
                        <Box sx={{ display: "flex" }}>
                          <TelegramIcon
                            sx={{ marginRight: "10px", color: "#1BACF4 " }}
                          />
                          {auct.Seller.telUsername}
                        </Box>
                        <Box sx={{ display: "flex" }}>
                          <EmailIcon
                            sx={{ marginRight: "10px", color: "red" }}
                          />
                          {auct.Seller.email}
                        </Box>
                      </Box>
                      <Typography></Typography>
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: {
                xs: "block",
                sm: "block",
                md: "none",
                lg: "none",
              },
              marginTop: "50px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <Typography
              display="flex"
              justifyContent="center"
              sx={{ marginTop: "10px", fontWeight: "bold" }}
            >
              Description
            </Typography>

            {auct.description}
          </Box>
        </>
      )}

      <Divider sx={{ marginTop: "50px" }} />

      {!loading && !hasdata && (
        <center>
          <h2> Page Not found</h2>
        </center>
      )}
      {loading && (
        <center>
          <h2 sx={{ position: "absolute", top: "48%", width: "100px" }}>
            <LinearProgress />{" "}
          </h2>
        </center>
      )}
    </div>
  );
};
export default AuctionDetail;
