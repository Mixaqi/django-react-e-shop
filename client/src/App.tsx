import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Categories from "./components/Categories/Categories";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Categories />
        <Router />
        <Register />
        <Login />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
