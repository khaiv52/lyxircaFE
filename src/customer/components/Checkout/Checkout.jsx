import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import DeliveryAddressForm from "./DeliveryAddressForm";
import OrderSummary from "./OrderSummary";

const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  const stepQuery = querySearch.get("step");

  // Convert stepQuery to integer
  const step = stepQuery ? parseInt(stepQuery, 10) : 0;
  
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  React.useEffect(() => {
    setActiveStep(step);
  }, [step]);

  return (
    <div className="px-10 py-10 lg:px-20">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} orientation={isMobile ? "vertical" : "horizontal"}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            </Box>
            <div className="mt-5">
              {activeStep === 2 ? <DeliveryAddressForm /> : <OrderSummary />}
            </div>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
