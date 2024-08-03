import React, { useState, useRef, lazy } from "react";
import AliceCarousel from "react-alice-carousel";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button } from "@mui/material";

const HomeSectionCard = lazy(() => import("../HomeSectionCard/HomeSectionCard"))

const HomeSelectionCarousel = ({ data, sectionName , productsByCategory }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const responsive = {
    0: { items: 1 },
    540: { items: 2 },
    720: { items: 3 },
    960: { items: 4 },
    1280: { items: 5 },
  };

  const getCurrentItemsCount = () => {
    if (window.innerWidth < 540) {
      return responsive[0].items;
    } else if (window.innerWidth < 720) {
      return responsive[540].items;
    } else if (window.innerWidth < 960) {
      return responsive[720].items;
    } else if (window.innerWidth < 1280) {
      return responsive[960].items;
    } else {
      return responsive[1280].items;
    }
  };

  const slidePrev = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      carouselRef.current.slideTo(newIndex);
      return newIndex;
    });
  };

  const slideNext = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = Math.min(
        prevIndex + 1,
        items.length - getCurrentItemsCount()
      );
      carouselRef.current.slideTo(newIndex);
      return newIndex;
    });
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = data
    .slice(0, 10)
    .map((item) => <HomeSectionCard key={item.id} product={item} />);

  console.log(data)

  return (
    <div className="border">
      <h2 className="py-5 text-2xl font-extrabold text-center text-gray-800 md:ml-10 md:text-left">
        {sectionName}
      </h2>
      <div className="relative p-5 md:p-2 lg:p-5">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          disableButtonsControls
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />
        {activeIndex <
          items.length - getCurrentItemsCount() && (
          <Button
            onClick={slideNext}
            variant="contained"
            sx={{
              position: "absolute",
              top: { xs: "8rem", md: "10rem" },
              right: { xs: "-0.5rem", md: "0rem" },
              transform: {
                xs: "translateX(50%) rotate(90deg)",
                md: "translateX(50%) rotate(90deg)",
              },
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                color: "white",
              },
            }}
            aria-label="next"
          >
            <KeyboardArrowLeftIcon
              sx={{
                transform: "rotate(90deg)",
              }}
            />
          </Button>
        )}

        {activeIndex > 0 && (
          <Button
            onClick={slidePrev}
            variant="contained"
            sx={{
              position: "absolute",
              top: { xs: "8rem", md: "10rem" },
              left: { xs: "-0.5rem", md: "0rem" },
              transform: {
                xs: "translateX(-50%) rotate(270deg)",
                md: "translateX(-50%) rotate(270deg)",
              },
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                color: "white",
              },
            }}
            aria-label="prev"
          >
            <KeyboardArrowLeftIcon
              sx={{
                transform: "rotate(90deg)",
              }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSelectionCarousel;
