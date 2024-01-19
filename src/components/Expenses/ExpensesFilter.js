import React, { useState } from 'react';

import './ExpensesFilter.css';

const ExpensesFilter = (props) => {
  // console.log(props)

  const [searchFilter, setSearchFilter] = useState("");

  const filterChangeHandler = (event) => {
    setSearchFilter(event.target.value);
    props.onChangeFilter(event.target.value);
  };

  const expenseOptions = props.expensesData
    ? props.expensesData.map((expense) => expense.lote)
    : [];

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'> 
      <label htmlFor="selectedLote" >Buscar por lote </label>
        <input
          id="selectedLote"
          type='text'
          list='expenseOptions'
          name='searchFilter'
          value={searchFilter}
          onChange={filterChangeHandler}
        />
        <datalist id='expenseOptions'>{expenseOptions}</datalist>
      </div>
    </div>
  );
};

export default ExpensesFilter;
