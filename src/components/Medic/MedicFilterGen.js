import React, { useState } from 'react';
import './MedicFilter.css'; 

const MedicFilterGen = (props) => {
  //console.log('props.items:', props.items);
  const [searchFilter, setSearchFilter] = useState(props.selectedOID);

  const filterChangeHandler = (event) => {
    setSearchFilter(event.target.value);
    props.onChangeFilter(event.target.value);
  };

  const generalmedOptions = props.generalmedData
    ? props.generalmedData.map((generalmed) => generalmed.id_num_doc)
    : [];
 
  return (
    <div className='history-filter'>
      <div className='history-filter__control'>
        <label htmlFor="selectedGID">Buscar Historia por Numero de Documento:</label>
        <input
          id="selectedGID"
          type='text'
          list='generalmedOptions'
          name='searchFilter'
          value={searchFilter}
          onChange={filterChangeHandler}
        />
        <datalist id='generalmedOptions'>{generalmedOptions}</datalist>
      </div>
    </div>
  );
};

export default MedicFilterGen;
