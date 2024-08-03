import {
  Avatar,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../State/Product/Action";

const ProductsTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products.products);
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    if (shouldFetch) {
      const data = {
        colors: [],
        sizes: [],
        minPrice: 0,
        maxPrice: 100,
        minDiscount: 0,
        category: null,
        parentCategoryName: null,
        stock: "",
        sort: "price_low",
        pageNumber: 0,
        pageSize: 20,
      };
      dispatch(findProducts(data)).then(() => setShouldFetch(false)); // Fetch products and reset flag
    }
  }, [dispatch, shouldFetch]);

  if (!products || !Array.isArray(products.content)) {
    console.error("Products data is invalid or empty.");
    return <div>No products available</div>;
  }

  return (
    <div className="p-5">
      <Card className="mt-2 bg-[gray]">
        <CardHeader title="Recent Products" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.content?.slice(0, 5).map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <Avatar src={item.imageUrl} />
                  </TableCell>
                  <TableCell align="left">{item.title}</TableCell>
                  <TableCell align="left">{item.category?.name}</TableCell>
                  <TableCell align="left">{item.price}</TableCell>
                  <TableCell align="left">{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default ProductsTable;
