import React, { useState } from 'react';
import './MedicFilter.css'; 

const MedicFilterOpto = (props) => {
  //console.log('props.items:', props.items);
  const [searchFilter, setSearchFilter] = useState(props.selectedOID);

  const filterChangeHandler = (event) => {
    setSearchFilter(event.target.value);
    props.onChangeFilter(event.target.value);
  };
 
  const optometryOptions = props.optometryData
    ? props.optometryData.map((optometry) => optometry.id_num_doc)
    : [];
 
  return (
    <div className='history-filter'>
      <div className='history-filter__control'>
        <label htmlFor="selectedOID">Buscar Historia por Numero de Documento:</label>
        <input
          id="selectedOID"
          type='text'
          list='optometryOptions'
          name='searchFilter'
          value={searchFilter}
          onChange={filterChangeHandler}
        />
        <datalist id='optometryOptions'>{optometryOptions}</datalist>
      </div>
    </div>
  );
};

export default MedicFilterOpto;
