import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../State/Order/Action";
import AddressCard from "../AddressCard/AddressCard";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector(store => store.order);
  
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (order.order && order.order.shippingAddress) {
      const { firstName, lastName, streetAddress, city, state, zipCode, phoneNumber } = order.order.shippingAddress;
      setAddress({
        firstName: firstName || "",
        lastName: lastName || "",
        streetAddress: streetAddress || "",
        city: city || "",
        state: state || "",
        zipCode: zipCode || "",
        phoneNumber: phoneNumber || "",
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !address.firstName ||
      !address.lastName ||
      !address.streetAddress ||
      !address.city ||
      !address.state ||
      !address.zipCode ||
      !address.phoneNumber
    ) {
      console.error("All fields are required!");
      return;
    }

    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
  };

  return (
    <div className="grid items-start justify-center w-full grid-cols-2 px-2 mt-0 space-x-0 space-y-10 lg:space-y-0 lg:space-x-8">
      <div className="col-span-2 lg:col-span-1" sx={{ width: "100%" }}>
        <Grid className="shadow-md border rounded-e-md h-[30.5rem] overflow-y-scroll">
          <div className="p-5 border-b cursor-pointer py-7">
            <AddressCard />
            <Button
              variant="contained"
              sx={{
                px: "2.5rem",
                py: ".7rem",
                width: "100%",
                mt: 2,
                bgcolor: "#4338CA",
                "&:hover": {
                  bgcolor: "#4035b7",
                },
                transition: "bgcolor ease-out",
              }}
            >
              Deliver Here
            </Button>
          </div>
        </Grid>
      </div>
      <div className="col-span-2 lg:col-span-1">
        <Box className="p-5 border shadow-md rounded-s-md">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={address.firstName}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={address.lastName}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="streetAddress"
                  name="streetAddress"
                  label="Address"
                  value={address.streetAddress}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="given-name"
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  value={address.city}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  value={address.state}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zipCode"
                  name="zipCode"
                  label="Zip/Postal code"
                  value={address.zipCode}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="shipping postal-code"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  value={address.phoneNumber}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    px: "2.5rem",
                    py: 1.5,
                    width: "100%",
                    mt: 2,
                    bgcolor: "#4338CA",
                    "&:hover": {
                      bgcolor: "#4035b7",
                    },
                    transition: "bgcolor ease-out",
                  }}
                >
                  Deliver Here
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default DeliveryAddressForm;
