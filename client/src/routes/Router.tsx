import React from "react";
import Home from "../pages/Home";
import About from "../pages/About";
import Contacts from "../pages/Contacts";
import Cases from "../pages/hardware/Cases";
import Cooling from "../pages/hardware/Cooling";
import CPU from "../pages/hardware/CPU";
import GPU from "../pages/hardware/GPU";
import HDD from "../pages/hardware/HDD";
import Motherboard from "../pages/hardware/Motherboard";
import PSU from "../pages/hardware/PSU";
import RAM from "../pages/hardware/RAM";
import SSD from "../pages/hardware/SSD";
import Dashboard from "../pages/Dashboard";

import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound";


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
      <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
};

export default Router;
