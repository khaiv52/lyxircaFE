import { Button, Grid, IconButton, TextField, Tooltip } from "@mui/material";
import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUser, login } from "../../State/Auth/Action";
import { HelpOutline } from "@mui/icons-material";

const ErrorBoundary = lazy(() => import("../../error/ErrorBoundary"));

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((store) => store.auth);
  console.log(users);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    try {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    } catch (error) {
      console.error("Error in handleInputChange:", error);
    }
  };

  const isEmailValid = (email) => {
    return users.some((user) => user.email === email);
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const validate = () => {
    try {
      let tempErrors = {};

      // Kiểm tra nếu trường email trống
      if (!formValues.email) {
        tempErrors.email = "Email is required.";
      } else {
        // Kiểm tra định dạng email
        const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*@([a-z])+\.(com|org|net|edu)$/;
        const username = formValues.email.split("@")[0];
        if (username.length < 5) {
          tempErrors.email =
            "Username part of email must be at least 5 characters long.";
        } else if (!emailRegex.test(formValues.email)) {
          tempErrors.email = "Email is not valid.";
        } else if (!isEmailValid) {
          tempErrors.email = "Email does not match.";
        }
      }

      // Kiểm tra nếu trường password trống
      if (!formValues.password) {
        tempErrors.password = "Password is required.";
      } else {
        // Kiểm tra định dạng password
        const isPasswordValidFormat =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
            formValues.password
          );
        tempErrors.password = isPasswordValidFormat
          ? ""
          : "Password is not valid.";
      }

      setErrors(tempErrors);
      return Object.values(tempErrors).every((x) => x === "");
    } catch (error) {
      console.error("Error in validate:", error);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (validate()) {
        const userData = {
          email: formValues.email,
          password: formValues.password,
        };

        dispatch(login(userData));
        console.log("User data:", userData);
        // API call or other actions
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  console.log("formValues:", formValues);
  console.log("errors:", errors);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              value={formValues.email || ""}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email ? errors.email : ""}
              InputProps={{
                endAdornment: (
                  <Tooltip title="Enter a valid email address. The username must be at least 5 characters long and contain only letters and numbers.">
                    <IconButton size="small" edge="end">
                      <HelpOutline fontSize="small"></HelpOutline>
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
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
                      <HelpOutline fontSize="small"></HelpOutline>
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="bg-[#6b1cfc] w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{
                padding: ".8rem 0",
                bgcolor: "#6b1cfc",
                "&:hover": {
                  bgcolor: "#8d4ffd",
                },
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center py-3">
          <p className="flex items-center py-1 m-0">
            If you don't have an account?
          </p>
          <Button
            onClick={() => navigate("/register")}
            className="ml-5"
            sx={{ display: "flex", alignItems: "center" }}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

const LoginWithBoundary = () => (
  <ErrorBoundary>
    <LoginForm />
  </ErrorBoundary>
);

export default LoginWithBoundary;
