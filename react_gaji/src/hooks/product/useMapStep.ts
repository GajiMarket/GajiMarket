import { useState } from "react";

const useMapStep = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const resetStep = () => {
    setStep(1);
  };

  return {
    step,
    nextStep,
    resetStep,
  };
};

export default useMapStep;
