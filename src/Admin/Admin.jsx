import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import InventoryIcon from "@mui/icons-material/Inventory";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AddIcon from "@mui/icons-material/Add";
import {
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./Admin.css";
import api from "../config/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { getAdminData } from "../State/Auth/Action";

const CreateProductForm = lazy(() => import("./components/CreateProductForm"));
const EditProductForm = lazy(() => import("./components/EditProductForm"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const ProductTable = lazy(() => import("./components/ProductsTable"));
const OrdersTable = lazy(() => import("./components/OrdersTable"));
const CustomersTable = lazy(() => import("./components/CustomersTable"));

const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", icon: <InventoryIcon /> },
  { name: "Customers", path: "/admin/customers", icon: <AccessibilityIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <PlaylistAddCheckIcon /> },
  {
    name: "Add Product",
    path: "/admin/product/create",
    icon: <AddIcon />,
  },
];

const LoadingFallback = () => (
  <div className="flex items-center justify-center w-screen h-screen bg-white">
    <h1 className="text-2xl font-bold">Loading...</h1>
  </div>
);

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const {adminData, isLoading, error } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // handle admin
  useEffect(() => {
    dispatch(getAdminData());
  }, [dispatch]);

  useEffect(() => {
    if (error === "You don't have permission to access this page.") {
      navigate('/error', { state: { message: error } });
    }
  }, [error, navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (!adminData) {
    return null;
  }

  const drawer = (
    <Box
      sx={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <>
        <List>
          {menu.map((item, index) => (
            <ListItem
              key={item.name}
              disablePadding
              onClick={() => navigate(item.path)}
              sx={{
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
              }}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} sx={{ ml: 2 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </>

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" sx={{ ml: 2 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="relative flex h-[100vh]">
        <CssBaseline />
        <div className="sidebar">{drawer}</div>
        <div className="content">
          <Routes>
            <Route path="/" element={<AdminDashboard />}></Route>
            <Route
              path="/product/create"
              element={<CreateProductForm />}
            ></Route>
            <Route
              path="/products/update-product/:productId"
              element={<EditProductForm />}
            ></Route>
            <Route path="/products" element={<ProductTable />}></Route>
            <Route path="/orders" element={<OrdersTable />}></Route>
            <Route path="/customers" element={<CustomersTable />}></Route>
          </Routes>
        </div>
      </div>
    </Suspense>
  );
};

export default Admin;
