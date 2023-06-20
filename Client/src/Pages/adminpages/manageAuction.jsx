import Sidebar from "./sideBar";
import NavbarAdmin from "./adminNavbar";
import { Stack, Box, Button,List, Link, ListItem, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './css/report.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
const ManageAuction=()=>{
    const baseapi =axios.create({baseURL:"http://localhost:5000/special"})
    const [auct,setauct]=useState('');
    const[pics,setpics]=useState([]);
    const [searchid,setsearchid]=useState('')
    const [error,seterror]=useState(false);
    const nav=useNavigate()
    const [message,setmessage]=useState()
    const [imglength,setimglength]=useState(0)
    const [loading,setloading]=useState(false);
    const [imgdisplay,setimgdisplay]=useState('');
    const [dload,setdload]=useState(false);
    const handleSearch=(id)=>{
        console.log("The id is ",id)
        setloading(true)
        // setuser('');
        baseapi.post("/auction",{"aid":id},{withCredentials:true})
        .then(res=>{
            setloading(false)
            if(res.status==200){
                console.log("The response data is ",res.data)
                let pictures=[];
                let details=res.data.detail;
                pictures=res.data.pictures;
                setauct(details);
                setpics(pictures);
                setimglength(pictures.length);
                setimgdisplay(details.see)
                console.log("auct",auct)
                console.log("pics",pictures)
                console.log("imglength",pictures.length)
            }
            else if (res.status==400){
                setloading(false)
                setmessage("No Auction with this id")
            }
            else if (res.status==403){
                nav('/adlogin')
            }
            else{
                setloading(false)
                setmessage("No Auction with this id")
            }
        })
        .catch(err=>{
            setloading(false);
            setmessage("No Auction with the specified id")
            console.log("The error is ",err);
        })
    }
    const handledelete=(id)=>{
        console.log("The id is ",id)
        setdload(true)
        setmessage(null)
        baseapi.post("/deleteauction",{"aid":id},{withCredentials:true})
        .then(res=>{
            setdload(false)
            if(res.status==200){
                setuser("")
            }
            else if (res.status==400){
                setmessage("No Seller with this id")
            }
            else if (res.status==403){
                nav('/adlogin')
            }
            
        })
        .catch(err=>{
            console.log("The error is ",err);
            setdload(false);
            setmessage("Unable to delete")
        })
    }
    function onchangepic(index){
        setimgdisplay(index)
    }
    return(

    <div>
        <NavbarAdmin sx={{position:"absolute"}}/>
        <Stack direction="row" sx={{position:"relative",marginTop:"30px"}} spacing={0.5}>
            <Sidebar/>
           <Box flex={6} >
                <Box  sx={{
                    position:"relative",
                    marginTop:"50px",
                    
                }} >
                <h3>Search for Auction </h3>
                
                <Stack direction="row"style={{marginLeft:"30px"}} >
                    <TextField id="filled-basic" label="id" variant="filled"onChange={(e)=>{setsearchid(e.target.value)}} sx={{width:"300px"}}/>
                    <Button id="find" variant="contained" 
                        disabled={loading}
                      sx={{width:"100px",height:"50px"}} onClick={
                        ()=>{
                            handleSearch(searchid)
                        }
                    } >{loading?"searching...":"search"}</Button>
                </Stack>
                {auct && <Box sx={{
                        position:"relative",
                        marginTop:"5px",
                        // s
                        backgroundColor:"lightgreen"
                    }}>
                    <Box sx={{position:"absolute",width:"100%"}}>
                    <Box className="picture" style={{
                        position:"absolute",
                        width:"400px",
                        backgroundColor:"white"
                    }}>
                        <Box className="picture" style={{
                        position:"relative",
                        // width:"400px",
                        height:"400px",
                        backgroundColor:"white"
                    }}>
                         <img
                            alt="auctionImage"
                            src={`http://localhost:5000/images/${imgdisplay}`}
                            onClick={()=>{onchangepic(pic.id)}}
                            style={{ position:"absolute",height:"100%"
                                 }}
                        />
                        <IconButton sx={{position:"absolute",top:"40%",left:"0%"
                    }}><NavigateBeforeIcon/></IconButton>
                        <IconButton sx={{position:"absolute",top:"40%",right:"0%"
                    }}><NavigateNextIcon/></IconButton>
                    </Box>
                    <div style={{position:"relative",marginTop:"6px", width:"400px",display:"flex",flexWrap:"wrap"}}>
                    {pics.map(pic=>(
                                        // <Box sx={{
                                        //     position:"relative",
                                           
                                        //     marginTop:"5px",  
                                        //     backgroundColor:"pink",
                                        // }
                                        // }>

                                        // </Box>
                                        <img
                                        className="auctionImage"
                                        key={pic.id}
                                        alt="auctionImage"
                                        src={`http://localhost:5000/images/${pic.id}`}
                                        onClick={()=>{onchangepic(pic.id)}}
                                        style={{
                                            position:"relative",
                                            marginTop:"5px",
                                            marginRight:"5px",
                                            width:"80px",
                                            height:"80px" }}
                                    />
                                    ))}
                    </div>
                    </Box>
                    <Box className="description" style={{
                        position:"absolute",
                        width:"65%",
                        left:"33%",
                        height:"800px",
                        padding:"5px",
                        backgroundColor:"white"
                    }}>
                        <p><b>Auction Id </b> -{auct.id}</p>
                        <p> <b>Auction Name</b>-{auct.name}</p>
                        <p><b>Base Price</b> - {auct.baseprice} birr</p>
                        <p><b>Hammer Price </b> - {auct.hammerprice}  birr</p>
                        <p><b>State</b> <b style={{color:"green"}}>On going...</b></p>
                        <ListItem direction={"row"} sx={{height:"20px",padding:"0px"}} ><LocationOnIcon /><p><b>Location</b> {auct.city} </p></ListItem><br></br>
                        <ListItem direction={"row"} sx={{height:"20px",padding:"0px"}}><CalendarMonthIcon/><p><b>Start Date</b>{auct.startdate} </p></ListItem><br></br>
                        <ListItem direction={"row"} sx={{height:"20px",padding:"0px"}}><CalendarMonthIcon/><p><b>End Date</b> {auct.enddate} </p></ListItem><br></br>
                        <br></br>
                        <h3>Decription</h3>
                        <p>{auct.description} </p>
                        <Button variant="contained" onClick={()=>{
                            handledelete(auct.id)
                        }} disabled={dload}  sx={{
                            position:"relative",
                            marginLeft:"600px",
                            width:"100px",
                            backgroundColor:"red",
                            color:"white"
                        }}> {dload?"Deleting...":"Delete"}</Button>
                    </Box>
                    
                    </Box>
                </Box>}
                {message && <center> <b> No Auction with this id</b></center>}
                
                </Box>
            </Box>
            
        </Stack>
        
    </div>
    )
}
export default ManageAuction;