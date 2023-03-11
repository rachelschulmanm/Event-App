import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import SignUp from "./SignUp";
import Login from "./Login";
const CustomDialog = ({ open, handleClose, isLogin }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent style={{ overflow: "hidden" }}>
        {isLogin ? <Login handleClose={handleClose}></Login> : <SignUp handleClose={handleClose}> </SignUp>}
      </DialogContent >
      <DialogActions>
        <Button
          sx={{ mt: 3, mb: 2 }}
          variant={"outlined"}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
