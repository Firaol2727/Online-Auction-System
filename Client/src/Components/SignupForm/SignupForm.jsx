import { useState } from "react";
import SignupFormBuyer from "./SignupFormBuyer";
import SignupFormSeller from "./SignupFormSeller";
import "./personType.css";
import {
  Typography,
  Box,
  TextField,
  Divider,
  Button,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
} from "@mui/material";
function SignupForm() {
  const [personType, setPersonType] = useState("seller");

  function handlePersonType(event) {
    setPersonType(event.target.value);
  }
  return (
    <Box sx={{textAlign:"center",margin:"40px"}}>
      <Box >
        <FormControlLabel
          value="seller"
          control={
            <Radio
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 23,
                  color: "black",
                },
              }}
              checked={personType === "seller"}
              onChange={handlePersonType}
            />
          }
          label={<Typography sx={{ color: "blue" }}>Seller account</Typography>}
        />
        <FormControlLabel
          value="buyer"
          control={
            <Radio
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 23,
                  color: "black",
                },
              }}
              checked={personType === "buyer"}
              onChange={handlePersonType}
            />
          }
          label={<Typography sx={{ color: "blue" }}>Buyer account</Typography>}
        />
      </Box>
      {personType === "seller" && <SignupFormSeller />}
      {personType === "buyer" && <SignupFormBuyer />}
    </Box>
  );
}
export default SignupForm;
