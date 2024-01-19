import { useState } from "react";

function useRadioButton(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return [value, handleChange];
}

export default useRadioButton;
