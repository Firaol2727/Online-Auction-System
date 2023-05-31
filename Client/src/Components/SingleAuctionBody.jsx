import { useParams, NavLink } from "react-router-dom";

import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
// import ExpandCircleUpOutlinedIcon from "@mui/icons-material/ExpandCircleUpOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function SingleAuctionBody() {
  const [expanded, setExpanded] = useState("panel1");
  const [searchQuery, setSearchQuery] = useState("");
  const [bid, setBid] = useState("");
  function handleBidValue() {
    if (bid < 1) {
      console.log("clicked bid value", bid);
    }
  }

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  let { id } = useParams();
  function handleSearch() {
    console.log("serahced", searchQuery);
  }
  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "30px",
        backgroundColor: "white",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box>
          <NavLink to="/">
            <IconButton
              // color="inherit"
              sx={{ color: "#081263 " }}
            >
              <ChevronLeftOutlinedIcon />

              <Typography sx={{ margin: "8px" }}> Back to auctions</Typography>
            </IconButton>
          </NavLink>
        </Box>
      </Box>
      <Box
        className="productContainer"
        sx={{
          marginLeft: {
            xs: "1%",
            sm: "2%",
            md: "3%",
            lg: "4%",
          },
          marginRight: {
            xs: "1%",
            sm: "2%",
            md: "3%",
            lg: "4%",
          },
          position: "relative",
          backgroundColor: "white",
          paddingTop: "20px",
          // display: "flow-root",

          display: "flex",

          flexDirection: {
            lg: "row",
            md: "row",
            sm: "row",
            xs: "column",
          },
        }}
      >
        <Divider sx={{ backgroundColor: "grey" }} />
        <Box
          className="leftContainer"
          sx={{
            float: {
              lg: "left",
              md: "left",
              sm: "left",
            },
            width: {
              lg: "50%",
              md: "50%",
              sm: "50%",
              xs: "100%",
            },
            backgroundColor: "#F7F7F7",
            paddingTop: "10px",
          }}
        >
          <Box
            className="totalImageContainer"
            sx={{
              width: {
                lg: "80%",
                md: "80%",
                sx: "100%",
                xs: "100%",
              },
            }}
          >
            <Box
              sx={{
                width: "79%",
                height: "50%",
                float: "right",
                // borderLeft: "1px solid #D1D1D1",
                // height:"20%",
              }}
            >
              <img
                style={{ width: "100%" }}
                src="/Imges/Auction/6.jpg"
                alt="photo"
              />
            </Box>

            <Box
              className="ImageButtons"
              sx={{ width: "20%", float: "left", paddingTop: "1px" }}
            >
              <Button
                sx={{
                  textAlign: "center",
                  marginRight: {
                    lg: "20px",
                    md: "15px",
                    sm: "10px",
                    xs: "5px",
                  },
                }}
              >
                <KeyboardArrowUpOutlinedIcon
                  size="large"
                  sx={{ color: "red", fontSize: "40px" }}
                />
              </Button>
              <Box
                sx={{
                  paddingRight: {
                    lg: "20px",
                    md: "15px",
                    sm: "10px",
                    xs: "5px",
                  },

                  "&:hover": {
                    opacity: [1.5, 1.5, 1.5],
                    scale: "1.2",
                  },
                }}
              >
                <Button>
                  <img
                    style={{ width: "100%" }}
                    src="/Imges/Auction/2.jpg"
                    alt="photo"
                  />
                </Button>
              </Box>
              <Box
                sx={{
                  // display: "block",
                  paddingRight: {
                    lg: "20px",
                    md: "15px",
                    sm: "10px",
                    xs: "5px",
                  },

                  "&:hover": {
                    opacity: [1.5, 1.5, 1.5],
                    scale: "1.2",
                  },
                }}
              >
                <Button>
                  <img
                    style={{ width: "100%" }}
                    src="/Imges/Auction/7.jpg"
                    alt="photo"
                  />
                </Button>
              </Box>
              <Box
                sx={{
                  // display: "block",
                  paddingRight: {
                    lg: "20px",
                    md: "15px",
                    sm: "10px",
                    xs: "5px",
                  },

                  "&:hover": {
                    opacity: [1.5, 1.5, 1.5],
                    scale: "1.2",
                  },
                }}
              >
                <Button onClick={{}}>
                  <img
                    style={{ width: "100%" }}
                    src="/Imges/Auction/2.jpg"
                    alt="photo"
                  />
                </Button>
              </Box>
              <Box
                sx={{
                  // display: "block",
                  paddingRight: {
                    lg: "20px",
                    md: "15px",
                    sm: "10px",
                    xs: "5px",
                  },

                  "&:hover": {
                    opacity: [1.5, 1.5, 1.5],
                    scale: "1.2",
                  },
                }}
              >
                <Button onClick={{}}>
                  <img
                    style={{ width: "100%" }}
                    src="/Imges/Auction/6.jpg"
                    alt="photo"
                  />
                </Button>
              </Box>

              <Button
                sx={{
                  textAlign: "center",
                  marginRight: {
                    lg: "20px",
                    md: "15px",
                    sm: "10px",
                    xs: "5px",
                  },
                }}
                onClick={{}}
              >
                <ExpandMoreOutlinedIcon
                  size="large"
                  sx={{ color: "red", fontSize: "40px" }}
                />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          className="rightContainer"
          sx={{
            float: {
              lg: "right",
              md: "right",
              ms: "right",
            },
            width: {
              lg: "49%",
              md: "49%",
              sx: "49%",
              xs: "100%",
            },
            paddingTop: "20px",
            backgroundColor: "#F7F7F7",
            // textAlign: "center",
          }}
        >
          <Box className="Topic">
            <Typography sx={{ float: "right", color: "red" }}>
              Active
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "row", paddingLeft: "1%" }}
            >
              <AccessTimeOutlinedIcon sx={{ color: "red" }} />
              <Typography sx={{ paddingLeft: "5px", paddingRight: "1%" }}>
                Remaining Time
              </Typography>
              <Typography sx={{ paddingLeft: "10px" }}>23.45.23</Typography>
            </Box>
            <Typography sx={{ paddingTop: "30px" }} className="title">
              Lot 4: ANTIQUE/VINTAGE EMPIRE DESK "PICKUP ONLY"
            </Typography>
          </Box>
          <Divider />
          <Typography
            sx={{
              backgroundColor: "#E1DDDD ",
              float: "right",
              width: "100px",
            }}
          >
            16 bids
          </Typography>
          <Box
            className="bid"
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "30px",
              textAlign: "center",
            }}
          >
            <div>
              Leading Price
              <Typography sx={{ color: "red" }}>$300</Typography>
            </div>
            <div>
              Minimum increase
              <Typography sx={{ color: "red" }}>$300</Typography>
            </div>
            <Box className="placeBid" sx={{ alignItem: "center" }}>
              <Typography sx={{ marginTop: "10px", marginRight: "10px" }}>
                {" "}
                Place your bid
              </Typography>

              <TextField
                type="number"
                onChange={(e) => setBid(e.target.value)}
                value={bid}
                inputProps={{
                  style: {
                    height: "10px",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Box>
            <Button
              sx={{ textTransform: "unset", fontSize: "20px" }}
              onClick={handleBidValue}
            >
              Submit{" "}
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          marginTop: "20px",
          marginLeft: {
            xs: "1%",
            sm: "2%",
            md: "3%",
            lg: "4%",
          },
          marginRight: {
            xs: "1%",
            sm: "2%",
            md: "3%",
            lg: "4%",
          },
        }}
      />

      <Box className="Description">
        <Typography>Description</Typography>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography> Item overview</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Auction detail</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Seller detail</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
}
export default SingleAuctionBody;
