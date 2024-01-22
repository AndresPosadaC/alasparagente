import React from 'react';

import Card from '../UI/Card';
import './MovementItem.css';
 

const MovementItem = (props) => {
   //console.log('MovementItem props.items:', props);
  return (
    // componente que muestra el resultado de Movimiento de Medicamento
    <Card className='movement-item'>
      <div className='movement-item__description'>
        <h2>{props.medicine}</h2>
        <h2>{props.brigada}</h2>
        <h2>{props.origen}</h2>
        <h2>{props.destination}</h2>
        <div className='movement-item__quantity'>{props.quantity}</div>
      </div>
    </Card>
  );
}

export default MovementItem;
