import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import { closeModal, setModalMode } from "../../store/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";

const AuthModal = () => {
  const { isOpen, mode } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  const togglePage = (page) => {
    dispatch(setModalMode(page));
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton={handleClose}>
          <Modal.Title>Auth Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <button
              className={`btn btn-outline-${mode === "register" ? "success" : "primary"}`}
              onClick={() => togglePage("register")}
            >
              Register
            </button>
            <button
              className={`btn btn-outline-${mode === "login" ? "success" : "primary"}`}
              onClick={() => togglePage("login")}
            >
              Login
            </button>
          </div>
          {mode === "register" ? <Register /> : <Login />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AuthModal;
