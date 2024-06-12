import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Categories from './components/Categories/Categories';
import Router from './routes/Router';
import AuthModal from './components/Modals/AuthModal';
import { BrowserRouter } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { RootState } from './store/store';
import { useAppDispatch } from './store/hooks';
import { useEffect } from 'react';
import { initializeAuth } from './store/slices/authSlice';

const App: React.FC = () => {
    const { isOpen } = useAppSelector((state: RootState) => state.modal);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

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
