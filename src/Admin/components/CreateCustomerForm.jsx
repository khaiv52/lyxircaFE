import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createProduct } from "../../State/Product/Action";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];
const CreateCustomerForm = () => {
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPercent: "",
    sizes: initialSizes,
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
  });
  const dispatch = useDispatch();  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;
    const sizes = [...productData.sizes];

    // Cập nhật kích thước tương ứng
    sizes[index][name === "size_quantity" ? "quantity" : name] = value;
    setProductData((prevState) => ({
      ...prevState,
      sizes: sizes,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chuyển đổi dữ liệu giá và số lượng từ string sang int
    const formattedData = {
      imageUrl: productData.imageUrl,
      brand: productData.brand,
      title: productData.title,
      color: productData.color,
      discountedPrice: parseFloat(productData.discountedPrice),
      price: parseFloat(productData.price),
      discountPercent: parseInt(productData.discountedPercent, 10), // Chuyển đổi từ string sang int
      quantity: parseInt(productData.quantity, 10),
      sizes: productData.sizes.map((size) => ({
        name: size.name,
        quantity: parseInt(size.quantity, 10), // Chuyển đổi từ string sang int
      })),
      topLevelCategory: productData.topLevelCategory,
      secondLevelCategory: productData.secondLevelCategory,
      thirdLevelCategory: productData.thirdLevelCategory,
      description: productData.description,
    };
    dispatch(createProduct(formattedData));
    console.log(productData);
  };

  return (
    <div className="p-10">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center"
      >
        Add New Product
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
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              type="number"
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              type="number"
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discount Percent"
              name="discountPercent"
              value={productData.discountPercent}
              onChange={handleChange}
              type="number"
            ></TextField>
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
                <MenuItem value="Men">Men</MenuItem>
                <MenuItem value="Women">Women</MenuItem>
                <MenuItem value="Kids">Kids</MenuItem>
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
                <MenuItem value="Clothing">Clothing</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
                <MenuItem value="Brands">Brands</MenuItem>
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
                <MenuItem value="Skirts">Skirts</MenuItem>
                <MenuItem value="Dresses">Dresses</MenuItem>
                <MenuItem value="Shirts">Shirts</MenuItem>
                <MenuItem value="Jeans">Jeans</MenuItem>
                <MenuItem value="Sweaters">Sweaters</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-multiple-static"
              label="Description"
              multiline
              name="description"
              rows={3}
              onChange={handleChange}
              value={productData.description}
            ></TextField>
          </Grid>
          {productData.sizes.map((size, index) => (
            <Grid container item spacing={3} key={index}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Size Name"
                  name="name"
                  value={size.name}
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                ></TextField>
              </Grid>

              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  label="Quantity"
                  name="size_quantity"
                  type="number"
                  onChange={(event) => handleSizeChange(event, index)}
                  fullWidth
                ></TextField>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              type="submit"
            >
              Add New Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateCustomerForm;
