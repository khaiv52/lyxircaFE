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
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
  width: {
    xs: "400px", // cho màn hình nhỏ
    sm: "450px", // cho màn hình trung bình
    lg: "500px", // cho màn hình lớn
  },
  mx: "auto",
  display: "block",
};

const AuthModel = ({ handleClose, open }) => {
  const location = useLocation();
  return (
    <div className="flex items-center justify-center w-full">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {location.pathname === "/login" ? (
            <LoginWithBoundary />
          ) : (
            <RegisterWithBoundary />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModel;
