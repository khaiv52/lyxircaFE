import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  
  const handleClick = () => {
    if(user?.id) {
      navigate(`/profile/${user.id}`);
    }
    else {
      console.error("User ID is not available")
    }
  };

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
              value={user?.email}
              disabled
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
              value={user?.password}
              disabled
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
              value={user?.firstName}
              disabled
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
              disabled
              variant="outlined"
              label="Last Name"
              name="lastName"
              value={user?.lastName}
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
              disabled
              variant="outlined"
              label="Phone Number"
              name="phoneNumber"
              value={user?.phoneNumber}
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
            <Button size="large" fullWidth sx={{ fontSize: "1rem" }} onClick={handleClick}>
              {" "}
              Edit Profile{" "}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Profile;
