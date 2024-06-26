import { useVerifyEmailMutation } from 'app/api/authApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'ui/loaders/Loader';

const VerifyEmail: React.FC = () => {
  const { userId, token } = useParams<{ userId: string; token: string }>();
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (userId && token) {
      verifyEmail({ userId: Number(userId), token })
        .unwrap()
        .then(() => setMessage('Email verified successfully!'))
        .catch((err) => {
          if (err.data && err.data.error) {
            setMessage(err.data.error);
          } else {
            setMessage('An unexpected error occurred.');
          }
        });
    }
  }, [userId, token, verifyEmail]);

  if (isLoading) {
    <Loader />;
  }

  if (message) {
    return <div>{message}</div>;
  }

  return <div>VerifyEmail</div>;
};

export default VerifyEmail;
