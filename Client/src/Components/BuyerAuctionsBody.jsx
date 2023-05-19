import { useEffect, useState } from "react";

import {
  Typography,
  Box,
  TextField,
  Divider,
  Button,
  IconButton,
  Link,
} from "@mui/material";
import axios from "axios";

function BuyerAuctionsBody() {
  const [state, setState] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/mine")
      .then((response) => {
        setState(response.data);
        // console.log("back end data", response.data);
      })
      .catch((error) => {
        console.log("errors while connecting ", error);
      });
  }, []);
  return (
    <Box sx={{ marginTop: "100px" }}>
      <Box>{state}</Box>
    </Box>
  );
}
export default BuyerAuctionsBody;
