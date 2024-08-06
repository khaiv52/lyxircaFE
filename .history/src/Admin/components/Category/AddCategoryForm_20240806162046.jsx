import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createCategory } from "../../../State/Category/Action";
import { useDispatch } from "react-redux";

const AddCategoryForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [categoryData, setCategoryData] = useState({
    topLevelCategory: "",
    secondLevelSectionName: "",
    thirdLevelItemName: "",
    topLevelCategoryLevel: 1,
    secondLevelSectionLevel: null,
    thirdLevelItemLevel: null,
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

    if (!categoryData.topLevelCategory) {
      toast.error("Top Level Category is required.");
      return;
    }

    // Prepare data for submission
    const formattedData = {
      topLevelCategory: categoryData.topLevelCategory,
      secondLevelSectionName: categoryData.secondLevelSectionName,
      thirdLevelItemName: categoryData.thirdLevelItemName,
    };

    try {
      dispatch(createCategory(formattedData));
      toast.info("Category created successfully!");
      navigate("/admin/category");
    } catch (error) {
      console.error("Failed to create category", error);
      toast.error("Failed to create category. Please try again.");
    }
  };

  return (
    <div className="p-10">
      <Typography variant="h3" sx={{ textAlign: "center" }} className="py-10">
        Add Category
      </Typography>
      <div className="flex flex-col items-center w-full">
        <form onSubmit={handleSubmit} className="w-full max-w-[1000px]">
          <div className="space-y-5">
            <Grid item>
              <TextField
                fullWidth
                label="Top Level Category"
                name="topLevelCategory"
                value={categoryData.topLevelCategory}
                onChange={handleChange}
                required
              />
            </Grid>
            {categoryData.topLevelCategory && (
              <Grid item>
                <TextField
                  fullWidth
                  label="Second Level Section"
                  name="secondLevelSectionName"
                  value={categoryData.secondLevelSectionName}
                  onChange={handleChange}
                />
              </Grid>
            )}
            {categoryData.secondLevelSectionName && (
              <Grid item>
                <TextField
                  fullWidth
                  label="Third Level Item"
                  name="thirdLevelItemName"
                  value={categoryData.thirdLevelItemName}
                  onChange={handleChange}
                />
              </Grid>
            )}
            <Grid item>
              <Button
                variant="contained"
                sx={{ p: 1.8 }}
                size="large"
                type="submit"
              >
                Create Category
              </Button>
            </Grid>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
