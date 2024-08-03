import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, lazy, useEffect, useRef, useState } from "react";

import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser, logout } from "../../../State/Auth/Action";
import { getAllCategory } from "../../../State/Category/Action";
import SearchBox from "../Search/SearchBox";
import LogoutConfirm from "./LogoutConfirm";
import { navigation } from "./NavigationData";

const AuthModel = lazy(() => import("../../Auth/AuthModel"));

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // Processing logout confirm modal
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const openUserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt");
  // console.log(jwt)
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const { cart } = useSelector((store) => store.cart);
  // console.log(cart);
  const cartItemCount = cart?.cartItems ? cart?.cartItems.length : 0;
  // console.log(cartItemCount);
  // Categories
  const { categories } = useSelector((store) => store.category);
  console.log(categories);

  // Set state open for search input
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const inputRef = useRef(null);
  // const containerRef = useRef(null);

  const handleUserClick = (event) => {
    if (event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleCloseUserMenu = (event) => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
  };
  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleCategoryClick = (category, section, item, close) => {
    console.log("Category:", category);
    console.log("Section:", section);
    console.log("Item:", item);
    navigate(`/${category.name}/${section.name}/${item.name}`);
    close();
  };

  const handleCategoryClickForMobile = (category, section, item, close) => {
    navigate(`/${category.name}/${section.name}/${item.name}`);
    setOpen(false);
  };

  const handleClickCart = () => {
    navigate("/cart");
  };
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  useEffect(() => {
    if (auth.user) {
      handleClose();
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1);
    }
  }, [auth.user]);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleClickToHome = () => {
    navigate("/");
  };

  // fetch categories
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  // const navigation = {
  //   categories: categories.map((category) => {
  //     return {
  //       ...category,
  //       featured: category.features,
  //       sections: categories.filter(secCat => secCat.parentCategory?.id === category?.id)
  //       .map((subCategory) => ({
  //         ...subCategory,
  //         items: categories.filter(thirdCat => thirdCat.parentCategory?.id === subCategory?.id)
  //       }))
  //     }
  //   })
  // }

  // const handleSearchClick = () => {
  //   setIsSearchOpen(true);
  // };

  // const handleClickOutside = (event) => {
  //   if (containerRef.current && !containerRef.current.contains(event.target))
  //     setIsSearchOpen(false);
  // };

  // useEffect = () => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // };


  return (
    <div className="bg-white">
      <LogoutConfirm
        open={showLogoutConfirm}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
      />
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="flex px-4 -mb-px space-x-8">
                      {categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium border-none"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {categories?.map((category) => (
                      <Tab.Panel
                        key={category?.name}
                        className="px-4 pt-10 pb-8 space-y-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category?.features.map((item) => (
                            <div
                              key={item?.name}
                              className="relative text-sm group"
                            >
                              <div className="overflow-hidden bg-gray-100 rounded-lg aspect-h-1 aspect-w-1 group-hover:opacity-75">
                                <img
                                  src={item?.imageSrc}
                                  alt={item?.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                href={item?.href}
                                className="block mt-6 font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item?.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category?.sections.map((section) => (
                          <div key={section?.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section?.name}
                            </p>
                            {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                            <ul
                              role="list"
                              aria-labelledby={`${category?.id}-${section?.id}-heading-mobile`}
                              className="flex flex-col mt-6 space-y-6"
                            >
                              {section?.categoryItems.map((item) => (
                                <li key={item?.id} className="flex">
                                  <p
                                    onClick={() =>
                                      handleCategoryClickForMobile(
                                        category,
                                        section,
                                        item
                                      )
                                    }
                                    className="cursor-pointer hover:text-gray-800"
                                  >
                                    {item?.name}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
                <div className="px-2 py-6 space-y-6 border-t border-gray-200">
                  {auth.user?.firstName ? (
                    <div>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        sx={{
                          bgcolor: deepPurple[500],
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {auth.user?.firstName[0].toUpperCase()}
                      </Avatar>
                      {/* <Button
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleUserClick}
                        >
                          Dashboard
                        </Button> */}
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={() => navigate("/profile")}>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={() => navigate("account/order")}>
                          {" "}
                          My Orders
                        </MenuItem>
                        <MenuItem onClick={handleLogout}> Logout </MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      onClick={handleOpen}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {location.pathname === "/login" ? "Login" : "Register"}
                    </Button>
                  )}
                </div>
                <div className="px-4 py-6 border-t border-gray-200">
                  <a href="/" className="flex items-center p-2 -m-2">
                    <img
                      src="https://lh3.googleusercontent.com/d/1-5rPmoc7WWH6c5O_3EzQdIQg2Yn7oWqA"
                      alt=""
                      className="flex-shrink-0 block w-5 h-auto"
                    />
                    <span className="block ml-3 text-base font-medium text-gray-900">
                      VND
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto">
          <div className="border-b border-gray-200">
            <div className="flex items-center h-16 px-11">
              <button
                type="button"
                className="p-2 text-gray-400 bg-white rounded-md lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="w-6 h-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="flex ml-4 lg:ml-0">
                <div className="flex items-center" onClick={handleClickToHome}>
                  <span className="sr-only">Your Company</span>
                  <img
                    src="https://lh3.googleusercontent.com/d/1lgWaeJhRAu7xhYoLusAjC7oelmflUH4b"
                    alt="Lyxrica"
                    className="w-8 h-8 mr-2"
                  />
                </div>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="z-10 hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 text-sm text-gray-500 top-full">
                              <div
                                className="absolute inset-0 bg-white shadow top-1/2"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="px-8 mx-auto max-w-7xl">
                                  <div className="grid grid-cols-2 py-16 gap-x-8 gap-y-10">
                                    <div className="grid grid-cols-2 col-start-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="relative text-base group sm:text-sm"
                                        >
                                          <div className="overflow-hidden bg-gray-100 rounded-lg aspect-h-1 aspect-w-1 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="block mt-6 font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="grid grid-cols-3 row-start-1 text-sm gap-x-8 gap-y-10">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <p
                                                  onClick={() =>
                                                    handleCategoryClick(
                                                      category,
                                                      section,
                                                      item,
                                                      close
                                                    )
                                                  }
                                                  className="cursor-pointer hover:text-gray-800"
                                                >
                                                  {item.name}
                                                </p>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>
              
              <div className="flex items-center justify-center w-full h-full">
                <SearchBox />
              </div>
              <div className="flex items-center ml-auto">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {auth.user?.firstName ? (
                    <div>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        sx={{
                          bgcolor: deepPurple[500],
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {auth.user?.firstName[0].toUpperCase()}
                      </Avatar>
                      {/* <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleUserClick}
                      >
                        Dashboard
                      </Button> */}
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={() => navigate("/profile")}>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={() => navigate("account/order")}>
                          {" "}
                          My Orders
                        </MenuItem>
                        <MenuItem onClick={handleLogout}> Logout </MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      onClick={handleOpen}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {location.pathname === "/login" ? "Login" : "Register"}
                    </Button>
                  )}
                </div>

                {/* Search */}
                {/* <div
                  ref={containerRef}
                  className={`flex items-center lg:ml-6
                ${isSearchOpen ? "justify-center" : "justify-end"}
                `}
                >
                  {isSearchOpen && (
                    <input
                      ref={inputRef}
                      className={`transition-all duration-300 ${
                        isSearchOpen ? "w-60 opacity-100" : "w-0 opacity-0"
                      } p-2 border border-gray-300 rounded-lg`}
                    ></input>
                  )}
                  <button
                    onClick={handleSearchClick}
                    className={`flex items-center p-2 text-gray-400 hover:text-gray-500 transition-all duration-300 ${
                      isSearchOpen ? "ml-2" : ""
                    }`}
                  >
                    <MagnifyingGlassIcon
                      className="w-6 h-6"
                      aria-hidden="true"
                    />
                  </button>
                </div> */}

                {/* Cart */}
                <div className="flow-root ml-4 lg:ml-6">
                  <Button
                    variant="ghost"
                    className="flex items-center p-2 -m-2 group"
                    onClick={handleClickCart}
                    size="icon"
                  >
                    <ShoppingBagIcon
                      className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    {cartItemCount > 0 && (
                      <span className="absolute right-[10%] top-0 text-sm font-medium text-gray-700 group-hover:text-gray-800 rounded-lg w-[20px] h-[20px] bg-slate-100">
                        {cartItemCount}
                      </span>
                    )}
                    <span className="sr-only">items in cart, view bag</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AuthModel handleClose={handleClose} open={openAuthModal} />
    </div>
  );
}
