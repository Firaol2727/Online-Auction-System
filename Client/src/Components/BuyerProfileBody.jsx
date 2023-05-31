import { react, useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Divider,
  Button,
  IconButton,
  Link
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Category from "./Category/Category";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


function BuyerProfileBody() {
  const [region, setRegion] = useState("Oromia");

  const handleChange = (event) => {
    setRegion(event.target.value);
  };
  const saveUpdateProfile = (event) => {
    console.log("saved");
  };
  return (
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
        <Box sx={{ display: "flex" }}>
          <Typography my={2} sx={{ marginLeft: "10px" }}>
            {" "}
            Account info
          </Typography>
          <Button sx={{
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
            <Link href="/editprofile" sx={{textDecoration:"none"}}>
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
          <TextField  sx={{
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
            autoFocus
            id="outlined-basic"
            variant="outlined"
            value={region}
            label="First name"
            onChange={(event) => setRegion(event.target.value)}
            InputProps={{
              readOnly: true,
            }}
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
            id="outlined-basic"
            variant="outlined"
            value="dejene"
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
            id="outlined-basic"
            variant="outlined"
            value="yohannesdejene23@gmail.com"
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
            id="outlined-basic"
            variant="outlined"
            value="+251946951726"
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
            id="outlined-basic"
            variant="outlined"
            value="Addis Ababa"
            label="City"
          />
        </Box>

        <Box sx={{ marginTop: "20px", marginLeft: "10px" }}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Region</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={region}
              label="Region"
              onChange={handleChange}
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
        <Box sx={{ marginTop: "20px", marginLeft: "0px" }}>
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
        </Box>
        <Divider />
      </Box>
    </Box>
  );
}
export default BuyerProfileBody;
