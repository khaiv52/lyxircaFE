import { Button, Grid } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom';

const TopLevelCategoryEdit = () => {

  const location = new useLocation();
  const searchParams = new URLSearchParams(location.search)
  const id = searchParams.get('id');
  const level = searchParams.get('level');
  console.log(id);
  console.log(level);

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
              value={productData.title}
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
      </form>

    </div>
  );
}

export default TopLevelCategoryEdit