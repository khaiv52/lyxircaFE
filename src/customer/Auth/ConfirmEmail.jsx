import { Button, Grid, IconButton, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { HelpOutline } from "@mui/icons-material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { confirmEmailUserRequest, getAllUser } from "../../State/Auth/Action";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ConfirmEmail = () => {
  const [formValues, setFormValues] = useState({
    email: "",
  });

  const { users } = useSelector((store) => store.auth);
  console.log(users);
  const { email } = useSelector((store) => store.auth);
  console.log(email);

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

    // Validate Email
    if (!formValues.email) {
      tempErrors.email = "Email is required";
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      const username = formValues.email.split("@")[0];
      if (!emailRegex.test(formValues.email)) {
        tempErrors.email = "Email is not valid.";
      } else if (username.length < 5) {
        tempErrors.email =
          "Username part of email must be at least 5 characters long.";
      } else if (!isEmailAlreadyExists(formValues.email)) {
        tempErrors.email = "Email doesn't exist in the system";
      }
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (validate()) {
      const userData = {
        email: data.get("email")
      };

      // check if email already exists
      if (isEmailAlreadyExists(userData.email)) {
        toast.info("A confirmation email has been sent to your email address.");
        dispatch(confirmEmailUserRequest(userData.email));
      }

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
    <div className="flex items-center justify-center w-full h-[100dvh] flex-col my-[-40px]">
      <div className="p-10 border border-gray-500 rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="w-[250px] sm:w-[300px] md:w-[350px] space-y-4"
        >
          <div className="flex flex-col items-center justify-center w-full">
            <ErrorOutlineIcon
              sx={{
                color: "#1976D2",
                height: "70px",
                width: "70px",
                display: "block",
                margin: "0 auto",
              }}
            />
            <h1 className="text-xl font-bold">Confirm Your Email</h1>
          </div>
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
                <Tooltip title="Enter a valid email address. The username must be at least 5 characters long and contain only letters and numbers. Example: username@gmail.com">
                  <IconButton edge="end" size="small">
                    <HelpOutline fontSize="small"></HelpOutline>
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
              bgcolor: "-[#6b1cfc",
              "&hover": {
                bgcolor: "#8d4ffd",
              },
            }}
          >
            Confirm Your Email
          </Button>
        </form>

        <div className="flex flex-col items-center justify-center mt-4">
          <div className="flex flex-col items-center py-3">
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
    </div>
  );
};

export default ConfirmEmail;
