import { useState } from "react";
import "./App.css";
// import Form from "./Components/SignupForm/SignupForm";
// import NavBar from "./Layouts/NavBar/NavBar";
// import Footer from "./Layouts/Footer/Footer";
// import LoginForm from "./Components/LoginForm/LoginForm";
//////public
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

import Notification from "./Pages/Buyer/BuyerNotification/BuyerNotification";

import BuyerAccount from "./Pages/Buyer/BuyerAccount/BuyerAccount";

import BuyerEditProfile from "./Pages/Buyer/BuyerEditProfile/BuyerEditProfile";
import BuyerProfile from "./Pages/Buyer/BuyerProfile/BuyerProfile";
import SingleAuction from "./Pages/Buyer/SingleAuction/SingleAuction";

import Payment from "./Pages/Buyer/Payment/Payment";

import PlaceBid from "./Pages/Buyer/PlaceBid/PlaceBid";

import CreateAuction from "./Pages/CreateAuction/CreateAuction";
import UpdateAuction from "./Pages/UpdateAuction/UpdateAuction";
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile";
import DeleteAuction from "./Pages/DeleteAuction/DeleteAuction";
import DeleteUser from "./Pages/DeleteUser/DeleteUser";

import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
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
<<<<<<< HEAD
          <Route path="/" element={<Home />} />

          {/* ####   common routes */}
          <Route path="/auctions" element={<Auctions />} /> 
=======
          <Route
            path="/manufactiring"
            data="manufacturing"
            element={<Clasify />}
          />

>>>>>>> main
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Auctions />} />
          <Route path="/auctions/:id" element={<Clasify />} />

          {/* <Route path="/singleauction" element={<SingleAuction />} />
          <Route path="/singleauction:id" element={<SingleAuction />} /> */}
          <Route path="/updateProfile" element={<UpdateProfile />} />

          {/* ### seller routes */}
          <Route path="/selhome" element={<SelHome />} />
          <Route path="/createAuction" element={<CreateAuction />} />
          <Route path="/updateAuction" element={<UpdateAuction />} />

          {/* ### buyer routes */}
      
          <Route path="/singleauction/:id" element={<SingleAuction />} />
          <Route path="/account" element={<BuyerAccount />} />
          <Route path="/profile" element={<BuyerProfile />} />
          <Route path="/notification" elment={<Notification />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placebid" element={<PlaceBid />} />
          {/* ### admin routes */}
<<<<<<< HEAD
          <Route path="/reports" element={<Reports />} />
          <Route path="/manageauction" element={<ManageAuction />} /> 
          <Route path="/manageseller" element={<ManageSeller />} />
          <Route path="/moreon/:id" element={<MoreDetail/>} />
          <Route path="/auctioncontrol" element={<AdminAuctions/>} />
          <Route path="/adprofile" element={<Adprofile/>}/>
          {/* <Route path="/deleteuser" element={<DeleteUser />} /> */}
=======
          <Route path="/deleteauction" element={<DeleteAuction />} />
          <Route path="/deleteuser" element={<DeleteUser />} />

>>>>>>> main
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
