import React, { useState } from 'react';
 
import Card from '../UI/Card';
import PatientsFilter from './PatientsFilter';
import PatientsList from './PatientsList';
import './Patients.css';

const Patients = (props) => {
  // console.log('Patients props.items:', props.items);

  // Check if props.items is defined, if not, use an empty array
  const patients = props.items || [];

  const [filteredCriteria, setFilteredCriteria] = useState(''); // Initialize with an empty string

  const filterChangeHandler = (selectedCriteria) => {
    setFilteredCriteria(selectedCriteria);
  };

  const filteredPatients = patients.filter((patient) => {
    if (!filteredCriteria) {
      return false; // Show all data without applying a filter (true)
    }
    
    return (
      (patient.id_num_doc?.toLowerCase().includes(filteredCriteria.toLowerCase()) ||
      patient.apellidos?.toLowerCase().includes(filteredCriteria.toLowerCase()))
    );
  });

  return (
    <div>
      <Card className='patients'>
        <PatientsFilter
          selected={filteredCriteria}
          onChangeFilter={filterChangeHandler}
        />
        <PatientsList items={filteredPatients} />
      </Card>
    </div>
  );
};

export default Patients;

