import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonalDetailsForm from "./PersonalDetailsForm";
import AddressDetailsForm from "./AddressDetailsForm";
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import { ContextType, ICartType, ProductType } from "../types/types";

const steps = ["Personal Details", "Address", "Payment"];
const message = [
  "Success sealed! Your order has been gracefully placed",
  "Your purchase has been successfully secured!",
  "Your digital treasure is secured! Order confirmed!",
  "Your order is officially in the pipeline!",
  "Your order journey begins!",
  "Congratulations, your order is in motion! Happy shopping!"
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const { cart, updateCart, productList, updateProductList, mainList } = React.useContext(Context) as ContextType;

  const navigate = useNavigate();

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  

  const handleReset = () => {
    navigate('/productpage');
    updateCart([]);
    updateProductList([...mainList])
  };

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }


  return (
    <Box sx={{ width: "65%", margin: "auto" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ color: 'green', textAlign: "center", mt: 5, fontWeight: 700 }}>
            {message[getRandomInt(6)]}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Continue Shopping</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep + 1 === 1 && <PersonalDetailsForm />}
          {activeStep + 1 === 2 && <AddressDetailsForm />}
          {activeStep + 1 === 3 && <Payment />}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Place Order" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}