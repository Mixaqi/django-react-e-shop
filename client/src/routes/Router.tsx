import React from 'react';
import About from '../pages/About';
import Contacts from '../pages/Contacts';
import Home from '../pages/Home';
import Unauthorized from '../pages/auth/Unauthorized';
import CPU from '../pages/hardware/CPU';
import Cases from '../pages/hardware/Cases';
import Cooling from '../pages/hardware/Cooling';
import GPU from '../pages/hardware/GPU';
import HDD from '../pages/hardware/HDD';
import Motherboard from '../pages/hardware/Motherboard';
import PSU from '../pages/hardware/PSU';
import RAM from '../pages/hardware/RAM';
import SSD from '../pages/hardware/SSD';

import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/dashoard/Dashboard';
import PrivateRoute from './PrivateRoute';

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
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route
                // path="/dashboard"
                path="/dashboard/:id"
                element={<PrivateRoute component={Dashboard} />}
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
