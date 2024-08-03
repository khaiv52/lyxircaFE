import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { updateProduct, findProductById } from "../../State/Product/Action";
import { useParams } from "react-router-dom";
import { api } from "../../config/apiConfig";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const EditProductForm = () => {
  const { productId } = useParams(); // Get productId from URL
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);

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

  // Trạng thái cập nhật
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [categories, setCategories] = useState([]);
  const [levelTwoCategories, setLevelTwoCategories] = useState([]);
  const [levelThreeCategories, setLevelThreeCategories] = useState([]);

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
      //  Lọc ra các danh mục không có danh mục cha (cấp độ 1).
      const topLevelCategories = categories.filter(
        (cat) => !cat.parentCategory
      );

      //   Lọc các danh mục có parentCategory là một trong những danh mục cấp 1.
      const levelTwo = categories.filter((cat) =>
        topLevelCategories.some(
          (topCat) => cat.parentCategory?.id === topCat.id
        )
      );

      //   Lọc các danh mục có parentCategory là một trong những danh mục cấp 2.
      const levelThree = categories.filter((cat) =>
        levelTwo.some((secCat) => cat.parentCategory?.id === secCat.id)
      );

      setLevelTwoCategories(levelTwo);
      setLevelThreeCategories(levelThree);
    }
  }, [categories]);

  useEffect(() => {
    if (product) {
      setProductData({
        imageUrl: product.imageUrl || "",
        brand: product.brand || "",
        title: product.title || "",
        color: product.color || "",
        discountedPrice: product.discountedPrice || "",
        price: product.price || "",
        discountPercent: product.discountPercent || "",
        sizes: product.sizes || initialSizes,
        quantity: product.quantity || "",
        topLevelCategory: product.topLevelCategory || "",
        secondLevelCategory: product.secondLevelCategory || "",
        thirdLevelCategory: product.thirdLevelCategory || "",
        description: product.description || "",
      });
    }
  }, [product]);

  useEffect(() => {
    dispatch(findProductById(productId));
  }, [dispatch, productId]);

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
    sizes[index][name === "size_quantity" ? "quantity" : name] = value;
    setProductData((prevState) => ({
      ...prevState,
      sizes: sizes,
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
        dispatch(updateProduct(productId, formattedData));
        setSnackbarMessage("Product updated successfully!");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Failed to update product", error);
        setSnackbarMessage("Failed to update product. Please try again.");
        setSnackbarOpen(true);
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
                  .filter(
                    (cat) =>
                      cat.parentCategory?.name ===
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
            />
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
                />
              </Grid>

              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  label="Quantity"
                  name="size_quantity"
                  type="number"
                  value={size.quantity}
                  onChange={(event) => handleSizeChange(event, index)}
                  fullWidth
                />
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
              Update Product
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarMessage.includes("success") ? "success" : "error"}
          sx={{ width: "auto" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditProductForm;
