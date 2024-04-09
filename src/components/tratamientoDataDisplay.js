import React from "react";
import "./FarmaDataDisplay.css";

const tratamientoDataDisplay = ({ data }) => {
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
        <td>{item.tratamiento}</td>
        <td>{item.cantidad}</td>
        <td>{item.comentario}</td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Datos Tratamiento</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tratamiento</th>
            <th>Cantidad</th>
            <th>Comentario</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default tratamientoDataDisplay;
