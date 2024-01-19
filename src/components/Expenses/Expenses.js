import React, { useState } from 'react';

import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import './Expenses.css';

// Componente que incluye filtro de año e items asociados
const Expenses = (props) => {
    //console.log('props.items:', props.items);

    // Check if props.items is defined, if not, use an empty array
    const expenses = props.items || [];

    const [filteredCriteria, setFilteredCriteria] = useState(''); // Initialize with an empty string

  const filterChangeHandler = (selectedCriteria) => {
    setFilteredCriteria(selectedCriteria);
  };

  const filteredExpenses = expenses.filter((expense) => {
    if (!filteredCriteria) {
      return false; // Show all data without applying a filter (true)
    }
    
    return (
      (expense.lote?.toLowerCase().includes(filteredCriteria.toLowerCase()))
    );
  });

    return (
        <div>
            <Card className='expenses'>
                <ExpensesFilter
                    selectedLote={filteredCriteria} // Pass selectedLote to ExpensesFilter
                    onChangeFilter={filterChangeHandler}
                />
                <ExpensesList items={filteredExpenses} />
            </Card>
        </div>
    );
};

export default Expenses;
