

// import TextField from '@mui/material/TextField';
// import './selSidebar';
// import SellerNavbar from './selnav';
// import { Box ,Button,IconButton,List,Stack} from '@mui/material';
// import { useState,useEffect} from 'react';
// import Autocomplete from '@mui/material/Autocomplete';
// import  {AdapterDayjs}  from '@mui/x-date-pickers/AdapterDayjs';
// import  {LocalizationProvider}  from '@mui/x-date-pickers/LocalizationProvider';
// import  {DatePicker} from '@mui/x-date-pickers/DatePicker';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import   auctionimage from '../static/auction3.jpg';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import axios from 'axios';
// const CreateAuction=()=>{
//     // const [selectedFile, setSelectedFile] = useState([]);
//     const baseapi=axios.create(
//         { baseURL:"http://localhost:5000/sel"
//         });
//     const [preview, setPreview] = useState([]);
//     /*--   name,region,city,baseprice,startdate,enddate,description  -*/
//     const [name, setname] = useState(null);
//     const [baseprice, setbaseprice] = useState(null);
//     const [region, setregion] = useState(regions[0]);
//     const [city, setcity] = useState(cities[0]);
//     const [startdate, setstartdate] = useState(null);
//     const [enddate, setenddate] = useState(null);
//     const [description, setdescription] = useState(null);
//     /*----*/
//     const [category,setcategory]=useState(null);
//     let fileArray = [];
//     let fileObj = [];
//     const [type, settype] = useState('');
//     const handleChange = (event) => {
//         settype(event.target.value);
//     };
//     const [loading,setloading]=useState(false);
//     const uploadAuction=async()=>{
//         setloading(true);
//         console.log(name,baseprice,city,region,startdate,enddate,description,type,category)
//         let formData = new FormData();
//         fileObj.forEach((file) => {
//             formData.append('image', file);
//             console.log("the file is ",formData);
//         });
//         baseapi.post('/upload',formData,
//             {
//                 withCredentials:true,
//                 'Accept': 'application/json',
//                 'Content-Type': 'multipart/form-data',
                
//             }
//             // {"/sel/upload",
//             // {"image":formData},
//             // {
//             //     withCredentials:true,
//             //     'Accept': 'application/json',
//             //     'Content-Type': 'multipart/form-data',
//             // }
//             )
//             .then(response=>{
//                 console.log("the response status code is ",response)
//             }).catch(err=>{
//                 console.log("the error is ",err);
//             })

//     }
//     const uploadMultipleFiles=(e)=>{
//         // let fileObj = [];
//         fileObj.push(e.target.files)
//         console.log(fileObj)
//         console.log(fileArray)
//         for (let i = 0; i < fileObj[0].length; i++) {
//             fileArray.push(URL.createObjectURL(fileObj[0][i]))
//         }
//         setPreview(fileArray)
//         console.log(fileArray)
//     }
//     return (
//         <div>
//             <SellerNavbar/>
//                 <Box sx={{
//                     position:"absolute",
//                     height:"150%",
//                     marginTop:"65px",
//                     border:"1px grey solid",
//                     // left:getmarings,
//                     left:{sm:"16%",xs:"0%"},
//                     right:{sm:"16%",xs:"0%"},
//                     // right:getmarings,
//                     backgroundColor:"white"

//                 }} >
//                     <center><div style={{color:"grey",fontFamily:"sans-serif",marginTop:"15px",width:"200px",height:"60px",border:"1px green double", paddingTop:"2px"}}><h2 >New Auction</h2></div></center>
//                     <div style={{padding:"20px"}} >
//                         <TextField id="standard-basic" onChange={(e)=>{setname(e.target.value)}} label="Name" variant="standard" sx={{width:{sm:"450px",xs:"300px"},marginRight:"40px",marginBottom:"20px"}}/> <br />
//                         <TextField id="standard-basic" onChange={(e)=>{setbaseprice(e.target.value)}} label="Base price" variant="standard"  sx={{width:"300px",marginRight:"40px",marginBottom:"20px"}}  />
//                         <Stack direction={"column"} sx={{width:"300px",marginRight:"40px",marginBottom:"20px"}}>
//                             <p>Start Date</p>
//                             <LocalizationProvider dateAdapter={AdapterDayjs}  >
//                             <DatePicker value={startdate} onChange={(newValue) => setstartdate(newValue)} />
//                             </LocalizationProvider>
//                         </Stack>
//                         <Stack direction={"column"} sx={{width:"300px",marginRight:"40px",marginBottom:"20px",color:"grey"}}>
//                             <p>End Date</p>
//                             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker value={enddate} onChange={(newValue) => setenddate(newValue)}/>
//                             </LocalizationProvider>
//                         </Stack>
//                         <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
//                             <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
//                                 <Select
//                                 labelId="demo-simple-select-standard-label"
//                                 id="demo-simple-select-standard"
//                                 value={type}
//                                 onChange={handleChange}
//                                 label="Auctioneer"
//                                 >
//                                 <MenuItem value={"private"}>Private</MenuItem>
//                                 <MenuItem value={"government"}>Governmental</MenuItem>
//                                 <MenuItem value={"company"}>Company</MenuItem>
//                                 <MenuItem value={"NGO"}>Non Governmental Organization</MenuItem>
//                                 </Select>
//                         </FormControl>
//                         <br />
//                         <FormControl variant="standard" sx={{ m: 1, minWidth: 290 }}>
//                             <InputLabel id="demo-simple-select-standard-label">category</InputLabel>
//                                 <Select
//                                 labelId="demo-simple-select-standard-label"
//                                 id="demo-simple-select-standard"
//                                 value={category}
//                                 onChange={(event) => {
//                                     setcategory(event.target.value);
//                                 }}
//                                 label="Auctioneer"
//                                 >
//                                 <MenuItem value={0}>Jewellery</MenuItem>
//                                 <MenuItem value={1}>Construction Material</MenuItem>
//                                 <MenuItem value={2}>Vehicle and vehicle parts</MenuItem>
//                                 <MenuItem value={3}>Home</MenuItem>
//                                 <MenuItem value={4}>Building</MenuItem>
//                                 <MenuItem value={5}>Machineries</MenuItem>
//                                 <MenuItem value={6}>used materials</MenuItem>
//                                 <MenuItem value={7}>Furnitures</MenuItem>
//                                 <MenuItem value={8}>Other</MenuItem>
                        
