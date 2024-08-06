import { Button, Grid, IconButton, TextField, Tooltip } from "@mui/material";
import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { register, getAllUser, resetPassword } from "../../State/Auth/Action";
import { HelpOutline } from "@mui/icons-material";
import { toast } from "react-toastify";

const ErrorBoundary = lazy(() => import("../../error/ErrorBoundary"));

const ResetPassword = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { users, success } = useSelector((store) => store.auth);
  // console.log(users);

  const [errors, setErrors] = useState({});

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  // console.log(email);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};

    // Validate Password
    if (!formValues.password) {
      tempErrors.password = "Password is required";
    } else {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(formValues.password)) {
        tempErrors.password = "Password is not valid";
      }
    }

    // Validate Confirm Password
    if (!formValues.confirmPassword) {
      tempErrors.confirmPassword = "Re-enter password is required";
    } else if (formValues.confirmPassword !== formValues.password) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  // useEffect(() => {
  //   dispatch(getAllUser());
  // }, [dispatch]);

  useEffect(() => {
    if(success) {
      toast.success("Password reset successfully");
      navigate('/login');
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = new FormData(e.currentTarget);
      const userData = {
        email,
        password: data.get("password"),
      };

      dispatch(resetPassword(userData));

      // try {
      //   // Your form submission logic here
      //   console.log("User data:", userData);
      //   // API call or other actions
      // } catch (error) {
      //   console.error("Error submitting form:", error);
      // }
    }
  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center my-[-40px]">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-10 border border-gray-500 rounded-lg">
        <div className="mb-5">
          <h1 className="text-xl font-bold md:text-2xl">Reset Password</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full ml-2 space-y-4"
        >
          <TextField
            required
            type="password"
            id="password"
            name="password"
            label="New Password"
            fullWidth
            autoComplete="password"
            value={formValues.password || ""}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password ? errors.password : ""}
            InputProps={{
              endAdornment: (
                <Tooltip title="Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.">
                  <IconButton edge="end" size="small">
                    <HelpOutline fontSize="small" />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
          <TextField
            required
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            fullWidth
            autoComplete="password"
            value={formValues.confirmPassword || ""}
            onChange={handleInputChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword ? errors.confirmPassword : ""}
            InputProps={{
              endAdornment: (
                <Tooltip title="Re-enter your password to confirm it matches the above password.">
                  <IconButton edge="end" size="small">
                    <HelpOutline fontSize="small" />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
          <Button
            className="bg-[#6b1cfc] w-full"
            type="submit"
            variant="contained"
            size="large"
            sx={{
              padding: ".8rem 0",
              bgcolor: "#6b1cfc" /* Sửa từ -[#6b1cfc] thành #6b1cfc */,
              "&:hover": {
                bgcolor: "#8d4ffd",
              },
            }}
          >
            Reset Password
          </Button>
        </form>

        <div className="flex flex-col items-center justify-center mt-4">
          <div className="flex flex-col items-center py-3">
            <p className="flex items-center py-1 m-0">
              If you have already account?
            </p>
            <Button
              onClick={() => navigate("/login")}
              className="ml-5"
              sx={{ display: "flex", alignItems: "center" }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
