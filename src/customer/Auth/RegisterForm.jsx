import { Button, Grid, IconButton, TextField, Tooltip } from "@mui/material";
import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register, getAllUser } from "../../State/Auth/Action";
import { HelpOutline } from "@mui/icons-material";

const ErrorBoundary = lazy(() => import("../../error/ErrorBoundary"));

const RegisterForm = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { users } = useSelector((store) => store.auth);
  // console.log(users);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const isEmailAlreadyExists = (email) => {
    return users.some((user) => user.email === email);
  };

  const validate = () => {
    let tempErrors = {};

    // Validate First Name
    if (!formValues.firstName) {
      tempErrors.firstName = "First name is required";
    } else if (formValues.firstName.length > 20) {
      tempErrors.firstName = "First name should not exceed 20 characters.";
    }

    // Validate Last Name
    if (!formValues.lastName) {
      tempErrors.lastName = "Last name is required";
    } else if (formValues.lastName.length > 20) {
      tempErrors.lastName = "Last name should not exceed 20 characters.";
    }

    // Validate Email
    if (!formValues.email) {
      tempErrors.email = "Email is required";
    } else {
      const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*@([a-z])+\.(com|org|net|edu)$/;
      const username = formValues.email.split("@")[0];
      if (!emailRegex.test(formValues.email)) {
        tempErrors.email = "Email is not valid.";
      } else if (username.length < 5) {
        tempErrors.email =
          "Username part of email must be at least 5 characters long.";
      } else if (isEmailAlreadyExists(formValues.email)) {
        tempErrors.email = "Email already existas.";
      }
    }

    // Validate Password
    // Validate Password
    if (!formValues.password) {
      tempErrors.password = "Password is required";
    } else {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(formValues.password)) {
        tempErrors.password =
          "Password is not valid";
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

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = new FormData(e.currentTarget);
      const userData = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      };

      // check if email already exists

      dispatch(register(userData));

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
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              value={formValues.firstName || ""}
              onChange={handleInputChange}
              error={!!errors.firstName}
              helperText={errors.firstName ? errors.firstName : ""}
              inputProps={{ maxLength: 20 }}
              InputProps={{
                endAdornment: (
                  <Tooltip title="Enter your first name. Maximum length is 20 characters.">
                    <IconButton edge="end" size="small">
                      <HelpOutline fontSize="small" />
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="given-name"
              value={formValues.lastName || ""}
              onChange={handleInputChange}
              error={!!errors.lastName}
              helperText={errors.lastName ? errors.lastName : ""}
              inputProps={{ maxLength: 20 }}
              InputProps={{
                endAdornment: (
                  <Tooltip title="Enter your last name. Maximum length is 20 characters">
                    <IconButton edge="end" size="small">
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
                endAdornment : (
                  <Tooltip title="Enter a valid email address. The username must be at least 5 characters long and contain only letters and numbers.">
                    <IconButton edge="end" size="small">
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
                endAdornment : (
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
            <TextField
              required
              id="confirmPassword"
              name="confirmPassword"
              label="ConfirmPassword"
              fullWidth
              autoComplete="password"
              value={formValues.confirmPassword || ""}
              onChange={handleInputChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword ? errors.confirmPassword : ""}
              InputProps={{
                endAdornment : (
                  <Tooltip title="Re-enter your password to confirm it matches the above password.">
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
                bgcolor: "-[#6b1cfc",
                "&hover": {
                  bgcolor: "#8d4ffd",
                },
              }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center py-3">
          <p className="flex items-center py-1 m-0">
            If you have already account ?
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
  );
};

const RegisterWithBoundary = () => (
  <ErrorBoundary>
    <RegisterForm />
  </ErrorBoundary>
);

export default RegisterWithBoundary;
