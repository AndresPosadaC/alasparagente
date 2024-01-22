import React, { useState } from 'react';

import './MovementsFilter.css';
 
const MovementsFilter = (props) => {
  console.log('MovementsFilter:', props);
  const [storeFilter, setStoreFilter] = useState(props.selectedStore);
  const [medicineFilter, setMedicineFilter] = useState(props.selectedMedicine);

  const storeOptions = props.storeOptions.map((store, index) => (
    <option key={index} value={store} />
  ));

  const medicineOptions = props.medicineOptions.map((medicine, index) => (
    <option key={index} value={medicine} />
  ));

  const filterChangeHandler = (event) => {
    if (event.target.name === 'storeFilter') {
      setStoreFilter(event.target.value);
      props.onChangeFilter('store', event.target.value);
    } else if (event.target.name === 'medicineFilter') {
      setMedicineFilter(event.target.value);
      props.onChangeFilter('medicine', event.target.value);
    }
  };

  return (
    <div className='movements-filter'>
      <div className='movements-filter__control'>
      <label htmlFor="selectedMed" >Buscar Medicamento </label>
        <input
          id="selectedMed"
          type='text'
          list='medicineOptions'
          name='medicineFilter'
          value={medicineFilter}
          onChange={filterChangeHandler}
        />
        <datalist id='medicineOptions'>{medicineOptions}</datalist>
      </div>
      <div className='movements-filter__control'>
      <label htmlFor="selectedStock" >Buscar Almacen </label>
        <input
          id="selectedStock"
          type='text'
          list='storeOptions'
          name='storeFilter'
          value={storeFilter}
          onChange={filterChangeHandler}
        />
        <datalist id='storeOptions'>{storeOptions}</datalist>
      </div>
      
    </div>
  );
};

export default MovementsFilter;
