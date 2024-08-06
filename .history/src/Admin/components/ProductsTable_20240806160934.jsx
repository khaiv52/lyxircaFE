// Define handleProductDelete outside of useEffect
const handleProductDelete = async (productId) => {
  try {
    await dispatch(deleteProduct(productId));
    toast.info("Product deleted successfully!");
    // Reload the page with the current search parameters after successful deletion
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  } catch (error) {
    console.error("Failed to delete product", error);
    toast.error("Failed to delete product. Please try again.");
  }
};

  const handleProductEdit = (productId) => {
    console.log("Navigating to edit product with ID:", productId);
    navigate(`/admin/products/update-product/${productId}`);
  };

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    // console.log("Query: ", query);
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
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
      pageNumber: pageNumber - 1,
      pageSize: 20,
    };
    dispatch(findProducts(data));
  }, [dispatch, pageNumber]);

  if (!products || !Array.isArray(products.content)) {
    console.error("Products data is invalid or empty.");
    return <div>No products available</div>;
  }

  // Define styles for stock status labels
  const statusLabelStyle = (inStock) => ({
    padding: "4px 10px",
    borderRadius: "4px",
    color: "white",
    backgroundColor: inStock ? "green" : "red",
    textAlign: "left",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  });

  return (
    <div className="p-5">
      <Card className="mt-2 bg-[gray]">
        <CardHeader title="All Products" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Brand</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Stock</TableCell>
                <TableCell align="left">Edit</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.content?.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{item.id}</TableCell>
                  <TableCell align="left">
                    <Avatar src={item.imageUrl} />
                  </TableCell>
                  <TableCell align="left">{item.title}</TableCell>
                  <TableCell align="left">{item.brand}</TableCell>
                  <TableCell align="left">{item.category?.name}</TableCell>
                  <TableCell align="left">${item.price}</TableCell>
                  <TableCell align="left">{item.quantity}</TableCell>
                  <TableCell align="left">
                    <Typography style={statusLabelStyle(item.quantity > 0)}>
                      {item.quantity > 0 ? "IN STOCK" : "OUT STOCK"}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      onClick={() => handleProductEdit(item.id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      onClick={() => handleProductDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <section className="w-full px-[3.6rem]">
        <div className="flex justify-center px-4 py-5">
          <Pagination
            count={products?.totalPages}
            color="secondary"
            onChange={handlePaginationChange}
          />
        </div>
      </section>
    </div>
  );
};

export default ProductsTable;