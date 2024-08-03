import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Pagination,
  Radio,
  RadioGroup,
} from "@mui/material";
import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { findProducts } from "../../../State/Product/Action";
import { filters, singleFilter } from "./FilterData";

const ProductCard = lazy(() => import("./ProductCard"));

const sortOptions = [
  //   { name: "Most Popular", href: "#", current: true },
  // { name: "Best Rating", href: "#", current: false },
  { name: "Newest", value: "newest", current: false },
  { name: "Best Selling", value: "best_selling", current: false },
  { name: "Price: Low to High", value: "price_low", current: false },
  { name: "Price: High to Low", value: "price_high", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SearchProduct = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("search" || "");
  const { products } = useSelector((store) => store.products);
  console.log(products);

  const [selectedRadio, setSelectedRadio] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const priceValue = searchParams.get("price");
  const discount = searchParams.get("discount");
  const sortValue = searchParams.get("sort");
  const pageNumber = searchParams.get("page") || 1;  
  const stock = searchParams.get("stock");

  // Xử lý phần trang
  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  // Xử lý sort
  const handleSortChange = (value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);

    let filterValue = searchParams.getAll(sectionId);
    if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
      filterValue = filterValue[0].split(",").filter((item) => item !== value);
      if (filterValue.length === 0) {
        searchParams.delete(sectionId);
      }
    } else {
      filterValue.push(value);
    }

    if (filterValue.length > 0) {
      searchParams.set(sectionId, filterValue.join(","));
    }
    const query = searchParams.toString();
    navigate({ search: `${query}` });
  };

  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    const currentValue = searchParams.get(sectionId);

    if (currentValue === e.target.value) {
      searchParams.delete(sectionId);
      setSelectedRadio((prev) => ({ ...prev, [sectionId]: null }));
    } else {
      searchParams.set(sectionId, e.target.value);
      setSelectedRadio((prev) => ({ ...prev, [sectionId]: e.target.value }));
    }

    const query = searchParams.toString();
    navigate({ search: query });
  };

  useEffect(() => {
    if (searchText) {
      // Fetch products after resetting categories
      const fetchProducts = async () => {
        try {
          if (products) {
            const [minPrice, maxPrice] =
              priceValue === null
                ? [0, 100]
                : priceValue.split("-").map(Number);

            // Chuyển đổi giá trị stock
            let stockValue;
            switch (stock) {
              case "Out Of Stock":
                stockValue = "out_of_stock";
                break;
              case "In Stock":
                stockValue = "in_stock";
                break;
              default:
                stockValue = "";
                break;
            }

            const data = {
              parentCategoryName: null,
              category: null,
              colors: colorValue ? colorValue.split(",") : [],
              sizes: sizeValue ? sizeValue.split(",") : [],
              minPrice,
              maxPrice,
              minDiscount: discount || 0,
              sort: sortValue || "price_low",
              pageNumber: pageNumber - 1,
              pageSize: 10,
              stock: stockValue,
            };

            // Log dữ liệu gửi đi để kiểm tra
            console.log("product data:", data);

            await dispatch(findProducts(data));
          }
        } catch (error) {
          console.error("Failed to fetch products", error);
        }
      };

      fetchProducts();
    }
  }, [
    colorValue,
    sizeValue,
    priceValue,
    sortValue,
    discount,
    pageNumber,
    stock,
    dispatch,
  ]);
  return (
    <div className="py-10 bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="w-6 h-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="px-4 py-6 border-t border-gray-200"
                  >
                    <h3 className="flow-root -mx-2 -my-3">
                      <DisclosureButton className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white group hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="flex items-center ml-6">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              onChange={() =>
                                handleFilter(option.value, section.id)
                              }
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="flex-1 min-w-0 ml-3 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
                {singleFilter.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="px-4 py-6 border-t border-gray-200"
                  >
                    <h3 className="flow-root -mx-2 -my-3">
                      <DisclosureButton className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white group hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="flex items-center ml-6">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={selectedRadio[section.id] || ""}
                          >
                            {section.options.map((option, optionIdx) => (
                              <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                                onChange={(e) =>
                                  handleRadioFilterChange(e, section.id)
                                }
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="px-4 mx-auto sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem
                        as="button"
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={classNames(
                          option.current
                            ? "font-medium text-gray-900"
                            : "text-gray-500",
                          "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                        )}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="p-2 ml-5 -m-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="p-2 ml-4 -m-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="w-5 h-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}
              <div>
                <div className="flex items-center justify-between py-10">
                  <h1 className="text-lg font-bold opacity-50">Filters</h1>
                  <FilterListIcon />
                </div>
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    className="pb-6 space-y-4 text-sm font-medium text-gray-900 border-b border-gray-200"
                  ></ul>

                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="py-6 border-b border-gray-200"
                    >
                      <h3 className="flow-root -my-3">
                        <DisclosureButton className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white group hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="flex items-center ml-6">
                            <PlusIcon
                              aria-hidden="true"
                              className="h-5 w-5 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                onChange={() =>
                                  handleFilter(option.value, section.id)
                                }
                                defaultValue={option.value}
                                defaultChecked={option.checked}
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                  {singleFilter.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="py-6 border-b border-gray-200"
                    >
                      <>
                        <h3 className="flow-root -my-3">
                          <DisclosureButton className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white group hover:text-gray-500">
                            {/* <span className="font-medium text-gray-900">
                            </span> */}
                            <FormLabel
                              sx={{ color: "black" }}
                              id="demo-radio-buttons-group-label"
                            >
                              {section.name}
                            </FormLabel>
                            <span className="flex items-center ml-6">
                              <PlusIcon
                                aria-hidden="true"
                                className="h-5 w-5 group-data-[open]:hidden"
                              />
                              <MinusIcon
                                aria-hidden="true"
                                className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                              />
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-4">
                            <FormControl>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={selectedRadio[section.id] || ""}
                              >
                                {section.options.map((option, optionIdx) => (
                                  <FormControlLabel
                                    key={option.value}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                    onChange={(e) =>
                                      handleRadioFilterChange(e, section.id)
                                    }
                                  />
                                ))}
                              </RadioGroup>
                            </FormControl>
                          </div>
                        </DisclosurePanel>
                      </>
                    </Disclosure>
                  ))}
                </form>
              </div>

              {/* Product grid */}
              <div className="w-full lg:col-span-4">
                <div className="flex flex-wrap justify-center py-5 bg-white">
                  {products &&
                    products?.content?.map((item, index) => (
                      <ProductCard key={index} product={item} />
                    ))}
                </div>
              </div>
            </div>
          </section>
          <section className="w-full px-[3.6rem]">
            <div className="flex justify-center px-4 py-5">
              <Pagination
                count={products?.totalPages}
                color="secondary"
                onChange={handlePaginationChange}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SearchProduct;
