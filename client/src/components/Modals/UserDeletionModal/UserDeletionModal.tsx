import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDeleteUserMutation } from 'app/api/dashboardApi';
import { toast } from 'react-toastify';
import { logoutUser } from 'store/slices/authSlice';
import { useAppDispatch } from 'store/hooks';
import { useNavigate } from 'react-router-dom';

interface Props {
  closeModal: () => void;
}

const UserDeletionModal: React.FC<Props> = ({ closeModal }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();
  const [currentPassword, setCurrentPassword] = useState('');

  const handleDeleteUser = async () => {
    try {
      await deleteUser({ currentPassword }).unwrap();
      closeModal();
      dispatch(logoutUser());
      navigate('/');
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  return (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Account Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete your account?</p>
        <div className='form-group'>
          <label htmlFor='currentPassword'>Enter your current password:</label>
          <input
            type='password'
            className='form-control'
            id='currentPassword'
            placeholder='Current Password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={handleDeleteUser}>
          Delete Account
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDeletionModal;
