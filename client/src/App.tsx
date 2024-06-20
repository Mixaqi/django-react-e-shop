import 'App.css';
import AuthModal from 'components/Modals/AuthModal/AuthModal';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import Categories from './components/Categories/Categories';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { initializeAuth } from './store/slices/authSlice';
import { RootState } from './store/store';

const App: React.FC = () => {
    const { isOpen } = useAppSelector((state: RootState) => state.modal);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    return (
        <>
            {isOpen && <AuthModal />}
            <Header />
            <main>
                <Categories />
                <div id="detail">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default App;
