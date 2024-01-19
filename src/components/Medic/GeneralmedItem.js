import React from "react";
import Card from '../UI/Card';
import "./MedicItem.css";

const GeneralmedItem = (props) => {
  // console.log('GeneralmedItem:', props);
  // Create an array of JSX elements
  const medGeneralItems = [
    <p className="history-item"> FC: {props.frec_cardiaca}</p>,
    <p className="history-item"> TA: {props.tension_arterial}</p>,
    <p className="history-item"> FR: {props.frec_respiratoria}</p>,
    <p className="history-item"> SO2: {props.sat_o2}</p>,
    <p className="history-item"> temperatura: {props.temperatura}</p>,
    <p className="history-item"> peso: {props.peso}</p>,
    <p className="history-item"> talla: {props.talla}</p>,
  ];

  return (
    <Card className="history-item">
      <div>
      <h2 className="history-item">MEDICINA GENERAL</h2>
        <div className="history-item">
          <h2>
            {props.id_cnt}: {props.id_num_doc}
          </h2>
          <div className="history-item-container">
            <h2>Historia medica general</h2>
            {medGeneralItems} {/* Render the array of elements */}
          </div>
          <h2 className="history-item">
            MOTIVO DE CONSULTA {props.motivo_consulta}
          </h2>
          <h2 className="history-item">
            DIAGNOSTICO {props.diagnostico}
          </h2>
          <h2 className="history-item">
            PLAN MANEJO {props.plan}
          </h2>
        </div>
      </div>
    </Card>
  );
};

export default GeneralmedItem;
