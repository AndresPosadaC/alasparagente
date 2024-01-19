import React from 'react';

import GeneralmedForm from './GeneralmedForm';
import './NewMedic.css';

const NewGeneralmed = (props) => {
  // console.log("enteredIdNumDoc in NewGeneralmed: ", props);
  return (
    <div className='new-medic'>
      <GeneralmedForm/>
    </div>
  );
};

export default NewGeneralmed; 
