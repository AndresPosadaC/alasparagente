import React, { useState, useEffect } from "react";
import useApiData from "../../hooks/useApiData";
import useApiPost from "../../hooks/useApiPost";
import PopupMessage from "../PopupMessage";

import "./PatientForm.css";

const PatientRemite = (props) => {
  //console.log("pacientes: ", props)
  const [selectedVoided, setSelectedVoided] = useState("0");
  const [enteredIdNumDoc, setEnteredIdNumDoc] = useState("");

  const [selectedBrigada, setSelectedBrigada] = useState("");
  const [selectedEspecialidad, setSelectedEspacialidad] = useState("");
  const [enteredMotivoConsulta, setEnteredMotivoConsulta] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { data: idNumOptions, refreshData: refreshPatients } = useApiData(
    "pavanzada_json",
    "id_num_doc"
  );

  const sortedIdOptions = idNumOptions.slice().sort();

  const { data: brigadaNames } = useApiData("brigadas_json", "location_b");

  const sortedBrigadaNames = brigadaNames.slice().sort();

  const { postData: postPatientAsignData, error: patientAsignError } =
    useApiPost("asigna_json");

  const idNumDocChangeHandler = (event) => {
    setEnteredIdNumDoc(event.target.value);
  };

  const brigadaChangeHandler = (event) => {
    setSelectedBrigada(event.target.value);
  };

  const especialidadChangeHandler = (event) => {
    setSelectedEspacialidad(event.target.value);
  };

  {/*const motivoConsultaChangeHandler = (event) => {
    setEnteredMotivoConsulta(event.target.value);
  };*/}

  const handleCancel = () => {
    setSelectedVoided("0");
    setEnteredIdNumDoc("");
    setSelectedBrigada("");
    setSelectedEspacialidad("");
    setEnteredMotivoConsulta("");
    refreshPatients();
  };

  const submitPatientHandler = async (event) => {
    event.preventDefault();

    if (!enteredIdNumDoc || !selectedBrigada || !selectedEspecialidad) {
      setErrorMessage("Por favor, completa todos los campos requeridos con * ");
      return; // Exit the function early, no need to continue checking other conditions
    }

    // Check if the entered patient exists in the selected origin
    const isIDinPatients = sortedIdOptions.includes(String(enteredIdNumDoc).trim());

    if (!isIDinPatients) {
      setErrorMessage("ID " + enteredIdNumDoc + " no registada ");
    } else {
      // All conditions passed, proceed with the POST request

      const asignData = {
        voided: selectedVoided,
        id_num_doc: enteredIdNumDoc,
        location_b: selectedBrigada,
        especialidad: selectedEspecialidad,
        motivo_consulta: enteredMotivoConsulta,
      };

      const successPatientAsignData = await postPatientAsignData(
        asignData
      ).catch((error) => {
        setErrorMessage("Error reasignando el paciente ");
        console.error("Error asignando data del pacientes:", patientAsignError);
      });

      if (successPatientAsignData) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        setErrorMessage("Error en el proceso de reasignación del paciente.");
      }
    }
  };

  // Replace the refreshPage function with useEffect
  useEffect(() => {
    if (showSuccessMessage) {
      // Clear input fields
      setSelectedVoided("0");
      setEnteredIdNumDoc("");
      setSelectedBrigada("");
      setSelectedEspacialidad("");
      setEnteredMotivoConsulta("");
      refreshPatients();
    }
  }, [showSuccessMessage, refreshPatients]);

  // const refreshPage = () => {
  //  window.location.reload(); // Reload the page
  // };

  return (
    <form onSubmit={submitPatientHandler}>
      <div className="new-patient__controls">
        <div className="patient-item-container .new-patient__controls"> 
          <h1>Reasignacion Médica</h1>
          <div className="new-patient__controls">
            <div className="new-patient__controls">
              <label htmlFor="id-num-doc-rm"></label>
              <input
                type="text"
                id="id-num-doc-rm"
                list="patientOptions" // Reference to the datalist ID
                value={enteredIdNumDoc}
                onChange={idNumDocChangeHandler}
                className="dropdown-select"
                placeholder="Seleccionar ID Paciente"
              />
              <datalist id="patientOptions">
                {sortedIdOptions.map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>
              <label htmlFor="brigadaRM"></label>
              <select
                id="brigadaRM"
                value={selectedBrigada}
                onChange={brigadaChangeHandler}
                className="dropdown-select"
              >
                <option value="">Seleccionar Brigada</option>
                {sortedBrigadaNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>

              <label htmlFor="especialidad"></label>
              <select
                id="especialidad"
                value={selectedEspecialidad}
                onChange={especialidadChangeHandler}
                className="dropdown-select" // Apply a CSS class for styling
              >
                <option value="">Seleccionar Especialidad</option>
                <option defaultValue="Citologia">Citologia</option>
                <option defaultValue="Dermatologia">Dermatologia</option>
                <option defaultValue="Fisioterapia">Fisioterapia</option>
                <option defaultValue="General">General</option>
                <option defaultValue="Ginecologia">Ginecologia</option>
                <option defaultValue="Odontología">Odontología</option>
                <option defaultValue="Optometría">Optometría</option>
                <option defaultValue="Otorrino">Otorrino</option>
                <option defaultValue="Pediatria">Pediatria</option>
              </select>
            </div>
            {/*<div id="motivo-consulta-container" className="new-medic__control">
              <label htmlFor="motivo-remite">
                <textarea
                  id="motivo-remite"
                  className="larger-input"
                  value={enteredMotivoConsulta}
                  onChange={motivoConsultaChangeHandler}
                  placeholder="Motivo de remisión o asignación"
                />
              </label>
                </div>*/}
          </div>
        </div>
      </div>
      <div className="new-patient__actions">
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
        <button type="button" onClick={submitPatientHandler}>
          Remite Paciente
        </button>
        {showSuccessMessage && (
          <PopupMessage
            message="¡Datos agregados exitosamente!"
            onClose={() => setShowSuccessMessage(false)}
          />
        )}
        {errorMessage && (
          <div className="error-message">
            <PopupMessage
              message={errorMessage}
              onClose={() => setErrorMessage(null)}
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default PatientRemite;
