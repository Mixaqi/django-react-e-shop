import React from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Contacts from '../pages/Contacts';

import { Routes, Route, Navigate } from 'react-router-dom';

const Router: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
  );
}

export default Router;
