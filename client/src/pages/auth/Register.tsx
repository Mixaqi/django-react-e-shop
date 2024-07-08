import { EMAIL_REGEX, PASSWORD_REGEX } from 'constants/regexs';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { passwordMatchValidator } from 'utils/passwordMatchValidator';
import { useRegisterUserMutation } from 'app/api/authApi';
import { setUser } from '../../store/slices/authSlice';
import { closeModal } from '../../store/slices/modalSlice';
import { AppDispatch } from '../../store/store';
import { RegistrationFormData } from './register.interface';

const Register: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [registerUser, { isLoading, isError }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RegistrationFormData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    try {
      const response = await registerUser(data).unwrap();
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
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
        <div className='mb-3'>
          <input
            {...register('username', {
              required: 'Username is required field!',
            })}
            className='form-control'
            placeholder='Username'
          />
          {errors?.username && <div className='text-danger'>{errors.username.message}</div>}
        </div>

        <div className='mb-3'>
          <input
            {...register('email', {
              required: 'Email is required field!',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Please enter a valid email',
              },
            })}
            className='form-control'
            placeholder='Email'
          />
          {errors?.email && <div className='text-danger'>{errors.email.message}</div>}
        </div>

        <div className='row g-2 mb-2'>
          <div className='col'>
            <input
              {...register('password', {
                required: 'Password is required field!',
                pattern: {
                  value: PASSWORD_REGEX,
                  message: 'Please enter a valid password',
                },
              })}
              className='form-control'
              type='password'
              placeholder='Password'
            />
            {errors?.password && <div className='text-danger'>{errors.password.message}</div>}
          </div>
          <div className='col'>
            <input
              {...register('confirmedPassword', {
                required: 'Confirmed password is required field!',
                validate: passwordMatchValidator(watch),
              })}
              className='form-control'
              type='password'
              placeholder='Confirmed Password'
            />
            {errors?.confirmedPassword && <div className='text-danger'>{errors.confirmedPassword.message}</div>}
          </div>
        </div>
        {isError && (
          <div className='alert alert-danger' role='alert'>
            This email is already taken
          </div>
        )}

        <div>
          <button type='submit' className='btn btn-primary' disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
