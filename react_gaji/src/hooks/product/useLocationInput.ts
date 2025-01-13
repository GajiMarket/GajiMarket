import { useState } from "react";

const useLocationInput = () => {
  const [locationInput, setLocationInput] = useState("");

  const handleInputChange = (input: string) => {
    setLocationInput(input);
  };

  return {
    locationInput,
    setLocationInput,
    handleInputChange,
  };
};

export default useLocationInput;