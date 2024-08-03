import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../State/Category/Action";
import { getProductsByCategoryName } from "../../../State/Product/Action";

const HomeCarousel = lazy(() =>
  import("../../components/Carousel/HomeCarousel")
);
const HomeSelectionCarousel = lazy(() =>
  import("../../components/HomeSelectionCarousel/HomeSelectionCarousel")
);

const NUMER_OF_ITEMS = 8;

const HomePage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((store) => store.category);
  const { productsByCategory, loading } = useSelector(
    (state) => state.products
  );
  console.log(productsByCategory);

  const [shuffledCategoryItems, setShuffledCategoryItems] = useState([]);
  const [dataLoadingStatus, setDataLoadingStatus] = useState("loading");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await dispatch(getAllCategory());
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setDataLoadingStatus("error");
      }
    };
    fetchCategories();
  }, [dispatch]);

  // Update shuffledCategoryItems and fetch products
  useEffect(() => {
    if (categories.length > 0) {
      const allCategoryItems = categories.flatMap((category) =>
        category.sections.flatMap((section) => section.categoryItems)
      );

      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      const shuffledItems = shuffleArray(allCategoryItems);
      const selectedItems = shuffledItems.slice(0, NUMER_OF_ITEMS);
      setShuffledCategoryItems(selectedItems);

      const getAllProductsByCategoryName = async () => {
        try {
          if (selectedItems.length > 0) {
            await Promise.all(
              selectedItems.map((item) =>
                dispatch(getProductsByCategoryName(item.name))
              )
            );
            setDataLoadingStatus("loaded");
          }
        } catch (error) {
          console.error("Failed to fetch products:", error);
          setDataLoadingStatus("error");
        }
      };

      getAllProductsByCategoryName();
    }
  }, [categories, dispatch]);

  // Kiểm tra xem tất cả dữ liệu đã được tải chưa
  const isAllDataLoaded = shuffledCategoryItems.every(
    (item) =>
      productsByCategory[item.name] && productsByCategory[item.name].length > 0
  );

  useEffect(() => {
    if (isAllDataLoaded && shuffledCategoryItems.length > 0) {
      setDataLoadingStatus("loaded");
    } else if (!loading) {
      setDataLoadingStatus("error");
    }
  }, [isAllDataLoaded, loading, shuffledCategoryItems]);

  if (dataLoadingStatus === "loading") {
    return (
      <div className="flex items-center justify-center w-full h-full text-xl font-bold">
        Loading all product data...
      </div>
    );
  }
  if (dataLoadingStatus === "error") {
    return (
      <div className="flex items-center justify-center w-full h-full text-xl font-bold">
        Error loading data...
      </div>
    );
  }

  return (
    <div>
      <HomeCarousel />
      <div className="flex flex-col justify-center px-5 py-20 space-y-10 lg:px-10">
        {shuffledCategoryItems.map((section) => {
          const sectionData = productsByCategory[section.name];
          if (!Array.isArray(sectionData) || sectionData.length === 0) {
            return null;
          }
          return (
            <HomeSelectionCarousel
              key={section.id}
              data={sectionData}
              sectionName={section.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
