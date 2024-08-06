import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { createProduct } from "../../State/Product/Action";
import { api } from "../../config/apiConfig"; // Adjust the import according to your file structure
import { useDispatch } from "react-redux";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const CreateProductForm = () => {
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
    stock: "",
  });

  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [levelTwoCategories, setLevelTwoCategories] = useState([]);
  const [levelThreeCategories, setLevelThreeCategories] = useState([]);

  // Set trang thái hiển thị thông báo
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/categories/all");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      // Lọc danh mục cấp 1 từ các danh mục chính
      const topLevelCategories = categories.filter((cat) => cat.level === 0);

      // Lọc danh mục cấp 2 từ các phần của danh mục cấp 1
      const levelTwoCategories = topLevelCategories.flatMap((topCat) =>
        topCat.sections.map((sec) => ({
          ...sec,
          parentCategory: topCat,
        }))
      );

      // Lọc danh mục cấp 3 từ các mục danh mục trong các phần của danh mục cấp 2
      const levelThreeCategories = levelTwoCategories.flatMap((section) =>
        section.categoryItems.map((item) => ({
          ...item,
          parentSection: section,
        }))
      );
      setLevelTwoCategories(levelTwoCategories);
      setLevelThreeCategories(levelThreeCategories);
    }
  }, [categories]);

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

    // Ensure the quantity is a non-negative number
    const newValue =
      name === "size_quantity" ? Math.max(0, parseInt(value, 10)) : value;

    sizes[index][name === "size_quantity" ? "quantity" : name] = newValue;

    // Update total quantity
    const totalQuantity = sizes.reduce(
      (acc, size) => acc + (parseInt(size.quantity, 10) || 0),
      0
    );

    setProductData((prevState) => ({
      ...prevState,
      sizes: sizes,
      quantity: totalQuantity.toString(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      imageUrl: productData.imageUrl,
      brand: productData.brand,
      title: productData.title,
      color: productData.color,
      discountedPrice: parseFloat(productData.discountedPrice),
      price: parseFloat(productData.price),
      discountPercent: parseInt(productData.discountPercent, 10),
      quantity: parseInt(productData.quantity, 10),
      sizes: productData.sizes.map((size) => ({
        name: size.name,
        quantity: parseInt(size.quantity, 10),
      })),
      topLevelCategory: productData.topLevelCategory,
      secondLevelCategory: productData.secondLevelCategory,
      thirdLevelCategory: productData.thirdLevelCategory,
      description: productData.description,
    };
    try {
      dispatch(createProduct(formattedData));
      setSnackbarMessage("Product added successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to add product", error);
      setSnackbarMessage("Failed to add product. Please try again.");
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="p-5">
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
              InputProps={{
                readOnly: true,
              }}
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
                  .filter(
                    (cat) =>
                      cat.parentSection?.name ===
                      productData.secondLevelCategory
                  )
                  .map((cat) => (
                    <MenuItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
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
                  fullWidth
                ></TextField>
              </Grid>

              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  label="Quantity"
                  name="size_quantity"
                  type="number"
                  value={size.quantity}
                  onChange={(event) => handleSizeChange(event, index)}
                  fullWidth
                  inputProps={{ min: 0 }} // Prevents negative numbers in the input field
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

export default CreateProductForm;
