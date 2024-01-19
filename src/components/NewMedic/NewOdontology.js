import React from 'react';

import OdontologyForm from './OdontologyForm';
import './NewMedic.css';

const NewOdontology = (props) => {
  // console.log("enteredIdNumDoc in NewOdontology: ", props);
  return (
    <div className='new-medic'>
      <OdontologyForm/>
    </div>
  );
};

export default NewOdontology; 
