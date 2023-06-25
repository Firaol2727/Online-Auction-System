import { useState } from "react";
import AuctionCard from "../../Components/AuctionCard/AuctionCard";
import NavBuyer from "../../Layouts/NavBuyer";
import Footer from "../../Layouts/Footer";
import "./Auctions.css";
import Divider from "@mui/material/Divider";
export default function Auctions() {
  return (
    <div>
      <NavBuyer />

      <AuctionCard />
      <div sx={{ mt: "100px" }}>
        <Divider />
        <Footer />
      </div>
    </div>
  );
}
