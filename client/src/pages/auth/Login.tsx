import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from 'app/api/authApi';
import { setUser } from '../../store/slices/authSlice';
import { closeModal } from '../../store/slices/modalSlice';
import { AppDispatch } from '../../store/store';
import { LoginFormData } from './login.interface';
import { NavLink } from 'react-router-dom';
import { EMAIL_REGEX } from 'constants/regexs';

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loginUser, { isLoading, isError }] = useLoginUserMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      dispatch(
        setUser({
          user: response.user,
          access: response.access,
          refresh: response.refresh,
        }),
      );
      dispatch(closeModal());
      reset();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const togglePasswordVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleForgotPasswordClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    dispatch(closeModal());
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
        <div className='mb-3 d-flex align-items-center'>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Invalid email address',
              },
            })}
            type='email'
            placeholder='Email'
            className='form-control'
          />
          {errors.email && <div className='text-danger'>{errors.email.message}</div>}
        </div>
        <div className='mb-3 d-flex align-items-center'>
          <input
            {...register('password', {
              required: 'Password is required',
            })}
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            className='form-control'
          />
          {errors.password && <div className='text-danger'>{errors.password.message}</div>}
          <button type='button' onClick={togglePasswordVisibility} className='password-toggle-button ms-2'>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {isError && (
          <div className='alert alert-danger' role='alert'>
            Сheck input data
          </div>
        )}
        <div className='d-flex flex-column align-items-start'>
          <NavLink to='/reset_password' className='mb-3' onClick={handleForgotPasswordClick}>
            Forgot password?
          </NavLink>
          <button type='submit' className='btn btn-primary' disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
