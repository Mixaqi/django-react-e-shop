import { PASSWORD_REGEX } from 'constants/regexs';
import React from 'react';
import { useChangeUserPasswordMutation } from 'app/api/dashboardApi';
import { useForm, SubmitHandler } from 'react-hook-form';

export interface ChangePasswordFormData {
  newPassword: string;
  reNewPassword: string;
  currentPassword: string;
}

const ChangePasswordForm: React.FC = () => {
  const [changePassword, { isLoading, isError }] = useChangeUserPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ChangePasswordFormData> = async (data) => {
    try {
      await changePassword(data).unwrap();
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
            {...register('currentPassword', {
              required: 'Enter a current password',
            })}
            className='form-control'
            placeholder='Current password'
          />
          {errors?.currentPassword && <div className='text-danger'>{errors.currentPassword.message}</div>}
        </div>

        <div className='mb-3'>
          <input
            {...register('newPassword', {
              required: 'Enter a new password',
              pattern: {
                value: PASSWORD_REGEX,
                message: 'Password must contain digits, upper/lower case letters, and a special symbol',
              },
            })}
            className='form-control'
            placeholder='New password'
          />
          {errors?.newPassword && <div className='text-danger'>{errors.newPassword.message}</div>}
        </div>

        <div className='mb-3'>
          <input
            {...register('reNewPassword', {
              required: 'Repeat password',
              pattern: {
                value: PASSWORD_REGEX,
                message: 'Please enter a valid password',
              },
            })}
            className='form-control'
            placeholder='Repeat password'
          />
          {errors?.reNewPassword && <div className='text-danger'>{errors.reNewPassword.message}</div>}
        </div>

        <div className='mb-3'>
          <button type='submit' className='btn btn-primary' disabled={isLoading}>
            {isLoading ? 'Changing password...' : 'Change Password'}
          </button>
        </div>

        {isError && (
          <div className='alert alert-danger' role='alert'>
            Failed to change password. Please try again.
          </div>
        )}
      </form>
    </div>
  );
};

export default ChangePasswordForm;
