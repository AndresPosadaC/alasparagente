import React from 'react';

import PatientForm from './PatientForm';
import './NewPatient.css';

const NewPatient = (props) => {
  return (
    <div className='new-patient'>
      <PatientForm />
    </div>
  );
};

export default NewPatient;