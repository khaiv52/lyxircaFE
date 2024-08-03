import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const steps = [
  "PLACED",
  "CONFIRMED",
  "CANCELLED"
];

const OrderTrackerCancel = ({ activeStep }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div className="w-full">
      <Stepper 
        activeStep={activeStep} 
        orientation={isMobile ? "vertical" : "horizontal"} 
        alternativeLabel={!isMobile}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel
              sx={{
                color: "red", // or use orange if you prefer: color: "orange"
                fontSize: isMobile ? "20px" : "44px",
                fontWeight: "bold",
                // Optionally add additional styles here
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTrackerCancel;
