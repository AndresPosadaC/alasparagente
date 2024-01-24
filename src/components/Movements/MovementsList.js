import React from 'react';

import MovementItem from './MovementItem';
import './MovementsList.css';

const MovementsList = (props) => {
  //console.log('MovementsList props.items:', props.items);
  if (props.items.length === 0) {
    return <h2 className='movements-list__fallback'>No encontró resultados.</h2>;
  } 
 
  return (
    <ul className='movements-list'>
      {props.items.map((movement) => (
        <MovementItem
          key={movement.id_mov}
          medicine={movement.medicine}
          brigada={movement.brigada}
          quantity={movement.quantity}
          origen={movement.origen}
          destination={movement.destination}
        />
      ))}
    </ul>
  );
};


export default MovementsList;