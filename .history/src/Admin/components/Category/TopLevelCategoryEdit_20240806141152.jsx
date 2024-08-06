import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  UNSAFE_NavigationContext,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import { updateTopLevelCategory } from "../../../State/Category/Action";
import { useDispatch } from "react-redux";

const TopLevelCategoryEdit = () => {
  const location = new useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const level = searchParams.get("level");
  const dispatch = useDispatch();
  console.log(id);
  console.log(level);

  const [categoryData, setCategoryData] = useState({
    newName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      newName: categoryData.name,
    };

    try {
      dispatch(updateTopLevelCategory(id, formattedData));
      toast.info("Product updated successfully!");
      navigate("/admin/category");
    } catch (error) {
      console.error("Failed to update product", error);
      toast.error("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="p-10">
      <Typography variant="h3" sx={{ textAlign: "center" }} className="py-10">
        Edit Category
      </Typography>
      <div className="flex flex-col items-center w-full">
        <form onSubmit={handleSubmit} className="w-full max-w-[1000px]">
            <Grid item xs={12} sm={6} container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={categoryData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{ p: 1.8 }}
                  size="large"
                  type="submit"
                >
                  Update Category
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default TopLevelCategoryEdit;
