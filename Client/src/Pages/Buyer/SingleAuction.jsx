import NavBuyer from "../../Layouts/NavBar/NavBuyer";
import Footer from "../../Layouts/Footer/Footer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import SingleAuctionBody from "../../Components/SingleAuctionBody";
function SingleAuction() {
  const [searchQuery, setSearchQuery] = useState("");
  let { id } = useParams();
  function handleSearch() {
    console.log("serahced", searchQuery);
  }
  return (
    <>
      <NavBuyer />
      <SingleAuctionBody />
      <Footer />
    </>
  );
}
export default SingleAuction;
