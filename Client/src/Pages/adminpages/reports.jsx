import Sidebar from "./sideBar";
import NavbarAdmin from "./adminNavbar";
import { Stack, Box, Button, Link} from '@mui/material';
import { useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import {Pagination} from "@mui/material";
import axios from "axios";
import './css/report.css'
const baseapi=axios.create({withCredentials:true,baseURL:"http://localhost:5000/special"})
const Reports=()=>{
    const [reports,setreports]=useState([]);
    const [loading,setloading]=useState(false);
    const [nopage,setnopage]=useState(1);
    const [page,setpage]=useState(1);
    const nav=useNavigate();
    const [hasreport,sethasreport]=useState(false);
    const handleChange = (event, value) => {
        setpage(value);
    };
    useEffect(()=>{
        setloading(true);
        baseapi.get('/reports',{withCredentials:true})
        .then(response=>{
            setloading(false);
            if(response.status==200){
                let res=[];
                res=response.data.data;
                console.log("The response is",res);
                console.log("The number of response is",res.length)
                if(res.length>0){
                    sethasreport(true)
                    setreports(res);
                }
            }
            else if(response.status==403){
                nav("/adlogin")
            }
            console.log("The has report has is ",hasreport)
        })
        .catch(err=>{
            console.log("The error",err);
            if(err.response.status==403){
                nav("/adlogin")
            }
        })
        
    },[])
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
                    <table id="report">
                        <thead >
                            <th>No</th>
                            <th>Report Id</th>
                            <th>Auction Id</th>
                            <th>Date</th>
                            <th>Report Type</th>
                            <th>Auction Status</th>
                            <th>Auction Name</th>
                            
                        </thead>
                        {
                            hasreport && reports.map(report=>(
                                <tr key={report.id}>
                                    <td>1</td>
                                    <td>{report.id}</td>
                                    <td><Link href={`/moreon/:${report.Auction.id}`} underline="none">4DFG51GH1DFFG</Link></td>
                                    <td>{report.createdAt}</td>
                                    <td>{report.type} </td>
                                    <td>{report.Auction.status}</td>
                                    <td>{report.Auction.name}</td>
                            </tr>
                            ))
                           
                        }
                            
                    </table>
        </Box>
           { !hasreport && <center><b> No Reports  yet</b></center>}
            <Pagination count={nopage} page={page}  onChange={handleChange}/>
            </Box>
        </Stack>
        
    </div>
    )
}
export default Reports;