//                                 </Select>
//                         </FormControl>
//                         <br />
//                         {/* <TextField id="standard-basic" label="Start Date" variant="standard"  sx={{width:"300px",marginRight:"40px",marginBottom:"20px"}}/> */}
//                         {/* <TextField id="standard-basic" label="End date" variant="standard"  sx={{width:"300px",marginRight:"40px",marginBottom:"20px"}} />  */}
//                         <Autocomplete
//                             id="region-select-demo"
//                             sx={{position:"relative", width: "300px",marginTop:"20px" }}
                            
//                             options={regions}
//                             autoHighlight
//                             getOptionLabel={(option) => option}
//                             onChange={(event, newValue) => {
//                                 setregion(newValue);
//                             }}
//                             renderInput={(params) => (
//                                 <TextField
//                                 {...params}
//                                 label="Region"
//                                 inputProps={{
//                                     ...params.inputProps,
//                                     autoComplete: 'new-password', // disable autocomplete and autofill
//                                 }}
//                                 />
//                             )}
//                             />
//                         <Autocomplete
//                             id="city-select-demo"
//                             sx={{position:"relative",width: "300px",marginTop:"20px" }}
//                             options={cities}
//                             onChange={(event, newValue) => {
//                                 setcity(newValue);
//                             }}
//                             autoHighlight
//                             getOptionLabel={(option) => option}
//                             renderOption={(props, option) => (
//                                 <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
//                                 {option}
//                                 </Box>
//                             )}
//                             renderInput={(params) => (
//                                 <TextField
//                                 {...params}
//                                 label="City"
//                                 inputProps={{
//                                     ...params.inputProps,
//                                     autoComplete: 'new-password', // disable autocomplete and autofill
//                                 }}
//                                 />
//                                 )}
//                             /> <br />
                        
//                         <Button variant="contained" component="label" sx={{backgroundColor:"lightred",height:"50px"}}>
//                             <AddCircleOutlineIcon />
//                             <p>upload Image</p>
//                             <input hidden accept="image/*" multiple type="file" onChange={uploadMultipleFiles}  name="image"  />
//                         </Button>
//                         <div className="form-group multi-preview" style={{marginTop:"20px"}}>
//                             {(preview || []).map(url => (
//                                 <img key={url} src={url} alt="..." width="70px" height="70px" style={{marginRight:"4px"}}/>
//                             ))}
//                         </div>
//                         <div>
//                             <p>Description</p>
//                             <Box sx={{position:"relative",display:"flex"}}>
//                                 <textarea id="description" onChange={(e)=>{
//                                 setdescription(e.target.value)
//                             }}    
//                                 style={{width:"92%",height:"200px",border:"1px grey solid"}}/>
//                             </Box>
//                         </div>
//                         <Button  onClick={uploadAuction} variant='contained'  sx={{
//                             // width:"300px",
//                             color:"lightblue",
//                             marginTop:"50px",
//                             left:"1%",
//                             backgroundColor:"blueblacks"
//                         }} >Create</Button>
//                         {/* <LoadingButton
//                             onClick={handleClick}
//                             endIcon={<SendIcon />}
//                             loading={loading}
//                             loadingPosition="end"
//                             variant="contained"
//                             >
//                             <span>Send</span>
//                         </LoadingButton> */}
//                     </div>
                    
//                 </Box>
//                 <Box sx={{
//                     position:"absolute",
//                     display:{xs:"none",sm:"block"},
//                     height:"500px",
//                     width:"400px",
//                     top:"20%",
//                     // zIndex:"2",
//                     marginTop:"65px",
//                     left:"40%",
//                     right:{sm:"16%",xs:"0%"},
//                     // backgroundColor:"red"
//                 }}
//                 >
//                     <img src={auctionimage} alt='' style={{marginLeft:"200px",height:"450px"}} />
//                 </Box>
//         </div>
//     )
// }
// const regions = [
//     'Tigray', 
//     'Afar',
//     'Amhara',
//     'Benishangul Gumuz',
//     'Oromia',
//     'Gambella',
// ]
// const cities = [
//     'Addis Ababa',
//     'Adama',
//     'Hawassa',
//     'Bahirdar',
//     'Mekele',
//     'Gambella',
// ]

// export default  CreateAuction;