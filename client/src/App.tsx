import React, { useEffect, useState } from 'react';
import 'App.css';
import AuthModal from 'components/Modals/AuthModal/AuthModal';
import { Outlet } from 'react-router';
import Categories from './components/Categories/Categories';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { initializeAuth } from './store/slices/authSlice';
import { RootState } from './store/store';
import Notification from 'ui/Notification/Notification';

const App: React.FC = () => {
    const { isOpen } = useAppSelector((state: RootState) => state.modal);
    const isVerified = useAppSelector((state: RootState) => state.auth.user?.isVerified);
    const dispatch = useAppDispatch();
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    useEffect(() => {
        if (isVerified === false) {
            setShowNotification(true);
        }
    }, [isVerified]);

    return (
        <>
            {isOpen && <AuthModal />}
            <Header />
            <main>
                <Categories />
                {showNotification && (
                <Notification
                    message="Please verify your email address"
                    onClose={() => setShowNotification(false)}
                />
                )}
                <div id="detail">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default App;