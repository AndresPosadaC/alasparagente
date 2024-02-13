import React from 'react';

import TriageForm from './TriageForm';
import PatientRemite from './PatientRemite';
import './NewPatient.css';

const NewTriage = (props) => {
  return (
    <div className='new-patient'>
      <TriageForm />
      <PatientRemite />
    </div>
  );
};

export default NewTriage;