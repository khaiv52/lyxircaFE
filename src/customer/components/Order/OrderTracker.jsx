import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const steps = [
  "Placed",
  "Order Confirmed",
  "Shipped",
  "Out For Delivery",
  "Delivered",
];

const OrderTracker = ({ activeStep }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div className="w-full">
      <Stepper activeStep={activeStep} orientation={isMobile ? "vertical" : "horizontal"} alternativeLabel = {!isMobile}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel sx={{ color: "#9155FD", fontSize: "44px" }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTracker;
