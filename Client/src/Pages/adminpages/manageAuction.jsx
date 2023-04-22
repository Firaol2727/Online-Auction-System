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
const ManageAuction=()=>{
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
            <h3>Enter Auction Id </h3>
            <Stack direction="row"style={{marginLeft:"30px"}} >
                <TextField id="filled-basic" label="id" variant="filled" sx={{width:"300px"}}/>
                <Button id="find" variant="contained" sx={{width:"100px"}} onClick={
                    ()=>{
                        // document.getElementById("find").style.backgroundColor="lightblue"
                    }
                } >Find</Button>
            </Stack>
            <Box sx={{
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
                    width:"400px",
                    height:"400px",
                    backgroundColor:"pink"
                }}>
                    <IconButton sx={{position:"absolute",top:"40%",left:"0%"
                }}><NavigateBeforeIcon/></IconButton>
                    <IconButton sx={{position:"absolute",top:"40%",right:"0%"
                }}><NavigateNextIcon/></IconButton>
                </Box>
                <div style={{position:"relative",marginTop:"6px", width:"400px",display:"flex",flexWrap:"wrap"}}>
                <Box style={{
                    position:"relative",
                    width:"80px",
                    height:"80px",
                    marginLeft:"5px",
                    marginRight:"5px",
                    backgroundColor:"blue"
                }}></Box>
                <Box style={{
                    position:"relative",
                    width:"80px",
                    height:"80px",
                    marginLeft:"5px",
                    marginRight:"5px",
                    backgroundColor:"blue"
                }}></Box>
                <Box style={{
                    position:"relative",
                    width:"80px",
                    height:"80px",
                    marginLeft:"5px",
                    marginRight:"5px",
                    backgroundColor:"blue"
                }}></Box>
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
                    <p><b>Auction Id </b> - 1543f1h5d4xfgh3215</p>
                    <p> <b>Auction Name</b>-  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, aliquid ipsa vitae delectus quibusdam iusto esse provident reiciendis pariatur consequatur incidunt id, autem, mollitia debitis ea sunt nam similique quisquam!</p>
                    <p><b>Base Price</b> - 5000 birr</p>
                    <p><b>Hammer Price </b> - 4500 birr</p>
                    <p><b>State</b> <b style={{color:"green"}}>On going...</b></p>
                    <ListItem direction={"row"} sx={{height:"20px",padding:"0px"}} ><LocationOnIcon /><p><b>Location</b> AddisAbaba,Bole</p></ListItem><br></br>
                    <ListItem direction={"row"} sx={{height:"20px",padding:"0px"}}><CalendarMonthIcon/><p><b>Start Date</b> 12/05/2012</p></ListItem><br></br>
                    <ListItem direction={"row"} sx={{height:"20px",padding:"0px"}}><CalendarMonthIcon/><p><b>End Date</b> 13/07/2012</p></ListItem><br></br>
                    <br></br>
                    <h3>Decription</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, sequi harum. Quos id sint repellendus commodi praesentium molestiae tempora facere ipsam earum nam? Voluptas nesciunt facilis voluptatum earum repellendus ducimus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quod qui voluptatem necessitatibus
                    modi labore, reprehenderit tenetur, ut totam asperiores quis fuga laborum pariatur. Error a adipisci cupiditate iure perferendis?
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla recusandae minus, excepturi quaerat vitae aliquam praesentium odit adipisci ad similique laboriosam dolorem dicta corporis, numquam illum assumenda totam dolor beatae?
                    </p>
                    <Button variant="contained"  sx={{
                        position:"relative",
                        marginLeft:"600px",
                        width:"200px",
                        backgroundColor:"red",
                        color:"white"
                    }}> Delete</Button>
                </Box>
                
                </Box>
                </Box>
                </Box>
            </Box>
        </Stack>
        
    </div>
    )
}
export default ManageAuction;