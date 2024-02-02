import React from "react";
import Card from '../UI/Card';
import "./MedicItem.css";

const OdontologyItem = (props) => {
  // console.log('OdontologyItem:', props);
  // Create an array of JSX elements
  const examenClinico = [
    <p className="history-item"> atm: {props.atm}</p>,
    <p className="history-item"> ganglios: {props.ganglios}</p>,
    <p className="history-item"> labios: {props.labios}</p>,
    <p className="history-item"> lengua: {props.lengua}</p>,
    <p className="history-item"> paladar: {props.paladar}</p>,
    <p className="history-item"> piso_boca: {props.piso_boca}</p>,
    <p className="history-item"> glandula salival: {props.glandula_salival}</p>,
    <p className="history-item"> carrillos: {props.carrillos}</p>,
  ];

  const examenDental = [
    <p className="history-item"> fasetas desgaste: {props.fasetas_desgaste}</p>,
    <p className="history-item"> fracturas: {props.fracturas}</p>,
    <p className="history-item"> patologia pulpar: {props.patologia_pulpar}</p>,
    <p className="history-item"> patologia tejidos: {props.patologia_tejidos}</p>,
    <p className="history-item"> observaciones: {props.observaciones}</p>,
  ];

  const planydiag = [
    <p className="history-item"> diagnostico: {props.diagnostico}</p>,
    <p className="history-item"> plan tratamiento: {props.plan_tratamiento}</p>,
  ];

  return (
    <Card className="history-item">
      <div>
      <h2 className="history-item">ODONTOLOGIA ID: {props.id_num_doc}</h2>
        <div className="history-item">
          <h2 className="history-item">
            MOTIVO DE CONSULTA {props.motivo_consulta}
          </h2>
          <div className="history-item-container">
            <h2>Examen Clinico</h2>
            {examenClinico} {/* Render the array of elements */}
          </div>
          <div className="history-item-container">
            <h2>Examen Dental</h2>
            {examenDental} {/* Render the array of elements */}
          </div>
          <div className="history-item-container">
            <h2>Diagnostico Y Plan</h2>
            {planydiag} {/* Render the array of elements */}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OdontologyItem;
