import { useState } from "react";
import ClasifyCard from "../../Components/AuctionCard/ClasifyCard";

import NavBuyer from "../../Layouts/NavBar/NavBuyer";
import Footer from "../../Layouts/Footer/Footer";

export default function Clasify() {
  const [loggedin, setLogedin] = useState(0);
  return (
    <div>
      <NavBuyer />
      {/* <NavBar /> */}
      <ClasifyCard />
      <Footer />
    </div>
  );
}
