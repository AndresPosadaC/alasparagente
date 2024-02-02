import React from "react";
import "./PatientsDataDisplay.css";

const PatientsDataDisplay = ({ data }) => {
  if (data.length === 0) {
    return null; // If there's no data, don't render anything
  }

  const bulletListItems = data.map((item, index) => (
    <React.Fragment key={index}>
      <li>
        <strong>Nombres:</strong> {item.nombres}
      </li>
      <li>
        <strong>Apellidos:</strong> {item.apellidos}
      </li>
      <li>
        <strong>Edad:</strong> {item.edad}
      </li>
      <li>
        <strong>Estado Civil:</strong> {item.estado_civil}
      </li>
      <li>
        <strong>Género:</strong> {item.sexo}
      </li>
    </React.Fragment>
  ));

  const tableRows = data.map((item, index) => {
    // Formatear la fecha como "YYYY-mm-dd"
    const formattedDate = new Date(item.fecha_asigna)
      .toISOString()
      .split("T")[0];
  
    return (
      <tr key={index}>
        <td>{formattedDate}</td>
        <td>{item.motivo_consulta}</td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Datos para Paciente</h2>
      <ul>{bulletListItems}</ul>
      <h2>Asignaciones</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha asignación</th>
            <th>Motivo Consulta</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default PatientsDataDisplay;
