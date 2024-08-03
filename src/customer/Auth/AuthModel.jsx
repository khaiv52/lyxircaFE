import { Box, Modal } from "@mui/material";
import React, { lazy } from "react";
import { useLocation } from "react-router-dom";

const LoginWithBoundary = lazy(() => import("../Auth/LoginForm"));
const RegisterWithBoundary = lazy(() => import("../Auth/RegisterForm"));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const AuthModel = ({ handleClose, open }) => {
  const location = useLocation();
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {location.pathname === "/login" ? <LoginWithBoundary /> : <RegisterWithBoundary />}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModel;
