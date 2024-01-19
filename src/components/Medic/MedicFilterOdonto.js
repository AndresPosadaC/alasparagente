import React, { useState } from 'react';
import './MedicFilter.css'; 

const MedicFilterOdonto = (props) => {
  //console.log('props.items:', props.items);
  const [searchFilter, setSearchFilter] = useState(props.selectedOID);

  const filterChangeHandler = (event) => {
    setSearchFilter(event.target.value);
    props.onChangeFilter(event.target.value);
  };
 
  const odontologyOptions = props.odontologyData
    ? props.odontologyData.map((odontology) => odontology.id_num_doc)
    : [];
 
  return (
    <div className='history-filter'>
      <div className='history-filter__control'>
        <label htmlFor="selectedOID">Buscar Historia por Numero de Documento:</label>
        <input
          id="selectedOID"
          type='text'
          list='odontologyOptions'
          name='searchFilter'
          value={searchFilter}
          onChange={filterChangeHandler}
        />
        <datalist id='odontologyOptions'>{odontologyOptions}</datalist>
      </div>
    </div>
  );
};

export default MedicFilterOdonto;
