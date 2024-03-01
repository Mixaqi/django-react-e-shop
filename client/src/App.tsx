import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Categories from "./components/Categories/Categories";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Categories />
      <Router />
      <Register />
      <Login />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
