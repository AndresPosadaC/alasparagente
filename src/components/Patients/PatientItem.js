import React from "react";
import Card from "../UI/Card";
import "./PatientItem.css";

const PatientItem = (props) => {
  // console.log('PatientsItem:', props);
  // Create an array of JSX elements
  const personalItems = [
    { label: "Edad", value: props.edad },
    { label: "Ocupacion", value: props.ocupacion },
    { label: "Direccion", value: props.direccion_domicilio },
    { label: "Localidad", value: props.localidad },
    { label: "Celular", value: props.celular },
  ];

  // const secunderyItems = [
  //   { label: "Acompañante", value: props.acompanante },
  //   { label: "Celular", value: props.celular_acompanante },
  //   { label: "Responsable", value: props.responsable },
  //   { label: "Celular", value: props.celular_responsable },
  //   { label: "Parentesco", value: props.parentesco_responsable },
  //   { label: "Aseguradora", value: props.aseguradora },
  //   { label: "Vinculación", value: props.tipo_vinculacion },
  //  ];

  const vitalSignsItems = [
    { label: "Frec cardiaca", value: props.frec_cardiaca },
    { label: "Tension arterial", value: props.tension_arterial },
    { label: "Frec respiratoria", value: props.frec_respiratoria },
    { label: "Sat o2", value: props.sat_o2 },
    { label: "Temp", value: props.temperatura },
    { label: "Peso", value: props.peso },
    { label: "Talla", value: props.talla },
  ];

  return (
    <Card className="patient-item">
      <div>
        <div className="patient-item">
          <h1>
            {props.nombres} {props.apellidos}
          </h1>
          <h2>
            {props.tipo_doc}: {props.id_num_doc}
          </h2>
          <h2>Sexo: {props.sexo}</h2>
          <h2>Estado Civil: {props.estado_civil}</h2>
        </div>
        <div className="patient-item">
          <div className="patient-item__details">
            <div className="patient-item-container">
            <label>Principales</label>
              {personalItems.map((item, index) => (
                <div
                  key={`personal-${props.id_cnt}-${index}`}
                  className="patient-item"
                >
                  <p className="patient-item-label">{item.label}:</p>
                  <p className="patient-item-value">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="patient-item-container">
              <label>Signos Vitales</label>
              {vitalSignsItems.map((item, index) => (
                <div
                  key={`vitsig-${props.id_cnt}-${index}`}
                  className="patient-item"
                >
                  <p className="patient-item-label">{item.label}:</p>
                  <p className="patient-item-value">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PatientItem;
