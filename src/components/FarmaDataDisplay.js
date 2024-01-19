import React from "react";
import "./FarmaDataDisplay.css"; 

const FarmaDataDisplay = ({ data }) => {
  if (data.length === 0) {
    return null; // If there's no data, don't render anything
  }

  // Assuming each item in the data is an object with properties you want to display
  const tableRows = data.map((item, index) => (
    <tr key={index}>
      <td>{item.date_farma}</td>
      <td>{item.quantity}</td>
      <td>{item.medicine}</td>
    </tr>
  ));

  return (
    <div>
      <h2>Datos para Farmacia</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cantidad</th>
            <th>Producto Activo</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default FarmaDataDisplay;
