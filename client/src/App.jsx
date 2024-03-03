import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Categories from "./components/Categories/Categories";
import Router from "./routes/Router";
import AuthModal from "./components/Modals/AuthModal";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const { isOpen } = useSelector((store) => store.modal);

  return (
      <BrowserRouter>
        {isOpen && <AuthModal />}
        <Header />
        <Categories />
        <Router />
        <Footer />
      </BrowserRouter>
  );
};

export default App;
