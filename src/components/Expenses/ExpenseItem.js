import React from 'react';

import ExpenseDate from './ExpenseDate'; 
import Card from '../UI/Card';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
  //console.log(props)
  return (
    // componente que muestra el resultado de medicamento comprado
    <Card className='expense-item'>
      <div className='expense-item__description'>
        <h2>{props.principio_activo}</h2>
        <h2>{props.presentacion}</h2>
        <h2>Lote: {props.lote}</h2>
      </div>
      <ExpenseDate vencimiento={props.vencimiento} />
    </Card>
  );
}

export default ExpenseItem;