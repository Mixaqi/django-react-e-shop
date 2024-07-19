import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useConfirmResetPasswordMutation } from 'app/api/authApi';
import { PASSWORD_REGEX } from 'constants/regexs';

export interface NewPasswordFormData {
  newPassword: string;
  token: string;
}

const ResetPasswordSuccessful: React.FC = () => {
  const [confirmNewPassword, { isLoading }] = useConfirmResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewPasswordFormData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<NewPasswordFormData> = async (data) => {
    try {
      await confirmNewPassword(data).unwrap();
      toast.success('Password reset successful!');
      reset();
    } catch (error: any) {
      const errorMessage = error?.data?.error || 'Password reset failed. Please try again.';
      toast.error(errorMessage);
      console.error('Error:', error);
    }
  };

  return (
    <Container className='mt-4'>
      {/* <ToastContainer /> */}
      <Row>
        <Col md={4}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-1'>
              <Form.Control
                type='password'
                placeholder='New Password'
                {...register('newPassword', {
                  required: 'New password is required',
                  pattern: {
                    value: PASSWORD_REGEX,
                    message: 'Password does not meet criteria',
                  },
                })}
                isInvalid={!!errors.newPassword}
              />
              <Form.Control.Feedback type='invalid'>{errors.newPassword?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Token'
                {...register('token', { required: 'Token is required' })}
                isInvalid={!!errors.token}
              />
              <Form.Control.Feedback type='invalid'>{errors.token?.message}</Form.Control.Feedback>
            </Form.Group>
            <Button type='submit' variant='primary' disabled={isLoading}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </Form>
        </Col>
        <Col md={8}>
          <div className='p-3 border rounded'>
            <h4>Password Requirements</h4>
            <ul>
              <li>Must contain letters from the Latin alphabet</li>
              <li>Must include at least one uppercase letter</li>
              <li>Must have numbers</li>
              <li>Must contain at least one special character (e.g., !@#$%^&*)</li>
            </ul>
            <div className='mt-3'>
              <h5>Important Information</h5>
              <p>
                Your password reset code is valid for <strong>10 minutes</strong>. Please use it within this time frame
                to reset your password.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPasswordSuccessful;
