import { useState } from "react";
import SignupFormBuyer from "./SignupFormBuyer";
import SignupFormSeller from "./SignupFormSeller";

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
    <Box sx={{ textAlign: "Center" }}>
      <Box>
        <FormControlLabel
          value="seller"
          control={
            <Radio
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 23,
                  color: "blue",
                },
              }}
              checked={personType === "seller"}
              onChange={handlePersonType}
            />
          }
          label={
            <Typography sx={{ color: "black" }}>Seller account</Typography>
          }
        />
        <FormControlLabel
          value="buyer"
          control={
            <Radio
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 23,
                  color: "blue",
                },
              }}
              checked={personType === "buyer"}
              onChange={handlePersonType}
            />
          }
          label={<Typography sx={{ color: "black" }}>Buyer account</Typography>}
        />
      </Box>
      <Box>
        {personType === "seller" && <SignupFormSeller />}
        {personType === "buyer" && <SignupFormBuyer />}
      </Box>
    </Box>
  );
}
export default SignupForm;
