import React, { useState, useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import useApiData from "../../hooks/useApiData";
import useApiPost from "../../hooks/useApiPost";
import PopupMessage from "../PopupMessage";

import "./PatientForm.css";

const PatientForm = (props) => {
  const [selectedVoided, setSelectedVoided] = useState("0");
  const [enteredIdNumDoc, setEnteredIdNumDoc] = useState("");
  const [enteredTipoDoc, setEnteredTipoDoc] = useState("");
  const [enteredNombres, setEnteredNombres] = useState("");
  const [enteredApellidos, setEnteredApellidos] = useState("");
  const [enteredNacimiento, setEnteredNacimiento] = useState("");
  const [enteredEstadoCivil, setEnteredEstadoCivil] = useState("");
  const [enteredSexo, setEnteredSexo] = useState("");
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
  const [selectedBrigada, setSelectedBrigada] = useState("");
  const [selectedEspecialidad, setSelectedEspacialidad] = useState("");
  const [enteredMotivoConsulta, setEnteredMotivoConsulta] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { data: idNumOptions } = useFetchData("pacientes_json");

  const { data: brigadaNames } = useApiData("brigadas_json", "location_b");

  const sortedBrigadaNames = brigadaNames.slice().sort();

  // Make the POST request using the useApiPost hook
  const { postData: postPatientData, error: patientError } =
    useApiPost("pacientes_json");

  const { postData: postPatientAsignData, error: patientAsignError } =
    useApiPost("asigna_json");

  const idNumDocChangeHandler = (event) => {
    setEnteredIdNumDoc(event.target.value);
  };

  const tipoDocChangeHandler = (event) => {
    setEnteredTipoDoc(event.target.value);
  };

  const nombresChangeHandler = (event) => {
    setEnteredNombres(event.target.value);
  };

  const apellidosChangeHandler = (event) => {
    setEnteredApellidos(event.target.value);
  };

  const nacimientoChangeHandler = (event) => {
    setEnteredNacimiento(event.target.value);
  };

  const estadoCivilChangeHandler = (event) => {
    setEnteredEstadoCivil(event.target.value);
  };

  const sexoChangeHandler = (event) => {
    setEnteredSexo(event.target.value);
  };

  const ocupacionChangeHandler = (event) => {
    setEnteredOcupacion(event.target.value);
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

  const brigadaChangeHandler = (event) => {
    setSelectedBrigada(event.target.value);
  };

  const especialidadChangeHandler = (event) => {
    setSelectedEspacialidad(event.target.value);
  };

  const motivoConsultaChangeHandler = (event) => {
    setEnteredMotivoConsulta(event.target.value);
  };

  const handleCancel = () => {
    setSelectedVoided("0");
    setEnteredIdNumDoc("");
    setEnteredTipoDoc("");
    setEnteredNombres("");
    setEnteredApellidos("");
    setEnteredNacimiento("");
    setEnteredEstadoCivil("");
    setEnteredSexo("");
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
    setEnteredMotivoConsulta("");
  };

  const submitPatientHandler = async (event) => {
    event.preventDefault();

    if (
      !enteredIdNumDoc ||
      !enteredTipoDoc ||
      !enteredNombres ||
      !enteredApellidos ||
      !enteredNacimiento ||
      !enteredSexo
    ) {
      setErrorMessage("Por favor, completa todos los campos requeridos con * ");
      return; // Exit the function early, no need to continue checking other conditions
    }

    // Check if the entered patient exists in the selected origin
    const isIDinPatients = idNumOptions.some(
      (item) => item.id_num_doc === enteredIdNumDoc
    );

    if (isIDinPatients) {
      setErrorMessage("ID " + enteredIdNumDoc + " ya registada ");
    } else {
      // All conditions passed, proceed with the POST request
      // Format the date to a string in the format YYYY-MM-DD

      const formattedDate = new Date(enteredNacimiento)
        .toISOString()
        .split("T")[0];

      // Create patientData object
      const patientsData = {
        voided: selectedVoided,
        id_num_doc: enteredIdNumDoc,
        tipo_doc: enteredTipoDoc,
        nombres: enteredNombres,
        apellidos: enteredApellidos,
        nacimiento: formattedDate,
        estado_civil: enteredEstadoCivil,
        sexo: enteredSexo,
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
      };

      const asignData = {
        voided: selectedVoided,
        id_num_doc: enteredIdNumDoc,
        location_b: selectedBrigada,
        especialidad: selectedEspecialidad,
        motivo_consulta: enteredMotivoConsulta,
      };
      const successPatientData = await postPatientData(patientsData).catch(
        (error) => {
          setErrorMessage("Error añadiendo el paciente ");
          console.error("Error adding data to pacientes:", patientError);
        }
      );

      const successPatientAsignData = await postPatientAsignData(
        asignData
      ).catch((error) => {
        setErrorMessage("Error asignando el paciente ");
        console.error("Error asignando data del pacientes:", patientAsignError);
      });

      if (successPatientData && successPatientAsignData) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        setErrorMessage("Error en el proceso de paciente.");
      }
    }
  };

  // Replace the refreshPage function with useEffect
  useEffect(() => {
    if (showSuccessMessage) {
      // Clear input fields
      setSelectedVoided("0");
      setEnteredIdNumDoc("");
      setEnteredTipoDoc("");
      setEnteredNombres("");
      setEnteredApellidos("");
      setEnteredNacimiento("");
      setEnteredEstadoCivil("");
      setEnteredSexo("");
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
      setEnteredMotivoConsulta("");
    }
  }, [showSuccessMessage]);

  // const refreshPage = () => {
  //  window.location.reload(); // Reload the page
  // };

  return (
    <form onSubmit={submitPatientHandler}>
      <div className="new-patient__controls">
        <h1>Datos de identificación del paciente</h1>
        <div className="new-patient__controls">
          <div className="new-patient__control">
            <label htmlFor="tipo-doc">Tipo de Documento *</label>
            <select
              id="tipo-doc"
              value={enteredTipoDoc}
              onChange={tipoDocChangeHandler}
              className="dropdown-select"
            >
              <option value="">Tipo de documento</option>
              <option value="CC">CC</option>
              <option value="CE">CE</option>
              <option value="TI">TI</option>
              <option value="RC">RC</option>
            </select>
          </div>
          <div className="new-patient__control">
            <label htmlFor="id-num-doc">Numero de Documento *</label>
            <input
              id="id-num-doc"
              type="text"
              value={enteredIdNumDoc}
              onChange={idNumDocChangeHandler}
            />
          </div>
          <div className="new-patient__control">
            <label htmlFor="nombres">Nombres del Paciente *</label>
            <input
              id="nombres"
              type="text"
              value={enteredNombres}
              onChange={nombresChangeHandler}
            />
          </div>
          <div className="new-patient__control">
            <label htmlFor="apellidos">Apellidos del Paciente *</label>
            <input
              id="apellidos"
              type="text"
              value={enteredApellidos}
              onChange={apellidosChangeHandler}
            />
          </div>
          <div className="new-patient__control">
            <label htmlFor="nacimiento">Fecha de Nacimiento *</label>
            <input
              type="date"
              min="1911-01-01"
              id="nacimiento"
              value={enteredNacimiento}
              onChange={nacimientoChangeHandler}
            />
          </div>
          <div className="new-patient__control">
            <label htmlFor="estado_civil">Estado Civil</label>
            <select
              id="estado_civil"
              value={enteredEstadoCivil}
              onChange={estadoCivilChangeHandler}
              className="dropdown-select"
            >
              <option value="">Seleccionar</option>
              <option value="Soltero">Soltero</option>
              <option value="Union Libre">Union Libre</option>
              <option value="Casado">Casado</option>
              <option value="Separado">Separado</option>
              <option value="Divorciado">Divorciado</option>
              <option value="Viudo">Viudo</option>
            </select>
          </div>
          <div className="new-patient__control">
            <label htmlFor="sexo">Sexo *</label>
            <select
              id="sexo"
              value={enteredSexo}
              onChange={sexoChangeHandler}
              className="dropdown-select"
            >
              <option value="">Seleccionar</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="new-patient__control">
            <label htmlFor="ocupacion">Ocupación</label>
            <input
              id="ocupacion"
              type="text"
              value={enteredOcupacion}
              onChange={ocupacionChangeHandler}
            />
          </div>
        </div>
        <div className="new-patient__controls">
          <h1>Datos adicionales del paciente</h1>
        </div>
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
          <label htmlFor="celular">Celular</label>
          <input
            id="celular"
            type="text"
            value={enteredCelular}
            onChange={celularChangeHandler}
          />
        </div>
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
          <label htmlFor="parentesco_responsable">Parentesco Responsable</label>
          <input
            id="parentesco_responsable"
            type="text"
            value={enteredParentescoResponsable}
            onChange={parentescoResponsableChangeHandler}
          />
        </div>
        <div className="new-patient__control">
          <label htmlFor="aseguradora">Aseguradora</label>
          <select
            id="aseguradora"
            value={enteredAseguradora}
            onChange={aseguradoraChangeHandler}
            className="dropdown-select"
          >
            <option value="">Seleccionar</option>
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
        <div className="new-patient__control">
          <label htmlFor="tipo_vinculacion">Tipo de Vinculacion</label>
          <select
            id="tipo_vinculacion"
            value={enteredTipoVinculacion}
            onChange={tipoVinculacionChangeHandler}
            className="dropdown-select"
          >
            <option value="">Seleccionar</option>
            <option value="Contributivo">Contributivo</option>
            <option value="Subsidiado">Subsidiado</option>
            <option value="Especial">Especial</option>
            <option value="Excepcion">Excepcion</option>
            <option value="No Cotiza">No Cotiza</option>
          </select>
        </div>
        <div className="new-patient__controls">
          <h1>Asignación</h1>
          <div className="new-patient__controls">
            <div className="new-patient__controls">
              <label htmlFor="brigada"></label>
              <select
                id="brigada"
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
            <h2> Motivo Consulta</h2>
            <div id="motivo-consulta-container" className="new-medic__control">
              <label htmlFor="motivo-consulta">
                <textarea
                  id="motivo-consulta"
                  className="larger-input"
                  value={enteredMotivoConsulta}
                  onChange={motivoConsultaChangeHandler}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="new-patient__actions">
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
        <button type="button" onClick={submitPatientHandler}>
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

export default PatientForm;
