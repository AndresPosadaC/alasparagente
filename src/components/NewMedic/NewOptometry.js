import React from 'react';

import OptometryForm from './OptometryForm';
import './NewMedic.css';

const NewOptometry = (props) => {
  // console.log("enteredIdNumDoc in NewOptometry: ", props);
  return (
    <div className='new-medic'>
      <OptometryForm/>
    </div>
  );
};

export default NewOptometry; 
