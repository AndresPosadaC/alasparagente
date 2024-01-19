import React, { useState } from 'react';

import Card from '../UI/Card';
import MedicFilterOpto from './MedicFilterOpto';
import OptometryList from './OptometryList';
import './Medic.css';
 
const Medicopto = (props) => {
  //console.log('Medic:', props.items);

  // Check if props.items is defined, if not, use an empty array
  const medicHistory = props.items || [];

  const [filteredCriteria, setFilteredCriteria] = useState(''); // Initialize with an empty string

  const filterChangeHandler = (selectedCriteria) => {
    setFilteredCriteria(selectedCriteria);
  };

  const filteredPerson = medicHistory.filter((medHist) => {
    if (!filteredCriteria) {
      return false; // Show all data without applying a filter
    }

    // Check if id_num_doc is in 
    return (
      medHist.id_num_doc.toLowerCase().includes(filteredCriteria.toLowerCase())
    );
  });

  return (
    <div>
      <Card className='medic'>
        <MedicFilterOpto
          selected={filteredCriteria}
          onChangeFilter={filterChangeHandler}
        />
        <OptometryList items={filteredPerson} />
      </Card>
    </div>
  );
};

export default Medicopto;