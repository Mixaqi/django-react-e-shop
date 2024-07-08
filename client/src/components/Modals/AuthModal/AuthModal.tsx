import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import { useAppSelector } from 'store/hooks';
import { closeModal, setModalMode } from 'store/slices/modalSlice';
import { AppDispatch } from 'store/store';
import './AuthModal.css';

const AuthModal: React.FC = () => {
  const { isOpen, mode } = useAppSelector((store) => store.modal);
  const dispatch: AppDispatch = useDispatch();

  const togglePage = (page: 'register' | 'login') => {
    dispatch(setModalMode(page));
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Auth Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='modal-auth-buttons'>
            <button
              className={`btn btn-outline-${mode === 'register' ? 'success' : 'primary'}`}
              onClick={() => togglePage('register')}
            >
              Sign Up
            </button>
            <button
              className={`btn btn-outline-${mode === 'login' ? 'success' : 'primary'}`}
              onClick={() => togglePage('login')}
            >
              Log In
            </button>
          </div>
          {mode === 'register' ? <Register /> : <Login />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AuthModal;
