import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import LogIn from './pages/Login/Login';
import Vendor from './pages/Vendor/Vendor';
import Upload from './pages/Vendor/VendorComponents/Upload/Upload';
import Inventory from './pages/Vendor/VendorComponents/Inventory/Inventory';
import ScrapeNews from './pages/ScrapeNews/ScrapeNews';
import Orders from './pages/Vendor/VendorComponents/Orders/Orders';
import { ShowProfileProvider } from './context/ShowProfileContext';
import Farmer from './pages/Farmer/Farmer';
import InfoHub from './pages/Farmer/FarmerComponents/InfoHub';
import PurchaseMaterial from './pages/Farmer/FarmerComponents/PurchaseMaterial';
import SellCrops from './pages/Farmer/FarmerComponents/SellCrops';
import ScrapeSchemes from './pages/ScapeSchemes/ScrapeSchemes';
import AI from './pages/AI/AI';
import DeviceSpecificUploader from './pages/DeviceSpecificUploader/DeviceSpecificUploader';
import WeatherAPI from './pages/WeatherAPI/WeatherAPI';
import Resource from './pages/Farmer/FarmerComponents/Resource';
import HomeBuyer from './pages/Buyer/BuyerComponents/HomeBuyer';
import Buyer from './pages/Buyer/Buyer';

function App() {
  return (
    <ShowProfileProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/vendor/" element={<Vendor />}>
            <Route path="upload" element={<Upload />} />
            <Route path="orders" element={<Orders />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="news" element={<ScrapeNews topi="15vh" />} />
          </Route>
          <Route path="/farmer/" element={<Farmer />}>
            <Route path="infohub/" element={<InfoHub />}>
              <Route path="schemes/" element={<ScrapeSchemes />} />
              <Route path="news/" element={<ScrapeNews maxw="75vw" />} />
              <Route path="weather/" element={<WeatherAPI />} />
            </Route>
            <Route path="purchasematerial" element={<PurchaseMaterial />} />
            <Route path="resource" element={<Resource />} />
            <Route path="AI" element={<AI />} />
            <Route path="image" element={<DeviceSpecificUploader />} />
            <Route path="sellcrops" element={<SellCrops />} />
          </Route>
          <Route path="/customer/" element={<Buyer />}> 
            {/* <Route path="/" element={<HomeBuyer/>} />  */}
            <Route path="news/" element={<ScrapeNews maxw="75vw" />} /> 
            <Route path="homebuyer/" element={<HomeBuyer/>} /> 

          </Route>
        </Routes>
      </Router>
    </ShowProfileProvider>
  );
}

export default App;
