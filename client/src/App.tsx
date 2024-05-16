import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Categories from './components/Categories/Categories';
import Router from './routes/Router';
import AuthModal from './components/Modals/AuthModal';
import { BrowserRouter } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { RootState } from './store/store';

const App: React.FC = () => {
  const { isOpen } = useAppSelector((state: RootState) => state.modal);

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
