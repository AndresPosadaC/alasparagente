import React from 'react';

import './ExpenseDate.css';

const ExpenseDate = (props) => {

  try {
    const vencimientoDate = new Date(props.vencimiento);
    const month = vencimientoDate.toLocaleString('en-US', { month: 'long' });
    const day = vencimientoDate.toLocaleString('en-US', { day: '2-digit' });
    const year = vencimientoDate.getFullYear();
    
    return (
      <div className='expense-date'>
        <div className='expense-date__month'>{month}</div>
        <div className='expense-date__year'>{year}</div>
        <div className='expense-date__day'>{day}</div>
      </div>
    );
  } catch (error) {
    console.error('Error parsing date:', error);
    return <div className='expense-date'>Invalid Date</div>;
  }
};

export default ExpenseDate;

