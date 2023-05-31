import NavBuyer from "../../Layouts/NavBar/NavBuyer";
import Footer from "../../Layouts/Footer/Footer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import BuyerEditProfileBody from "../../Components/BuyerEditProfileBody";
function BuyerEditProfile() {
 
  let { id } = useParams();
 
  return (
    <>
      <NavBuyer />
      <BuyerEditProfileBody />
      <Footer />
    </>
  );
}
export default BuyerEditProfile;
