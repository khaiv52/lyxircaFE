import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../../State/Auth/Action";

const ProfileEditForm = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        password: user.password || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  const navigate = useNavigate();
  const handleCancelClick = () => {
    navigate(`/profile`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(user) {
      try {
        await dispatch(updateUser(user?.id ,formData));
        await dispatch(getUser(jwt));
        navigate("/profile");
        // handle submit 
        console.log("User updated successfully");
      } 
      catch(error) {
        console.error("Failed to update user: ", error);
      }
    }
  }


  return (
    <div className="flex items-center justify-center w-100 h-100">
      <form className="min-h-screen w-[250px] lg:w-[400px]">
        <Typography
          variant="h3"
          sx={{ textAlign: "center" }}
          className="py-10 text-center"
        >
          Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              required
              value={formData?.email}
              onChange={handleChange}
              size="medium"
              InputLabelProps={{
                style: {
                  fontSize: "1rem",
                },
              }}
              InputProps={{
                style: {
                  color: "#3b96dc", // Màu chữ đầu vào khi không focus
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#6EACDA", // Màu của border khi không focus
                  },
                  "&:hover fieldset": {
                    borderColor: "#6EACDA", // Màu của border khi hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#075e99", // Màu của border khi focus
                  },
                  "& .MuiInputBase-input": {
                    color: "#0964a1", // Màu chữ đầu vào khi focus
                    fontSize: "1rem",
                    fontWeight: "400",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#46a0e6", // Màu chữ nhãn
                  fontSize: "1rem", // Kích thước chữ nhãn
                },
                "&:hover .MuiInputLabel-root": {
                  color: "#075e99", // Màu chữ nhãn khi hover
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              name="password"
              required
              value={formData?.password}
              onChange={handleChange}
              size="medium"
              InputLabelProps={{
                style: {
                  fontSize: "1rem",
                },
              }}
              InputProps={{
                style: {
                  color: "#3b96dc", // Màu chữ đầu vào khi không focus
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#6EACDA", // Màu của border khi không focus
                  },
                  "&:hover fieldset": {
                    borderColor: "#6EACDA", // Màu của border khi hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#075e99", // Màu của border khi focus
                  },
                  "& .MuiInputBase-input": {
                    color: "#0964a1", // Màu chữ đầu vào khi focus
                    fontSize: "1rem",
                    fontWeight: "400",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1rem", // Kích thước chữ nhãn
                },
                "&:hover .MuiInputLabel-root": {
                  color: "#075e99", // Màu chữ nhãn khi hover
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="First Name"
              name="firstName"
              value={formData?.firstName}
              onChange={handleChange}
              size="medium"
              InputLabelProps={{
                style: {
                  fontSize: "1rem",
                },
              }}
              InputProps={{
                style: {
                  color: "#3b96dc", // Màu chữ đầu vào khi không focus
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#6EACDA", // Màu của border khi không focus
                  },
                  "&:hover fieldset": {
                    borderColor: "#6EACDA", // Màu của border khi hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#075e99", // Màu của border khi focus
                  },
                  "& .MuiInputBase-input": {
                    color: "#0964a1", // Màu chữ đầu vào khi focus
                    fontSize: "1rem",
                    fontWeight: "400",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1rem", // Kích thước chữ nhãn
                },
                "&:hover .MuiInputLabel-root": {
                  color: "#075e99", // Màu chữ nhãn khi hover
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Last Name"
              name="lastName"
              value={formData?.lastName}
              onChange={handleChange}
              size="medium"
              InputLabelProps={{
                style: {
                  fontSize: "1rem",
                },
              }}
              InputProps={{
                style: {
                  color: "#3b96dc", // Màu chữ đầu vào khi không focus
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#6EACDA", // Màu của border khi không focus
                  },
                  "&:hover fieldset": {
                    borderColor: "#6EACDA", // Màu của border khi hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#075e99", // Màu của border khi focus
                  },
                  "& .MuiInputBase-input": {
                    color: "#0964a1", // Màu chữ đầu vào khi focus
                    fontSize: "1rem",
                    fontWeight: "400",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1rem", // Kích thước chữ nhãn
                },
                "&:hover .MuiInputLabel-root": {
                  color: "#075e99", // Màu chữ nhãn khi hover
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Phone Number"
              name="phoneNumber"
              value={formData?.phoneNumber}
              onChange={handleChange}
              size="medium"
              InputLabelProps={{
                style: {
                  fontSize: "1rem",
                },
              }}
              InputProps={{
                style: {
                  color: "#3b96dc", // Màu chữ đầu vào khi không focus
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#6EACDA", // Màu của border khi không focus
                  },
                  "&:hover fieldset": {
                    borderColor: "#6EACDA", // Màu của border khi hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#075e99", // Màu của border khi focus
                  },
                  "& .MuiInputBase-input": {
                    color: "#0964a1", // Màu chữ đầu vào khi focus
                    fontSize: "1rem",
                    fontWeight: "400",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1rem", // Kích thước chữ nhãn
                },
                "&:hover .MuiInputLabel-root": {
                  color: "#075e99", // Màu chữ nhãn khi hover
                },
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <Button
              size="large"
              fullWidth
              sx={{ fontSize: "1rem" }}
              onClick={handleCancelClick}
            >
              {" "}
              Cancel{" "}
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button size="large" fullWidth sx={{ fontSize: "1rem" }} onClick={handleSubmit}>
              {" "}
              Edit{" "}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ProfileEditForm;
