import {
  Button,
  Card,
  CardHeader,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCategoriesBySearchText } from "../../../State/Category/Action";
import SearchInput from "../Search/SearchInput";

const CategoryTable = () => {
  const { categories } = useSelector((store) => store.category);
  console.log(categories);
  
  const [searchText, setSearchText] = useState("");

  const [selectedTopLevelCategory, setSelectedTopLevelCategory] =
    useState(null);
  const [selectedSecondLevelCategory, setSelectedSecondLevelCategory] =
    useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const pageNumber = searchParams.get("page") || 1;
  const searchTextParams = searchParams.get("search") || ""; // Ensure correct key 'search' used in URL

  const [topLevelCategories, setTopLevelCategories] = useState([]);
  console.log(topLevelCategories);
  const [secondLevelCategories, setSecondLevelCategories] = useState([]);
  console.log(secondLevelCategories);
  const [thirdLevelCategories, setThirdLevelCategories] = useState([]);
  console.log(thirdLevelCategories);

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleTopLevelCategoryClick = (categoryId) => {
    setSelectedTopLevelCategory(categoryId);
    setSelectedSecondLevelCategory(null); // Reset second level category
  };

  const handleSecondLevelCategoryClick = (categoryId) => {
    setSelectedSecondLevelCategory(categoryId);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = async () => {
    console.log("Search Text:", searchText);
    console.log(
      "Navigating to:",
      `/categories?search=${encodeURIComponent(searchText)}`
    );

    await dispatch(getCategoriesBySearchText(searchText));
    searchParams.set("search", searchText);
    const query = searchParams.toString();
    console.log(query);

    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleUpdateCategory = (id, level) => {
    if (level === 0) {
      navigate(`/admin/update-top-level?id=${id}&`);
    } else if (level === 1) {
      navigate(`/admin/update-second-level/${id}`);
    } else if (level === 2) {
      navigate(`/admin/update-third-level/${id}`);
    }
  }; 
  
  const renderTable = (categories, handleClick) => {
    return (
      <>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Level</TableCell>
                <TableCell align="left">Edit</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories?.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    m: 10,
                  }}
                  onClick={() => handleClick(item.id)}
                >
                  <TableCell align="left" sx={{ fontSize: 16 }}>
                    {item.id}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: 16 }}>
                    {item.name}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: 16 }}>
                    {item.level}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      onClick={() => handleUpdateCategory(item.id, item.level)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    {/* <Button
                      variant="outlined"
                      onClick={() => handleDeleteCategory(item.id, item.level)}
                    >
                      Delete
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  useEffect(() => {
    if (categories && categories.content) {
      const topLevelCategories = categories.content.filter(
        (cat) => !cat.parentCategory
      );
      const secondLevelCategories = topLevelCategories.flatMap((topCat) =>
        topCat.sections.map((sec) => ({
          ...sec,
          parentCategory: topCat,
        }))
      );
      const thirdLevelCategories = secondLevelCategories.flatMap((sec) =>
        sec.categoryItems.map((item) => ({
          ...item,
          parentSection: sec,
        }))
      );

      setTopLevelCategories(topLevelCategories);
      setSecondLevelCategories(secondLevelCategories);
      setThirdLevelCategories(thirdLevelCategories);
    }
  }, [categories]);

  return (
    <div className="p-5 ">
      <Card className="mt-2 bg-[gray] p-5 space-y-5">
        <Typography variant="h5">Categories</Typography>

        <div className="">
          <SearchInput
            handleInputChange={handleInputChange}
            handleSearch={handleSearch}
            searchText={searchText}
          />
        </div>
        <div class="space-y-5">
          {renderTable(topLevelCategories, handleTopLevelCategoryClick)}

          {selectedTopLevelCategory && (
            <>
              <Typography variant="h6" gutterBottom>
                Subcategories of Level 1
              </Typography>
              {renderTable(
                secondLevelCategories.filter(
                  (sec) => sec.parentCategory.id === selectedTopLevelCategory
                ),
                handleSecondLevelCategoryClick
              )}
              {selectedSecondLevelCategory === null && (
                <Button
                  variant="outlined"
                  onClick={() => setSelectedTopLevelCategory(null)}
                >
                  Back to Top Level Categories
                </Button>
              )}
            </>
          )}
          {selectedSecondLevelCategory !== null && (
            <>
              <Typography variant="h6" gutterBottom>
                Subcategories of Level 2
              </Typography>
              {renderTable(
                thirdLevelCategories.filter(
                  (item) =>
                    item.parentSection.id === selectedSecondLevelCategory
                ),
                () => {} // No click action needed for third-level categories
              )}
              <Button
                variant="outlined"
                onClick={() => setSelectedSecondLevelCategory(null)}
              >
                Back to Second Level Categories
              </Button>
            </>
          )}
        </div>
      </Card>
      <section className="w-full px-[3.6rem]">
        <div className="flex justify-center px-4 py-5">
          <Pagination
            count={categories?.totalPages || 1}
            color="secondary"
            onChange={handlePaginationChange}
          />
        </div>
      </section>
    </div>
  );
};

export default CategoryTable;
