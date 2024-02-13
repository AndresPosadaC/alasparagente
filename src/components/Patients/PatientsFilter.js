import React, { useState } from "react";
import "./PatientsFilter.css";

const PatientsFilter = (props) => {
   console.log('PatientsFilter props.items:', props.items);
  const [searchFilter, setSearchFilter] = useState("");

  const filterChangeHandler = (event) => {
    setSearchFilter(event.target.value);
    props.onChangeFilter(event.target.value);
  };

  const patientsOptions = props.patientsData
    ? props.patientsData.map((patient) => patient.id_num_doc)
    : [];

  return (
    <div className="patients-filter">
      <div className="patients-filter__control">
        <label htmlFor="selectedPatientID">
          Buscar Paciente por Numero de Documento:
        </label>
        <input
          id="selectedPatientID"
          type="text"
          list="patientsOptions"
          name="searchFilter"
          value={searchFilter}
          onChange={filterChangeHandler}
        />
        <datalist id="patientsOptions">{patientsOptions}</datalist>
      </div>
    </div>
  );
};

export default PatientsFilter;
