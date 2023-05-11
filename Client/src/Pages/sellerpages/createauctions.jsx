import TextField from '@mui/material/TextField';
import './selSidebar';
import SellerNavbar from './selnav';
import { Box ,Button,IconButton,List,Stack} from '@mui/material';
import { useState,useEffect} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import  {AdapterDayjs}  from '@mui/x-date-pickers/AdapterDayjs';
import  {LocalizationProvider}  from '@mui/x-date-pickers/LocalizationProvider';
import  {DatePicker} from '@mui/x-date-pickers/DatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import   auctionimage from '../static/auction3.jpg';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CreateAuction=()=>{
    // const [selectedFile, setSelectedFile] = useState([]);
    const [preview, setPreview] = useState([]);
    const [broadcategory,setBroadcategory]=useState([]);
    let fileArray = [];
    const [age, setAge] = useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const uploadMultipleFiles=(e)=>{
        let fileObj = [];
        fileObj.push(e.target.files)
        console.log(fileObj)
        console.log(fileArray)
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]))
        }
        setPreview(fileArray)
        console.log(fileArray)
    }
    return (
        <div>
            <SellerNavbar/>
                <Box sx={{
                    position:"absolute",
                    height:"150%",
                    marginTop:"65px",
                    border:"1px grey solid",
                    // left:getmarings,
                    left:{sm:"16%",xs:"0%"},
                    right:{sm:"16%",xs:"0%"},
                    // right:getmarings,
                    backgroundColor:"white"

                }} >
                    <center><div style={{color:"grey",fontFamily:"sans-serif",marginTop:"15px",width:"200px",height:"60px",border:"1px green double", paddingTop:"2px"}}><h2 >New Auction</h2></div></center>
                    <div style={{padding:"20px"}} >
                        <TextField id="standard-basic" label="Name" variant="standard" sx={{width:{sm:"450px",xs:"300px"},marginRight:"40px",marginBottom:"20px"}}/> <br />
                        <TextField id="standard-basic" label="Base price" variant="standard"  sx={{width:"300px",marginRight:"40px",marginBottom:"20px"}}  />
                        <Stack direction={"column"} sx={{width:"300px",marginRight:"40px",marginBottom:"20px"}}>
                            <p>Start Date</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker />
                            </LocalizationProvider>
                        </Stack>
                        <Stack direction={"column"} sx={{width:"300px",marginRight:"40px",marginBottom:"20px",color:"grey"}}>
                            <p>End Date</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker />
                            </LocalizationProvider>
                        </Stack>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={age}
                                onChange={handleChange}
                                label="Age"
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                        </FormControl>
                        <br />
                        {/* <TextField id="standard-basic" label="Start Date" variant="standard"  sx={{width:"300px",marginRight:"40px",marginBottom:"20px"}}/> */}
                        {/* <TextField id="standard-basic" label="End date" variant="standard"  sx={{width:"300px",marginRight:"40px",marginBottom:"20px"}} />  */}
                        <Autocomplete
                            id="region-select-demo"
                            sx={{position:"relative", width: "300px",marginTop:"20px" }}
                            options={regions}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            // renderOption={(props, option) => (
                            //     <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            //     {option.label}
                            //     </Box>
                            // )}
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
                            options={cities}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {option.label}
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
                        
                        <Button variant="contained" component="label" sx={{backgroundColor:"lightred",height:"50px"}}>
                            <AddCircleOutlineIcon />
                            <p>upload Image</p>
                            <input hidden accept="image/*" multiple type="file" onChange={uploadMultipleFiles}  name="image"  />
                        </Button>
                        <div className="form-group multi-preview" style={{marginTop:"20px"}}>
                            {(preview || []).map(url => (
                                <img key={url} src={url} alt="..." width="70px" height="70px" style={{marginRight:"4px"}}/>
                            ))}
                        </div>
                        <div>
                            <p>Description</p>
                            <Box sx={{position:"relative",display:"flex"}}>
                                <textarea id="description"    
                                style={{width:"92%",height:"200px",border:"1px grey solid"}}/>
                            </Box>
                            
                        </div>
                        
                        <Button variant='contained'  sx={{
                            // width:"300px",
                            color:"lightblue",
                            marginTop:"50px",
                            left:"1%",
                            backgroundColor:"blueblacks"
                        }} >Create</Button>
                        {/* <LoadingButton
                            onClick={handleClick}
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                            >
                            <span>Send</span>
                        </LoadingButton> */}
                    </div>
                    
                </Box>
                <Box sx={{
                    position:"absolute",
                    display:{xs:"none",sm:"block"},
                    
                    height:"500px",
                    width:"400px",
                    top:"20%",
                    // zIndex:"2",
                    marginTop:"65px",
                    
                    left:"40%",
                    right:{sm:"16%",xs:"0%"},
                    // backgroundColor:"red"
                }}
                >
                    <img src={auctionimage} alt='' style={{marginLeft:"200px",height:"450px"}} />
                </Box>
        </div>
    )
}
const regions = [
    {  label: 'Tigray', },
    {  label: 'Afar'},
    {  label: 'Amhara'},
    {  label: 'Benishangul Gumuz'},
    {  label: 'Oromia'},
    {  label: 'Gambella'},
]
const cities = [
    {  label: 'Addis Ababa'},
    {  label: 'Adama'},
    {  label: 'Hawassa'},
    {  label: 'Bahirdar'},
    {  label: 'Mekele'},
    {  label: 'Gambella'},
]

export default  CreateAuction;