import React, { useState, useEffect } from "react";
import useApiData from "../../hooks/useApiData";
import useApiPost from "../../hooks/useApiPost";
import useFetchData from "../../hooks/useFetchData";
import CheckboxOrTextInput from "./CheckboxOrTextInput";
import PatientsDataDisplay from "../PatientsDataDisplay";
// import PatientSelection from "./PatientSelection";
import PopupMessage from "../PopupMessage";
import FarmaDataDisplay from "../FarmaDataDisplay";
import OgDataDisplay from "../OgDataDisplay";

import "./NewMedicForm.css";

const OdontologyForm = (props) => {
  // Define the state variables for the new fields
  const [selectedVoided, setSelectedVoided] = useState("0");
  const [enteredIdNumDoc, setEnteredIdNumDoc] = useState("");
  const [enteredFechaUltimaVisita, setEnteredFechaUltimaVisita] = useState("");
  const [enteredIntoleranciaAnestesia, setEnteredIntoleranciaAnestesia] =
    useState(false);
  const [enteredMedicacionActual, setEnteredMedicacionActual] = useState("");
  const [enteredMotivoConsulta, setEnteredMotivoConsulta] = useState("");
  const [enteredAlergias, setEnteredAlergias] = useState(false);
  const [enteredConvulsiones, setEnteredConvulsiones] = useState(false);
  const [enteredDiabetes, setEnteredDiabetes] = useState(false);
  const [enteredSinusitis, setEnteredSinusitis] = useState(false);
  const [enteredHepatitis, setEnteredHepatitis] = useState(false);
  const [enteredHipertensionArterial, setEnteredHipertensionArterial] =
    useState(false);
  const [enteredHipotensionArterial, setEnteredHipotensionArterial] =
    useState(false);
  const [enteredHematopoyetico, setEnteredHematopoyetico] = useState(false);
  const [enteredEnfInfectocontagiosas, setEnteredEnfInfectocontagiosas] =
    useState(false);
  const [enteredEnfCardiovasculares, setEnteredEnfCardiovasculares] =
    useState(false);
  const [enteredEnfRespiratorias, setEnteredEnfRespiratorias] = useState(false);
  const [enteredEnfEndocrinas, setEnteredEnfEndocrinas] = useState(false);
  const [enteredFiebreReumatoidea, setEnteredFiebreReumatoidea] =
    useState(false);
  const [enteredCirugias, setEnteredCirugias] = useState(false);
  const [enteredCual, setEnteredCual] = useState("");
  const [enteredOtraEnfermedad, setEnteredOtraEnfermedad] = useState("");
  const [enteredAntecedentes, setEnteredAntecedentes] = useState("");
  const [enteredPenicilina, setEnteredPenicilina] = useState(false);
  const [enteredOtrosMed, setEnteredOtrosMed] = useState(false);
  const [enteredCuales, setEnteredCuales] = useState("");
  const [enteredAtm, setEnteredAtm] = useState(false);
  const [enteredGanglios, setEnteredGanglios] = useState(false);
  const [enteredLabios, setEnteredLabios] = useState(false);
  const [enteredLengua, setEnteredLengua] = useState(false);
  const [enteredPaladar, setEnteredPaladar] = useState(false);
  const [enteredPisoBoca, setEnteredPisoBoca] = useState(false);
  const [enteredGlandulaSalival, setEnteredGlandulaSalival] = useState(false);
  const [enteredCarrillos, setEnteredCarrillos] = useState(false);
  const [enteredFasetasDesgaste, setEnteredFasetasDesgaste] = useState(false);
  const [enteredFracturas, setEnteredFracturas] = useState(false);
  const [enteredPatologiaPulpar, setEnteredPatologiaPulpar] = useState(false);
  const [enteredPatologiaTejidos, setEnteredPatologiaTejidos] = useState(false);
  const [enteredObservaciones, setEnteredObservaciones] = useState("");
  const [enteredFrecuenciaCepillado, setEnteredFrecuenciaCepillado] =
    useState("");
  const [enteredSedaDental, setEnteredSedaDental] = useState("");
  const [enteredHabitos, setEnteredHabitos] = useState("");
  const [enteredObservaciones2, setEnteredObservaciones2] = useState("");
  const [enteredDiagnostico, setEnteredDiagnostico] = useState("");
  const [enteredPlanTratamiento, setEnteredPlanTratamiento] = useState("");

  const [selectedBrigada, setSelectedBrigada] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredQuantity, setEnteredQuantity] = useState("");

  const [enteredDiente, setEnteredDiente] = useState({});
  const [selectedCara, setSelectedCara] = useState({});
  const [selectedHallazgo, setSelectedHallazgo] = useState({});

  const [selectedTratamiento, setSelectedTratamiento] = useState({});
  const [enteredCantidad, setEnteredCantidad] = useState("");
  const [enteredComentario, setEnteredComentario] = useState("");

  const [prescriptionSuccess, setPrescriptionSuccess] = useState(false);
  const [odontogramaSuccess, setOdontogramaSuccess] = useState(false);
  const [tratamientoSuccess, setTratamientoSuccess] = useState(false);

  const [enteredMedicamentosOdonto, setEnteredMedicamentosOdonto] =
    useState("");

  const [formSuccess, setFormSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [filteredPatientData, setFilteredPatientData] = useState([]); // State for filtered data
  const [filteredFarmaData, setFilteredFarmaData] = useState([]); // State for filtered data
  const [filteredOgData, setFilteredOgData] = useState([]); // State for filtered data
  const [filteredTratData, setFilteredTratData] = useState([]); // State for filtered data

  // Add a new instance of useApiPost for posting optometry data
  const { postData: postOdontologyData, error: odontologyError } =
    useApiPost("odontology_json");

  const { data: brigadaNames } = useApiData("brigadas_json", "location_b");

  const sortedBrigadaNames = brigadaNames.slice().sort();

  const { data: medicineOptionsOD, refreshData: refreshMedicine } =
    useFetchData("med_brigada_json");

  const { postData: postFarmaData, error: farmaError } =
    useApiPost("farma_json");

  const { postData: postOdontogramaData, error: odontogramaError } =
    useApiPost("odontograma_json");

  const { postData: postTratamientoData, error: tratamientoError } = useApiPost(
    "tratamientodonto_json"
  );

  // Fetch the data:
  const { data: farmaDataIn, refreshData: refreshFarma } =
    useFetchData("farma_json");

  const { data: patientOptions } = useApiData("pacientes_json", "id_num_doc");

  const { data: pasignadosData, refreshData: refreshAsignados } =
    useFetchData("pasignados_json");

  const { data: odontogramaDataIn, refreshData: refreshOdontograma } =
    useFetchData("odontograma_json");

  const { data: tratamientoDataIn, refreshData: refreshTratamiento } =
    useFetchData("tratamientodonto_json");

  useEffect(() => {
    if (selectedBrigada && enteredIdNumDoc) {
      // Filter the fetched data based on selectedBrigada and enteredIdNumDoc
      const filteredPatientData = pasignadosData.filter(
        (item) =>
          item.location_b === selectedBrigada &&
          item.id_num_doc === enteredIdNumDoc &&
          item.especialidad === "Odontología"
      );
      // Set the filtered data in state
      setFilteredPatientData(filteredPatientData);
    }
  }, [selectedBrigada, enteredIdNumDoc, pasignadosData]);

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

  const handleFarmaSubmit = async (event) => {
    event.preventDefault();

    if (
      !enteredIdNumDoc ||
      !selectedBrigada ||
      !enteredTitle ||
      !enteredQuantity
    ) {
      setErrorMessage(
        "Por favor, completa los campos de brigada, id paciente, medicamento y cantidad"
      );
      return; // Exit the function early, no need to continue checking other conditions
    }

    // Find the maximum quantity for the entered medicine
    const maxQuantityForMedicine = medicineOptionsOD.find(
      (item) => item.medicine === enteredTitle
    );

    const enteredQuantityAsInt = parseInt(enteredQuantity, 10);

    if (enteredQuantityAsInt <= 0) {
      setErrorMessage("La cantidad debe ser mayor que cero ");
    } else if (enteredQuantityAsInt > maxQuantityForMedicine.total_quantity) {
      setErrorMessage(
        "Cantidad debe ser menor o igual de: " +
          maxQuantityForMedicine.total_quantity +
          ", corregir "
      );
    } else {
      // All conditions passed, proceed with the POST request
      const farmaData = {
        voided: selectedVoided,
        id_num_doc: enteredIdNumDoc,
        location_b: selectedBrigada,
        medicine: enteredTitle,
        quantity: enteredQuantityAsInt,
      };

      // Use the postBrigadaData function to make the POST request
      const success = await postFarmaData(farmaData);

      if (success) {
        // The POST request was successful, handle accordingly
        // For example, you can reset the form here
        setSelectedVoided("0");
        setEnteredTitle("");
        setEnteredQuantity("");

        // Assume prescription update was successful
        setPrescriptionSuccess(true);
        refreshFarma();
        refreshMedicine();

        // Reset success messages after a certain duration (optional)
        setTimeout(() => {
          setPrescriptionSuccess(false);
        }, 3000); // Reset after 3 seconds (adjust as needed)
      } else {
        setErrorMessage("Error añadiendo el medicamento a farmacia");
        console.error("Error añadiendo el medicamento a farmacia:", farmaError);
      }
    }
  };

  const brigadaChangeHandler = (event) => {
    setSelectedBrigada(event.target.value);
  };

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const quantityChangeHandler = (event) => {
    setEnteredQuantity(event.target.value);
  };

  // Create a common change handler for boolean fields
  const handleBooleanChange = (fieldName, setField) => {
    return (event) => {
      setField(event.target.checked);
    };
  };

  // Create a common change handler for text fields
  const handleTextChange = (fieldName, setField) => {
    return (event) => {
      setField(event.target.value);
    };
  };

  // Usage of the common handlers
  // const handleChangeIdNumDoc = handleTextChange(
  //   "enteredIdNumDoc",
  //   setEnteredIdNumDoc
  // );

  const handleChangeFechaUltimaVisita = handleTextChange(
    "enteredFechaUltimaVisita",
    setEnteredFechaUltimaVisita
  );

  const handleChangeIntoleranciaAnestesia = handleBooleanChange(
    "enteredIntoleranciaAnestesia",
    setEnteredIntoleranciaAnestesia
  );

  const handleChangeMedicacionActual = handleTextChange(
    "enteredMedicacionActual",
    setEnteredMedicacionActual
  );

  const handleChangeMotivoConsulta = handleTextChange(
    "enteredMotivoConsulta",
    setEnteredMotivoConsulta
  );

  const handleChangeAlergias = handleBooleanChange(
    "enteredAlergias",
    setEnteredAlergias
  );

  const handleChangeConvulsiones = handleBooleanChange(
    "enteredConvulsiones",
    setEnteredConvulsiones
  );

  const handleChangeDiabetes = handleBooleanChange(
    "enteredDiabetes",
    setEnteredDiabetes
  );

  const handleChangeSinusitis = handleBooleanChange(
    "enteredSinusitis",
    setEnteredSinusitis
  );

  const handleChangeHepatitis = handleBooleanChange(
    "enteredHepatitis",
    setEnteredHepatitis
  );

  const handleChangeHipertensionArterial = handleBooleanChange(
    "enteredHipertensionArterial",
    setEnteredHipertensionArterial
  );

  const handleChangeHipotensionArterial = handleBooleanChange(
    "enteredHipotensionArterial",
    setEnteredHipotensionArterial
  );

  const handleChangeHematopoyetico = handleBooleanChange(
    "enteredHematopoyetico",
    setEnteredHematopoyetico
  );

  const handleChangeEnfInfectocontagiosas = handleBooleanChange(
    "enteredEnfInfectocontagiosas",
    setEnteredEnfInfectocontagiosas
  );

  const handleChangeEnfCardiovasculares = handleBooleanChange(
    "enteredEnfCardiovasculares",
    setEnteredEnfCardiovasculares
  );

  const handleChangeEnfRespiratorias = handleBooleanChange(
    "enteredEnfRespiratorias",
    setEnteredEnfRespiratorias
  );

  const handleChangeEnfEndocrinas = handleBooleanChange(
    "enteredEnfEndocrinas",
    setEnteredEnfEndocrinas
  );

  const handleChangeFiebreReumatoidea = handleBooleanChange(
    "enteredFiebreReumatoidea",
    setEnteredFiebreReumatoidea
  );

  const handleChangeCirugias = handleBooleanChange(
    "enteredCirugias",
    setEnteredCirugias
  );

  const handleChangeCual = handleTextChange("enteredCual", setEnteredCual);

  const handleChangeOtraEnfermedad = handleTextChange(
    "enteredOtraEnfermedad",
    setEnteredOtraEnfermedad
  );

  const handleChangeAntecedentes = handleTextChange(
    "enteredAntecedentes",
    setEnteredAntecedentes
  );

  const handleChangePenicilina = handleBooleanChange(
    "enteredPenicilina",
    setEnteredPenicilina
  );

  const handleChangeOtrosMed = handleBooleanChange(
    "enteredOtrosMed",
    setEnteredOtrosMed
  );

  const handleChangeCuales = handleTextChange(
    "enteredCuales",
    setEnteredCuales
  );

  const handleChangeAtm = handleBooleanChange("enteredAtm", setEnteredAtm);

  const handleChangeGanglios = handleBooleanChange(
    "enteredGanglios",
    setEnteredGanglios
  );

  const handleChangeLabios = handleBooleanChange(
    "enteredLabios",
    setEnteredLabios
  );

  const handleChangeLengua = handleBooleanChange(
    "enteredLengua",
    setEnteredLengua
  );

  const handleChangePaladar = handleBooleanChange(
    "enteredPaladar",
    setEnteredPaladar
  );

  const handleChangePisoBoca = handleBooleanChange(
    "enteredPisoBoca",
    setEnteredPisoBoca
  );

  const handleChangeGlandulaSalival = handleBooleanChange(
    "enteredGlandulaSalival",
    setEnteredGlandulaSalival
  );

  const handleChangeCarrillos = handleBooleanChange(
    "enteredCarrillos",
    setEnteredCarrillos
  );

  const handleChangeFasetasDesgaste = handleBooleanChange(
    "enteredFasetasDesgaste",
    setEnteredFasetasDesgaste
  );

  const handleChangeFracturas = handleBooleanChange(
    "enteredFracturas",
    setEnteredFracturas
  );

  const handleChangePatologiaPulpar = handleBooleanChange(
    "enteredPatologiaPulpar",
    setEnteredPatologiaPulpar
  );

  const handleChangePatologiaTejidos = handleBooleanChange(
    "enteredPatologiaTejidos",
    setEnteredPatologiaTejidos
  );

  const handleChangeObservaciones = handleTextChange(
    "enteredObservaciones",
    setEnteredObservaciones
  );

  const handleChangeFrecuenciaCepillado = handleTextChange(
    "enteredFrecuenciaCepillado",
    setEnteredFrecuenciaCepillado
  );

  const handleChangeSedaDental = handleTextChange(
    "enteredSedaDental",
    setEnteredSedaDental
  );

  const handleChangeHabitos = handleTextChange(
    "enteredHabitos",
    setEnteredHabitos
  );

  const handleChangeDiagnostico = handleTextChange(
    "enteredDiagnostico",
    setEnteredDiagnostico
  );

  const dienteChangeHandler = handleTextChange(
    "enteredDiente",
    setEnteredDiente
  );

  const caraChangeHandler = (event) => {
    setSelectedCara(event.target.value);
  };

  const hallazgoChangeHandler = (event) => {
    setSelectedHallazgo(event.target.value);
  };

  const handleOdontogramaSubmit = async (event) => {
    event.preventDefault();

    if (
      !enteredIdNumDoc ||
      !selectedBrigada ||
      !enteredDiente ||
      !selectedCara ||
      !selectedHallazgo
    ) {
      setErrorMessage(
        "Por favor, completa los campos de brigada, id paciente, numero diente, cara del diente y hallazgo"
      );
      return; // Exit the function early, no need to continue checking other conditions
    }

    // All conditions passed, proceed with the POST request
    const odontogramaData = {
      voided: selectedVoided,
      id_num_doc: enteredIdNumDoc,
      location_b: selectedBrigada,
      diente: enteredDiente,
      cara_diente: selectedCara,
      hallazgo: selectedHallazgo,
    };

    // Use the postOdontogramaData function to make the POST request
    const success = await postOdontogramaData(odontogramaData);

    if (success) {
      // The POST request was successful, handle accordingly
      // For example, you can reset the form here
      setSelectedVoided("0");
      setEnteredDiente("");
      setSelectedCara("");
      setSelectedHallazgo("");

      // Assume prescription update was successful
      setOdontogramaSuccess(true);
      refreshOdontograma();

      // Reset success messages after a certain duration (optional)
      setTimeout(() => {
        setOdontogramaSuccess(false);
      }, 3000); // Reset after 3 seconds (adjust as needed)
    } else {
      setErrorMessage("Error añadiendo informacion al odontograma");
      console.error(
        "Error añadiendo informacion al odontograma:",
        odontogramaError
      );
    }
  };

  const tratamientoChangeHandler = handleTextChange(
    "selectedTratamiento",
    setSelectedTratamiento
  );

  const cantidadChangeHandler = (event) => {
    setEnteredCantidad(event.target.value);
  };

  const comentarioChangeHandler = handleTextChange(
    "enteredComentario",
    setEnteredComentario
  );

  const handleTratamientoSubmit = async (event) => {
    event.preventDefault();

    if (
      !enteredIdNumDoc ||
      !selectedBrigada ||
      !selectedTratamiento ||
      !enteredCantidad
    ) {
      setErrorMessage(
        "Por favor, completa los campos de id paciente, brigada, tratamiento y cantidad"
      );
      return; // Exit the function early, no need to continue checking other conditions
    }

    // All conditions passed, proceed with the POST request
    const tratamientoData = {
      voided: selectedVoided,
      id_num_doc: enteredIdNumDoc,
      location_b: selectedBrigada,
      tratamiento: selectedTratamiento,
      cantidad: enteredCantidad,
      comentario: enteredComentario,
    };

    // Use the postOdontogramaData function to make the POST request
    const success = await postTratamientoData(tratamientoData);

    if (success) {
      // The POST request was successful, handle accordingly
      // For example, you can reset the form here
      setSelectedVoided("0");
      setSelectedTratamiento("");
      setEnteredCantidad("");
      setEnteredComentario("");

      // Assume prescription update was successful
      setTratamientoSuccess(true);
      refreshTratamiento();

      // Reset success messages after a certain duration (optional)
      setTimeout(() => {
        setTratamientoSuccess(false);
      }, 3000); // Reset after 3 seconds (adjust as needed)
    } else {
      setErrorMessage(
        "Error añadiendo informacion al tratamiento odontologico"
      );
      console.error(
        "Error añadiendo informacion al tratamiento odontologico:",
        tratamientoError
      );
    }
  };

  // Define a submit handler for the optometry form
  const submitOdontologyHandler = async (event) => {
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
      !enteredFechaUltimaVisita ||
      !enteredObservaciones ||
      !enteredFrecuenciaCepillado ||
      !enteredSedaDental ||
      !enteredHabitos ||
      !enteredObservaciones2 ||
      !enteredDiagnostico ||
      !enteredPlanTratamiento
    ) {
      setErrorMessage(
        "Por favor, completa todos los campos requeridos con *   "
      );
      return;
    }

    // Create an object for the optometry data
    const odontologyData = {
      voided: selectedVoided,
      id_num_doc: enteredIdNumDoc,
      fecha_ultima_visita: enteredFechaUltimaVisita,
      intolerancia_anestesia: enteredIntoleranciaAnestesia,
      medicacion_actual: enteredMedicacionActual,
      motivo_consulta: enteredMotivoConsulta,
      alergias: enteredAlergias,
      convulsiones: enteredConvulsiones,
      diabetes: enteredDiabetes,
      sinusitis: enteredSinusitis,
      hepatitis: enteredHepatitis,
      hipertension_arterial: enteredHipertensionArterial,
      hipotension_arterial: enteredHipotensionArterial,
      hematopoyetico: enteredHematopoyetico,
      enf_infectocontagiosas: enteredEnfInfectocontagiosas,
      enf_cardiovasculares: enteredEnfCardiovasculares,
      enf_respiratorias: enteredEnfRespiratorias,
      enf_endocrinas: enteredEnfEndocrinas,
      fiebre_reumatoidea: enteredFiebreReumatoidea,
      cirugias: enteredCirugias,
      cual: enteredCual,
      otra_enfermedad: enteredOtraEnfermedad,
      antecedentes: enteredAntecedentes,
      penicilina: enteredPenicilina,
      otros_med: enteredOtrosMed,
      cuales: enteredCuales,
      atm: enteredAtm,
      ganglios: enteredGanglios,
      labios: enteredLabios,
      lengua: enteredLengua,
      paladar: enteredPaladar,
      piso_boca: enteredPisoBoca,
      glandula_salival: enteredGlandulaSalival,
      carrillos: enteredCarrillos,
      fasetas_desgaste: enteredFasetasDesgaste,
      fracturas: enteredFracturas,
      patologia_pulpar: enteredPatologiaPulpar,
      patologia_tejidos: enteredPatologiaTejidos,
      observaciones: enteredObservaciones,
      frecuencia_cepillado: enteredFrecuenciaCepillado,
      seda_dental: enteredSedaDental,
      habitos: enteredHabitos,
      observaciones2: enteredObservaciones2,
      diagnostico: enteredDiagnostico,
      plan_tratamiento: enteredPlanTratamiento,
      medicamentos_odonto: enteredMedicamentosOdonto,
      // Add the rest of the fields here...
    };

    // Send the data to the API
    const success = await postOdontologyData(odontologyData);

    if (success) {
      // Assume form update was successful
      setFormSuccess(true);

      // Reset success messages after a certain duration (optional)
      setTimeout(() => {
        setFormSuccess(false);
      }, 3000);
    } else {
      setErrorMessage("Error al agregar datos de optometría");
      // Handle the error, e.g., show an error message to the user
      console.error("Error adding odontology data:", odontologyError);
      // Log the data before sending it
      console.log("Data being sent to API:", odontologyData);
    }
  };

  // const refreshPage = () => {
  //  window.location.reload(); // Reload the page
  // };

  // Replace the refreshPage function with useEffect
  useEffect(() => {
    if (formSuccess) {
      // Reset the form or perform any other necessary actions
      setSelectedVoided("0");
      setEnteredIdNumDoc("");
      setEnteredFechaUltimaVisita("");
      setEnteredIntoleranciaAnestesia(false);
      setEnteredMedicacionActual("");
      setEnteredMotivoConsulta("");
      setEnteredAlergias(false);
      setEnteredConvulsiones(false);
      setEnteredDiabetes(false);
      setEnteredSinusitis(false);
      setEnteredHepatitis(false);
      setEnteredHipertensionArterial(false);
      setEnteredHipotensionArterial(false);
      setEnteredHematopoyetico(false);
      setEnteredEnfInfectocontagiosas(false);
      setEnteredEnfCardiovasculares(false);
      setEnteredEnfRespiratorias(false);
      setEnteredEnfEndocrinas(false);
      setEnteredFiebreReumatoidea(false);
      setEnteredCirugias(false);
      setEnteredCual("");
      setEnteredOtraEnfermedad("");
      setEnteredAntecedentes("");
      setEnteredPenicilina(false);
      setEnteredOtrosMed(false);
      setEnteredCuales("");
      setEnteredAtm(false);
      setEnteredGanglios(false);
      setEnteredLabios(false);
      setEnteredLengua(false);
      setEnteredPaladar(false);
      setEnteredPisoBoca(false);
      setEnteredGlandulaSalival(false);
      setEnteredCarrillos(false);
      setEnteredFasetasDesgaste(false);
      setEnteredFracturas(false);
      setEnteredPatologiaPulpar(false);
      setEnteredPatologiaTejidos(false);
      setEnteredObservaciones("");
      setEnteredFrecuenciaCepillado("");
      setEnteredSedaDental("");
      setEnteredHabitos("");
      setEnteredObservaciones2("");
      setEnteredDiagnostico("");
      setEnteredPlanTratamiento("");
      setEnteredMedicamentosOdonto("");
      refreshAsignados();
      refreshFarma();
      refreshMedicine();
      refreshOdontograma();
      refreshTratamiento();
    }
  }, [
    formSuccess,
    refreshAsignados,
    refreshFarma,
    refreshMedicine,
    refreshOdontograma,
    refreshTratamiento,
  ]);

  const handleCancel = () => {
    refreshAsignados();
    refreshFarma();
    refreshMedicine();
    setSelectedVoided("0");
    setEnteredIdNumDoc("");
    setEnteredFechaUltimaVisita("");
    setEnteredIntoleranciaAnestesia(false);
    setEnteredMedicacionActual("");
    setEnteredMotivoConsulta("");
    setEnteredAlergias(false);
    setEnteredConvulsiones(false);
    setEnteredDiabetes(false);
    setEnteredSinusitis(false);
    setEnteredHepatitis(false);
    setEnteredHipertensionArterial(false);
    setEnteredHipotensionArterial(false);
    setEnteredHematopoyetico(false);
    setEnteredEnfInfectocontagiosas(false);
    setEnteredEnfCardiovasculares(false);
    setEnteredEnfRespiratorias(false);
    setEnteredEnfEndocrinas(false);
    setEnteredFiebreReumatoidea(false);
    setEnteredCirugias(false);
    setEnteredCual("");
    setEnteredOtraEnfermedad("");
    setEnteredAntecedentes("");
    setEnteredPenicilina(false);
    setEnteredOtrosMed(false);
    setEnteredCuales("");
    setEnteredAtm(false);
    setEnteredGanglios(false);
    setEnteredLabios(false);
    setEnteredLengua(false);
    setEnteredPaladar(false);
    setEnteredPisoBoca(false);
    setEnteredGlandulaSalival(false);
    setEnteredCarrillos(false);
    setEnteredFasetasDesgaste(false);
    setEnteredFracturas(false);
    setEnteredPatologiaPulpar(false);
    setEnteredPatologiaTejidos(false);
    setEnteredObservaciones("");
    setEnteredFrecuenciaCepillado("");
    setEnteredSedaDental("");
    setEnteredHabitos("");
    setEnteredObservaciones2("");
    setEnteredDiagnostico("");
    setEnteredPlanTratamiento("");
    setEnteredMedicamentosOdonto("");
    setEnteredDiente("");
    setSelectedCara("");
    setSelectedHallazgo("");
    setSelectedTratamiento("");
    setEnteredCantidad("");
    setEnteredComentario("");
  };

  useEffect(() => {
    if (selectedBrigada && enteredIdNumDoc) {
      // Filter the fetched data based on selectedBrigada and enteredIdNumDoc
      const filteredFarmaData = farmaDataIn.filter(
        (item) =>
          item.location_b === selectedBrigada &&
          item.id_num_doc === enteredIdNumDoc
      );
      // Set the filtered data in state
      setFilteredFarmaData(filteredFarmaData);
    }
  }, [selectedBrigada, enteredIdNumDoc, farmaDataIn]);

  useEffect(() => {
    if (selectedBrigada && enteredIdNumDoc) {
      // Filter the fetched data based on selectedBrigada and enteredIdNumDoc
      const filteredOgData = odontogramaDataIn.filter(
        (item) =>
          item.location_b === selectedBrigada &&
          item.id_num_doc === enteredIdNumDoc
      );
      // Set the filtered data in state
      setFilteredOgData(filteredOgData);
    }
  }, [selectedBrigada, enteredIdNumDoc, odontogramaDataIn]);

  useEffect(() => {
    if (selectedBrigada && enteredIdNumDoc) {
      // Filter the fetched data based on selectedBrigada and enteredIdNumDoc
      const filteredTratData = tratamientoDataIn.filter(
        (item) =>
          item.location_b === selectedBrigada &&
          item.id_num_doc === enteredIdNumDoc
      );
      // Set the filtered data in state
      setFilteredTratData(filteredTratData);
    }
  }, [selectedBrigada, enteredIdNumDoc, tratamientoDataIn]);

  const anamnesis = [
    {
      label: "Fecha última visita? *",
      value: enteredFechaUltimaVisita,
      onChange: handleChangeFechaUltimaVisita,
    },
    {
      label: "Intolerancia a la anestesia",
      checked: enteredIntoleranciaAnestesia,
      onChange: handleChangeIntoleranciaAnestesia,
    },
    {
      label: "Medicación Actual",
      value: enteredMedicacionActual,
      onChange: handleChangeMedicacionActual,
    },
  ];

  const antecedentesItems = [
    {
      label: "Alergias",
      checked: enteredAlergias,
      onChange: handleChangeAlergias,
    },
    {
      label: "Convulciones",
      checked: enteredConvulsiones,
      onChange: handleChangeConvulsiones,
    },
    {
      label: "Diabetes",
      checked: enteredDiabetes,
      onChange: handleChangeDiabetes,
    },
    {
      label: "Sinusitis",
      checked: enteredSinusitis,
      onChange: handleChangeSinusitis,
    },
    {
      label: "Hepatitis",
      checked: enteredHepatitis,
      onChange: handleChangeHepatitis,
    },
    {
      label: "Hipertension Arterial",
      checked: enteredHipertensionArterial,
      onChange: handleChangeHipertensionArterial,
    },
    {
      label: "Hipotension Arterial",
      checked: enteredHipotensionArterial,
      onChange: handleChangeHipotensionArterial,
    },
    {
      label: "Hematopoyetico",
      checked: enteredHematopoyetico,
      onChange: handleChangeHematopoyetico,
    },
    {
      label: "Enfermedad Infectocontagiosas",
      checked: enteredEnfInfectocontagiosas,
      onChange: handleChangeEnfInfectocontagiosas,
    },
    {
      label: "Enfermedad Cardiovasculares",
      checked: enteredEnfCardiovasculares,
      onChange: handleChangeEnfCardiovasculares,
    },
    {
      label: "Enfermedad Respiratorias",
      checked: enteredEnfRespiratorias,
      onChange: handleChangeEnfRespiratorias,
    },
    {
      label: "Enfermedad Endocrinas",
      checked: enteredEnfEndocrinas,
      onChange: handleChangeEnfEndocrinas,
    },
    {
      label: "Fiebre Reumatoidea",
      checked: enteredFiebreReumatoidea,
      onChange: handleChangeFiebreReumatoidea,
    },
    {
      label: "Cirugias",
      checked: enteredCirugias,
      onChange: handleChangeCirugias,
    },
    {
      label: "Cuáles Cirugías? ",
      value: enteredCual,
      inputSize: "larger",
      onChange: handleChangeCual,
    },
    {
      label: "Otras Enfermedades",
      value: enteredOtraEnfermedad,
      inputSize: "larger",
      onChange: handleChangeOtraEnfermedad,
    },
  ];

  const alergias = [
    {
      label: "Penicilina ",
      checked: enteredPenicilina,
      onChange: handleChangePenicilina,
    },
    {
      label: "Otros Medicamentos",
      checked: enteredOtrosMed,
      onChange: handleChangeOtrosMed,
    },
    {
      label: "Cuáles Medicamentos? ",
      value: enteredCuales,
      inputSize: "large",
      onChange: handleChangeCuales,
    },
  ];

  const examenClinico = [
    {
      label: "ATM",
      checked: enteredAtm,
      onChange: handleChangeAtm,
    },
    {
      label: "Ganglios",
      checked: enteredGanglios,
      onChange: handleChangeGanglios,
    },
    {
      label: "Labios",
      checked: enteredLabios,
      onChange: handleChangeLabios,
    },
    {
      label: "Lengua",
      checked: enteredLengua,
      onChange: handleChangeLengua,
    },
    {
      label: "Paladar",
      checked: enteredPaladar,
      onChange: handleChangePaladar,
    },
    {
      label: "Piso de boca",
      checked: enteredPisoBoca,
      onChange: handleChangePisoBoca,
    },
    {
      label: "Glándula salival",
      checked: enteredGlandulaSalival,
      onChange: handleChangeGlandulaSalival,
    },
    {
      label: "Carrillos",
      checked: enteredCarrillos,
      onChange: handleChangeCarrillos,
    },
  ];

  const examenDental = [
    {
      label: "Fasetas desgaste",
      checked: enteredFasetasDesgaste,
      onChange: handleChangeFasetasDesgaste,
    },
    {
      label: "Fracturas",
      checked: enteredFracturas,
      onChange: handleChangeFracturas,
    },
    {
      label: "Patología pulpar",
      checked: enteredPatologiaPulpar,
      onChange: handleChangePatologiaPulpar,
    },
    {
      label: "Patología tejidos duros",
      checked: enteredPatologiaTejidos,
      onChange: handleChangePatologiaTejidos,
    },
  ];

  const higieneOral = [
    {
      label: "Frecuencia cepillado *",
      value: enteredFrecuenciaCepillado,
      onChange: handleChangeFrecuenciaCepillado,
    },
    {
      label: "Usa seda dental? *",
      checked: enteredSedaDental,
      onChange: handleChangeSedaDental,
    },
    {
      label: "Hábitos *",
      value: enteredHabitos,
      onChange: handleChangeHabitos,
    },
  ];

  const handleChangeMedicamentosOdonto = handleTextChange(
    "enteredMedicamentosOdonto",
    setEnteredMedicamentosOdonto
  );

  return (
    <form onSubmit={submitOdontologyHandler}>
      <div className="new-medic__controls">
        <div className="medic-item-container .new-medic__controls">
          <h1>Datos de Odontología del Paciente</h1>
          <div id="medic-item-container" className="medic-item-container">
            <label htmlFor="brigada_od"></label>
            <select
              id="brigada_od"
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

            <label htmlFor="id_num_od"></label>
            <input
              className="dropdown-select"
              id="id_num_od"
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

      <div className="new-medic__controls">
        <h1> ANAMNESIS </h1>

        <div className="medic-item-container-wrapper">
          {anamnesis.map((item, index) => (
            <div
              key={`anamnesis-${index}`}
              className="medic-item-container .new-medic__controls"
            >
              <CheckboxOrTextInput
                id={`input-${index}`}
                label={item.label}
                isCheckbox={item.checked !== undefined}
                checked={item.checked}
                value={item.value}
                onChange={item.onChange}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="new-medic__control">
        <div>
          <h1> Motivo Consulta </h1>
          <div className="new-medic__control">
            <label htmlFor="motivo_consulta">
              <textarea
                id="motivo_consulta"
                className="larger-input"
                value={enteredMotivoConsulta}
                onChange={handleChangeMotivoConsulta}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="new-medic__controls">
        <h1> ANTECEDENTES MÉDICOS GENERALES </h1>

        <div className="medic-item-container-wrapper">
          {antecedentesItems.map((item, index) => (
            <div
              key={`antecedentesOD_M-${index}`}
              className="medic-item-container .new-medic__controls"
            >
              <CheckboxOrTextInput
                id={`inputOD1-${index}`}
                label={item.label}
                isCheckbox={item.checked !== undefined}
                checked={item.checked}
                value={item.value}
                inputSize={item.inputSize}
                onChange={item.onChange}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="medic-item-container-wrapper">
        <div className="new-medic__control">
          <div>
            <h1> Antecedentes Familiares </h1>
            <div className="new-medic__control">
              <label htmlFor="antecedentesFam">
                <textarea
                  id="antecedentesFam"
                  className="larger-input"
                  value={enteredAntecedentes}
                  onChange={handleChangeAntecedentes}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="new-medic__controls">
          <h1> ALERGIAS</h1>

          <div className="medic-item-container-wrapper">
            {alergias.map((item, index) => (
              <div
                key={`alergias-${index}`}
                className="medic-item-container .new-medic__controls"
              >
                <CheckboxOrTextInput
                  id={`inputOD2-${index}`}
                  label={item.label}
                  isCheckbox={item.checked !== undefined}
                  checked={item.checked}
                  value={item.value}
                  inputSize={item.inputSize}
                  onChange={item.onChange}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="new-medic__controls">
          <h1> EXÁMEN CLINICO</h1>

          <div className="medic-item-container-wrapper">
            {examenClinico.map((item, index) => (
              <div
                key={`examenClin-${index}`}
                className="medic-item-container .new-medic__controls"
              >
                <CheckboxOrTextInput
                  id={`inputOD3-${index}`}
                  label={item.label}
                  isCheckbox={item.checked !== undefined}
                  checked={item.checked}
                  value={item.value}
                  onChange={item.onChange}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="medic-item-container-wrapper">
        <div className="new-medic__controls">
          <h1> EXÁMEN DENTAL </h1>

          <div className="medic-item-container-wrapper">
            {examenDental.map((item, index) => (
              <div
                key={`examenDent-${index}`}
                className="medic-item-container .new-medic__controls"
              >
                <CheckboxOrTextInput
                  id={`inputOD4-${index}`}
                  label={item.label}
                  isCheckbox={item.checked !== undefined}
                  checked={item.checked}
                  value={item.value}
                  onChange={item.onChange}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="new-medic__control">
          <div>
            <h1> Observaciones </h1>
            <div className="new-medic__control">
              <label htmlFor="observacionesEO">
                <textarea
                  id="observacionesEO"
                  className="larger-input"
                  value={enteredObservaciones}
                  onChange={handleChangeObservaciones}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="new-medic__controls">
          <h1> HIGIENE ORAL</h1>
          <div className="medic-item-container-wrapper">
            {higieneOral.map((item, index) => (
              <div
                key={`higiene-${index}`}
                className="medic-item-container .new-medic__controls"
              >
                <CheckboxOrTextInput
                  id={`inputOD5-${index}`}
                  label={item.label}
                  isCheckbox={item.checked !== undefined}
                  checked={item.checked}
                  value={item.value}
                  onChange={item.onChange}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="new-optimetry__control">
          <h1> ODONTOGRAMA </h1>
          <div className="medic-item-container">
            <div className="medic-item-container-wrapper">
              <div className="new-medic__control">
                <label htmlFor="diente">Diente num</label>
                <select
                  id="diente"
                  type="text"
                  value={enteredDiente}
                  onChange={dienteChangeHandler}
                  className="dropdown-select2"
                >
                  <option value="">Seleccion</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="31">31</option>
                  <option value="32">32</option>
                  <option value="33">33</option>
                  <option value="34">34</option>
                  <option value="35">35</option>
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="41">41</option>
                  <option value="42">42</option>
                  <option value="43">43</option>
                  <option value="44">44</option>
                  <option value="45">45</option>
                  <option value="46">46</option>
                  <option value="47">47</option>
                  <option value="48">48</option>
                  <option value="51">51</option>
                  <option value="52">52</option>
                  <option value="53">53</option>
                  <option value="54">54</option>
                  <option value="55">55</option>
                  <option value="61">61</option>
                  <option value="62">62</option>
                  <option value="63">63</option>
                  <option value="64">64</option>
                  <option value="65">65</option>
                  <option value="71">71</option>
                  <option value="72">72</option>
                  <option value="73">73</option>
                  <option value="74">74</option>
                  <option value="75">75</option>
                  <option value="81">81</option>
                  <option value="82">82</option>
                  <option value="83">83</option>
                  <option value="84">84</option>
                  <option value="85">85</option>
                </select>
              </div>
              <div className="new-medic__control">
                <label htmlFor="caradiente">Cara</label>
                <select
                  id="caradiente"
                  type="text"
                  onChange={caraChangeHandler}
                  className="dropdown-select2"
                >
                  <option value="">Seleccion</option>
                  <option value="cara_o">cara o</option>
                  <option value="cara_m">cara m</option>
                  <option value="cara_d">cara d</option>
                  <option value="cara_i">cara i</option>
                  <option value="cara_pl">cara p-l</option>
                </select>
              </div>
              <div className="new-medic__control">
                <label htmlFor="hallazgo">Hallazgo</label>
                <select
                  id="hallazgo"
                  type="text"
                  onChange={hallazgoChangeHandler}
                  className="dropdown-select"
                >
                  <option value="">Seleccion</option>
                  <option value="Caries">Caries</option>
                  <option value="Obtrusado Bueno">Obtrusado bueno</option>
                  <option value="Obtrusado Desadaptado">
                    Obtrusado desadaptado
                  </option>
                  <option value="Perdido">Perdido</option>
                  <option value="Fracturado">Fracturado</option>
                  <option value="Extraccion Indicada">
                    Extraccion Indicada
                  </option>
                  <option value="En Erupcion">En Erupcion</option>
                  <option value="Corona Buena">Corona Buena</option>
                  <option value="Corona Desadaptada">Corona Desadaptada</option>
                </select>
              </div>
              <button type="button" onClick={handleOdontogramaSubmit}>
                +Diente
              </button>
              {odontogramaSuccess && (
                <PopupMessage
                  message="¡El hallazgo en diente se actualizó correctamente!"
                  onClose={() => setOdontogramaSuccess(false)}
                />
              )}
            </div>
            {enteredIdNumDoc && filteredOgData.length > 0 && (
              <OgDataDisplay data={filteredOgData} />
            )}
          </div>
        </div>
      </div>
      <div className="medic-item-container-wrapper">
        <div className="new-medic__control">
          <div className="medic-item-container">
            <div className="medic-item-container-wrapper">
              <h1> DIAGNOSTICO * </h1>
              <select
                id="diagnostico"
                type="text"
                value={enteredDiagnostico}
                onChange={handleChangeDiagnostico}
                className="dropdown-select"
              >
                <option value="">Seleccionar</option>
                <option value="Favorable">Favorable</option>
                <option value="Desfavorable">Desfavorable</option>
              </select>
            </div>
            <div className="new-optimetry__control">
              <h1> TRATAMIENTO </h1>
              <div className="medic-item-container">
                <div className="medic-item-container-wrapper">
                  <div className="new-medic__control">
                    <select
                      id="tratamiento"
                      type="text"
                      value={selectedTratamiento}
                      onChange={tratamientoChangeHandler}
                      className="dropdown-select"
                    >
                      <option value="">Seleccion Tratamiento</option>
                      <option value="Profilaxis">Profilaxis</option>
                      <option value="Control_Placa">Control de Placa</option>
                      <option value="Sellantes">Sellantes</option>
                      <option value="Detractaje_supragingival">
                        Detractaje supragingival
                      </option>
                      <option value="Aplicacion_fluor">Aplicación flúor</option>
                      <option value="Amalgama_superficie_principal">
                        Amalgama Superficie Principal
                      </option>
                      <option value="Amalgama_adicional">
                        Amalgama Adicional
                      </option>
                      <option value="Resina_superficie_principal">
                        Resina Superficie Principal
                      </option>
                      <option value="Resina_adicional">Resina Adicional</option>
                      <option value="Ionovidrio_superficie_principal">
                        Ionovidrio Superficie Principal
                      </option>
                      <option value="Ionovidrio_adicional">
                        Ionovidrio Adicional
                      </option>
                      <option value="Endodoncia_pulpotomia">
                        Endodoncia Pulpotomia
                      </option>
                      <option value="Endodoncia_pulpectomia">
                        Endodoncia Pulpectomia
                      </option>
                      <option value="Cirugia_Oral_Exod_Temp">
                        Cirugia Oral Exod Temp
                      </option>
                      <option value="Cirugia_Oral_Exod_Simple_Permanente">
                        Cirugia Oral Exod Simple Permanente
                      </option>
                      <option value="Cirugia_Oral_Exod_Mot_Abi_Permanente">
                        Cirugia Oral Exod Mot Abi Permanente
                      </option>
                    </select>
                  </div>
                  <div className="medic-item-container .new-medic__controls">
                    <label htmlFor="cantidad">
                      Cantidad Tratamiento Realizado
                    </label>
                    <input
                      id="cantidad"
                      type="number"
                      min="1"
                      step="1"
                      max="100"
                      value={enteredCantidad}
                      onChange={cantidadChangeHandler}
                    />
                  </div>
                  <label htmlFor="comentarios">
                    <textarea
                      id="comentarios"
                      className="larger-input"
                      value={enteredComentario}
                      onChange={comentarioChangeHandler}
                      placeholder="Comentario"
                    />
                  </label>
                </div>
              </div>

              <div>
                <button type="button" onClick={handleTratamientoSubmit}>
                  +Tratamiento
                </button>
                {tratamientoSuccess && (
                  <PopupMessage
                    message="¡Tratamiento ingresado correctamente!"
                    onClose={() => setTratamientoSuccess(false)}
                  />
                )}
              </div>
            </div>
            {enteredIdNumDoc && filteredTratData.length > 0 && (
              <tratamientoDataDisplay data={filteredTratData} />
            )}
          </div>
        </div>
      </div>
      <div className="new-optimetry__control">
        <h1> Receta Farmacia </h1>
        <div className="medic-item-container">
          <div className="medic-item-container-wrapper">
            <div className="new-medic__control">
              <label htmlFor="medicineOD">Principio Activo</label>
              <input
                id="medicineOD"
                type="text"
                value={enteredTitle}
                onChange={titleChangeHandler}
                list="medicineOptionsOD"
                placeholder="Seleccionar"
              />
              <datalist id="medicineOptionsOD">
                {medicineOptionsOD.map((option, index) => (
                  <option
                    key={`${option.medicine}-${index}`}
                    value={option.medicine}
                  />
                ))}
              </datalist>
            </div>
          </div>
          <div className="new-medic__control">
            <label htmlFor="quantity">Cantidad</label>
            <input
              id="quantity"
              type="number"
              min="1"
              step="1"
              value={enteredQuantity}
              onChange={quantityChangeHandler}
            />
            <button type="button" onClick={handleFarmaSubmit}>
              +Medicina
            </button>
            {prescriptionSuccess && (
              <PopupMessage
                message="¡La receta se actualizó correctamente!"
                onClose={() => setPrescriptionSuccess(false)}
              />
            )}
          </div>
          {enteredIdNumDoc && filteredFarmaData.length > 0 && (
            <FarmaDataDisplay data={filteredFarmaData} />
          )}
        </div>
      </div>
      <div className="new-medic__control">
        <div className="medic-item-container-wrapper">
          <div className="medic-item-container .new-medic__controls">
            <h2> Instrucciones toma Medicamentos * </h2>
            <label htmlFor="medicamentos_odonto">
              <textarea
                id="medicamentos_odonto"
                className="larger-input"
                value={enteredMedicamentosOdonto}
                onChange={handleChangeMedicamentosOdonto}
                placeholder="Cómo tomar los medicamentos?"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="new-medic__actions">
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
        <button type="button" onClick={submitOdontologyHandler}>
          + Agregar
        </button>
        {formSuccess && (
          <PopupMessage
            message="¡Datos agregados exitosamente!"
            onClose={() => setFormSuccess(false)}
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

export default OdontologyForm;
