import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import "./selSidebar";
import SellerNavbar from "./selnav";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import auctionimage from "../static/auction3.jpg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
const baseapi = axios.create({
  baseURL: "http://localhost:5000/sel",
});
function PaymentChooseDialog(props) {
  const {open, handleClose }= props
  const theme = useTheme();
  const [loading,setloading]=useState(false)
  const [selectedValue, setSelectedValue] = useState('');
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handlePayment = () => {
    handleClose();
    setloading(true)
    baseapi.get('/paychapa',{withCredentials:true})
    .then(res=>{
        if(res.status==202){
          window.location.replace(res.data);
        }else{
          setloading(false)
        }
    })
    .catch(err=>{
      setloading(false)
      console.log("The error is",err)
    })
    
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        open={loading}
        sx={{color:"gray"}}
        fullScreen={fullScreen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
        <center><CircularProgress/></center>
        <h4>Redirecting wait a moment...</h4>
        </DialogContent>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle sx={{fontWeight:"bold"}}>Important</DialogTitle>
        <DialogContent>
        <Typography gutterBottom>
        To post an auction, you must pay a <b>200ETB</b> fee.
        This fee is required to ensure the quality of our marketplace and to prevent spam listings.
        Once you have paid the fee, you will be granted access to post auctions and reach a vast network of potential buyers.
        <br />
        <br />
        <b>Don't miss out on this opportunity to showcase your items and make a profit.</b> <br />
        <p>Proceed with</p>

          </Typography>
          <RadioGroup value={selectedValue} onChange={handleChange}>
      <FormControlLabel
        value="option1"
        control={
          <Radio disableRipple />
        }
        label={
        <Stack direction={"row"} gap={2}>
          <img src="/chapa.jpeg" style={{width:"100px",height:"80px"}} />
          <h4 >Chapa</h4></Stack>}
      />
      <FormControlLabel
        value="option2"
        control={<Radio disableRipple />}
        label={
          <Stack direction={"row"} gap={2}>
            <img src="/telebirr.png" style={{width:"100px",height:"80px"}} />
            <h4 style={{fontStyle:"italic"}}>Tele birr</h4></Stack>}
      />
      <FormControlLabel
        value="option3"
        control={<Radio disableRipple={true} />}
        label={
          <Stack direction={"row"} gap={2}>
            <img src="/cbe.jpeg" style={{width:"100px",height:"80px"}} />
            <h4>CBE birr</h4></Stack>}
      />
        <br /><br />
        <center><p style={{fontSize:"18px"}}>Thank you for using our platform!</p></center>
        </RadioGroup>
        </DialogContent>
        
        <DialogActions>
          <Button autoFocus onClick={handleClose} >
            Cancel
          </Button>
          <Button onClick={handlePayment} autoFocus ={selectedValue==''?true:false}>
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default class CreateAuction extends Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      imgCollection: "",
      preview: [],
      name: "",
      baseprice: 0,
      region: this.regions[0],
      city: this.cities[0],
      enddate: null,
      startdate: null,
      description: null,
      category: null,
      type: "private",
      inputfilelength: 0,
      categoryvalid: true,
      filevalid: true,
      loading:false,
      basepricevalid: true,
      startdatevalid: true,
      error: "",
      range: null,
      open:true,
      // tooltip controllers //
      nametooltip: false,
      pricetooltip: false,
      datetooltip: false,
      categorytooltip: false,
      // payment controllers
      uploadgranted:true
    };
  }
  regions = [
    "AddisAbaba",
    "Tigray",
    "Afar",
    "Amhara",
    "Benishangul Gumuz",
    "Oromia",
    "Gambella",
    "SNNP",
    "Sidama",
    "Somali",
  ];
  cities = [
    "Addis Ababa",
    "Adama",
    "Hawassa",
    "Bahirdar",
    "Mekele",
    "Gambella",
  ];
  handleChange = (event) => {
    this.setState({ type: event.target.value });
  };
  handleClose() {
    console.log("Executing handleClose function")
    this.setState({ open: false });
  }
  handleClickOpen() {
    this.setState({ open: true });
  }
  //  nav=useNavigate()
  onFileChange(e) {
    this.setState({ imgCollection: e.target.files, filevalid: true });
    let fileObj = [];
    let fileArray = [];
    console.log("uploading multiple files",this.state.filevalid);
    fileObj.push(e.target.files);
    console.log(fileObj);
    this.state.inputfilelength=fileObj[0].length;
    this.setState({ inputfilelength: fileObj[0].length });
    if (this.state.inputfilelength == 0) {
      this.setState({ filevalid: false });
    } else {
      for (let i = 0; i < fileObj[0].length; i++) {
        if (fileObj[0][i].size > 2048576) {
          this.state.filevalid = false;
          break;
        } 
      }
    }
    console.log("are all the files valid ?", this.state.filevalid);
    if (this.state.filevalid) {
      for (let i = 0; i < fileObj[0].length; i++) {
        fileArray.push(URL.createObjectURL(fileObj[0][i]));
      }
      this.state.inputfilelength = fileObj[0].length;
      console.log("input number", this.state.inputfilelength);
      this.setState({ preview: [...fileArray] });
    }
  }
  finalCreateAuction(){
    var formData = new FormData();
    for (const key of Object.keys(this.state.imgCollection)) {
      formData.append("imgCollection", this.state.imgCollection[key]);
    }
      formData.append("name", this.state.name);
      formData.append("baseprice", this.state.baseprice);
      formData.append("startdate", this.state.startdate);
      formData.append("enddate", this.state.enddate);
      formData.append("type", this.state.type);
      formData.append("category", this.state.category);
      formData.append("region", this.state.region);
      formData.append("city", this.state.city);
      formData.append("description", this.state.description);
      axios
        .post("http://localhost:5000/sel/upload", formData, {
          withCredentials: true,
        })
        .then((res) => {
          this.setState({ loading: false });
          if (res.status === 200) {
            this.setState({ loading: false });
            window.location.replace('http://localhost:5173/sel/home');
          }
          console.log(res.data);
        })
        .catch((err) => {
          this.setState({ loading: false });
          console.log("the error is ", err);
        });
  

  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true }); 
    if (this.state.startdate != null && this.state.enddate != null) {
      
      //   let sd = new Date(this.state.range[0]);
      //   let ed = new Date(this.state.range[0]);
      // let sd = new Date(this.state.startdate);
      // let ed = new Date(this.state.enddate);
      // this.state.startdate = sd;
      // this.state.enddate = ed;
      // console.log("sd", sd);
      // console.log("ed", ed);
      const now = new Date();
      const diffInMilliseconds = Math.abs(this.state.startdate - now);
      const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));
      const rangeInsec = Math.abs(this.state.enddate - this.state.startdate);
      const rangeauction = Math.round(
        diffInMilliseconds / (1000 * 60 * 60 * 24)
      );
      if (this.state.startdate >= now) {
        console.log("The start date is is greater or equal  to now ")
        if (diffInDays < 90 && rangeauction < 30) {
          console.log("The start date of the auction is also in less than 3 month days and auction range is less than a month")
          this.state.startdatevalid = true;
          //   this.state.startdate = sd;
          //   this.state.enddate = ed;
        } else {
          console.log("Difference In days".diffInDays)
          console.log("Difference In days".rangeauction)
          console.log("The start date of the auction is no less than 3 month days or auction range is not less than a month")
          this.state.startdatevalid = false;
          this.setState({ loading: false });
        }
      } else {
        this.state.startdatevalid = false;
        this.setState({ loading: false });
      }
    }
    if (this.state.baseprice < 3000) {
      this.setState({ basepricevalid: false });
      this.setState({ loading: false });
    }
    if (this.state.inputfilelength == 0) {
      this.state.filevalid = false;
      this.setState({ loading: false });
    }
    if (this.state.category == null) {
      this.state.categoryvalid = false;
      this.setState({ loading: false });
    }
    console.log("starting date ", this.state.startdate);
    console.log("ending date", this.state.enddate);
    console.log("Is the auction date valid ?", this.state.startdatevalid);
    if (
      this.state.basepricevalid &&
      this.state.filevalid &&
      this.state.startdatevalid &&
      this.state.categoryvalid
    ) {
      axios
        .get("http://localhost:5000/sel/checkcanupload",{
          withCredentials: true,
        })
        .then((res) => {
          
          if (res.status === 200) {
            console.log(" Auction create is permitted",res.data)
            // nav("/myauction");
            this.finalCreateAuction();
          }
          else if(res.status==202){
            this.setState({ loading: false });
            console.log(" Auction create is not  permitted but it is okay",res.data)
            this.setState({uploadgranted:true})
          }
          else{
            this.setState({ loading: false });
            console.log("Auction posting error",res.data);
          }
        })
        .catch((err) => {
          this.setState({ loading: false });
          console.log("the error is ", err);
        });
    }
  }

  render() {
    
    return (
      <div>
        <SellerNavbar />
        <br />
        <Box
          sx={{
            position: "absolute",
            height: "170%",
            marginTop: "65px",
            border: "1px grey solid",
            // left:getmarings,
            left: { sm: "16%", xs: "0%" },
            right: { sm: "16%", xs: "0%" },
            // right:getmarings,
            backgroundColor: "white",
          }}
        >
          <form onSubmit={this.onSubmit}>
            <center>
              <div
                style={{
                  color: "grey",
                  fontFamily: "sans-serif",
                  marginTop: "15px",
                  width: "200px",
                  height: "60px",
                  // border: "1px green double",
                  paddingTop: "2px",
                }}
              >
                <h2>New Auction</h2>
              </div>
            </center>
            <div style={{ padding: "20px" }}>
              <TextField
                id="standard-basic"
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
                label="Name"
                required
                variant="standard"
                sx={{
                  width: { sm: "450px", xs: "300px" },
                  marginRight: "40px",
                  marginBottom: "20px",
                }}
              />{" "}
              <br />
              {!this.state.basepricevalid && (
                <Typography color={"error"}>
                  Enter a base price atleast 3000ETB
                </Typography>
              )}
              <TextField
                id="standard-basic"
                onChange={(e) => {
                  this.setState({
                    baseprice: e.target.value,
                    basepricevalid: true,
                  });
                }}
                required
                label="Base price"
                variant="standard"
                sx={{
                  width: "300px",
                  marginRight: "40px",
                  marginBottom: "20px",
                }}
              />
               {!this.state.startdatevalid && (
                <Typography color={"error"}>Invalid date</Typography>
              )}
              <Stack
                direction={"column"}
                sx={{
                  width: "300px",
                  marginRight: "40px",
                  marginBottom: "20px",
                }}
              >
                <p>Start Date</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    required
                    value={this.state.startdate}
                    onChange={(newValue) =>
                      this.setState({ startdate: newValue })
                    }
                  />
                </LocalizationProvider>
              </Stack>
              <Stack
                direction={"column"}
                sx={{
                  width: "300px",
                  marginRight: "40px",
                  marginBottom: "20px",
                  color: "grey",
                }}
              >
                <p>End Date</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    required
                    value={this.state.enddate}
                    onChange={(newValue) =>
                      this.setState({ enddate: newValue })
                    }
                  />
                </LocalizationProvider>
              </Stack>
             
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}  >
                            <DemoContainer components={['DateRangePicker']}>
                                <DateRangePicker sx={{width:{sm:"350px",xs:"300px"}}} onChange={(newValue) => this.setState({range:newValue,startdatevalid:true})}
                                localeText={{ start: 'Opening-Date', end: 'Closing-Date' }} />
                            </DemoContainer>
                        </LocalizationProvider> */}
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={this.state.type}
                  required
                  onChange={this.handleChange}
                  label="Auctioneer"
                >
                  <MenuItem value={"private"}>Private</MenuItem>
                  <MenuItem value={"government"}>Governmental</MenuItem>
                  <MenuItem value={"company"}>Company</MenuItem>
                  <MenuItem value={"NGO"}>
                    Non Governmental Organization
                  </MenuItem>
                </Select>
              </FormControl>
              <br />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 290 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={this.category}
                  required
                  onChange={(event) => {
                    this.setState({ category: event.target.value });
                  }}
                  label="Auctioneer"
                >
                  <MenuItem value={"furnitures"}>furnitures</MenuItem>
                  <MenuItem value={"homes"}>Homes and Real States</MenuItem>
                  <MenuItem value={"jewelleries"}>Jewelleries</MenuItem>
                  <MenuItem value={"artwork"}>Artwork</MenuItem>
                  <MenuItem value={"electronics"}>Electronics </MenuItem>
                  <MenuItem value={"manufacturing"}>
                    Manufacturing Materials
                  </MenuItem>
                  <MenuItem value={"vehicles"}>Vehicles</MenuItem>
                  <MenuItem value={"building"}>Building</MenuItem>
                  <MenuItem value={"other"}>Others</MenuItem>
                </Select>
              </FormControl>
              <br />
              <Autocomplete
                id="region-select-demo"
                sx={{ position: "relative", width: "300px", marginTop: "20px" }}
                options={this.regions}
                autoHighlight
                required
                getOptionLabel={(option) => option}
                value={this.state.region}
                onChange={(event, newValue) => {
                  this.setState({ region: newValue });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Region"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              /> <br />
             
                  <TextField
                    label="City"
                    onChange={(e) => {
                      this.setState({
                        city: e.target.value,
                      });
                    }}
                    required
                    value={this.state.city}

                  />
              <br />
              {!this.state.filevalid && (
                <Typography color={"error"}>
                  please attach described image size and number
                </Typography>
              )}
              <br />
              <Button
                
                component="label"
                sx={{ backgroundColor: "lightred", height: "50px" }}
              >
                <AddCircleOutlineIcon />
                <p>Attach Image</p>
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  name="imgCollection"
                  onChange={this.onFileChange}
                />
              </Button>
              <div
                className="form-group multi-preview"
                style={{ marginTop: "20px" }}
              >
                {(this.state.preview || []).map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="..."
                    width="70px"
                    height="70px"
                    style={{ marginRight: "4px" }}
                  />
                ))}
              </div>
              <div>
                <p>Description</p>
                <Box sx={{ position: "relative", display: "flex" }}>
                  <textarea
                    id="description"
                    onChange={(e) => {
                      this.setState({ description: e.target.value });
                    }}
                    style={{
                      width: "92%",
                      height: "200px",
                      border: "1px grey solid",
                      padding:"10px",
                      fontSize:"15px"
                    }}
                  />
                </Box>
              </div>
              <center>
                <Button
                type="submit"
                variant="contained"
                sx={{
                  width:"300px",
                  color: "white",
                  ":hover":{backgroundColor:"red"},
                  marginTop: "50px",
                  left: "1%",
                  backgroundColor: "brown",
                }}
              > {this.state.loading?"Loading...":"Create my auction"}
              </Button>
              </center>
            </div>
          </form>
           {this.state.uploadgranted&&< PaymentChooseDialog open={this.state.open} handleClose={()=>{this.setState({open:false})}} />}
        </Box>
        <Box
          sx={{
            position: "absolute",
            display: { xs: "none", sm: "block" },
            height: "500px",
            width: "400px",
            top: "20%",
            marginTop: "65px",
            left: "40%",
            right: { sm: "16%", xs: "0%" },
          }}
        >
          <img
            src={auctionimage}
            alt=""
            style={{ marginLeft: "200px", height: "450px" }}
          />
        </Box>
        
      </div>
    );
  }
}
