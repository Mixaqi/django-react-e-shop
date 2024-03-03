import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import { openModal, closeModal } from "../../store/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";

const AuthModal = () => {
  const [activePage, setActivePage] = useState("login");
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  const togglePage = (page) => {
    setActivePage(page);
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleOpen = () => {
    dispatch(openModal());
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
              className={`btn btn-outline-${activePage === "register" ? "success" : "primary"}`}
              onClick={() => togglePage("register")}
            >
              Register
            </button>
            <button
              className={`btn btn-outline-${activePage === "login" ? "success" : "primary"}`}
              onClick={() => togglePage("login")}
            >
              Login
            </button>
          </div>
          {activePage === "register" ? <Register /> : <Login />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AuthModal;
