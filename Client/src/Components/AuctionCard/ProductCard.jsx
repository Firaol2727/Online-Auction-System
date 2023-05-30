import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import PlaceIcon from "@mui/icons-material/Place";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import { Button, Typography, IconButton } from "@mui/material";


function ProductCard() {
  return (
    <Box
      className="auction"
      sx={{ 
        display: "flex",
        height: "90px",
        paddingTop: "30px",
        marginBottom: "100px",
      }}
    >
      <Box
        className="imageBox"
        sx={{
          width: {
            lg: "20%",
            md: "30%",
            sm: "30%",
            xs: "40%",
          },
          marginRight: "10px",
        }}
      >
        <Link
          id="productlink"
          underline="hover"
          // sx={{ color: "black", fontweight: "bold" }}
          href={`/singleauction/${1}`}
        >
          <img
            className="auctionImage"
            alt="auctionImage"
            src="/Imges/Auction/7.jpg"
            style={{ width: "100%" }}
          />
        </Link>
      </Box>

      <Box className="detail" sx={{ width: "60%", marginRight: "5px" }}>
        <Link
          id="productlink"
          underline="hover"
          // sx={{ color: "black", fontweight: "bold" }}
          href={`/singleauction/${1}`}
        >
          <Typography
            sx={{
              textDecoration: "none",
              color: "black",
              fontwight: "bold",
              fontSize: {
                lg: "19px",
                md: "15px",
                sm: "13px",
                xs: "13px",
              },
              // margin: "3px",
            }}
            className="title"
          >
            Coins US and Foreign Inherited Assets Special 3 Day Auction
          </Typography>
        </Link>
        <Typography
          className="Price"
          sx={{
            marginTop: "10px",
            fontSize: {
              lg: "18px",
              md: "15px",
              sm: "13px",
              xs: "12px",
            },
          }}
        >
          $500
        </Typography>
        <Typography
          className="Date"
          sx={{
            marginTop: "10px",
            fontSize: {
              lg: "18px",
              md: "15px",
              sm: "13px",
              xs: "12px",
            },
          }}
        >
          April 30, 2023 10:15 AM EST
        </Typography>
        <Box className="location" sx={{ display: "flex", marginTop: "15px" }}>
          <PlaceIcon />
          <Typography
            className="Location"
            sx={{
              fontSize: {
                lg: "16px",
                md: "15px",
                sm: "13px",
                xs: "12px",
              },
              // margin: "3px",
            }}
          >
            New York, NY, US
          </Typography>
        </Box>
      </Box>
      <Box
        className="Buttons"
        sx={{
          width: "20%",
        }}
      >
        <Box className="status" sx={{ display: "flex", alignItems: "center" }}>
          <RssFeedIcon
            size="small"
            sx={{
              fontSize: {
                lg: "20px",
                md: "20px",
                sm: "18px",
                xs: "15px",
              },
            }}
          />
          <Typography
            className="status"
            sx={{
              fontSize: {
                lg: "11px",
                md: "10px",
                sm: "9px",
                xs: "7px",
              },
              display: "flex",
              textAlign: "center",
            }}
          >
            Live auction
          </Typography>
        </Box>
        <Button
          sx={{
            fontSize: {
              lg: "14px",
              md: "10px",
              sm: "8px",
              xs: "8px",
            },
            color: "red",
            textTransform: "unset",
          }}
        >
          Place your Bid
        </Button>
      </Box>
    </Box>
  );
}
export default ProductCard;
