import React from "react";
import { FormControlLabel, Switch } from "@mui/material";

const CheckboxOrTextInput = (props) => {
  //console.log(props);
  return (
    <label htmlFor={props.id}>
      {props.isCheckbox ? (
        <div>
          {props.label}
          <FormControlLabel
            control={
              <Switch
                checked={props.checked}
                onChange={props.onChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={props.checked ? "Si" : "No"}
            htmlFor={props.id}
          />
        </div>
      ) : (
        <input
          type="text"
          className={`${props.inputSize}-input`}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.label} // Show label as placeholder
        />
      )}
    </label>
  );
};

export default CheckboxOrTextInput;
