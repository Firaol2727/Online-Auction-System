import NavbarAdmin from "./adminNavbar";
import {useEffect,useState} from 'react';
import Sidebar from "./sideBar";
import Pagination from '@mui/material/Pagination';
import "./css/notifications.css"
import "./css/auction.css"
import {Link,Icon, Stack, AppBar, CardHeader, ImageList} from '@mui/material';
import Box from '@mui/material/Box';
import axios from "axios";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useNavigate } from "react-router-dom";
const AdminAuctions=()=>{
    const baseapi=axios.create({baseURL:"http://localhost:5000/special"})
    const nav=useNavigate();
    useEffect(()=>{
        console.log("Running the useeffect of admin page ")
        baseapi.get("/closedbid",{withCredentials:true})
        .then(res=>{
            if (res.status==200) {
                console.log("response",res)
            }
        }).catch(err=>{
            if(err.response.status==403){
                nav("/adlogin")
            }
        })
    },[])
    
    return (
        <div>
        <NavbarAdmin sx={{position:"absolute"}}/>
        <Stack direction="row" sx={{position:"relative",marginTop:"30px"}} spacing={0.5}>
            <Sidebar/>
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
                            <th>Announced </th>
                            {/* <th>Sphone</th> */}
                            </tr>
    <tr>
        <td>1</td>
        <Link href="/moreon/:dfg54ghj5" underline="none" ><td>4DFG51GH1DFFG</td></Link>
        <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>
    <tr>
        <td>1</td>
        <td>4DFG51GH1DFFG</td>
        <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>
    <tr>
        <td>1</td>
        <td>4DFG51GH1DFFG</td>
        <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>

    <tr>
        <td>1</td>
        <td>4DFG51GH1DFFG</td>
        <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>
    <tr>
        <td>1</td>
        <td>4DFG51GH1DFFG</td>
        <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>
    <tr>
        <td>1</td>
        <td>4DFG51GH1DFFG</td>
        <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>
    <tr>
        <td>1</td>
        <td>4DFG51GH1DFFG</td>
        <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>
    <tr>
        <td>1</td>
        <td>4DFG51GH1DFFG</td>
        <td>Lorem ipsum dolor, sit amet consectet cvkb dfb  ldfb dfgkp;kdsf  dfgdsf hdsfddsg fdghdfs hgsdf  fdgmdsf dflh dfsur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>
    <tr>
        <td>1</td>
        <td>4DFG51GH1DFFG</td>
        <td style={{maxWidth:"300px"}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>
    <tr>
        <td>1</td>
        <td>4DFG51GH1DFFG</td>
        <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>
    <tr>
        <td>1</td>
        <td>4DFG51GH1DFFG</td>
        <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>
    <tr>
        <td>1</td>
        <td>4DFG51GH1DFFG</td>
        <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>
    <tr>
        <td>1</td>
        <td>4DFG51GH1DFFG</td>
        <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>
    <tr>
        <td>1</td>
        <td>4DFG51GH1DFFG</td>
        <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>

    <tr>
        <td>1</td>
        <td>4DFG51GH1DFFG</td>
        <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>
    <tr>
        <td>1</td> 
        <td>4DFG51GH1DFFG</td>
        <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>
    <tr>
        <td>1</td>
        <td>4DFG51GH1DFFG</td>
        <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
        <td>4/07/2022 </td>
        <td>10/07/2022</td>
        <td>25,000</td>
        <td>Firaol Getachew</td>
        <td>+251966003807</td>
        <td>Yoseph Tarekegn</td>
        <td>+251983734123 </td>
        <td style={{backgroundColor:"red"}}>Announced </td>
    </tr>
</table>
                </Box>
            </Box>
            
        </Stack>
        
        </div>
    );
}

export default AdminAuctions;