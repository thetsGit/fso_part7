import { useState } from "react";

const useField = (name) => {
  const [value, setValue] = useState("");
  const handleChange = (e) => setValue(e.target.value);
  const reset = () => setValue("");
  return {
    value,
    handleChange,
    name,
    reset,
  };
};

export default useField;
