import { TrendingUp } from "@mui/icons-material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsCellIcon from "@mui/icons-material/SettingsCell";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const salesData = [
  {
    stats: "245K",
    title: "Sales",
    color: "#E5D6BA", // Using theme color syntax
    icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "12.5K",
    title: "Customers",
    color: "#22CB5C", // Using theme color syntax
    icon: <AccountCircleIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "1.54K",
    title: "Products",
    color: "#DE4839", // Using theme color syntax
    icon: <SettingsCellIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "88K",
    title: "Revenue",
    color: "#12B0E8", // Using theme color syntax
    icon: <AttachMoneyIcon sx={{ fontSize: "1.75rem" }} />,
  },
];

const rendersStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          variant="rounded"
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: "white",
            backgroundColor: `${item.color}` // Correctly using background color
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="h6">{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const MonthlyOverview = () => {
  return (
    <Card sx={{}}>
      <CardHeader
        title="Monthly Overview"
        action={
          <IconButton size="small">
            <MoreVertIcon sx={{color: 'white'}} />
          </IconButton>
        }
        subheader={
          <Typography variant="body2">
            <Box component="span" sx={{ fontWeight: 600 }}>
            Total 48.5% growth this month
            </Box>
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: ".15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)}` }}>
        <Grid container spacing={[5, 0]}>
          {rendersStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MonthlyOverview;
