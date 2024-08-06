import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchTopLevelCategory,
  updateTopLevelCategory,
} from "../../../State/Category/Action";
import { useDispatch, useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';

const TopLevelCategoryEdit = () => {
  const location = new useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const level = searchParams.get("level");
  const dispatch = useDispatch();
  console.log(id);
  console.log(level);
  const { categories } = useSelector((store) => store.category);
  console.log(categories);

  const [categoryData, setCategoryData] = useState({
    newName: "",
  });

  useEffect(() => {
    dispatch(fetchTopLevelCategory(id));
  }, [dispatch]);

  useEffect(() => {
    if (categories) {
      setCategoryData({
        newName: categories.name || "",
      });
    }
  }, [categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    
    setCategoryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Chỉ gửi giá trị newName dưới dạng chuỗi
    const formattedData = categoryData.newName;

    try {
      dispatch(updateTopLevelCategory(id, formattedData));
      toast.info("Product updated successfully!");
      navigate("/admin/categories/?search=");
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
          <div className="space-y-5">
            <Grid item>
              <TextField
                fullWidth
                label="Name"
                name="newName"
                value={categoryData.newName}
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopLevelCategoryEdit;
