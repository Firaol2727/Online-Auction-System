import Sidebar from "./sideBar";
import NavbarAdmin from "./adminNavbar";
import { Stack, Box, Button, Link} from '@mui/material';
import './css/report.css'
const Reports=()=>{
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
                <th>Action</th>
                {/* <th>Sphone</th> */}
            </thead>
            <tr>
                <td>1</td>
                <td><Link href="#" underline="none">4DFG51GH1DFFG</Link></td>
                <td>Improper product</td>
                <td>4/07/2022 </td>
                <td>10/07/2022</td>
                <td>25,000</td>
                <td><Button color="error" variant="contained">Delete</Button></td>
            </tr>
        </table>
        </Box></Box>
        </Stack>
        
    </div>
    )
}
export default Reports;