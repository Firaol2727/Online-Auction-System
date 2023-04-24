import './selnav';
import './selSidebar'
import SellerNavbar from './selnav';
import SelSidebar from './selSidebar';
import { useRef } from 'react';
import { Box ,List,Stack} from '@mui/material';
import { Component } from 'react';
const getmarings=()=>{
    let materialwidth=window.innerWidth;
    if (materialwidth>800){
        return "20%"
    } else {
        return "0%"
    }
}
const selHome=()=>{
    
    return (
        <div>
            <SellerNavbar/>
                <Box sx={{
                    position:"absolute",
                    marginTop:"80px",
                    left:getmarings,
                    right:getmarings
                }} >
                    <div>
                        
                    <h3>Overview</h3>
                    
                    <div style={{height:"200px", backgroundColor:"white",marginBottom:"5px"}}>
                            <div className="picture" style={{position:"absolute",width:"180px", height:"180px", backgroundColor:"pink"
                            }}>
                            </div>
                            <div style={{position:"absolute",padding:"1px", marginLeft:"183px",backgroundColor:"white" }}> 
                                <Stack direction="row" sx={{height:"68px"}} >
                                    <p style={{color:"Graytext"}}> <b>Name</b></p>
                                    <p style={{marginLeft:"10px",marginRight:"1px",overflow:"hidden",overflowClipBox:"padding-box",overflowWrap:"anywhere", textOverflow:"revert-layer"}}> Lorem ipsum dolor ., lml; klnsit amet consectetur adipisicing elit. Delectus sunt aut placeat, alias excepturi quis aspernatur voluptatum asperiores iste explicabo exercitationem ab facere eaque! Pariatur laborum soluta qui dolorum eius. </p>
                                </Stack>
                                <Stack direction="row" sx={{height:"40px"}}>
                                    <p style={{color:"Graytext"}}> <b>Status</b></p>
                                    <p style={{marginLeft:"10px",color:"green"}}><b>Active </b> </p>
                                </Stack>
                                <Stack direction="row"sx={{height:"40px"}} >
                                    <p style={{color:"Graytext"}}> <b>Start date</b></p>
                                    <p style={{marginLeft:"10px",color:"blue"}}><b>12/05/2021 </b> </p>
                                </Stack>
                                <Stack direction="row" sx={{height:"40px"}}>
                                    <p style={{color:"Graytext"}}> <b>End date</b></p>
                                    <p style={{marginLeft:"10px",color:"red"}}><b>12/05/2021 </b> </p>
                                </Stack>
                            </div>
                    </div>
                    <div style={{height:"200px", backgroundColor:"white",marginBottom:"5px"}}>
                            <div className="picture" style={{position:"absolute",width:"180px", height:"180px", backgroundColor:"pink"
                            }}>
                            </div>
                            <div style={{position:"absolute",padding:"1px", marginLeft:"183px",backgroundColor:"white" }}> 
                                <Stack direction="row" sx={{height:"68px"}} >
                                    <p style={{color:"Graytext"}}> <b>Name</b></p>
                                    <p style={{marginLeft:"10px",marginRight:"1px",overflow:"hidden",overflowClipBox:"padding-box",overflowWrap:"anywhere", textOverflow:"revert-layer"}}> Lorem ipsum dolor ., lml; klnsit amet consectetur adipisicing elit. Delectus sunt aut placeat, alias excepturi quis aspernatur voluptatum asperiores iste explicabo exercitationem ab facere eaque! Pariatur laborum soluta qui dolorum eius. </p>
                                </Stack>
                                <Stack direction="row" sx={{height:"40px"}}>
                                    <p style={{color:"Graytext"}}> <b>Status</b></p>
                                    <p style={{marginLeft:"10px",color:"green"}}><b>Active </b> </p>
                                </Stack>
                                <Stack direction="row"sx={{height:"40px"}} >
                                    <p style={{color:"Graytext"}}> <b>Start date</b></p>
                                    <p style={{marginLeft:"10px",color:"blue"}}><b>12/05/2021 </b> </p>
                                </Stack>
                                <Stack direction="row" sx={{height:"40px"}}>
                                    <p style={{color:"Graytext"}}> <b>End date</b></p>
                                    <p style={{marginLeft:"10px",color:"red"}}><b>12/05/2021 </b> </p>
                                </Stack>
                            </div>
                    </div>
                    <div style={{height:"200px", backgroundColor:"white",marginBottom:"5px"}}>
                            <div className="picture" style={{position:"absolute",width:"180px", height:"180px", backgroundColor:"pink"
                            }}>
                            </div>
                            <div style={{position:"absolute",padding:"1px", marginLeft:"183px",backgroundColor:"white" }}> 
                                <Stack direction="row" sx={{height:"68px"}} >
                                    <p style={{color:"Graytext"}}> <b>Name</b></p>
                                    <p style={{marginLeft:"10px",marginRight:"1px",overflow:"hidden",overflowClipBox:"padding-box",overflowWrap:"anywhere", textOverflow:"revert-layer"}}> Lorem ipsum dolor ., lml; klnsit amet consectetur adipisicing elit. Delectus sunt aut placeat, alias excepturi quis aspernatur voluptatum asperiores iste explicabo exercitationem ab facere eaque! Pariatur laborum soluta qui dolorum eius. </p>
                                </Stack>
                                <Stack direction="row" sx={{height:"40px"}}>
                                    <p style={{color:"Graytext"}}> <b>Status</b></p>
                                    <p style={{marginLeft:"10px",color:"green"}}><b>Active </b> </p>
                                </Stack>
                                <Stack direction="row"sx={{height:"40px"}} >
                                    <p style={{color:"Graytext"}}> <b>Start date</b></p>
                                    <p style={{marginLeft:"10px",color:"blue"}}><b>12/05/2021 </b> </p>
                                </Stack>
                                <Stack direction="row" sx={{height:"40px"}}>
                                    <p style={{color:"Graytext"}}> <b>End date</b></p>
                                    <p style={{marginLeft:"10px",color:"red"}}><b>12/05/2021 </b> </p>
                                </Stack>
                            </div>
                    </div>
                    <div style={{height:"200px", backgroundColor:"white",marginBottom:"5px"}}>
                            <div className="picture" style={{position:"absolute",width:"180px", height:"180px", backgroundColor:"pink"
                            }}>
                            </div>
                            <div style={{position:"absolute",padding:"1px", marginLeft:"183px",backgroundColor:"white" }}> 
                                <Stack direction="row" sx={{height:"68px"}} >
                                    <p style={{color:"Graytext"}}> <b>Name</b></p>
                                    <p style={{marginLeft:"10px",marginRight:"1px",overflow:"hidden",overflowClipBox:"padding-box",overflowWrap:"anywhere", textOverflow:"revert-layer"}}> Lorem ipsum dolor ., lml; klnsit amet consectetur adipisicing elit. Delectus sunt aut placeat, alias excepturi quis aspernatur voluptatum asperiores iste explicabo exercitationem ab facere eaque! Pariatur laborum soluta qui dolorum eius. </p>
                                </Stack>
                                <Stack direction="row" sx={{height:"40px"}}>
                                    <p style={{color:"Graytext"}}> <b>Status</b></p>
                                    <p style={{marginLeft:"10px",color:"green"}}><b>Active </b> </p>
                                </Stack>
                                <Stack direction="row"sx={{height:"40px"}} >
                                    <p style={{color:"Graytext"}}> <b>Start date</b></p>
                                    <p style={{marginLeft:"10px",color:"blue"}}><b>12/05/2021 </b> </p>
                                </Stack>
                                <Stack direction="row" sx={{height:"40px"}}>
                                    <p style={{color:"Graytext"}}> <b>End date</b></p>
                                    <p style={{marginLeft:"10px",color:"red"}}><b>12/05/2021 </b> </p>
                                </Stack>
                            </div>
                    </div>
                    </div>
                </Box>
        </div>
    );
}
export default selHome;