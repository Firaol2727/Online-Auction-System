import './selnav';
import './selSidebar'
import SellerNavbar from './selnav';
import SelSidebar from './selSidebar';
import { useRef,useEffect,useState, useDebugValue } from 'react';
import { Box ,List,Stack} from '@mui/material';
import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const getmarings=()=>{
    let materialwidth=window.innerWidth;
    if (materialwidth>800){
        return "20%"
    } else {
        return "0%"
    }
}
const selHome=()=>{
    const baseapi=axios.create(
    { baseURL:"http://localhost:5000/sel"
      });
    const [my_auc,setMy_auc]=useState([]);
    const [loading,setloading]=useState(false);

    useEffect(()=>{
        setloading(false);
        baseapi.get("/myauction",{withCredentials:true}).then(response=>{
            console.log("The data fetched is ",response);
            if(response.data){
                let datas=response.data;
                setMy_auc(datas)
                setloading(false)
            }
        }).catch(
            err=>{
                setloading(false)
                console.log("The error found is",err);
            }
        )
    },[])
    return (
        <div>
            <SellerNavbar/>
                <Box sx={{
                    position:"absolute",
                    marginTop:"80px",
                    left:{
                        sm:"20%",
                        xs:"0%"
                    },
                    right:{
                        sm:"20%",
                        xs:"0%"
                    }
                }} >
                    <div>
                        
                    <h2>Overview</h2>
                    {
                      !loading &&  my_auc.map(auction=>(
                        <Link to={`http://localhost:5173/sel/detail/${auction.id}`}>
                            <div style={{height:"200px", backgroundColor:"white",marginBottom:"5px" }}>
                            <div className="picture" style={{position:"absolute",width:"180px", height:"180px", backgroundColor:"pink"
                            }}>
                                <img src={`http://localhost:5000/images/${auction.see}`} alt="image" style={{width:"180px", height:"180px"}} />
                            </div>
                            <div style={{position:"absolute",padding:"1px", marginLeft:"183px",backgroundColor:"white" }}> 
                                <Stack direction="row" sx={{height:"68px"}} >
                                    <p style={{color:"Graytext"}}> <b>Name</b></p>
                                    <p style={{marginLeft:"10px",marginRight:"1px",overflow:"hidden",overflowClipBox:"padding-box",overflowWrap:"anywhere", textOverflow:"revert-layer"}}>{auction.name} </p>
                                </Stack>
                                <Stack direction="row" sx={{height:"40px"}}>
                                    <p style={{color:"Graytext"}}> <b>Status</b></p>
                                    <p style={{marginLeft:"10px",color:"green"}}><b>Active </b> </p>
                                </Stack>
                                <Stack direction="row"sx={{height:"40px"}} >
                                    <p style={{color:"Graytext"}}> <b>Starting Date</b></p>
                                    <p style={{marginLeft:"10px",color:"blue"}}><b>{auction.enddate}</b> </p>
                                </Stack>
                                <Stack direction="row" sx={{height:"40px"}}>
                                    <p style={{color:"Graytext"}}> <b>Closing date</b></p>
                                    <p style={{marginLeft:"10px",color:"red"}}><b>{auction.startdate} </b> </p>
                                </Stack>
                            </div>
                    </div>
                    </Link>
                        ))
                    }
                    
                    
                    </div>
                </Box>
                
        </div>
    );
}
export default selHome;