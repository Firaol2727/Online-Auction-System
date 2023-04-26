import NavBuyer from "../../../Layouts/NavBuyer/NavBuyer";
import NavBar from "../../../Layouts/NavBar/NavBar";
import "./SingleAuction.css";
import {useParams} from "react-router-dom"
export default function SingleAuction() {
  const { id } = useParams();

  return (
    <div>
      <NavBar />
      <div style={{marginTop:"200px"}}>Single auction{id}</div>
    </div>
  );
}
