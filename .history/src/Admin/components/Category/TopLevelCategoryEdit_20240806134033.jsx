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
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discount Percent"
              name="discountPercent"
              value={productData.discountPercent}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLevelCategory"
                value={productData.topLevelCategory}
                onChange={handleChange}
                label="Top Level Category"
              >
                {categories
                  .filter((cat) => !cat.parentCategory)
                  .map((cat) => (
                    <MenuItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLevelCategory"
                value={productData.secondLevelCategory}
                onChange={handleChange}
                label="Second Level Category"
              >
                {levelTwoCategories
                  .filter(
                    (cat) =>
                      cat.parentCategory?.name === productData.topLevelCategory
                  )
                  .map((cat) => (
                    <MenuItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLevelCategory"
                value={productData.thirdLevelCategory}
                onChange={handleChange}
                label="Third Level Category"
              >
                {levelThreeCategories
                  .filter((cat) => {
                    console.log(
                      "Filtering:",
                      cat.parentSection?.name,
                      productData.secondLevelCategory
                    );
                    return (
                      cat.parentSection?.name ===
                      productData.secondLevelCategory
                    );
                  })
                  .map((cat) => (
                    <MenuItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
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