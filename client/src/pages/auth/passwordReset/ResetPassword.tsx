import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useResetPasswordMutation } from 'app/api/authApi';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EMAIL_REGEX } from 'constants/regexs';
import { Outlet } from 'react-router-dom';

export interface PasswordResetFormData {
  email: string;
}

const ResetPassword: React.FC = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordResetFormData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<PasswordResetFormData> = async (data) => {
    try {
      const response = await resetPassword(data).unwrap();
      reset();
      if (response.message) {
        toast.success(response.message);
        navigate('/reset_password/confirm');
      } else if (response.error) {
        toast.error(response.error);
      }
    } catch (err: any) {
      const errorMessage = err?.data?.error || 'An error occurred';
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Outlet />
      <div className='container mt-4'>
        <ToastContainer />
        <h2 className='mb-4'>Reset Password</h2>
        <div className='row'>
          <div className='col-md-4'>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
              <div className='form-group mb-3'>
                <label htmlFor='email'>Email:</label>
                <input
                  id='email'
                  type='email'
                  className={`form-control w-75 ${errors.email ? 'is-invalid' : ''}`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: EMAIL_REGEX,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && <div className='invalid-feedback'>{errors.email.message}</div>}
              </div>
              <button type='submit' className='btn btn-primary' disabled={isLoading}>
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </div>
          <div className='col-md-8'>
            <p>
              Please enter your email address to receive a password reset code. If you have forgotten your password,
              don't worry! Just enter your email address associated with your account, and we will send you a password
              reset code. Follow the instructions in the email to reset your password. Make sure to check your spam or
              junk folder if you don't see the email in your inbox within a few minutes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
