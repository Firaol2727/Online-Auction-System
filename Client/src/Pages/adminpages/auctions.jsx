import NavbarAdmin from "./adminNavbar";
import {useEffect,useState} from 'react';
import Sidebar from "./sideBar";
import Pagination from '@mui/material/Pagination';
import "./css/notifications.css"
import "./css/auction.css"
import { LinearProgress, Stack,} from '@mui/material';
import Box from '@mui/material/Box';
import axios from "axios";
import {  useNavigate } from "react-router-dom";
const AdminAuctions=()=>{
    const baseapi=axios.create({baseURL:"http://localhost:5000/special"})
    const nav=useNavigate();
    const [auctions,setauctions]=useState([]);
    const [loading,setloading]=useState(false);
    const [page,setPage]=useState(1);
    const [nopage,setnopage]=useState(1);
    let no=0;
    const [hasauction,sethasauction]=useState(false);
    const handleChange = (event, value) => {
        setPage(value);
    };
    useEffect(()=>{
        setloading(true);
        console.log("Running the useeffect of admin page ")
        baseapi.get(`/closedbid/?page=${page}`,{withCredentials:true})
        .then(res=>{
            setloading(false);
            console.log("response",res)
            if (res.status==200) {
                let response=res.data.data;
                if(response!=null){
                    setauctions(response);
                    // sethasauction(true)
                    setnopage(res.data.count)
                }
            }
        }).catch(err=>{
            setloading(false);
            if(err.response.status==403){
                nav("/adlogin")
            }
        })
    },[page])
    
    return (
        <div>
        <NavbarAdmin sx={{position:"absolute"}}/>
        <Stack direction="row" sx={{position:"relative",marginTop:"30px"}} spacing={0.5}>
            <Sidebar/>
            {
                loading &&  <center><LinearProgress /></center>
            }
            <Box flex={6} >
            <Box  sx={{
                position:"relative",
                marginTop:"50px",
            }} >
                    <table id="customers">
                    <tr>
                        <th>No</th>
                        <th>AuctionId</th>
                        <th>AuctionName</th>
                        <th>Start date </th>
                        <th>End date</th>
                        <th>Winning bid</th>
                        <th>Winning bidder </th>
                        <th> Wphone</th>
                        <th>Seller</th>
                        <th>Sphone </th>
                        </tr>
                        {
                            hasauction && auctions.map(auction=>(
                                <tr key={auction.id}>
                                    <td>{no}</td>
                                    <td><a href={`/moreon/:${auction.auctionId}`}>{auction.auctionId}</a></td>
                                    <td>{auction.auctionName}</td>
                                    <td>{auction.startdate} </td>
                                    <td>{auction.enddate}</td>
                                    <td>{auction.winningbid}</td>
                                    <td>{auction.winner}</td>
                                    <td>{auction.wphone}</td>
                                    <td>{auction.seller}</td>
                                    <td>{auction.sphone} </td>
                                    {no=no+1}
                                </tr>
                            ))
                        } 
                </table>

            </Box>
            <Box><center><b>No Auctions yet</b></center></Box>
            <br /><br />

            <Pagination  count={nopage} page={page}  variant="outlined" color="primary" onChange={handleChange} style={{width:"40%"}}/>
                </Box>
        </Stack>
        </div>
    );
}

export default AdminAuctions;