import React from 'react';

import PatientForm from './PatientForm';
import PatientRemite from './PatientRemite';
import './NewPatient.css';

const NewPatient = (props) => {
  return (
    <div className='new-patient'>
      <PatientForm />
      <PatientRemite /> 
    </div>
  );
};

export default NewPatient;