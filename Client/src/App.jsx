import { useState } from "react";
import "./App.css";

import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "./Pages/Public/Home/Home";
import ContactUs from "./Pages/Public/ContactUs//ContactUs";
import About from "./Pages/Public/About/About";

import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

import Auctions from "./Pages/Auctions/Auctions";
import Clasify from "./Pages/Auctions/Clasify";

import Loading from "./Pages/Loading/Loading";
import NotFound from "./Pages/NotFound/NotFound";
////buyer

import BuyerLogout from "./Pages/Buyer/BuyerLogout";
import BuyerEditProfile from "./Pages/Buyer/BuyerEditProfile";
import BuyerProfile from "./Pages/Buyer/BuyerProfile";
import SingleAuction from "./Pages/Buyer/SingleAuction";
import Payment from "./Pages/Buyer/Payment";
import PlaceBid from "./Pages/Buyer/PlaceBid";
import BuyerAuctions from "./Pages/Buyer/BuyerAuctions";

import CreateAuction from "./Pages/CreateAuction/CreateAuction";
import UpdateAuction from "./Pages/UpdateAuction/UpdateAuction";
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile";
import DeleteAuction from "./Pages/DeleteAuction/DeleteAuction";
import DeleteUser from "./Pages/DeleteUser/DeleteUser";

/*   -  ADMIN ROUTE IMPORTS    */
import AdminAuctions from "./Pages/adminpages/auctions";
import Reports from "./Pages/adminpages/reports";
import ManageAuction from "./Pages/adminpages/manageAuction";
import ManageSeller from "./Pages/adminpages/manageSeller";
import Adprofile from "./Pages/adminpages/profile";
import MoreDetail from "./Pages/adminpages/moreDetail";
/*   -  SELLER ROUTE IMPORTS    */
import SelHome from "./Pages/sellerpages/selhome";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* ####   common routes */}
          <Route path="/" element={<Auctions />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/auctions/:id" element={<Clasify />} />

          {/* ### buyer routes */}

          <Route path="/singleauction/:id" element={<SingleAuction />} />
          <Route path="/profile" element={<BuyerProfile />} />
          <Route path="/editprofile" element={<BuyerEditProfile />} />

          <Route path="/payment" element={<Payment />} />
          <Route path="/buyerauctions" element={<BuyerAuctions />} />
          <Route path="/placebid" element={<PlaceBid />} />
          <Route path="/singleauction:id" element={<SingleAuction />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route path="/logout" element={<BuyerLogout />} />

          {/* ### seller routes */}
          <Route path="/selhome" element={<SelHome />} />
          <Route path="/createAuction" element={<CreateAuction />} />
          <Route path="/updateAuction" element={<UpdateAuction />} />

          {/* ### admin routes */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/manageauction" element={<ManageAuction />} />
          <Route path="/manageseller" element={<ManageSeller />} />
          <Route path="/moreon/:id" element={<MoreDetail />} />
          <Route path="/auctioncontrol" element={<AdminAuctions />} />
          <Route path="/adprofile" element={<Adprofile />} />
          <Route path="/deleteuser" element={<DeleteUser />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
