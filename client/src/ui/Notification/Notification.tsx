import React from 'react';
import { RootState } from 'store/store';
import { useAppSelector } from 'store/hooks';

interface NotificationProps {
    message: React.ReactNode;
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
    const userEmail = useAppSelector((state: RootState) => state.auth.user?.email);

    return (
        <div className="alert alert-warning alert-dismissible">
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            {userEmail ? (
                <>
                    <span style={{ fontWeight: 'bold' }}>{message}</span> on {userEmail} 
                </>
            ) : (
                message
            )}
        </div>
    );
};

export default Notification;
