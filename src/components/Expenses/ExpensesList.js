import React from 'react';

import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

const ExpensesList = (props) => {
  if (props.items.length === 0) {
    return <h2 className='expenses-list__fallback'>No encontró resultados.</h2>;
  }

  return (
    <ul className="expenses-list">
      {props.items.map((expense) => (
        <ExpenseItem
          key= {expense.id}
          date_received= {expense.date_received}
          principio_activo= {expense.principio_activo}
          forma= {expense.forma}
          concentracion= {expense.concentracion}
          presentacion= {expense.presentacion}
          unidad_medida= {expense.unidad_medida}
          vigencia_invima= {expense.vigencia_invima}
          new_registro_invima= {expense.new_registro_invima}
          registro_invima= {expense.registro_invima}
          lote= {expense.lote}
          vencimiento= {expense.vencimiento}
          observaciones= {expense.observaciones}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;