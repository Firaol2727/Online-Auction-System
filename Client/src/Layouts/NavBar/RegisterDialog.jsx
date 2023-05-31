import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
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
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          // sx={{
          //   position: 'absolute',
          //   right: 8,
          //   top: 8,
          //   // color: (theme) => theme.palette.grey[500],
          // }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function RegisterDialog(prop) {
  const [open, setOpen] = React.useState(false);
  const [personType, setPersonType] = useState("seller");

  function handlePersonType(event) {
    setPersonType(event.target.value);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          color: "black",
          border: "none",

          textTransform: "unset",
          "&:hover": {
            backgroundColor: "black",
            color: "white",
          },
        }}
      >
        <Typography sx={{ fontFamily: "Monospace", fontWieght: "900" }}>
          {" "}
          Sign Up
        </Typography>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {/* <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          sx={{display:"flex",height:"40px",textAlign:"center"}}
        >
         Create account
          <Box sx={{ margin: "40px" }}></Box>
        </BootstrapDialogTitle> */}
        <Box sx={{ height: "200px" }} onClose={handleClose}>
          <IconButton sx={{ float: "right" }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{
              alignItem: "center",
              // float: "left",
              textAlign: "Center",

              marginTop: "20px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Get Started
          </Typography>
          <Typography
            sx={{
              alignItem: "center",
              // float: "left",
              marginLeft: "20px",
              marginTop: "20px",
              fontSize: "20px",
              display:"flex"
            }}
          >
            Create an account to make bidding fast and easy!
          </Typography>
        </Box>

        <DialogContent dividers>{prop.data}</DialogContent>
      </BootstrapDialog>
    </div>
  );
}
