import AuctionCard from "../../Components/AuctionCard/AuctionCard";
import NavBar from "../../Layouts/NavBar/NavBar";
import Footer from "../../Layouts/Footer/Footer";
import "./Auctions.css";

export default function Auctions() {
  return (
    <div>
      <NavBar />
      <AuctionCard />
      <Footer />
    </div>
  );
}
