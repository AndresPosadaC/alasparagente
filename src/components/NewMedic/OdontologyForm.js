import React, { useState, useEffect } from "react";
import useApiData from "../../hooks/useApiData";
import useApiPost from "../../hooks/useApiPost";
import useFetchData from "../../hooks/useFetchData";
import CheckboxOrTextInput from "./CheckboxOrTextInput";
import PatientsDataDisplay from "../PatientsDataDisplay";
// import PatientSelection from "./PatientSelection";
import PopupMessage from "../PopupMessage";
import FarmaDataDisplay from "../FarmaDataDisplay";

import "./NewMedicForm.css";

const OdontologyForm = (props) => {
  // Define the state variables for the new fields
  const [selectedVoided, setSelectedVoided] = useState("0");
  const [enteredIdNumDoc, setEnteredIdNumDoc] = useState("");
  const [enteredFechaUltimaVisita, setEnteredFechaUltimaVisita] = useState("");
  const [enteredIntoleranciaAnestesia, setEnteredIntoleranciaAnestesia] =
    useState(false);
  const [enteredMedicacionActual, setEnteredMedicacionActual] = useState("");
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

  const [prescriptionSuccess, setPrescriptionSuccess] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [checkErrorMessage, setCheckErrorMessage] = useState(null);

  const [filteredPatientData, setFilteredPatientData] = useState([]); // State for filtered data
  const [filteredData, setFilteredData] = useState([]); // State for filtered data

  // Add a new instance of useApiPost for posting optometry data
  const { postData: postOdontologyData, error: odontologyError } =
    useApiPost("odontology_json");

  const { data: brigadaNames } = useApiData("brigadas_json", "location_b");

  const sortedBrigadaNames = brigadaNames.slice().sort();

  const { data: medicineOptionsOD } = useFetchData("med_brigada_json");

  const { postData: postFarmaData, error: farmaError } =
    useApiPost("farma_json");

  // Fetch the data:
  const { data: farmaDataIn } = useFetchData("farma_json");

  // const { data: patientOptions } = useApiData("pacientes_json", "id_num_doc");

  const { data: pasignadosData, refreshData: refreshAsignados } =
    useFetchData("pasignados_json");

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

  const handleChangeObservaciones2 = handleTextChange(
    "enteredObservaciones2",
    setEnteredObservaciones2
  );

  const handleChangeDiagnostico = handleTextChange(
    "enteredDiagnostico",
    setEnteredDiagnostico
  );

  const handleChangePlanTratamiento = handleTextChange(
    "enteredPlanTratamiento",
    setEnteredPlanTratamiento
  );

  // Define a submit handler for the optometry form
  const submitOdontologyHandler = async (event) => {
    event.preventDefault();

    // Check if the entered ID number exists in patientOptions
    const isValidIdNum = pasignadosData.includes(enteredIdNumDoc);

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
      refreshAsignados();
    }
  }, [formSuccess, refreshAsignados]);

  const handleCancel = () => {
    setSelectedVoided("0");
    setEnteredIdNumDoc("");
    setEnteredFechaUltimaVisita("");
    setEnteredIntoleranciaAnestesia(false);
    setEnteredMedicacionActual("");
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
  };

  useEffect(() => {
    if (selectedBrigada && enteredIdNumDoc) {
      // Filter the fetched data based on selectedBrigada and enteredIdNumDoc
      const filteredData = farmaDataIn.filter(
        (item) =>
          item.location_b === selectedBrigada &&
          item.id_num_doc === enteredIdNumDoc
      );
      // Set the filtered data in state
      setFilteredData(filteredData);
    }
  }, [selectedBrigada, enteredIdNumDoc, farmaDataIn]);

  const anamnesis = [
    {
      label: "Fecha de última visita al odontólogo? *",
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
      label: "cirugias",
      checked: enteredCirugias,
      onChange: handleChangeCirugias,
    },

    { label: "Cual?", checked: enteredCual, onChange: handleChangeCual },
    {
      label: "Otra Enfermedad",
      value: enteredOtraEnfermedad,
      onChange: handleChangeOtraEnfermedad,
    },
  ];

  const alergias = [
    {
      label: "penicilina",
      checked: enteredPenicilina,
      onChange: handleChangePenicilina,
    },
    {
      label: "Otros Medicamentos",
      checked: enteredOtrosMed,
      onChange: handleChangeOtrosMed,
    },
    {
      label: "Cuales",
      value: enteredCuales,
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
      label: "Frecuencia del cepillado *",
      value: enteredFrecuenciaCepillado,
      onChange: handleChangeFrecuenciaCepillado,
    },
    {
      label: "Usa seda dental? *",
      value: enteredSedaDental,
      onChange: handleChangeSedaDental,
    },
    {
      label: "Hábitos *",
      value: enteredHabitos,
      onChange: handleChangeHabitos,
    },
  ];

  return (
    <form onSubmit={submitOdontologyHandler}>
      <div className="new-medic__controls">
        <div className="new-medic__controls">
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
              list="farmaOptions"
              placeholder="Seleccionar ID Paciente"
            />
            <datalist id="farmaOptions">
              {sortedPatientIDs.map((patientID) => (
                <option key={patientID} value={patientID} />
              ))}
            </datalist>
            {filteredPatientData.length > 0 && (
              <PatientsDataDisplay data={filteredPatientData} />
            )}
          </div>
        </div>
      </div>

      <div className="new-medic__controls">
        <h1> ANAMNESIS </h1>
        <p> ✅ para si</p>
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
      <div className="new-medic__controls">
        <h1> ANTECEDENTES MÉDICOS GENERALES </h1>
        <p> ✅ para si</p>
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
          <p> ✅ para si</p>
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
                  onChange={item.onChange}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="new-medic__controls">
          <h1> EXÁMEN CLINICO</h1>
          <p> ✅ para si</p>
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
          <p> ✅ para si</p>
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
        <div className="new-medic__control">
          <div>
            <h1> Observaciones </h1>
            <div className="new-medic__control">
              <label htmlFor="observacionesHO">
                <textarea
                  id="observacionesHO"
                  className="larger-input"
                  value={enteredObservaciones2}
                  onChange={handleChangeObservaciones2}
                />
              </label>
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
            {filteredData.length > 0 && (
              <FarmaDataDisplay data={filteredData} />
            )}
          </div>
        </div>
      </div>
      <div className="medic-item-container-wrapper">
        <div className="new-medic__control">
          <div>
            <h1> DIAGNOSTICO * </h1>
            <div className="new-medic__control">
              <label htmlFor="diagnostico">
                <textarea
                  id="diagnostico"
                  className="larger-input"
                  value={enteredDiagnostico}
                  onChange={handleChangeDiagnostico}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="medic-item-container-wrapper">
        <div className="new-medic__control">
          <div>
            <h1> PLAN TRATAMIENTO * </h1>
            <div className="new-medic__control">
              <label htmlFor="planTratamiento">
                <textarea
                  id="planTratamiento"
                  className="larger-input"
                  value={enteredPlanTratamiento}
                  onChange={handleChangePlanTratamiento}
                />
              </label>
            </div>
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
