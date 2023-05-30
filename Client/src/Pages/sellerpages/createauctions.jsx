import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import './selSidebar';
import SellerNavbar from './selnav';
import { Box ,Button,IconButton,List,Stack, Typography} from '@mui/material';
import { useState,useEffect} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import  {AdapterDayjs}  from '@mui/x-date-pickers/AdapterDayjs';
import  {LocalizationProvider}  from '@mui/x-date-pickers/LocalizationProvider';
import  {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker}  from '@mui/x-date-pickers-pro/DateRangePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import   auctionimage from '../static/auction3.jpg';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default class CreateAuction extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            imgCollection: '',
            preview:[],
            name:'',
            baseprice:0,
            region:this.regions[0],
            city:this.cities[0],
            enddate:null,
            startdate:null,
            description:null,
            category:null,
            type:"private",
            inputfilelength:0,
            categoryvalid:true,
            filevalid:true,
            basepricevalid:true,
            startdatevalid:true,
            error:'',
            range:null,

            // tooltip controllers //
            nametooltip:false,
            pricetooltip:false,
            datetooltip:false,
            categorytooltip:false,

        }
        
    }
    regions=[
        'AddisAbaba',
        'Tigray', 
        'Afar',
        'Amhara',
        'Benishangul Gumuz',
        'Oromia',
        'Gambella',
        'SNNP',
        'Sidama',
        'Somali',
        ]
    cities=[
        'Addis Ababa',
        'Adama',
        'Hawassa',
        'Bahirdar',
        'Mekele',
        'Gambella',
        ]
    handleChange = (event) => {
        this.setState({type: event.target.value });
    };
    //  nav=useNavigate()
    onFileChange(e) {
       
        this.setState({ imgCollection: e.target.files,filevalid:true })
        let fileObj = [];
        let fileArray = [];
        console.log("uploading multiple files")
        fileObj.push(e.target.files)
        console.log(fileObj)
        console.log(fileArray)
        this.setState({inputfilelength:fileObj[0].length})
        if(this.state.inputfilelength==0){
            this.setState({filevalid:false})
        }else{
            for (let i = 0; i < fileObj[0].length; i++) {
            if (fileObj[0][i].size>1048576) {
                this.state.filevalid=false;
                break;
            }else{
                this.state.filevalid=true;
            }
        }
        }
        
        console.log("are all the files valid ?",this.state.filevalid)
        if(this.state.filevalid){
            for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]))
        }
            this.state.inputfilelength=fileObj[0].length;
            console.log("input number",this.state.inputfilelength)
            this.setState({preview:[...fileArray]})
            
        }
        
    }
    onSubmit(e) {
        e.preventDefault()
        var formData = new FormData();
        for (const key of Object.keys(this.state.imgCollection)) {
            formData.append('imgCollection', this.state.imgCollection[key])
        }
        if(this.state.range[0]!=null && this.state.range[1]!=null){
            let now=new Date();
            let sd=new Date(this.state.range[0]);
            let ed=new Date(this.state.range[0]);
            
            const diffInMilliseconds = Math.abs(sd - now);
            const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));
            const rangeInsec=Math.abs(ed-sd);
            const rangeauction=Math.round(diffInMilliseconds/(1000 * 60 * 60 * 24))
            if (sd>now) {
                if (diffInDays<90 && rangeauction<30) {
                    this.state.startdatevalid=true;
                    this.state.startdate=sd;
                    this.state.enddate=ed;
                }else{
                    this.state.startdatevalid=false;
                }
            }else{
                this.state.startdatevalid=false;
            }
        }
        if(this.state.baseprice<3000){
            this.setState({basepricevalid:false})
        }
        if(this.state.inputfilelength==0){
            this.state.filevalid=false;
        }
        if(this.state.category==null){
            this.state.categoryvalid=false
        }
        console.log("starting date ",this.state.startdate)
        console.log("ending date",this.state.enddate)
        console.log("Is the auction date valid ?",this.state.startdatevalid)
        if(this.state.basepricevalid && this.state.filevalid && this.state.startdatevalid && this.state.categoryvalid){
            formData.append("name",this.state.name);
            formData.append("baseprice",this.state.baseprice);
            formData.append("startdate",this.state.startdate);
            formData.append("enddate",this.state.enddate);
            formData.append("type",this.state.type);
            formData.append("category",this.state.category);
            formData.append("region",this.state.region);
            formData.append("city",this.state.city);
            formData.append("description",this.state.description);
            axios.post("http://localhost:5000/sel/upload",formData,{
            withCredentials:true,
            }).then(res => {
                if(res.status===200){
                    nav('/myauction')
                }
                console.log(res.data)
            }).catch(err=>{
                console.log("the error is ",err)
            })
        }
        
    }
    render() {
        return (
            <div>
            <SellerNavbar/>
                <Box sx={{
                    position:"absolute",
                    height:"170%",
                    marginTop:"65px",
                    border:"1px grey solid",
                    // left:getmarings,
                    left:{sm:"16%",xs:"0%"},
                    right:{sm:"16%",xs:"0%"},
                    // right:getmarings,
                    backgroundColor:"white"

                }} >
                    <form onSubmit={this.onSubmit}>
                    <center><div style={{color:"grey",fontFamily:"sans-serif",marginTop:"15px",width:"200px",height:"60px",border:"1px green double", paddingTop:"2px"}}><h2 >New Auction</h2></div></center>
                    <div style={{padding:"20px"}} >
                       
                        <TextField id="standard-basic" onChange={(e)=>{this.setState({name:e.target.value}) }} label="Name" variant="standard" sx={{width:{sm:"450px",xs:"300px"},marginRight:"40px",marginBottom:"20px"}}/> <br />
                      { !this.state.basepricevalid && <Typography color={"error"}>Enter a base price atleast 3000ETB</Typography>}
                        <TextField id="standard-basic" onChange= {(e)=>{this.setState({baseprice:e.target.value,basepricevalid:true}) }} label="Base price" variant="standard"  sx={{width:"300px",marginRight:"40px",marginBottom:"20px"}}  />
                        {/* 
                        <Stack direction={"column"} sx={{width:"300px",marginRight:"40px",marginBottom:"20px"}}>
                            <p>Start Date</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}  >
                            <DatePicker value={this.state.startdate} onChange={(newValue) => this.setState({startdate:newValue})} />
                            </LocalizationProvider>
                        </Stack>

                        <Stack direction={"column"} sx={{width:"300px",marginRight:"40px",marginBottom:"20px",color:"grey"}}>
                            <p>End Date</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={this.state.enddate} onChange={(newValue) => this.setState({enddate:newValue})}/>
                            </LocalizationProvider>
                        </Stack> */}
                        {!this.state.startdatevalid &&<Typography color={"error"}>Invalid date</Typography>}
                        <LocalizationProvider dateAdapter={AdapterDayjs}  >
                            <DemoContainer components={['DateRangePicker']}>
                                <DateRangePicker sx={{width:{sm:"350px",xs:"300px"}}} onChange={(newValue) => this.setState({range:newValue,startdatevalid:true})}
                                localeText={{ start: 'Opening-Date', end: 'Closing-Date' }} />
                            </DemoContainer>
                        </LocalizationProvider>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={this.state.type}
                                onChange={this.handleChange}
                                label="Auctioneer"
                                >
                                <MenuItem value={"private"}>Private</MenuItem>
                                <MenuItem value={"government"}>Governmental</MenuItem>
                                <MenuItem value={"company"}>Company</MenuItem>
                                <MenuItem value={"NGO"}>Non Governmental Organization</MenuItem>
                                </Select>
                        </FormControl>
                        <br />
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 290 }}>
                            <InputLabel id="demo-simple-select-standard-label">category</InputLabel>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={this.category}
                                onChange={(event) => {
                                    this.setState({category:event.target.value})
                                }}
                                label="Auctioneer"
                                >
                                <MenuItem value={"furnitures"}>furnitures</MenuItem>
                                <MenuItem value={"homes"}>Homes and Real States</MenuItem>
                                <MenuItem value={"jewelleries"}>Jewelleries</MenuItem>
                                <MenuItem value={"artwork"}>Artwork</MenuItem>
                                <MenuItem value={"electronics"}>Electronics </MenuItem>
                                <MenuItem value={"manufacturing"}>Manufacturing Materials</MenuItem>
                                <MenuItem value={"vehicles"}>Vehicles</MenuItem>
                                <MenuItem value={"building"}>Building</MenuItem>
                                <MenuItem value={"other"}>Others</MenuItem>
            
                                </Select>
                        </FormControl>
                        <br />
                        <Autocomplete
                            id="region-select-demo"
                            sx={{position:"relative", width: "300px",marginTop:"20px" }}
                            options={this.regions}
                            autoHighlight
                            getOptionLabel={(option) => option}
                            value={this.state.region}
                            onChange={(event, newValue) => {
                                this.setState({region:newValue}) 
                            }}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                label="Region"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                                />
                            )}
                            />
                        <Autocomplete
                            id="city-select-demo"
                            sx={{position:"relative",width: "300px",marginTop:"20px" }}
                            options={this.cities}
                            onChange={(event, newValue) => {
                                this.setState({city:newValue})
                            }}
                            autoHighlight
                            value={this.state.city}
                            getOptionLabel={(option) => option}
                            renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {option}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                label="City"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                                />
                                )}
                            /> <br />
              {     !this.state.filevalid &&     <Typography color={"error"}>please attach described image size and number</Typography>}
                        <Button variant="contained" component="label" sx={{backgroundColor:"lightred",height:"50px"}}>
                            <AddCircleOutlineIcon />
                            <p>Attach Image</p>
                            <input hidden accept="image/*" multiple type="file" name="imgCollection" onChange={
                                 this.onFileChange 
                                } />
                        </Button>
                        <div className="form-group multi-preview" style={{marginTop:"20px"}}>
                            {(this.state.preview || []).map(url => (
                                <img key={url} src={url} alt="..." width="70px" height="70px" style={{marginRight:"4px"}}/>
                            ))}
                        </div>
                        <div>
                            <p>Description</p>
                            <Box sx={{position:"relative",display:"flex"}}>
                                <textarea id="description" onChange={(e)=>{
                                this.setState({description:e.target.value}) 
                            }}    
                                style={{width:"92%",height:"200px",border:"1px grey solid"}}/>
                            </Box>
                        </div>
                        <Button type='submit' variant='contained'  sx={{
                            // width:"300px",
                            color:"lightblue",
                            marginTop:"50px",
                            left:"1%",
                            backgroundColor:"blueblacks"
                        }} >Create</Button>
                    </div>
                    </form>
                </Box>
                <Box sx={{
                    position:"absolute",
                    display:{xs:"none",sm:"block"},
                    height:"500px",
                    width:"400px",
                    top:"20%",
                    marginTop:"65px",
                    left:"40%",
                    right:{sm:"16%",xs:"0%"},
                }}
                >
                    <img src={auctionimage} alt='' style={{marginLeft:"200px",height:"450px"}} />
                </Box>
        </div>
        )
    }
}

