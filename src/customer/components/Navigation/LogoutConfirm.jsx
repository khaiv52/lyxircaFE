import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const LogoutConfirm = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          position: "fixed",
          top: "45%",
          left: "47%",
          transform: "translate(-50%, -50%)",
          width: "auto",
          maxWidth: "500px", // Bạn có thể thay đổi kích thước tối đa của modal ở đây
        },
      }}
    >
      <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
      <DialogContent>
        <DialogContentText id="logout-dialog-description">
          Are you sure you want to log out?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{display: 'flex', justifyContent: 'space-around'}}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Log out
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutConfirm;
