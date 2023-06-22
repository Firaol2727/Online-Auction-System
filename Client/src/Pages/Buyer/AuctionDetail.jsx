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
} from "@mui/material";

import NavBuyer from "../../Layouts/NavBar/NavBuyer";
import Footer from "../../Layouts/Footer/Footer";

import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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

  const [loggedin, setLoggedIn] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setNotify(!notify);
  };
  const itemid = useParams();

  const api = axios.create({ baseURL: "http://localhost:5000/" });
  const [auct, setauct] = useState();
  const [pics, setpics] = useState();
  let auctioner;
  let picter;
  let item;
  const [bidders, setbidders] = useState();
  const [error, seterror] = useState(false);
  const [hasdata, sethasdata] = useState(false);
  const nav = useNavigate();
  const [id, setid] = useState(0);
  const [imglength, setimglength] = useState(0);
  const [loading, setloading] = useState(true);
  const [imgdisplay, setimgdisplay] = useState("");
  const [dload, setdload] = useState(false);

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
  }, [loggedin]);

  useEffect(() => {
    setloading(true);
    let id = itemid.id;

    api
      .get(`/details/${id}`, { withCredentials: true })
      .then((response) => {
        console.log("The item id is ", itemid);
        console.log("response", response.status);
        if (response.status == 200) {
          console.log("response", response.data);
          let hasdat = response.data;
          if (hasdat) {
            setauct(hasdat);
            console.log("my auct", auct);
            item = hasdat.detail;
            picter = hasdat.Pictures;
            auctioner = hasdat.bidders;
            sethasdata(true);
            setpics(hasdat.Pictures);
            setimgdisplay(hasdat.see);
            setimglength(hasdat.Pictures.length);
            setloading(false);
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
        seterror(true);
        setloading(false);
        sethasdata(false);
      });
  }, []);
  const handledelete = (id) => {
    setdload(true);
    api
      .post("/delete", { id })
      .then((res) => {
        if (res.status == 200) {
          setdload(false);
          nav("/sel/selhome");
        }
      })
      .catch((err) => {
        setdload(false);
        nav("/sel/selhome");
        console.log(err);
      });
  };
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
  return (
    <div>
      <NavBuyer />

      {!loading && hasdata && (
        <>
          <Box
            sx={{
              // position: "relative",
              marginTop: "50px",
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
                  <Box>
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
                            <StyledButton
                              variant="contained"
                              onClick={handleClick}
                              endIcon={
                                notify ? (
                                  <NotificationsActiveIcon />
                                ) : (
                                  <NotificationsIcon />
                                )
                              }
                              sx={{
                                color: "white",
                                backgroundColor: notify ? "grey" : "#7F1705",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {notify ? "Notified !" : "Notify me"}
                              </Typography>
                            </StyledButton>
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
                          className="price"
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
                            ETB : {auct.baseprice}
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
                              Leading price :{" "}
                            </Typography>
                            <Typography
                              sx={{
                                color: "black",
                                fontWeight: "bold",
                                marginLeft: "5px",
                              }}
                            >
                              ETB 5666
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
                              ETB 5666
                            </Typography>
                          </Box>
                          <Box>
                            {loggedin && (
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
                                    href="/login"
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
                            {!loggedin && (
                              <Box
                                className="placeBid"
                                sx={{ marginTop: "20px", marginBottom: "40px" }}
                              >
                                <form onSubmit={console.log("hthththh")}>
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
                          {auct.Seller.telUsername}@johnabi
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
