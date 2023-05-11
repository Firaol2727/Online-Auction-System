import { useState, useEffect, useRef } from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { Button, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";

import ReportIcon from "@mui/icons-material/Report";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";


const options = [
  "Violence",
  "Pornography",
  "Child abuse",
  "Copyright",
  "Illegal drug",
];

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const radioGroupRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "40%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle> Report message</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

function ProductsCard(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Dione");

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };
  console.log("my value", value);
  return (
    <Grid container className="grid" spacing={2}>
      {props.data.products.map((auction) => {
        {
          console.log("here", auction);
        }
        return (
          <Grid className="gridItem" item xs={6} sm={4} md={3} lg={3}>
            <Paper
              sx={{
                "&:hover": {
                  opacity: [2, 2, 2],
                  scale:"1.05"
                },
              }}
              elevation={2}
              className="paper"
            >
              <Box>
                <List
                  sx={{ margin: "0px", padding: "0px" }}
                  component="div"
                  role="group"
                >
                  <Button
                    sx={{
                      margin: "0px",
                      padding: "0px",
                      float: "right",
                      color: "#CC0505",
                    }}
                    onClick={handleClickListItem}
                  >
                    <ReportIcon />
                  </Button>
                  <ConfirmationDialogRaw
                    id="ringtone-menu"
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    value={value}
                  />
                  {console.log("my value 2", value)}
                </List>
              </Box>
              <Link href={`/singleauction/${auction.id}`}>
                <img src={auction.images} className="productImg" />
              </Link>
              <Divider className="divider" />
              <Box sx={{ marginLeft: "6px" }}>
                <Link
                  id="productlink"
                  underline="hover"
                  href={`/singleauction/${auction.id}`}
                >
                  <Typography
                    sx={{
                      color: "#595554",
                      textDecoration: "none",
                      fontSize: {
                        xs: "14px",
                        sm: "16px",
                        md: "17px",
                        lg: "18px",
                      },
                    }}
                    variant="subtitle1"
                    component="h6"
                  >
                    {auction.name}
                   
                  </Typography>

                  <Typography
                    sx={{
                      color: "black",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: {
                        xs: "14px",
                        sm: "16px",
                        md: "17px",
                        lg: "17px",
                      },
                      margin: "0px",
                    }}
                    variant="subtitle1"
                    component="h6"
                  >
                    $5
                  </Typography>
                </Link>
                <Box display="flex" gap={0}>
                  <PlaceIcon size="small" />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: {
                        xs: "14px",
                        sm: "16px",
                        md: "17px",
                        lg: "18px",
                      },
                      color: "#595554",
                    }}
                  >
                    {auction.location}
                  </Typography>
                </Box>
              </Box>
            
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
export default ProductsCard;
