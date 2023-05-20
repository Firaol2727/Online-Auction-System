import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import SellerNavbar from "./selnav";
import { Box,Typography,IconButton,Button, Stack, TextField,Link, ListItemIcon} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import EmailIcon from '@mui/icons-material/Email';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState,useEffect } from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
const SelProfie=()=>{
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [value, setValue] = useState('understanding');
    const handleChange = (event) => {
      setValue(event.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [deposit,setDeposit]=useState('');
    const [city,setCity]=useState('');
    const [btnletter,setBtnletter]=useState("Edit");
    const [displaymode,setDisplaymode]=useState("normal"); // the display mode can be in normal , in edit or in passwordEdit form 
    let boxSize=displaymode=='normal'?"120%":"130%";
    return (
        <div>
            <SellerNavbar/>
            <Box sx={{
                    position:"absolute",
                    marginTop:"64px",
                    height:boxSize,
                    backgroundColor:"white",
                    left:{
                        sm:"20%",
                        xs:"0%"
                    },
                    right:{
                        sm:"20%",
                        xs:"0%"
                    }
                }} >
                    <div style={{backgroundColor:"gray",width:"100%"}}>
                    <Box 
                        sx={{position:"absolute",backgroundColor:"#CB7F7F",height:"180px",width:"100%"}}
                    >
                        <div style={{position:"absolute",left:"5%",top:"55%",padding:"5px",  width:"125px",height:"125px",backgroundColor:"white",borderRadius:"62.5px"}}> 
                        <div style={{height:"120px",backgroundColor:"#9F7979",borderRadius:"60px"}}>
                            <center><PersonIcon sx={{ width:"100px",height:"100px",color:"white"}}/></center> 
                            </div>
                         
                    </div>
                    </Box>
                    
                    </div>
                    <div style={{
                        position:"absolute",top:"248px"
                    }} >
                        <Typography variant="h5" sx={{marginLeft:"20px"}} > <b>Firaol Getachew</b> </Typography>
                    </div>
                    <div style={{
                        position:"absolute",top:"248px",left:"70%"
                    }} >
                        <Button variant='outlined' onClick={()=>{
                            displaymode=='normal'? setDisplaymode('edit'):setDisplaymode('normal')
                            btnletter=='Edit'?setBtnletter('Back'):setBtnletter('Edit')
                            }} > 
                            {displaymode=='normal'? <EditSharpIcon />:<ArrowBackIcon/> }
                            {btnletter}
                        </Button>
                    </div>
                    {displaymode=='normal'&& <Box sx={{
                        position:"absolute",top:"300px",padding:{sm:"50px",xs:"10px"},marginTop:"40px",
                    }} >
                        
                        <Stack direction={"row"}> 
                            <EmailIcon sx={{color:"#3E403E"}} />
                            <div style={{fontSize:"20px",color:"#3E403E" }}>Email</div> 
                        </Stack>
                        <Box sx={{marginLeft:{xs:"10px",sm:'65px'}}}><p style={{fontSize:"20px",color:"gray",marginTop:"2px"  }}> fraolgetachew2727@gmail.com</p></Box> 
                       
                        <Stack direction={"row"}> 
                            <PhoneIcon sx={{color:"#3E403E"}} />
                            <div style={{fontSize:"20px",color:"#3E403E"  }}>Phonenumber</div>
                        </Stack>
                        <Box sx={{marginLeft:{xs:"10px",sm:'65px'}}}><p style={{fontSize:"20px",color:"gray",marginTop:"2px"  }}>+251946951726</p></Box> 
                  
                        <Stack direction={"row"}> 
                            <EmailIcon sx={{color:"#3E403E"}} />
                            <div style={{fontSize:"20px",color:"#3E403E" }}>Deposit</div>
                        </Stack>
                        <Box sx={{marginLeft:{xs:"10px",sm:'65px'}}}><p style={{fontSize:"20px",color:"gray",marginTop:"2px"  }}>200 ETB</p></Box>
                     
                        <Stack direction={"row"}> 
                            <LocationCityIcon sx={{color:"#3E403E"}} />
                            <div style={{fontSize:"20px",color:"#3E403E" }}>City</div> 
                        </Stack>
                        <Box sx={{marginLeft:{xs:"10px",sm:'65px'}}}><p style={{fontSize:"20px",color:"gray",marginTop:"2px"  }}>Adama</p></Box>
                 
                        <Stack direction={"row"}> 
                            <LocationOnIcon sx={{color:"#3E403E"}}/>
                            <div style={{fontSize:"20px",color:"#3E403E" }}>Region</div>
                        </Stack>
                        <Box sx={{marginLeft:{xs:"10px",sm:'65px'}}}><p style={{fontSize:"20px",color:"gray",marginTop:"2px"  }}> Oromia,Ethiopia</p></Box>
                        <br />
                        <hr style={{width:"120%"}} />
                        <br />
                        <Stack direction={"row"}>
                            <SettingsIcon sx={{color:"gray"}}/>
                            <b style={{color:"gray",fontSize:"20px",marginLeft:"0px"}}>Account Settings</b> 
                        </Stack>
                        <br />
                        <Link href="/sel/changepassword"  underline="none" sx={{color:"inherit"}}>
                            <Stack direction={"row"} spacing={2}> 
                                <EditSharpIcon sx={{color:"#3E403E"}} />
                                <div style={{fontSize:"20px",color:"#3E403E" }}>Change password</div> 
                            </Stack>
                            </Link>

                            <Stack direction={"row"} spacing={2}  sx={{marginTop:"10px"}}  onClick={handleClickOpen}> 
                                <DeleteOutlineIcon sx={{color:"#3E403E"}} />
                                <div style={{fontSize:"20px",color:"#3E403E" }}>Delete Account ?</div> 
                            </Stack>
                        
                        {/* <Link to="/sel/changepassword" underline="none" color='inherit' >Change password ?</Link>  <br/>
                        <Link to="/sel/changepassword">Change Phone Number ?</Link>  <br/>
                        <Link to="/sel/deleteaccount">Delete Account ?</Link>
                        <Link to="/"></Link> */}
                    </Box>}
                    {displaymode=='edit'&&  <Box sx={{
                        position:"absolute",top:"300px",padding:{sm:"50px",xs:"10px"},marginTop:"20px"
                    }} >
                        <Stack direction={"row"}> 
                            <div style={{fontSize:"20px" }}>FirstName</div> 
                        </Stack>
                        <Box sx={{marginLeft:{xs:"10px",sm:'65px',marginTop:"10px" }}}><input style={{fontSize:"20px",height:"32px",width:"300px"}} placeholder='Firaol'/></Box>
                        <br />
                        <Stack direction={"row"}> 
                            <div style={{fontSize:"20px" }}>LastName</div> 
                        </Stack>
                        <Box sx={{marginLeft:{xs:"10px",sm:'65px',marginTop:"10px" }}}><input style={{fontSize:"20px",height:"32px",width:"300px"}} placeholder='Getachew'/></Box>
                        <br />
                        <Stack direction={"row"}> 
                            <EmailIcon />
                            <div style={{fontSize:"20px" }}>Email</div> 
                        </Stack>
                        <Box sx={{marginLeft:{xs:"10px",sm:'65px',marginTop:"10px" }}}><input style={{fontSize:"20px",height:"32px",width:"300px"}} placeholder='fraolgetachew2727@gmail.com'/></Box> 
                        
                        <br />
                        <Stack direction={"row"}> 
                            <LocationCityIcon />
                            <div style={{fontSize:"20px",}}>City</div> 
                        </Stack>
                        <Box sx={{marginLeft:{xs:"10px",sm:'65px',marginTop:"10px" }}}><input style={{fontSize:"20px",height:"32px",width:"300px"}} placeholder='Adama'/></Box>
                        <br />
                        <Stack direction={"row"}> 
                            <LocationOnIcon />
                            <div style={{fontSize:"20px",}}>Region</div> 
                        </Stack>
                        <Box sx={{marginLeft:{xs:"10px",sm:'65px'},marginTop:"10px"}}><input style={{fontSize:"20px",height:"32px",width:"300px"}} placeholder='Oromia'/></Box>
                        
                        <center><Button variant='contained' sx={{marginTop:"20px" }} >Submit</Button></center> 
                    </Box>
                    }
                </Box>
            
                <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete your account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            password - 
            <input type='password' id="passwordconfirm"/><br />
            Deleting your account will make you <br />
            <b>*</b>  Not  able to access your previous auctions <br />
            <b>*</b>Not able to  get  final auction reports <br />
            <b>Why do you want to delete your Account ?</b>
            <FormControl>
                {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender?</FormLabel> */}
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="understanding" control={<Radio />} label="I don't understand how to use the website" />
                        <FormControlLabel value="not_used" control={<Radio />} label="I don't need this account anymore" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} variant='outlined'>
            Cancel
          </Button>
          <Button onClick={handleClose} autoFocus variant='outlined' sx={{color:"red"}} >
            Delete
          </Button>
        </DialogActions>
                </Dialog>
         
        </div>
    )
}
export default SelProfie;