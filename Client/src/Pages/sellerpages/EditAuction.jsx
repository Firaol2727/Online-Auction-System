import {useState,useEffect} from 'react';
import { Stack, Box, Button,List, Link, ListItem, IconButton} from '@mui/material';
import SellerNavbar from './selnav';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const EditAuction=()=>{
    return (
        <div>
            <SellerNavbar/>
            <Box sx={{
                position:"absolute",
                marginTop:"50px",
                height:"130%",
                backgroundColor:"white",
                left:{
                    sm:"10%",
                    xs:"0px"
                },
                width:{
                    sm:"80%",
                    xs:"100%"
                },
            }}>
                <Box sx={{
                        position:"relative",
                        marginTop:"50px",
                        backgroundColor:"white"
                    }}>
                        <Stack direction={{sm:"row", xs:"column"} }spacing={3}>
                            <Box className="picture" style={{
                                backgroundColor:"white",
                            }}>
                                <Stack direction={{sm:"row", xs:"column-reverse"} }spacing={1}>
                                    <Stack direction={{sm:"column", xs:"row"} } spacing={1}  sx={{
                                        // position:"relative",
                                        marginTop:"6px", 
                                        marginRight:"6px",
                                        width:{sm:"100px",xs:"100%"},
                                        display:"flex",
                                        maxHeight:{sm:"400px",xs:"90px"},
                                        overflow:"scroll"
                                        }}>
                                    <Box sx={{
                                        position:"relative",
                                        width:"80px",
                                        height:"80px",
                                        marginTop:"5px",  
                                        backgroundColor:"blue",
                                    }
                                    }></Box>
                                    <Box style={{
                                        position:"relative",
                                        width:"80px",
                                        height:"80px",
                                        marginTop:"5px",
                                    
                                        backgroundColor:"blue"
                                    }}></Box>
                                    <Box style={{
                                        position:"relative",
                                        width:"80px",
                                        height:"80px",
                                        marginTop:"5px",
                                    
                                        backgroundColor:"blue"
                                    }}></Box>
                                    </Stack>
                                    <Box className="picture" sx={{
                                        position:"relative",
                                        width:{sm:"370px",xs:"100%"},
                                        height:"400px",
                                        backgroundColor:"lightblue"
                                    }}>
                                        <IconButton sx={{position:"absolute",top:"40%",left:"0%"
                                    }}><NavigateBeforeIcon/></IconButton>
                                        <IconButton sx={{position:"absolute",top:"40%",right:"0%"
                                    }}><NavigateNextIcon/></IconButton>
                                    </Box>
                                </Stack>
                            </Box>
                            <Box  className="description"style={{
                                height:"120%",
                                padding:"5px",
                                backgroundColor:"white"
                            }}>
                                 <Stack direction={"row"} spacing={2}> 
                                    <div style={{fontSize:"18px",color:"black",fontWeight:"bold"  }}>Name</div> 
                                    <div style={{fontSize:"17px",color:"black"  }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, aliquid ipsa vitae delectus quibusdam iusto esse provident reiciendis pariatur consequatur incidunt id, autem, mollitia debitis ea sunt nam similique quisquam!</div> 
                                </Stack> <br />
                                <Stack direction={"row"} spacing={2}> 
                                    <div style={{fontSize:"18px",color:"black" ,fontWeight:"bold"   }}>Base price</div> 
                                    <div style={{fontSize:"17px",color:"black"  }}>5000 ETB</div> 
                                </Stack> <br />
                                <Stack direction={"row"} spacing={2}> 
                                    <div style={{fontSize:"18px",color:"black" ,fontWeight:"bold"   }}>Hammer price</div> 
                                    <div style={{fontSize:"17px",color:"black"  }}>15000 ETB</div> 
                                </Stack>
                                <br />
                                <Stack direction={"row"} spacing={2}> 
                                    <div style={{fontSize:"18px",color:"black" ,fontWeight:"bold"   }}>Status</div> 
                                    <div style={{fontSize:"17px",color:"black"  }}>Active</div> 
                                </Stack>
                                <br />
                                <Stack direction={"row"} spacing={1}> 
                                    <LocationOnIcon />
                                    {/* <div style={{fontSize:"18px",color:"black" ,fontWeight:"bold"   }}>Location</div>  */}
                                    <div style={{fontSize:"17px",color:"black" }}>AddisAbaba,Bole</div> 
                                </Stack>
                                <br />
                                <Stack direction={"row"} spacing={1}> 
                                    <div style={{fontSize:"18px",color:"black" ,fontWeight:"bold"   }}>Start Date</div> 
                                    {/* <div style={{fontSize:"18px",color:"black" ,fontWeight:"bold"   }}>Location</div>  */}
                                    <div style={{fontSize:"17px",color:"green"  }}>12/05/2012</div> 
                                </Stack>
                                <br />
                                <Stack direction={"row"} spacing={1}> 
                                    <div style={{fontSize:"18px",color:"black" ,fontWeight:"bold"   }}>End Date</div> 
                                    {/* <div style={{fontSize:"18px",color:"black" ,fontWeight:"bold"   }}>Location</div>  */}
                                    <div style={{fontSize:"17px",color:"red" }}> 13/07/2012</div> 
                                </Stack>
                                <br></br>
                                <h3>Decription</h3>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, sequi harum. Quos id sint repellendus commodi praesentium molestiae tempora facere ipsam earum nam? Voluptas nesciunt facilis voluptatum earum repellendus ducimus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quod qui voluptatem necessitatibus
                                modi labore, reprehenderit tenetur, ut totam asperiores quis fuga laborum pariatur. Error a adipisci cupiditate iure perferendis?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla recusandae minus, excepturi quaerat vitae aliquam praesentium odit adipisci ad similique laboriosam dolorem dicta corporis, numquam illum assumenda totam dolor beatae?
                                </p>
                                <br />
                                <h3>Bidders</h3>
                                <table id="report">
                    <thead >
                        <th>No</th>
                        <th>Name</th>
                        <th>Offer</th>
                        <th>Date</th>
                       
                    </thead>
                    <tr>
                        <td>1</td>
                        <td>Yohannes Dejene</td>
                        <td>5000</td>
                        <td>2/12/2020 </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Liul Girma</td>
                        <td>6000</td>
                        <td>2/12/2020 </td>

                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Kalkidan Tibebu</td>
                        <td>7000</td>
                        <td>3/12/2020 </td>

                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Mariamawit Tsegaye</td>
                        <td>8000 </td>
                        <td>4/07/2022 </td>

                    </tr>
                                </table>
                                <br />  <br />
                                <h4>Final Bid Report </h4> 
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta, quisquam. Omnis suscipit, maiores, sapiente odio libero nostrum ex corrupti nemo nesciunt repudiandae at mollitia dolore, quaerat excepturi! Illum, vero laudantium.</p>
                                <br />  <br /> <br />  <br /> <br />  <br />
                                  
                                 
                                </Box>
                        </Stack>

                </Box>
            </Box>
           
        </div>
    )

}
export default EditAuction;
