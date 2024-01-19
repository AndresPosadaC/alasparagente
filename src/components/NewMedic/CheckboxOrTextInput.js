import React from 'react';
 
const CheckboxOrTextInput = (props) => {
  return (
    <label htmlFor={props.id}>
      {props.label}
      {props.isCheckbox ? (
        <input
          id={props.id}
          type="checkbox"
          checked={props.checked}
          onChange={props.onChange}
        />
      ) : (
        <input
          id={props.id}
          type="text"
          className={`input ${props.inputSize}`}
          value={props.value}
          onChange={props.onChange}
        />
      )}
    </label>
  );
};

export default CheckboxOrTextInput;
