import { useState } from "react";
import AuctionCard from "../../Components/AuctionCard/AuctionCard";
import NavBuyer from "../../Layouts/NavBar/NavBuyer";
import Footer from "../../Layouts/Footer/Footer";
import "./Auctions.css";

export default function Auctions() {
  const [loggedin, setLogedin] = useState(0);
  return (
    <div>
      {/* {loggedin && <NavBar />} */}
      <NavBuyer />

      <AuctionCard />
      <Footer />
    </div>
  );
}
