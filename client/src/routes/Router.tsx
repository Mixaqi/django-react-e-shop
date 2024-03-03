import React from "react";
import Home from "../pages/Home";
import About from "../pages/About";
import Contacts from "../pages/Contacts";
import Cases from "../pages/Cases";
import Cooling from "../pages/Cooling";
import CPU from "../pages/CPU";
import GPU from "../pages/GPU";
import HDD from "../pages/HDD";
import Motherboard from "../pages/Motherboard";
import PSU from "../pages/PSU";
import RAM from "../pages/RAM";
import SSD from "../pages/SSD";
import AuthModal from "../components/Modals/AuthModal";

import { Routes, Route, Navigate } from "react-router-dom";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/ssd" element={<SSD />} />
      <Route path="/hdd" element={<HDD />} />
      <Route path="/gpu" element={<GPU />} />
      <Route path="/cpu" element={<CPU />} />
      <Route path="/psu" element={<PSU />} />
      <Route path="/ram" element={<RAM />} />
      <Route path="/motherboard" element={<Motherboard />} />
      <Route path="/cooling" element={<Cooling />} />
      <Route path="/cases" element={<Cases />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
