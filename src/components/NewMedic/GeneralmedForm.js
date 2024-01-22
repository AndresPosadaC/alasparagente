import React, { useState, useEffect } from "react";
import useApiData from "../../hooks/useApiData";
import useApiPost from "../../hooks/useApiPost";
import useFetchData from "../../hooks/useFetchData";
import CheckboxOrTextInput from "./CheckboxOrTextInput";
import PatientSelection from "./PatientSelection";
import PopupMessage from "../PopupMessage";

import "./NewMedicForm.css";

const GeneralmedForm = (props) => {
  // Define the state variables for the new fields
  const [enteredIdNumDoc, setEnteredIdNumDoc] = useState("");
  const [enteredMotivoConsulta, setEnteredMotivoConsulta] = useState("");
  const [enteredFrecCardiaca, setEnteredFrecCardiaca] = useState(80);
  const [enteredTensionArterial, setEnteredTensionArterial] =
    useState("120/80");
  const [enteredFrecRespiratoria, setEnteredFrecRespiratoria] = useState(16);
  const [enteredSatO2, setEnteredSatO2] = useState(95);
  const [enteredTemperatura, setEnteredTemperatura] = useState(36);
  const [enteredPeso, setEnteredPeso] = useState(70);
  const [enteredTalla, setEnteredTalla] = useState(170);
  const [enteredParaclinicos, setEnteredParaclinicos] = useState("");
  const [enteredEnfermedadActual, setEnteredEnfermedadActual] = useState("");
  const [enteredGineco, setEnteredGineco] = useState(false);
  const [enteredGinecoGestaciones, setEnteredGinecoGestaciones] = useState(0);
  const [enteredGinecoPartos, setEnteredGinecoPartos] = useState(0);
  const [enteredGinecoCesarias, setEnteredGinecoCesarias] = useState(0);
  const [enteredGinecoAbortos, setEnteredGinecoAbortos] = useState(0);
  const [enteredGinecoVivos, setEnteredGinecoVivos] = useState(0);
  const [enteredAlergias, setEnteredAlergias] = useState("");
  const [enteredMedAlergias, setEnteredMedAlergias] = useState("");
  const [enteredMedAntecedentes, setEnteredMedAntecedentes] = useState("");
  const [enteredTransfusionAnt, setEnteredTransfusionAnt] = useState(false);
  const [enteredQuirurgicosAnt, setEnteredQuirurgicosAnt] = useState("");
  const [enteredAlcoholAnt, setEnteredAlcoholAnt] = useState(false);
  const [enteredFumaAnt, setEnteredFumaAnt] = useState(false);
  const [enteredPsicoactivasAnt, setEnteredPsicoactivasAnt] = useState(false);
  const [enteredFamiliaAnt, setEnteredFamiliaAnt] = useState("");
  const [enteredDiagnostico, setEnteredDiagnostico] = useState("");
  const [enteredImpresionDiagnostico, setEnteredImpresionDiagnostico] =
    useState("");
  const [enteredConfirmadoDiagnostico, setEnteredConfirmadoDiagnostico] =
    useState("");
  const [enteredCodCie10, setEnteredCodCie10] = useState("");
  const [enteredConsulta1Vez, setEnteredConsulta1Vez] = useState(false);
  const [enteredConsultaControl, setEnteredConsultaControl] = useState(false);
  const [enteredEnfermedadGeneral, setEnteredEnfermedadGeneral] =
    useState(false);
  const [enteredPacienteSano, setEnteredPaciente_Sano] = useState(true);
  const [enteredMaternidad, setEnteredMaternidad] = useState(false);
  const [enteredAccidenteTrabajo, setEnteredAccidenteTrabajo] = useState(false);
  const [enteredEnfermedadProfesional, setEnteredEnfermedadProfesional] =
    useState(false);
  const [enteredPlan, setEnteredPlan] = useState("");
  const [enteredTratamiento, setEnteredTratamiento] = useState("");
  const [enteredSeguimiento, setEnteredSeguimiento] = useState(false);
  const [enteredCual, setEnteredCual] = useState("");
  const [enteredRemision, setEnteredRemision] = useState("");

  const [selectedBrigada, setSelectedBrigada] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredQuantity, setEnteredQuantity] = useState("");
  const [enteredMedicamentos, setEnteredMedicamentos] = useState("");

  const [prescriptionSuccess, setPrescriptionSuccess] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Add a new instance of useApiPost for posting generalmed data
  const { postData: postGeneralmedData, error: generalmedError } = useApiPost(
    "generalmed_json"
  );

  const { data: brigadaNames } = useApiData(
    "brigadas_json",
    "location_b"
  );

  const { data: medicineOptions } = useFetchData(
    "med_brigada_json"
  );

  const { postData: postFarmaData, error: farmaError } = useApiPost(
    "farma_json"
  );

  const { data: patientOptions } = useApiData(
    "pacientes_json",
    "id_num_doc"
  );

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
    const maxQuantityForMedicine = medicineOptions.find(
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
  const handleChangeIdNumDoc = handleTextChange(
    "enteredIdNumDoc",
    setEnteredIdNumDoc
  );
  const handleChangeMotivoConsulta = handleTextChange(
    "enteredMotivoConsulta",
    setEnteredMotivoConsulta
  );
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
  const handleChangeParaclinicos = handleTextChange(
    "enteredParaclinicos",
    setEnteredParaclinicos
  );
  const handleChangeEnfermedadActual = handleTextChange(
    "enteredEnfermedadActual",
    setEnteredEnfermedadActual
  );
  const handleChangeGineco = handleBooleanChange(
    "enteredGineco",
    setEnteredGineco
  );
  const handleChangeGinecoGestaciones = handleTextChange(
    "enteredGinecoGestaciones",
    setEnteredGinecoGestaciones
  );
  const handleChangeGinecoPartos = handleTextChange(
    "enteredGinecoPartos",
    setEnteredGinecoPartos
  );
  const handleChangeGinecoCesarias = handleTextChange(
    "enteredGinecoCesarias",
    setEnteredGinecoCesarias
  );
  const handleChangeGinecoAbortos = handleTextChange(
    "enteredGinecoAbortos",
    setEnteredGinecoAbortos
  );
  const handleChangeGinecoVivos = handleTextChange(
    "enteredGinecoVivos",
    setEnteredGinecoVivos
  );
  const handleChangeAlergias = handleTextChange(
    "enteredAlergias",
    setEnteredAlergias
  );
  const handleChangeMedAlergias = handleTextChange(
    "enteredMedAlergias",
    setEnteredMedAlergias
  );
  const handleChangeMedAntecedentes = handleTextChange(
    "enteredMedAntecedentes",
    setEnteredMedAntecedentes
  );
  const handleChangeTransfusionAnt = handleBooleanChange(
    "enteredTransfusionAnt",
    setEnteredTransfusionAnt
  );
  const handleChangeQuirurgicosAnt = handleTextChange(
    "enteredQuirurgicosAnt",
    setEnteredQuirurgicosAnt
  );
  const handleChangeAlcoholAnt = handleBooleanChange(
    "enteredAlcoholAnt",
    setEnteredAlcoholAnt
  );
  const handleChangeFumaAnt = handleBooleanChange(
    "enteredFumaAnt",
    setEnteredFumaAnt
  );
  const handleChangePsicoactivasAnt = handleBooleanChange(
    "enteredPsicoactivasAnt",
    setEnteredPsicoactivasAnt
  );
  const handleChangeFamiliaAnt = handleTextChange(
    "enteredFamiliaAnt",
    setEnteredFamiliaAnt
  );
  const handleChangeDiagnostico = handleTextChange(
    "enteredDiagnostico",
    setEnteredDiagnostico
  );
  const handleChangeImpresionDiagnostico = handleTextChange(
    "enteredImpresionDiagnostico",
    setEnteredImpresionDiagnostico
  );
  const handleChangeConfirmadoDiagnostico = handleTextChange(
    "enteredConfirmadoDiagnostico",
    setEnteredConfirmadoDiagnostico
  );
  const handleChangeCodCie10 = handleTextChange(
    "enteredCodCie10",
    setEnteredCodCie10
  );
  const handleChangeConsulta1Vez = handleBooleanChange(
    "enteredConsulta1Vez",
    setEnteredConsulta1Vez
  );
  const handleChangeConsultaControl = handleBooleanChange(
    "enteredConsultaControl",
    setEnteredConsultaControl
  );
  const handleChangeEnfermedadGeneral = handleBooleanChange(
    "enteredEnfermedadGeneral",
    setEnteredEnfermedadGeneral
  );
  const handleChangePacienteSano = handleBooleanChange(
    "enteredPacienteSano",
    setEnteredPaciente_Sano
  );
  const handleChangeMaternidad = handleBooleanChange(
    "enteredMaternidad",
    setEnteredMaternidad
  );
  const handleChangeAccidenteTrabajo = handleBooleanChange(
    "enteredAccidenteTrabajo",
    setEnteredAccidenteTrabajo
  );
  const handleChangeEnfermedadProfesional = handleBooleanChange(
    "enteredEnfermedadProfesional",
    setEnteredEnfermedadProfesional
  );
  const handleChangePlan = handleTextChange("enteredPlan", setEnteredPlan);
  const handleChangeTratamiento = handleTextChange(
    "enteredTratamiento",
    setEnteredTratamiento
  );
  const handleChangeSeguimiento = handleBooleanChange(
    "enteredSeguimiento",
    setEnteredSeguimiento
  );
  const handleChangeCual = handleTextChange("enteredCual", setEnteredCual);
  const handleChangeRemision = handleTextChange(
    "enteredRemision",
    setEnteredRemision
  );

  const handleChangeMedicamentos = handleTextChange(
    "enteredMedicamentos",
    setEnteredMedicamentos
  );

  // Define a submit handler for the generalmed form
  const submitGeneralmedHandler = async (event) => {
    event.preventDefault();

    // Check if the entered ID number exists in patientOptions
    const isValidIdNum = patientOptions.includes(enteredIdNumDoc);

    if (!isValidIdNum) {
      setErrorMessage("Por favor, selecciona un número de ID válido");
      return;
    }

    // Check if the required fields are filled
    if (
      !enteredIdNumDoc ||
      !enteredMotivoConsulta ||
      !enteredFrecCardiaca ||
      !enteredTensionArterial ||
      !enteredFrecRespiratoria ||
      !enteredSatO2 ||
      !enteredTemperatura ||
      !enteredDiagnostico ||
      !enteredMedicamentos
    ) {
      setErrorMessage(
        "Por favor, completa todos los campos requeridos con *   "
      );
      return;
    }

    if (
      !/^\d+(\.\d+)?$/.test(enteredFrecCardiaca) ||
      !/^\d+(\.\d+)?$/.test(enteredFrecRespiratoria) ||
      !/^\d+(\.\d+)?$/.test(enteredGinecoAbortos) ||
      !/^\d+(\.\d+)?$/.test(enteredGinecoCesarias) ||
      !/^\d+(\.\d+)?$/.test(enteredGinecoGestaciones) ||
      !/^\d+(\.\d+)?$/.test(enteredGinecoPartos) ||
      !/^\d+(\.\d+)?$/.test(enteredGinecoVivos) ||
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

    // Create an object for the generalmed data
    const generalmedData = {
      id_num_doc: enteredIdNumDoc,
      motivo_consulta: enteredMotivoConsulta,
      frec_cardiaca: parseFloat(enteredFrecCardiaca),
      tension_arterial: enteredTensionArterial,
      frec_respiratoria: parseFloat(enteredFrecRespiratoria),
      sat_o2: parseFloat(enteredSatO2),
      temperatura: parseFloat(enteredTemperatura),
      peso: parseFloat(enteredPeso),
      talla: parseFloat(enteredTalla),
      paraclinicos: enteredParaclinicos,
      enfermedad_actual: enteredEnfermedadActual,
      gineco: enteredGineco,
      gineco_gestaciones: parseInt(enteredGinecoGestaciones),
      gineco_partos: parseInt(enteredGinecoPartos),
      gineco_cesarias: parseInt(enteredGinecoCesarias),
      gineco_abortos: parseInt(enteredGinecoAbortos),
      gineco_vivos: parseInt(enteredGinecoVivos),
      alergias: enteredAlergias,
      med_alergias: enteredMedAlergias,
      med_antecedentes: enteredMedAntecedentes,
      transfusion_ant: enteredTransfusionAnt,
      quirurgicos_ant: enteredQuirurgicosAnt,
      alcohol_ant: enteredAlcoholAnt,
      fuma_ant: enteredFumaAnt,
      psicoactivas_ant: enteredPsicoactivasAnt,
      familia_ant: enteredFamiliaAnt,
      diagnostico: enteredDiagnostico,
      impresion_diagnostico: enteredImpresionDiagnostico,
      confirmado_diagnostico: enteredConfirmadoDiagnostico,
      cod_cie10: enteredCodCie10,
      consulta_1vez: enteredConsulta1Vez,
      consulta_control: enteredConsultaControl,
      enfermedad_general: enteredEnfermedadGeneral,
      paciente_sano: enteredPacienteSano,
      maternidad: enteredMaternidad,
      accidente_trabajo: enteredAccidenteTrabajo,
      enfermedad_profesional: enteredEnfermedadProfesional,
      plan: enteredPlan,
      tratamiento: enteredTratamiento,
      seguimiento: enteredSeguimiento,
      cual: enteredCual,
      remision: enteredRemision,
      medicamentos: enteredMedicamentos,
      // Add the rest of the fields here...
    };

    // Send the data to the API
    const success = await postGeneralmedData(generalmedData);

    if (success) {
      // Assume form update was successful
      setFormSuccess(true);

      // Reset success messages after a certain duration (optional)
      setTimeout(() => {
        setFormSuccess(false);
      }, 3000);
    } else {
      setErrorMessage("Error al agregar datos de medicina general");
      // Handle the error, e.g., show an error message to the user
      console.error("Error adding generalmed data:", generalmedError);
      // Log the data before sending it
      console.log("Data being sent to API:", generalmedData);
    }
  };

  // Replace the refreshPage function with useEffect
  useEffect(() => {
    if (formSuccess) {
      // Reset the form or perform any other necessary actions
      setEnteredIdNumDoc("");
      setEnteredMotivoConsulta("120/80");
      setEnteredFrecCardiaca(80);
      setEnteredTensionArterial("");
      setEnteredFrecRespiratoria(16);
      setEnteredSatO2(95);
      setEnteredTemperatura(36);
      setEnteredPeso(70);
      setEnteredTalla(170);
      setEnteredParaclinicos("");
      setEnteredEnfermedadActual("");
      setEnteredGineco(false);
      setEnteredGinecoGestaciones(0);
      setEnteredGinecoPartos(0);
      setEnteredGinecoCesarias(0);
      setEnteredGinecoAbortos(0);
      setEnteredGinecoVivos(0);
      setEnteredAlergias("");
      setEnteredMedAlergias("");
      setEnteredMedAntecedentes("");
      setEnteredTransfusionAnt(false);
      setEnteredQuirurgicosAnt("");
      setEnteredAlcoholAnt(false);
      setEnteredFumaAnt(false);
      setEnteredPsicoactivasAnt(false);
      setEnteredFamiliaAnt("");
      setEnteredDiagnostico("");
      setEnteredImpresionDiagnostico("");
      setEnteredConfirmadoDiagnostico("");
      setEnteredCodCie10("");
      setEnteredConsulta1Vez(false);
      setEnteredConsultaControl(false);
      setEnteredEnfermedadGeneral(false);
      setEnteredPaciente_Sano(true);
      setEnteredMaternidad(false);
      setEnteredAccidenteTrabajo(false);
      setEnteredEnfermedadProfesional(false);
      setEnteredPlan("");
      setEnteredTratamiento("");
      setEnteredSeguimiento(false);
      setEnteredCual("");
      setEnteredRemision("");
      setEnteredMedicamentos("");
    }
  }, [formSuccess]);

  const handleCancel = () => {
    setEnteredIdNumDoc("");
    setEnteredMotivoConsulta("120/80");
    setEnteredFrecCardiaca(80);
    setEnteredTensionArterial("");
    setEnteredFrecRespiratoria(16);
    setEnteredSatO2(95);
    setEnteredTemperatura(36);
    setEnteredPeso(70);
    setEnteredTalla(170);
    setEnteredParaclinicos("");
    setEnteredEnfermedadActual("");
    setEnteredGineco(false);
    setEnteredGinecoGestaciones(0);
    setEnteredGinecoPartos(0);
    setEnteredGinecoCesarias(0);
    setEnteredGinecoAbortos(0);
    setEnteredGinecoVivos(0);
    setEnteredAlergias("");
    setEnteredMedAlergias("");
    setEnteredMedAntecedentes("");
    setEnteredTransfusionAnt(false);
    setEnteredQuirurgicosAnt("");
    setEnteredAlcoholAnt(false);
    setEnteredFumaAnt(false);
    setEnteredPsicoactivasAnt(false);
    setEnteredFamiliaAnt("");
    setEnteredDiagnostico("");
    setEnteredImpresionDiagnostico("");
    setEnteredConfirmadoDiagnostico("");
    setEnteredCodCie10("");
    setEnteredConsulta1Vez(false);
    setEnteredConsultaControl(false);
    setEnteredEnfermedadGeneral(false);
    setEnteredPaciente_Sano(true);
    setEnteredMaternidad(false);
    setEnteredAccidenteTrabajo(false);
    setEnteredEnfermedadProfesional(false);
    setEnteredPlan("");
    setEnteredTratamiento("");
    setEnteredSeguimiento(false);
    setEnteredCual("");
    setEnteredRemision("");
    setEnteredMedicamentos("");
  };

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

  const antecedentesItems = [
    {
      label: "Alergias",
      value: enteredAlergias,
      onChange: handleChangeAlergias,
    },
    {
      label: "Medicina para alergias",
      value: enteredMedAlergias,
      onChange: handleChangeMedAlergias,
    },
    {
      label: "Antecedentes Médicos",
      value: enteredMedAntecedentes,
      onChange: handleChangeMedAntecedentes,
    },
    {
      label: "Antecedentes Quirúrgicos",
      value: enteredQuirurgicosAnt,
      onChange: handleChangeQuirurgicosAnt,
    },
    {
      label: "Transfuciones  ",
      checked: enteredTransfusionAnt,
      onChange: handleChangeTransfusionAnt,
    },
    {
      label: "Toma Alcohol  ",
      checked: enteredAlcoholAnt,
      onChange: handleChangeAlcoholAnt,
    },
    {
      label: "Fuma cigarrillos  ",
      checked: enteredFumaAnt,
      onChange: handleChangeFumaAnt,
    },
    {
      label: "Psicoactivas  ",
      checked: enteredPsicoactivasAnt,
      onChange: handleChangePsicoactivasAnt,
    },
    {
      label: "Antecedentes Familiares",
      value: enteredFamiliaAnt,
      onChange: handleChangeFamiliaAnt,
    },
  ];

  const ginecoItems = [
    {
      label: "Gestaciones",
      value: enteredGinecoGestaciones,
      onChange: handleChangeGinecoGestaciones,
    },
    {
      label: "Partos",
      value: enteredGinecoPartos,
      onChange: handleChangeGinecoPartos,
    },
    {
      label: "Cesáreas",
      value: enteredGinecoCesarias,
      onChange: handleChangeGinecoCesarias,
    },
    {
      label: "Abortos",
      value: enteredGinecoAbortos,
      onChange: handleChangeGinecoAbortos,
    },
    {
      label: "Vivos",
      value: enteredGinecoVivos,
      onChange: handleChangeGinecoVivos,
    },
  ];

  const origenEnfermedadItems = [
    {
      label: "Consulta Primera Vez ",
      checked: enteredConsulta1Vez,
      onChange: handleChangeConsulta1Vez,
    },
    {
      label: "Consulta Control ",
      checked: enteredConsultaControl,
      onChange: handleChangeConsultaControl,
    },
    {
      label: "Enfermedad General ",
      checked: enteredEnfermedadGeneral,
      onChange: handleChangeEnfermedadGeneral,
    },
    {
      label: "Paciente Sano ",
      checked: enteredPacienteSano,
      onChange: handleChangePacienteSano,
    },
    {
      label: "Maternidad ",
      checked: enteredMaternidad,
      onChange: handleChangeMaternidad,
    },
    {
      label: "Accidente de Trabajo ",
      checked: enteredAccidenteTrabajo,
      onChange: handleChangeAccidenteTrabajo,
    },
    {
      label: "Enfermedad Profesional ",
      checked: enteredEnfermedadProfesional,
      onChange: handleChangeEnfermedadProfesional,
    },
    {
      label: "Enfermedad actual",
      value: enteredEnfermedadActual,
      onChange: handleChangeEnfermedadActual,
    },
    {
      label: "Código CIE10",
      value: enteredCodCie10,
      onChange: handleChangeCodCie10,
    },
    {
      label: "Impresion Diagnóstica",
      value: enteredImpresionDiagnostico,
      onChange: handleChangeImpresionDiagnostico,
    },
    {
      label: "Confirmado Diagnóstico",
      value: enteredConfirmadoDiagnostico,
      onChange: handleChangeConfirmadoDiagnostico,
    },
  ];

  const diagnosticoItems = [
    {
      label: "Seguimiento ",
      checked: enteredSeguimiento,
      onChange: handleChangeSeguimiento,
    },
    {
      label: "Cual?",
      value: enteredCual,
      onChange: handleChangeCual,
    },
    {
      label: "Remite a",
      value: enteredRemision,
      onChange: handleChangeRemision,
    },
  ];

  return (
    <form onSubmit={submitGeneralmedHandler}>
      <div id="new-medic-container" className="new-medic__controls">
        <div id="new-medic-container2" className="new-medic__controls">
          <h1>Datos Medicina General del Paciente</h1>
          <div id="medic-item-container" className="medic-item-container">
            <PatientSelection
              identifier="gm"
              selectedBrigada={selectedBrigada}
              brigadaNames={brigadaNames}
              enteredIdNumDoc={enteredIdNumDoc}
              brigadaChangeHandler={brigadaChangeHandler}
              handleChangeIdNumDoc={handleChangeIdNumDoc}
              patientOptions={patientOptions}
            />
          </div>
        </div>
      </div>

      <div id="signos-vitales-container" className="new-medic__controls">
        <h1> Signos Vitales </h1>
        <div id="signos-vitales-container-wrapper" className="medic-item-container-wrapper">
          {signosVitales.map((item, index) => (
            <div
              id="signos-vitales-items"
              key={`signosMG-${index}`}
              className="medic-item-container .new-medic__controls"
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

      <div id="antecedentes-container" className="new-medic__controls">
        <h1> Antecedentes Personales y/o Familiares </h1>
        <p> ✅ para si</p>
        <div id="antecedentes-wrapper" className="medic-item-container-wrapper">
          {antecedentesItems.map((item, index) => (
            <div
              id="antecedentes-items"
              key={`antecedentesMG-${index}`}
              className="medic-item-container .new-medic__controls"
            >
              <CheckboxOrTextInput
                id={`inputMG2-${index}`}
                label={item.label}
                isCheckbox={item.checked !== undefined}
                checked={item.checked}
                value={item.value}
                inputSize="small"
                onChange={item.onChange}
              />
            </div>
          ))}
        </div>
      </div>

      <div id="gineco-container" className="new-medic__controls">
        <h1> Antecedentes Ginecoopstéricos </h1>
        <div id="gineco-wrapper"  className="medic-item-container-wrapper">
          <label htmlFor="Aplica">
            <input
              id="Aplica"
              type="checkbox"
              checked={enteredGineco}
              onChange={handleChangeGineco}
            />
            Aplica
          </label>
        </div>
        <div id="gineco-items-wrapper" className="medic-item-container-wrapper">
          {ginecoItems.map((item, index) => (
            <div
              id="gineco-items"
              key={`ginecoantecedentes-${index}`}
              className="medic-item-container .new-medic__controls"
            >
              <CheckboxOrTextInput
                id={`inputMG3-${index}`}
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

      <div id="motivo-consulta-wrapper" className="medic-item-container-wrapper">
        <div className="new-medic__control">
          <div>
            <h1> Motivo Consulta * </h1>
            <div id="motivo-consulta-container" className="new-medic__control">
              <label htmlFor="motivo-consulta">
                <textarea
                  id="motivo-consulta"
                  className="larger-input"
                  value={enteredMotivoConsulta}
                  onChange={handleChangeMotivoConsulta}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div id="origen_enfermedad-wrapper" className="medic-item-container-wrapper">
        <div id="origen_enfermedad-control" className="new-medic__controls">
          <h1> Origen de la Enfermedad</h1>
          <p> ✅ para si</p>
          <div className="medic-item-container-wrapper">
            {origenEnfermedadItems.map((item, index) => (
              <div
                id="origen_enfermedad-items"
                key={`origen_enfermedad-${index}`}
                className="medic-item-container .new-medic__controls"
              >
                <CheckboxOrTextInput
                  id={`inputMG4-${index}`}
                  label={item.label}
                  isCheckbox={item.checked !== undefined}
                  checked={item.checked}
                  value={item.value}
                  inputSize="small"
                  onChange={item.onChange}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="medic-item-container-wrapper">
          <div className="new-medic__control">
            <div>
              <h1> Examen Físico * </h1>
              <div className="new-medic__control">
                <label htmlFor="paraclinicos">
                  Paraclínicos *
                  <textarea
                    id="paraclinicos"
                    className="larger-input"
                    value={enteredParaclinicos}
                    onChange={handleChangeParaclinicos}
                  />
                </label>
              </div>
              <div className="new-medic__control">
                <label htmlFor="diagnostico">
                  Diagnósitco *
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
              <h1> Plan Diagnóstico </h1>
              <div className="new-medic__control">
                <label htmlFor="plan-estudio">
                  Plan de estudio
                  <textarea
                    id="plan-estudio"
                    className="larger-input"
                    value={enteredPlan}
                    onChange={handleChangePlan}
                  />
                </label>
              </div>
              <div className="new-medic__control">
                <label htmlFor="tratamiento">
                  Tratamiento
                  <textarea
                    id="tratamiento"
                    className="larger-input"
                    value={enteredTratamiento}
                    onChange={handleChangeTratamiento}
                  />
                </label>
              </div>
              <div className="medic-item-container-wrapper">
                {diagnosticoItems.map((item, index) => (
                  <div
                    key={`diagnostico-${index}`}
                    className="medic-item-container .new-medic__controls"
                  >
                    <CheckboxOrTextInput
                      id={`inputMG5-${index}`}
                      label={item.label}
                      isCheckbox={item.checked !== undefined}
                      checked={item.checked}
                      value={item.value}
                      inputSize="small"
                      onChange={item.onChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="medic-item-container-wrapper">
        <div className="new-medic__control">
          <h1> Receta Farmacia </h1>
          <div className="medic-item-container">
            <div className="medic-item-container-wrapper">
              <div className="new-medic__control">
                <label htmlFor="medicineGM">Principio Activo</label>
                <input
                  id="medicineGM"
                  type="text"
                  value={enteredTitle}
                  onChange={titleChangeHandler}
                  list="medicineOptions"
                  placeholder="Seleccionar"
                />
                <datalist id="medicineOptions">
                  {medicineOptions.map((option, index) => (
                    <option key={`${option.medicine}-${index}`} value={option.medicine} />
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
          </div>
        </div>
        <div className="medic-item-container-wrapper">
          <div className="new-medic__control">
            <div>
              <h1> Medicamentos * </h1>
              <div className="new-medic__control">
                <label htmlFor="medicamentos">
                  <input
                    id="medicamentos"
                    type="text"
                    className="larger-input"
                    checked={enteredMedicamentos}
                    onChange={handleChangeMedicamentos}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="new-medic__actions">
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
        <button type="button" onClick={submitGeneralmedHandler}>
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

export default GeneralmedForm;
