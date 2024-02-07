import React from "react";
import "./FarmaDataDisplay.css";

const FarmaDataDisplay = ({ data }) => {
  if (data.length === 0) {
    return null; // If there's no data, don't render anything
  }

  // Assuming each item in the data is an object with properties you want to display
  const tableRows = data.map((item, index) => {
    // Formatear la fecha como "YYYY-mm-dd"
    const formattedDate = new Date(item.date_farma).toISOString().split("T")[0];

    return (
      <tr key={index}>
        <td>{formattedDate}</td>
        <td>{item.medicine}</td>
        <td>{item.quantity}</td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Datos para Farmacia</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Producto Activo</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default FarmaDataDisplay;
