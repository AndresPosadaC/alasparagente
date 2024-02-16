import React, { useState, useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import useApiData from "../../hooks/useApiData";
import useApiPost from "../../hooks/useApiPost";
import PopupMessage from "../PopupMessage";
import PatientsDataDisplay from "../PatientsDataDisplay";
import CheckboxOrTextInput from "../NewMedic/CheckboxOrTextInput";

import "./PatientForm.css";

const TriageForm = (props) => {
  const [selectedVoided, setSelectedVoided] = useState("0");
  const [enteredIdNumDoc, setEnteredIdNumDoc] = useState("");
  const [enteredOcupacion, setEnteredOcupacion] = useState("");
  const [enteredDireccionDomicilio, setEnteredDireccionDomicilio] =
    useState("");
  const [enteredLocalidad, setEnteredLocalidad] = useState("");
  const [enteredTelefonoFijo, setEnteredTelefonoFijo] = useState("");
  const [enteredCelular, setEnteredCelular] = useState("");
  const [enteredAcompanante, setEnteredAcompanante] = useState("");
  const [enteredResponsable, setEnteredResponsable] = useState("");
  const [enteredCelularAcompanante, setEnteredCelularAcompanante] =
    useState("");
  const [enteredCelularResponsable, setEnteredCelularResponsable] =
    useState("");
  const [enteredParentescoResponsable, setEnteredParentescoResponsable] =
    useState("");
  const [enteredAseguradora, setEnteredAseguradora] = useState("");
  const [enteredTipoVinculacion, setEnteredTipoVinculacion] = useState("");
  const [enteredFrecCardiaca, setEnteredFrecCardiaca] = useState("");
  const [enteredTensionArterial, setEnteredTensionArterial] = useState("");
  const [enteredFrecRespiratoria, setEnteredFrecRespiratoria] = useState("");
  const [enteredSatO2, setEnteredSatO2] = useState("");
  const [enteredTemperatura, setEnteredTemperatura] = useState("");
  const [enteredPeso, setEnteredPeso] = useState("");
  const [enteredTalla, setEnteredTalla] = useState("");

  const [selectedBrigada, setSelectedBrigada] = useState("");
  const [selectedEspecialidad, setSelectedEspacialidad] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [filteredPatientData, setFilteredPatientData] = useState([]); // State for filtered data

  const { data: brigadaNames } = useApiData("brigadas_json", "location_b");

  const sortedBrigadaNames = brigadaNames.slice().sort();

  const { data: patientOptions } = useApiData("pavanzada_json", "id_num_doc");

  const { data: pasignadosData, refreshData: refreshAsignados } =
  useFetchData("pasignados_json");

  // Make the POST request using the useApiPost hook
  const { postData: postTriageData, error: triageError } =
    useApiPost("ptriage_json");

  useEffect(() => {
    if (selectedBrigada && enteredIdNumDoc && selectedEspecialidad) {
      // Filter the fetched data based on selectedBrigada and enteredIdNumDoc
      const filteredPatientData = pasignadosData.filter(
        (item) =>
          item.location_b === selectedBrigada &&
          item.id_num_doc === enteredIdNumDoc &&
          item.especialidad === selectedEspecialidad
      );
      // Set the filtered data in state
      setFilteredPatientData(filteredPatientData);
    }
  }, [selectedBrigada, enteredIdNumDoc, selectedEspecialidad, pasignadosData]);

  const uniquePatientIDs = [
    ...new Set(
      pasignadosData
        .filter((option) => option.location_b === selectedBrigada)
        .map((option) => option.id_num_doc)
    ),
  ];

  const sortedPatientIDs = uniquePatientIDs.slice().sort();

  // Handle ID search and filter data
  const findIDHandler = (event) => {
    const selectedID = event.target.value;
    const filteredPatientOptions = pasignadosData.filter(
      (option) =>
        option.location_b === selectedBrigada &&
        option.id_num_doc === selectedID
    );

    if (filteredPatientOptions.length > 0) {
      //setEnteredIdNumDoc(selectedID);
      setEnteredIdNumDoc(event.target.value);
    } else {
      setEnteredIdNumDoc("");
      console.log(
        "No se encontraron coincidencias o se encontraron varias coincidencias para ID:",
        selectedID
      );
      setErrorMessage(
        "No se encontraron coincidencias o se encontraron varias coincidencias para ID: ",
        selectedID
      );
    }
  };

  // Create a common change handler for text fields
  const handleTextChange = (fieldName, setField) => {
    return (event) => {
      setField(event.target.value);
    };
  };

  // Usage of the common handlers
  const brigadaChangeHandler = (event) => {
    setSelectedBrigada(event.target.value);
  };

  const direccionDomicilioChangeHandler = (event) => {
    setEnteredDireccionDomicilio(event.target.value);
  };

  const localidadChangeHandler = (event) => {
    setEnteredLocalidad(event.target.value);
  };

  const telefonoFijoChangeHandler = (event) => {
    setEnteredTelefonoFijo(event.target.value);
  };

  const celularChangeHandler = (event) => {
    setEnteredCelular(event.target.value);
  };

  const acompananteChangeHandler = (event) => {
    setEnteredAcompanante(event.target.value);
  };

  const responsableChangeHandler = (event) => {
    setEnteredResponsable(event.target.value);
  };

  const celularAcompananteChangeHandler = (event) => {
    setEnteredCelularAcompanante(event.target.value);
  };

  const celularResponsableChangeHandler = (event) => {
    setEnteredCelularResponsable(event.target.value);
  };

  const parentescoResponsableChangeHandler = (event) => {
    setEnteredParentescoResponsable(event.target.value);
  };

  const aseguradoraChangeHandler = (event) => {
    setEnteredAseguradora(event.target.value);
  };

  const tipoVinculacionChangeHandler = (event) => {
    setEnteredTipoVinculacion(event.target.value);
  };

  const especialidadChangeHandler = (event) => {
    setSelectedEspacialidad(event.target.value);
  };

  const handleChangeFrecCardiaca = handleTextChange(
    "enteredFrecCardiaca",
    setEnteredFrecCardiaca
  );
  const handleChangeTensionArterial = handleTextChange(
    "enteredTensionArterial",
    setEnteredTensionArterial
  );
  const handleChangeFrecRespiratoria = handleTextChange(
    "enteredFrecRespiratoria",
    setEnteredFrecRespiratoria
  );
  const handleChangeSatO2 = handleTextChange("enteredSatO2", setEnteredSatO2);
  const handleChangeTemperatura = handleTextChange(
    "enteredTemperatura",
    setEnteredTemperatura
  );
  const handleChangePeso = handleTextChange("enteredPeso", setEnteredPeso);
  const handleChangeTalla = handleTextChange("enteredTalla", setEnteredTalla);

  const handleCancel = () => {
    setSelectedVoided("0");
    setEnteredIdNumDoc("");
    setEnteredOcupacion("");
    setEnteredDireccionDomicilio("");
    setEnteredLocalidad("");
    setEnteredTelefonoFijo("");
    setEnteredCelular("");
    setEnteredAcompanante("");
    setEnteredResponsable("");
    setEnteredCelularAcompanante("");
    setEnteredCelularResponsable("");
    setEnteredParentescoResponsable("");
    setEnteredAseguradora("");
    setEnteredTipoVinculacion("");
    setSelectedBrigada("");
    setSelectedEspacialidad("");
    setEnteredFrecCardiaca("");
    setEnteredTensionArterial("");
    setEnteredFrecRespiratoria("");
    setEnteredSatO2("");
    setEnteredTemperatura("");
    setEnteredPeso("");
    setEnteredTalla("");
  };

  // Define a submit handler for the generalmed form
  const submitTriageHandler = async (event) => {
    event.preventDefault();

    // Check if the entered ID number exists in patientOptions
    const isValidIdNum = patientOptions.includes(
      String(enteredIdNumDoc).trim()
    );

    if (!isValidIdNum) {
      setErrorMessage("Por favor, selecciona un número de ID válido");
      return;
    }

    // Check if the required fields are filled
    if (
      !enteredIdNumDoc ||
      !enteredCelular ||
      !enteredFrecCardiaca ||
      !enteredTensionArterial ||
      !enteredFrecRespiratoria ||
      !enteredSatO2 ||
      !enteredTemperatura
    ) {
      setErrorMessage(
        "Por favor, completa todos los campos requeridos con *   "
      );
      return;
    }

    if (
      !/^\d+(\.\d+)?$/.test(enteredFrecCardiaca) ||
      !/^\d+(\.\d+)?$/.test(enteredFrecRespiratoria) ||
      !/^\d+(\.\d+)?$/.test(enteredPeso) ||
      !/^\d+(\.\d+)?$/.test(enteredSatO2) ||
      !/^\d+(\.\d+)?$/.test(enteredTalla) ||
      !/^\d+(\.\d+)?$/.test(enteredTemperatura)
    ) {
      setErrorMessage(
        "Campo mal ingresado: Se espera que el campo sea numérico."
      );
      return;
    }

    // Create an object for the triage data
    const triageData = {
      voided: selectedVoided,
      id_num_doc: enteredIdNumDoc,
      ocupacion: enteredOcupacion,
      direccion_domicilio: enteredDireccionDomicilio,
      localidad: enteredLocalidad,
      telefono_fijo: enteredTelefonoFijo,
      celular: enteredCelular,
      acompanante: enteredAcompanante,
      responsable: enteredResponsable,
      celular_acompanante: enteredCelularAcompanante,
      celular_responsable: enteredCelularResponsable,
      parentesco_responsable: enteredParentescoResponsable,
      aseguradora: enteredAseguradora,
      tipo_vinculacion: enteredTipoVinculacion,
      frec_cardiaca: parseFloat(enteredFrecCardiaca),
      tension_arterial: enteredTensionArterial,
      frec_respiratoria: parseFloat(enteredFrecRespiratoria),
      sat_o2: parseFloat(enteredSatO2),
      temperatura: parseFloat(enteredTemperatura),
      peso: parseFloat(enteredPeso),
      talla: parseFloat(enteredTalla),
      // Add the rest of the fields here...
    };

    const successTriageData = await postTriageData(triageData).catch(
      (error) => {
        setErrorMessage("Error añadiendo el paciente ");
        console.error("Error adding data to ptriage:", triageError);
      }
    );

    if (successTriageData) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } else {
      setErrorMessage("Error en el proceso de paciente.");
    }
  };

  // Replace the refreshPage function with useEffect
  useEffect(() => {
    if (showSuccessMessage) {
      // Clear input fields
      setSelectedVoided("0");
      setEnteredIdNumDoc("");
      setEnteredOcupacion("");
      setEnteredDireccionDomicilio("");
      setEnteredLocalidad("");
      setEnteredTelefonoFijo("");
      setEnteredCelular("");
      setEnteredAcompanante("");
      setEnteredResponsable("");
      setEnteredCelularAcompanante("");
      setEnteredCelularResponsable("");
      setEnteredParentescoResponsable("");
      setEnteredAseguradora("");
      setEnteredTipoVinculacion("");
      setEnteredFrecCardiaca("");
      setEnteredTensionArterial("");
      setEnteredFrecRespiratoria("");
      setEnteredSatO2("");
      setEnteredTemperatura("");
      setEnteredPeso("");
      setEnteredTalla("");
      setSelectedBrigada("");
      setSelectedEspacialidad("");
      refreshAsignados();
    }
  }, [showSuccessMessage, refreshAsignados]);

  // const refreshPage = () => {
  //  window.location.reload(); // Reload the page
  // };

  const signosVitales = [
    {
      label: "Frecuencia Cardiaca (por minuto) *",
      value: enteredFrecCardiaca,
      onChange: handleChangeFrecCardiaca,
    },
    {
      label: "Tensión Arterial (mm Hg) *",
      value: enteredTensionArterial,
      onChange: handleChangeTensionArterial,
    },
    {
      label: "Frecuencia Respiratoria (por minuto) *",
      value: enteredFrecRespiratoria,
      onChange: handleChangeFrecRespiratoria,
    },
    {
      label: "Saturación Oxígeno (%) *",
      value: enteredSatO2,
      onChange: handleChangeSatO2,
    },
    {
      label: "Temperatura (ºC) *",
      value: enteredTemperatura,
      onChange: handleChangeTemperatura,
    },
    {
      label: "Peso (Kg) *",
      value: enteredPeso,
      onChange: handleChangePeso,
    },
    {
      label: "Talla (cm) *",
      value: enteredTalla,
      onChange: handleChangeTalla,
    },
  ];

  return (
    <form onSubmit={submitTriageHandler}>
      <div className="new-patient__controls">
        <h1>Datos de identificación del paciente</h1>
        <div id="new-patient-container" className="new-patient__controls">
          <div
            id="new-patient-container2"
            className="patient-item-container .new-patient__controls"
          >
            <h1 htmlFor="especialidades">Especialidad</h1>
            <select
              id="especialidades"
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
            <h1>Datos del Paciente</h1>
            <div id="patient-item-container" className="patient-item-container">
              <label htmlFor="brigada_triage"></label>
              <select
                id="brigada_triage"
                value={selectedBrigada}
                onChange={brigadaChangeHandler}
                className="dropdown-select"
              >
                <option value="">Selecciona Brigada</option>
                {sortedBrigadaNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>

              <label htmlFor="id_num_triage"></label>
              <input
                className="dropdown-select"
                id="id_num_triage"
                type="text"
                value={enteredIdNumDoc}
                onChange={findIDHandler}
                list="patientOptions"
                placeholder="Seleccionar ID Paciente"
              />
              <datalist id="patientOptions">
                {sortedPatientIDs.map((patientID) => (
                  <option key={patientID} value={patientID} />
                ))}
              </datalist>
              {enteredIdNumDoc && filteredPatientData.length > 0 && (
                <PatientsDataDisplay data={filteredPatientData} />
              )}
            </div>
          </div>
        </div>
        <div className="new-patient__controls">
          <h1>Datos adicionales del paciente</h1>
        </div>
        <div
          id="triageform"
          className="patient-item-container .new-patient__controls"
        >
          <div className="new-patient__control">
            <label htmlFor="direccion_domicilio">Dirección Domicilio</label>
            <input
              id="direccion_domicilio"
              type="text"
              value={enteredDireccionDomicilio}
              onChange={direccionDomicilioChangeHandler}
            />
          </div>
          <div className="new-patient__control">
            <label htmlFor="localidad">Localidad</label>
            <input
              id="localidad"
              type="text"
              value={enteredLocalidad}
              onChange={localidadChangeHandler}
            />
          </div>
          <div className="new-patient__control">
            <label htmlFor="telefono_fijo">Telefono Fijo</label>
            <input
              id="telefono_fijo"
              type="text"
              value={enteredTelefonoFijo}
              onChange={telefonoFijoChangeHandler}
            />
          </div>
          <div className="new-patient__control">
            <label htmlFor="celular">Celular *</label>
            <input
              id="celular"
              type="text"
              value={enteredCelular}
              onChange={celularChangeHandler}
            />
          </div>
        </div>
        <div
          id="triageform"
          className="patient-item-container .new-patient__controls"
        >
          <div className="new-patient__control">
            <label htmlFor="acompanante">Nombres y Apellidos Acompañante</label>
            <input
              id="acompanante"
              type="text"
              value={enteredAcompanante}
              onChange={acompananteChangeHandler}
            />
          </div>
          <div className="new-patient__control">
            <label htmlFor="celular_acompanante">Celular Acompañante</label>
            <input
              id="celular_acompanante"
              type="text"
              value={enteredCelularAcompanante}
              onChange={celularAcompananteChangeHandler}
            />
          </div>
          <div className="new-patient__control">
            <label htmlFor="responsable">Nombres y Apellidos Responsable</label>
            <input
              id="responsable"
              type="text"
              value={enteredResponsable}
              onChange={responsableChangeHandler}
            />
          </div>
          <div className="new-patient__control">
            <label htmlFor="celular_responsable">Celular Responsable</label>
            <input
              id="celular_responsable"
              type="text"
              value={enteredCelularResponsable}
              onChange={celularResponsableChangeHandler}
            />
          </div>
          <div className="new-patient__control">
            <label htmlFor="parentesco_responsable">
              Parentesco Responsable
            </label>
            <input
              id="parentesco_responsable"
              type="text"
              value={enteredParentescoResponsable}
              onChange={parentescoResponsableChangeHandler}
            />
          </div>
        </div>

        <div className="patient-item-container">
          <select
            id="aseguradora"
            value={enteredAseguradora}
            onChange={aseguradoraChangeHandler}
            className="dropdown-select"
          >
            <option value="">Seleccionar Aseguradora</option>
            <option value="Axa Colpatria">Axa Colpatria</option>
            <option value="Colsanitas">Colsanitas</option>
            <option value="Compensar">Compensar</option>
            <option value="Coomeva">Coomeva</option>
            <option value="MedPlus">MedPlus</option>
            <option value="Seguros Bolivar">Seguros Bolivar</option>
            <option value="Sura">Sura</option>
            <option value="Sisben">Sisben</option>
            <option value="No Tiene">No Tiene</option>
          </select>
        </div>
        <div className="patient-item-container">
          <select
            id="tipo_vinculacion"
            value={enteredTipoVinculacion}
            onChange={tipoVinculacionChangeHandler}
            className="dropdown-select"
          >
            <option value="">Seleccionar Vinculación</option>
            <option value="Contributivo">Contributivo</option>
            <option value="Subsidiado">Subsidiado</option>
            <option value="Especial">Especial</option>
            <option value="Excepcion">Excepcion</option>
            <option value="No Cotiza">No Cotiza</option>
          </select>
        </div>

        <div
          id="signos-vitales-container-wrapper"
          className="patient-item-container .new-patient__controls"
        >
          <h1> Signos Vitales *</h1>
          {signosVitales.map((item, index) => (
            <div
              id="signos-vitales-items"
              key={`signosMG-${index}`}
              className="patient-item-container"
            >
              <CheckboxOrTextInput
                id={`inputMG1-${index}`}
                label={item.label}
                isCheckbox={item.checked !== undefined}
                checked={item.checked}
                value={item.value}
                inputSize="small"
                onChange={item.onChange}
              />
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
          ))}
        </div>
      </div>
      <div className="new-patient__actions">
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
        <button type="button" onClick={submitTriageHandler}>
          Agregar Paciente
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
        {/*<button onClick={refreshPage}>Refrescar</button>*/}
      </div>
    </form>
  );
};

export default TriageForm;
