import React from "react";

const PatientSelection = ({
  selectedBrigada,
  brigadaNames,
  enteredIdNumDoc,
  brigadaChangeHandler,
  handleChangeIdNumDoc,
  patientOptions,
}) => {
  return (
    <div className="medic-item-container">
      <div className="new-medic__control">
        <select
          id="brigada"
          value={selectedBrigada}
          onChange={brigadaChangeHandler}
        >
          <option value="">Selecciona Brigada</option>
          {brigadaNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <label htmlFor="id_num_doc">Confirmar Numero ID</label>
        <input
          autoComplete="off"
          id="id_num_doc"
          type="text"
          value={enteredIdNumDoc}
          onChange={handleChangeIdNumDoc}
          list="patientOptions"
          placeholder="Seleccionar"
        />
        <datalist id="patientOptions">
          {patientOptions.map((option, index) => (
            <option key={`${option.name}-${index}`} value={option} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default PatientSelection;
