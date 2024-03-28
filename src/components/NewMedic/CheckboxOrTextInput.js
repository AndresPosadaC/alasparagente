import React from "react";
import { FormControlLabel, Switch } from "@mui/material";

const CheckboxOrTextInput = (props) => {
  return (
    <label htmlFor={props.id}>
      {props.label}
      <FormControlLabel
        control={
          props.isCheckbox ? (
            <Switch
              checked={props.checked}
              onChange={props.onChange}
              inputProps={{ "aria-label": "controlled" }}
              
            />
          ) : (
            <input
              type="text"
              className={`input ${props.inputSize}`}
              value={props.value}
              onChange={props.onChange}
            />
          )
        }
        label={props.checked ? 'Si' : ''}
        htmlFor={props.id}
      />
    </label>
  );
};

export default CheckboxOrTextInput;
