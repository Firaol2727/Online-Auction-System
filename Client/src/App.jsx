import { useState } from "react";
import "./App.css";

import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import ContactUs from "./Pages/Public/ContactUs";
import About from "./Pages/Public/About";

import Auctions from "./Pages/Auctions/Auctions";
import Clasify from "./Pages/Auctions/Clasify";

import Loading from "./Pages/Loading/Loading";
import NotFound from "./Pages/NotFound/NotFound";
// <<<<<<< Updated upstream
////buyer
import Login from "./Components/LoginForm";
import BuyerLogout from "./Pages/Buyer/BuyerLogout";
import BuyerEditProfile from "./Pages/Buyer/BuyerEditProfile";
import BuyerProfile from "./Pages/Buyer/BuyerProfile";
import AuctionDetail from "./Pages/Buyer/AuctionDetail";
import Payment from "./Pages/Buyer/Payment";
import PlaceBid from "./Pages/Buyer/PlaceBid";
import BuyerAuctions from "./Pages/Buyer/BuyerAuctions";

// import Notification from "./Pages/Notification/Notification";
// import Payment from "./Pages/Payment/Payment";
// import Profile from "./Pages/Profile/Profile";
// import SingleAuction from "./Pages/SingleAuction/SingleAuction";

// >>>>>>> Stashed changes

/*   -  ADMIN ROUTE IMPORTS    */
import AdminAuctions from "./Pages/adminpages/auctions";
import Reports from "./Pages/adminpages/reports";
import ManageAuction from "./Pages/adminpages/manageAuction";
import ManageSeller from "./Pages/adminpages/manageSeller";
import Adprofile from "./Pages/adminpages/profile";
import MoreDetail from "./Pages/adminpages/moreDetail";
import PayChapa from "./Pages/adminpages/paychapa";

/*   -  SELLER ROUTE IMPORTS    */
import SelHome from "./Pages/sellerpages/selhome";
import CreateAuction from "./Pages/sellerpages/createauctions";
import SelProfie from "./Pages/sellerpages/selprofile";
import SelChangePassword from "./Pages/sellerpages/selchangePassord";
import EditAuction from "./Pages/sellerpages/EditAuction";
import LoginTrial from "./Pages/sellerpages/loginTrial";
import SignUp from "./Pages/sellerpages/signUp";
import AdLogin from "./Pages/adminpages/adLogin";

import ForgotPassword from './Pages/sellerpages/forgotpassword';
// import FilesUploadComponent from "./Pages/sellerpages/createtry";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auctions />} />
          {/* ####   common routes */}
          <Route path="/auctions" element={<Auctions />} />
          <Route
            path="/manufactiring"
            data="manufacturing"
            element={<Clasify />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/auctions/:id" element={<Clasify />} />
          <Route path="/signup" element={<SignUp />} />
          {/* ### buyer routes */}
          <Route path="/detail/:id" element={<AuctionDetail />} />
          <Route path="/profile" element={<BuyerProfile />} />
          <Route path="/editprofile" element={<BuyerEditProfile />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/buyerauctions" element={<BuyerAuctions />} />
          <Route path="/placebid" element={<PlaceBid />} />

          <Route path="/logout" element={<BuyerLogout />} />
          {/* ### seller routes */}
          <Route path="/sel/login" element={<LoginTrial />} />
          <Route path="/sel/home" element={<SelHome />} />
          <Route path="/sel/newauction" element={<CreateAuction />} />
          {/* <Route path="/sel/updateAuction" element={<UpdateAuction />} /> */}
          <Route path="/sel/profile" element={<SelProfie />} />
          <Route path="/sel/changepassword" element={<SelChangePassword />} />
          <Route path="/sel/detail/:id" element={<EditAuction />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          {/* <Route path="/uploadtry" element={<FilesUploadComponent/>}/> */}
          {/* ### admin routes */}
          {/* <<<<<<< HEAD */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/manageauction" element={<ManageAuction />} />
          <Route path="/manageseller" element={<ManageSeller />} />
          <Route path="/moreon/:id" element={<MoreDetail />} />
          <Route path="/auctioncontrol" element={<AdminAuctions />} />
          <Route path="/adprofile" element={<Adprofile />} />
          <Route path="/paychapa" element={<PayChapa />} />
          <Route path="/adlogin" element={<AdLogin />} />

          {/* >>>>>>> main */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
