import { useState } from "react";
import SearchCard from "../../Components/AuctionCard/SearchCard";

import NavBuyer from "../../Layouts/NavBuyer";
import Footer from "../../Layouts/Footer";

export default function Clasify() {
  const [loggedin, setLogedin] = useState(0);
  return (
    <div>
      <NavBuyer />
      <SearchCard />
      <Footer />
    </div>
  );
}
