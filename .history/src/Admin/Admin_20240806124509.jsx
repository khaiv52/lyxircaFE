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
  Box,
} from "@mui/material";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./Admin.css";
import { useDispatch, useSelector } from "react-redux";
import { getAdminData } from "../State/Auth/Action";
import {
  AccessibilityOutlined,
  AnalyticsOutlined,
  CategoryOutlined,
  ChatBubbleOutline,
  ChevronRight,
  ExpandMore,
  Inventory2Outlined,
  LocalShippingOutlined,
  LocationOnOutlined,
  PlaylistAddCheckOutlined,
  RadioButtonCheckedOutlined,
  RadioButtonUncheckedOutlined,
  RemoveOutlined,
  ReviewsOutlined,
  ShoppingBagOutlined,
  StackedBarChartOutlined,
  StorefrontOutlined,
} from "@mui/icons-material";
import CategoryForm from "./components/Category/CategoryForm";
import CategoryTable from "./components/Category/CategoryTable
";
import TopLevelCategoryEdit from "../Admin/components/Category/TopLevelCategoryEdit";


const CreateProductForm = lazy(() => import("./components/CreateProductForm"));
const EditProductForm = lazy(() => import("./components/EditProductForm"));
const AdminDashboard = lazy(() =>
  import("./components/Dashboard/AdminDashboard")
);
const ProductTable = lazy(() => import("./components/ProductsTable"));
const OrdersTable = lazy(() => import("./components/OrdersTable"));
const CustomersTable = lazy(() => import("./components/CustomersTable"));

const SecondLevelCategoryEdit = lazy(() =>
  import("../Admin/components/Category/SecondLevelCategoryEdit")
);
const ThirdLevelCategoryEdit = lazy(() =>
  import("../Admin/components/Category/ThirdLevelCategoryEdit")
);

const menu = [
  {
    id: "dashboard",
    name: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon />,
    subMenu: [
      { id: "crm", name: "CRM", path: "", icon: <StackedBarChartOutlined /> },
      {
        id: "analytics",
        name: "Analytics",
        path: "",
        icon: <AnalyticsOutlined />,
      },
    ],
  },
  {
    id: "ecommerce",
    name: "Ecommerce",
    path: "",
    icon: <ShoppingBagOutlined />,
    subMenu: [
      {
        id: "orders",
        name: "Orders",
        path: "/admin/orders",
        icon: <PlaylistAddCheckOutlined />,
        subMenu: [
          {
            id: "orders-list",
            name: "List",
            path: "",
            icon: <RemoveOutlined />,
          },
        ],
      },
      {
        id: "products",
        name: "Products",
        path: "/admin/products",
        icon: <Inventory2Outlined />,
        subMenu: [
          {
            id: "products-list",
            name: "List",
            path: "",
            icon: <RemoveOutlined />,
          },
          {
            id: "products-add",
            name: "Add",
            path: "/create",
            icon: <RemoveOutlined />,
          },
        ],
      },
      {
        id: "categories",
        name: "Categories",
        path: "",
        icon: <CategoryOutlined />,
        subMenu: [
          {
            id: "categories-list",
            name: "List",
            path: "/admin/categories",
            icon: <RemoveOutlined />,
          },
          {
            id: "categories-add",
            name: "Add",
            path: "/admin/categories/add",
            icon: <RemoveOutlined />,
          },
        ],
      },
      {
        id: "customers",
        name: "Customers",
        path: "",
        icon: <AccessibilityOutlined />,
        subMenu: [
          {
            id: "customers-list",
            name: "List",
            path: "/admin/customers",
            icon: <RemoveOutlined />,
          },
        ],
      },
      {
        id: "reviews-ratings",
        name: "Reviews",
        path: "",
        icon: <ReviewsOutlined />,
      },
      {
        id: "location",
        name: "Location",
        path: "",
        icon: <LocationOnOutlined />,
      },
      {
        id: "shipping-address",
        name: "Shipping",
        path: "",
        icon: <LocalShippingOutlined />,
      },
      {
        id: "store-detail",
        name: "Store Details",
        path: "",
        icon: <StorefrontOutlined />,
      },
    ],
  },
  { id: "chat", name: "Chat", path: "", icon: <ChatBubbleOutline /> },
];

const LoadingFallback = () => (
  <div className="flex items-center justify-center w-screen h-screen bg-white">
    <h1 className="text-2xl font-bold">Loading...</h1>
  </div>
);

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [openMenu, setOpenMenu] = useState({});
  const { adminData, isLoading, error } = useSelector((store) => store.auth);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminData());
  }, [dispatch]);

  useEffect(() => {
    if (error === "You don't have permission to access this page.") {
      navigate("/error", { state: { message: error } });
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

  const handleMenuClick = (id) => {
    setOpenMenu((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderMenu = (items, parentPath = "") => (
    <List
      sx={{ width: "100%", display: "flex", flexDirection: "column", flex: 1 }}
    >
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <ListItem
            disablePadding
            sx={{ width: "100%" }}
            onClick={() =>
              item.subMenu
                ? handleMenuClick(item.id)
                : navigate(`${parentPath}${item.path}`)
            }
          >
            <ListItemButton sx={{ width: "100%" }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{ flex: 1, whiteSpace: "nowrap" }}
              />
              {item.subMenu &&
                (openMenu[item.id] ? <ExpandMore /> : <ChevronRight />)}
            </ListItemButton>
          </ListItem>
          {item.subMenu && openMenu[item.id] && (
            <Box>{renderMenu(item.subMenu, `${parentPath}${item.path}`)}</Box>
          )}
        </React.Fragment>
      ))}
    </List>
  );

  const drawer = (
    <Box
      sx={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        width: isLargeScreen ? "240px" : "100%",
        scrollbarColor: "gray",
      }}
    >
      {/* Radio button for expanding / collapsing sidebar */}
      <ListItem disablePadding>
        <ListItemButton onClick={() => setIsExpanded((prev) => !prev)}>
          {isExpanded ? (
            <RadioButtonCheckedOutlined />
          ) : (
            <RadioButtonUncheckedOutlined />
          )}
        </ListItemButton>
      </ListItem>
      {renderMenu(menu)}
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" sx={{ ml: 1 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
<Suspense fallback={<LoadingFallback />}>
  <div className="relative flex flex-col">
    <CssBaseline />
    <Box className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      {drawer}
    </Box>
    <div className="content">
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/products/create" element={<CreateProductForm />} />
        <Route path="/products/update-product/:productId" element={<EditProductForm />} />
        <Route path="/products" element={<ProductTable />} />
        <Route path="/orders" element={<OrdersTable />} />
        <Route path="/customers" element={<CustomersTable />} />
        <Route path="/categories/add" element={<CategoryForm />} />
        <Route path="/categories" element={<CategoryTable />} />
        <Route path="/update-top-level/:id" element={<TopLevelCategoryEdit />} />
        <Route path="/update-second-level/:id" element={<SecondLevelCategoryEdit />} />
        <Route path="/update-third-level/:id" element={<ThirdLevelCategoryEdit />} />
      </Routes>
    </div>
  </div>
</Suspense>
);
};

export default Admin;
