import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { UNSAFE_NavigationContext, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const TopLevelCategoryEdit = () => {
  const location = new useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const level = searchParams.get("level");
  console.log(id);
  console.log(level);
  
  const [categoryData, setCategoryData] = useState({
    id: id,
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
    }
    
    try {
        // dispatch(updateProduct(productId, formattedData));
        toast.info("Product updated successfully!");
        navigate('/admin/category');
    } 
    catch (error) {
      console.error("Failed to update product", error);
      toast.error("Failed to update product. Please try again.");
    }
  };


  

  return (
    <div className="p-10">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center"
      >
        Edit Product
      </Typography>
      <form onSubmit={handleSubmit} className="min-h-screen">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={categoryData.title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ p: 1.8 }}
                className="py-20"
                size="large"
                type="submit"
              >
                Update Product
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default TopLevelCategoryEdit;
