import React, { useState, useEffect } from "react";
import useApiData from "../../hooks/useApiData";
import useApiPost from "../../hooks/useApiPost";
import useFetchData from "../../hooks/useFetchData";
import CheckboxOrTextInput from "./CheckboxOrTextInput";
import PatientsDataDisplay from "../PatientsDataDisplay";
//import PatientSelection from "./PatientSelection";
import PopupMessage from "../PopupMessage";
import FarmaDataDisplay from "../FarmaDataDisplay";

import "./NewMedicForm.css";

const OptometryForm = (props) => {
  // Define the state variables for the new fields
  const [selectedVoided, setSelectedVoided] = useState("0");
  const [enteredIdNumDoc, setEnteredIdNumDoc] = useState("");
  const [enteredMalaVisionLejos, setEnteredMalaVisionLejos] = useState(false);
  const [enteredMalaVisionCerca, setEnteredMalaVisionCerca] = useState(false);
  const [enteredOjoRojo, setEnteredOjoRojo] = useState(false);
  const [enteredPruritoOcular, setEnteredPruritoOcular] = useState(false);
  const [enteredDolor, setEnteredDolor] = useState(false);
  const [enteredHiperemia, setEnteredHiperemia] = useState(false);
  const [enteredLagrimeo, setEnteredLagrimeo] = useState(false);
  const [enteredArdorOcular, setEnteredArdorOcular] = useState(false);
  const [enteredSaltoRenglon, setEnteredSaltoRenglon] = useState(false);
  const [enteredCansancioVisual, setEnteredCansancioVisual] = useState(false);
  const [enteredCaspaParpados, setEnteredCaspaParpados] = useState(false);
  const [enteredOtro, setEnteredOtro] = useState(false);
  const [enteredCual, setEnteredCual] = useState("");
  const [enteredDiabetes, setEnteredDiabetes] = useState(false);
  const [enteredTraumaOcular, setEnteredTraumaOcular] = useState(false);
  const [enteredUsaCorreccion, setEnteredUsaCorreccion] = useState(false);
  const [enteredHta, setEnteredHta] = useState(false);
  const [enteredCirugiaOcular, setEnteredCirugiaOcular] = useState(false);
  const [enteredCardiovasculares, setEnteredCardiovasculares] = useState(false);
  const [enteredViciosReflaccion, setEnteredViciosReflaccion] = useState(false);
  const [enteredArtritis, setEnteredArtritis] = useState(false);
  const [enteredCeguera, setEnteredCeguera] = useState(false);
  const [enteredFarmacos, setEnteredFarmacos] = useState("");
  const [enteredOtros, setEnteredOtros] = useState(false);
  const [enteredCuales, setEnteredCuales] = useState("");
  const [enteredScvlod, setEnteredScvlod] = useState("");
  const [enteredScvloi, setEnteredScvloi] = useState("");
  const [enteredScvlao, setEnteredScvlao] = useState("");
  const [enteredCcvlod, setEnteredCcvlod] = useState("");
  const [enteredCcvloi, setEnteredCcvloi] = useState("");
  const [enteredCcvlao, setEnteredCcvlao] = useState("");
  const [enteredLensometriaOd, setEnteredLensometriaOd] = useState("");
  const [enteredLensometriaOi, setEnteredLensometriaOi] = useState("");
  const [enteredTonometriaOd, setEnteredTonometriaOd] = useState("");
  const [enteredTonometriaOi, setEnteredTonometriaOi] = useState("");
  const [enteredCoverTest, setEnteredCoverTest] = useState("");
  const [enteredCoverTest6m, setEnteredCoverTest6m] = useState("");
  const [enteredCoverTest30cm, setEnteredCoverTest30cm] = useState("");
  const [enteredOftalmoscopiaOd, setEnteredOftalmoscopiaOd] = useState("");
  const [enteredOftalmoscopiaOi, setEnteredOftalmoscopiaOi] = useState("");
  const [enteredQueratometriaOd, setEnteredQueratometriaOd] = useState("");
  const [enteredQueratometriaOi, setEnteredQueratometriaOi] = useState("");
  const [enteredTestColor, setEnteredTestColor] = useState("");
  const [enteredEstereopsis, setEnteredEstereopsis] = useState("");
  const [enteredRetinoscopiaOd, setEnteredRetinoscopiaOd] = useState("");
  const [enteredRetinoscopiaOdAvvl, setEnteredRetinoscopiaOdAvvl] =
    useState("");
  const [enteredRetinoscopiaOdAvvp, setEnteredRetinoscopiaOdAvvp] =
    useState("");
  const [enteredRetinoscopiaOi, setEnteredRetinoscopiaOi] = useState("");
  const [enteredRetinoscopiaOiAvvl, setEnteredRetinoscopiaOiAvvl] =
    useState("");
  const [enteredRetinoscopiaOiAvvp, setEnteredRetinoscopiaOiAvvp] =
    useState("");
  const [enteredSubjetivoOd, setEnteredSubjetivoOd] = useState("");
  const [enteredSubjetivoOdAv, setEnteredSubjetivoOdAv] = useState("");
  const [enteredSubjetivoOdAdd, setEnteredSubjetivoOdAdd] = useState("");
  const [enteredSubjetivoOi, setEnteredSubjetivoOi] = useState("");
  const [enteredSubjetivoOiAv, setEnteredSubjetivoOiAv] = useState("");
  const [enteredSubjetivoOiAdd, setEnteredSubjetivoOiAdd] = useState("");
  const [enteredImpresionDiagnostica, setEnteredImpresionDiagnostica] =
    useState("");
  const [enteredCie10, setEnteredCie10] = useState("");
  const [enteredConducta, setEnteredConducta] = useState("");
  const [enteredFormulaFinalOD, setEnteredFormulaFinalOD] = useState("");
  const [enteredFormulaFinalODAdd, setEnteredFormulaFinalODAdd] = useState("");
  const [enteredFormulaFinalODDP, setEnteredFormulaFinalODDP] = useState("");
  const [enteredFormulaFinalOI, setEnteredFormulaFinalOI] = useState("");
  const [enteredFormulaFinalOIAdd, setEnteredFormulaFinalOIAdd] = useState("");
  const [enteredFormulaFinalOIDP, setEnteredFormulaFinalOIDP] = useState("");
  const [enteredTipo, setEnteredTipo] = useState("");
  const [enteredMedicamentos, setEnteredMedicamentos] = useState(""); // You might need a more complex state structure for multiple medications
  const [enteredRX, setEnteredRX] = useState(false);
  const [enteredUso, setEnteredUso] = useState("");
  const [enteredControl, setEnteredControl] = useState("");

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
  const { postData: postOptometryData, error: optometryError } =
    useApiPost("optometry_json");

  const { data: brigadaNames } = useApiData("brigadas_json", "location_b");

  const sortedBrigadaNames = brigadaNames.slice().sort();

  const { data: medicineOptionsOP } = useFetchData("med_brigada_json");

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
          item.especialidad === "Optometría"
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
    const maxQuantityForMedicine = medicineOptionsOP.find(
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
  //  "enteredIdNumDoc",
  //  setEnteredIdNumDoc
  //);

  const handleChangeMalaVisionLejos = handleBooleanChange(
    "enteredMalaVisionLejos",
    setEnteredMalaVisionLejos
  );
  const handleChangeMalaVisionCerca = handleBooleanChange(
    "enteredMalaVisionCerca",
    setEnteredMalaVisionCerca
  );
  const handleChangeOjoRojo = handleBooleanChange(
    "enteredOjoRojo",
    setEnteredOjoRojo
  );
  const handleChangePruritoOcular = handleBooleanChange(
    "enteredPruritoOcular",
    setEnteredPruritoOcular
  );
  const handleChangeDolor = handleBooleanChange(
    "enteredDolor",
    setEnteredDolor
  );
  const handleChangeHiperemia = handleBooleanChange(
    "enteredHiperemia",
    setEnteredHiperemia
  );
  const handleChangeLagrimeo = handleBooleanChange(
    "enteredLagrimeo",
    setEnteredLagrimeo
  );
  const handleChangeArdorOcular = handleBooleanChange(
    "enteredArdorOcular",
    setEnteredArdorOcular
  );
  const handleChangeSaltoRenglon = handleBooleanChange(
    "enteredSaltoRenglon",
    setEnteredSaltoRenglon
  );
  const handleChangeCansancioVisual = handleBooleanChange(
    "enteredCansancioVisual",
    setEnteredCansancioVisual
  );
  const handleChangeCaspaParpados = handleBooleanChange(
    "enteredCaspaOjos",
    setEnteredCaspaParpados
  );
  const handleChangeOtro = handleBooleanChange("enteredOtro", setEnteredOtro);
  const handleChangeCual = handleTextChange("enteredCual", setEnteredCual);
  const handleChangeDiabetes = handleBooleanChange(
    "enteredDiabetes",
    setEnteredDiabetes
  );
  const handleChangeTraumaOcular = handleBooleanChange(
    "enteredTraumaOcular",
    setEnteredTraumaOcular
  );
  const handleChangeUsaCorreccion = handleBooleanChange(
    "enteredUsaCorreccion",
    setEnteredUsaCorreccion
  );
  const handleChangeHta = handleBooleanChange("enteredHta", setEnteredHta);
  const handleChangeCirugiaOcular = handleBooleanChange(
    "enteredCirugiaOcular",
    setEnteredCirugiaOcular
  );
  const handleChangeCardiovasculares = handleBooleanChange(
    "enteredCardiovasculares",
    setEnteredCardiovasculares
  );
  const handleChangeViciosReflaccion = handleBooleanChange(
    "enteredViciosReflaccion",
    setEnteredViciosReflaccion
  );
  const handleChangeArtritis = handleBooleanChange(
    "enteredArtritis",
    setEnteredArtritis
  );
  const handleChangeCeguera = handleBooleanChange(
    "enteredCeguera",
    setEnteredCeguera
  );
  const handleChangeFarmacos = handleTextChange(
    "enteredFarmacos",
    setEnteredFarmacos
  );
  const handleChangeOtros = handleBooleanChange(
    "enteredOtros",
    setEnteredOtros
  );
  const handleChangeCuales = handleTextChange(
    "enteredCuales",
    setEnteredCuales
  );
  const handleChangeScvlod = handleTextChange(
    "enteredScvlod",
    setEnteredScvlod
  );
  const handleChangeScvloi = handleTextChange(
    "enteredScvloi",
    setEnteredScvloi
  );
  const handleChangeScvlao = handleTextChange(
    "enteredScvlao",
    setEnteredScvlao
  );
  const handleChangeCcvlod = handleTextChange(
    "enteredCcvlod",
    setEnteredCcvlod
  );
  const handleChangeCcvloi = handleTextChange(
    "enteredCcvloi",
    setEnteredCcvloi
  );
  const handleChangeCcvlao = handleTextChange(
    "enteredCcvlao",
    setEnteredCcvlao
  );
  const handleChangeLensometriaOd = handleTextChange(
    "enteredLensometriaOd",
    setEnteredLensometriaOd
  );
  const handleChangeLensometriaOi = handleTextChange(
    "enteredLensometriaOi",
    setEnteredLensometriaOi
  );
  const handleChangeTonometriaOd = handleTextChange(
    "enteredTonometriaOd",
    setEnteredTonometriaOd
  );
  const handleChangeTonometriaOi = handleTextChange(
    "enteredTonometriaOi",
    setEnteredTonometriaOi
  );
  const handleChangeCoverTest = handleTextChange(
    "enteredCoverTest",
    setEnteredCoverTest
  );
  const handleChangeCoverTest6m = handleTextChange(
    "enteredCoverTest6m",
    setEnteredCoverTest6m
  );
  const handleChangeCoverTest30cm = handleTextChange(
    "enteredCoverTest30cm",
    setEnteredCoverTest30cm
  );
  const handleChangeOftalmoscopiaOd = handleTextChange(
    "enteredOftalmoscopiaOd",
    setEnteredOftalmoscopiaOd
  );
  const handleChangeOftalmoscopiaOi = handleTextChange(
    "enteredOftalmoscopiaOi",
    setEnteredOftalmoscopiaOi
  );
  const handleChangeQueratometriaOd = handleTextChange(
    "enteredQueratometriaOd",
    setEnteredQueratometriaOd
  );
  const handleChangeQueratometriaOi = handleTextChange(
    "enteredQueratometriaOi",
    setEnteredQueratometriaOi
  );
  const handleChangeTestColor = handleTextChange(
    "enteredTestColor",
    setEnteredTestColor
  );
  const handleChangeEstereopsis = handleTextChange(
    "enteredEstereopsis",
    setEnteredEstereopsis
  );
  const handleChangeRetinoscopiaOd = handleTextChange(
    "enteredRetinoscopiaOd",
    setEnteredRetinoscopiaOd
  );
  const handleChangeRetinoscopiaOdAvvl = handleTextChange(
    "enteredRetinoscopiaOdAvvl",
    setEnteredRetinoscopiaOdAvvl
  );
  const handleChangeRetinoscopiaOdAvvp = handleTextChange(
    "enteredRetinoscopiaOdAvvp",
    setEnteredRetinoscopiaOdAvvp
  );
  const handleChangeRetinoscopiaOi = handleTextChange(
    "enteredRetinoscopiaOi",
    setEnteredRetinoscopiaOi
  );
  const handleChangeRetinoscopiaOiAvvl = handleTextChange(
    "enteredRetinoscopiaOiAvvl",
    setEnteredRetinoscopiaOiAvvl
  );
  const handleChangeRetinoscopiaOiAvvp = handleTextChange(
    "enteredRetinoscopiaOiAvvp",
    setEnteredRetinoscopiaOiAvvp
  );
  const handleChangeSubjetivoOd = handleTextChange(
    "enteredSubjetivoOd",
    setEnteredSubjetivoOd
  );
  const handleChangeSubjetivoOdAv = handleTextChange(
    "enteredSubjetivoOdAv",
    setEnteredSubjetivoOdAv
  );
  const handleChangeSubjetivoOdAdd = handleTextChange(
    "enteredSubjetivoOdAdd",
    setEnteredSubjetivoOdAdd
  );
  const handleChangeSubjetivoOi = handleTextChange(
    "enteredSubjetivoOi",
    setEnteredSubjetivoOi
  );
  const handleChangeSubjetivoOiAv = handleTextChange(
    "enteredSubjetivoOiAv",
    setEnteredSubjetivoOiAv
  );
  const handleChangeSubjetivoOiAdd = handleTextChange(
    "enteredSubjetivoOiAdd",
    setEnteredSubjetivoOiAdd
  );
  const handleChangeImpresionDiagnostica = handleTextChange(
    "enteredImpresionDiagnostica",
    setEnteredImpresionDiagnostica
  );
  const handleChangeCie10 = handleTextChange("enteredCie10", setEnteredCie10);
  const handleChangeConducta = handleTextChange(
    "enteredConducta",
    setEnteredConducta
  );
  const handleChangeFormulaFinalOD = handleTextChange(
    "enteredFormulaFinalOD",
    setEnteredFormulaFinalOD
  );
  const handleChangeFormulaFinalODAdd = handleTextChange(
    "enteredFormulaFinalODAdd",
    setEnteredFormulaFinalODAdd
  );
  const handleChangeFormulaFinalODDP = handleTextChange(
    "enteredFormulaFinalODDP",
    setEnteredFormulaFinalODDP
  );
  const handleChangeFormulaFinalOI = handleTextChange(
    "enteredFormulaFinalOI",
    setEnteredFormulaFinalOI
  );
  const handleChangeFormulaFinalOIAdd = handleTextChange(
    "enteredFormulaFinalOIAdd",
    setEnteredFormulaFinalOIAdd
  );
  const handleChangeFormulaFinalOIDP = handleTextChange(
    "enteredFormulaFinalOIDP",
    setEnteredFormulaFinalOIDP
  );
  const handleChangeEnteredTipo = handleTextChange(
    "enteredTipo",
    setEnteredTipo
  );
  const handleChangeMedicamentos = handleTextChange(
    "enteredMedicamentos",
    setEnteredMedicamentos
  ); // You might need a more complex state structure for multiple medications
  const handleChangeRX = handleBooleanChange("enteredRX", setEnteredRX);
  const handleChangeUso = handleTextChange("enteredUso", setEnteredUso);
  const handleChangeControl = handleTextChange(
    "enteredControl",
    setEnteredControl
  );

  // Define a submit handler for the optometry form
  const submitOptometryHandler = async (event) => {
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
      !enteredLensometriaOd ||
      !enteredLensometriaOi ||
      !enteredTonometriaOd ||
      !enteredTonometriaOi ||
      !enteredCoverTest ||
      !enteredCoverTest6m ||
      !enteredCoverTest30cm ||
      !enteredOftalmoscopiaOd ||
      !enteredOftalmoscopiaOi ||
      !enteredQueratometriaOd ||
      !enteredQueratometriaOi ||
      !enteredTestColor ||
      !enteredEstereopsis ||
      !enteredRetinoscopiaOd ||
      !enteredRetinoscopiaOdAvvl ||
      !enteredRetinoscopiaOdAvvp ||
      !enteredRetinoscopiaOi ||
      !enteredRetinoscopiaOiAvvl ||
      !enteredRetinoscopiaOiAvvp ||
      !enteredSubjetivoOd ||
      !enteredSubjetivoOdAv ||
      !enteredSubjetivoOdAdd ||
      !enteredSubjetivoOi ||
      !enteredSubjetivoOiAv ||
      !enteredSubjetivoOiAdd ||
      !enteredImpresionDiagnostica ||
      !enteredCie10 ||
      !enteredConducta ||
      !enteredFormulaFinalOD ||
      !enteredFormulaFinalODAdd ||
      !enteredFormulaFinalODDP ||
      !enteredFormulaFinalOI ||
      !enteredFormulaFinalOIAdd ||
      !enteredFormulaFinalOIDP ||
      !enteredTipo ||
      !enteredMedicamentos ||
      !enteredUso ||
      !enteredControl
    ) {
      setErrorMessage(
        "Por favor, completa todos los campos requeridos con *   "
      );
      return;
    }

    // Create an object for the optometry data
    const optometryData = {
      voiided: selectedVoided,
      id_num_doc: enteredIdNumDoc,
      mala_vision_lejos: enteredMalaVisionLejos,
      mala_vision_cerca: enteredMalaVisionCerca,
      ojo_rojo: enteredOjoRojo,
      prurito_ocular: enteredPruritoOcular,
      dolor: enteredDolor,
      hiperemia: enteredHiperemia,
      lagrimeo: enteredLagrimeo,
      ardor_ocular: enteredArdorOcular,
      salto_renglon: enteredSaltoRenglon,
      cansancio_visual: enteredCansancioVisual,
      caspa_parpados: enteredCaspaParpados,
      otro: enteredOtro,
      cual: enteredCual,
      diabetes: enteredDiabetes,
      trauma_ocular: enteredTraumaOcular,
      usa_correccion: enteredUsaCorreccion,
      hta: enteredHta,
      cirugia_ocular: enteredCirugiaOcular,
      cardiovasculares: enteredCardiovasculares,
      vicios_reflaccion: enteredViciosReflaccion,
      artritis: enteredArtritis,
      ceguera: enteredCeguera,
      farmacos: enteredFarmacos,
      otros: enteredOtros,
      cuales: enteredCuales,
      scvlod: enteredScvlod,
      scvloi: enteredScvloi,
      scvlao: enteredScvlao,
      ccvlod: enteredCcvlod,
      ccvloi: enteredCcvloi,
      ccvlao: enteredCcvlao,
      lensometria_od: enteredLensometriaOd,
      lensometria_oi: enteredLensometriaOi,
      tonometria_od: enteredTonometriaOd,
      tonometria_oi: enteredTonometriaOi,
      cover_test: enteredCoverTest,
      cover_test_6m: enteredCoverTest6m,
      cover_test_30cm: enteredCoverTest30cm,
      oftalmoscopia_od: enteredOftalmoscopiaOd,
      oftalmoscopia_oi: enteredOftalmoscopiaOi,
      queratometria_od: enteredQueratometriaOd,
      queratometria_oi: enteredQueratometriaOi,
      test_color: enteredTestColor,
      estereopsis: enteredEstereopsis,
      retinoscopia_od: enteredRetinoscopiaOd,
      retinoscopia_od_avvl: enteredRetinoscopiaOdAvvl,
      retinoscopia_od_avvp: enteredRetinoscopiaOdAvvp,
      retinoscopia_oi: enteredRetinoscopiaOi,
      retinoscopia_oi_avvl: enteredRetinoscopiaOiAvvl,
      retinoscopia_oi_avvp: enteredRetinoscopiaOiAvvp,
      subjetivo_od: enteredSubjetivoOd,
      subjetivo_od_av: enteredSubjetivoOdAv,
      subjetivo_od_add: enteredSubjetivoOdAdd,
      subjetivo_oi: enteredSubjetivoOi,
      subjetivo_oi_av: enteredSubjetivoOiAv,
      subjetivo_oi_add: enteredSubjetivoOiAdd,
      impresion_diagnostica: enteredImpresionDiagnostica,
      cie10: enteredCie10,
      conducta: enteredConducta,
      formula_final_od: enteredFormulaFinalOD,
      formula_final_od_add: enteredFormulaFinalODAdd,
      formula_final_od_dp: enteredFormulaFinalODDP,
      formula_final_oi: enteredFormulaFinalOI,
      formula_final_oi_add: enteredFormulaFinalOIAdd,
      formula_final_oi_dp: enteredFormulaFinalOIDP,
      tipo: enteredTipo,
      medicamentos: enteredMedicamentos,
      rx: enteredRX,
      uso: enteredUso,
      control: enteredControl,
      // Add the rest of the fields here...
    };

    // Send the data to the API
    const success = await postOptometryData(optometryData);

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
      console.error("Error adding optometry data:", optometryError);
      // Log the data before sending it
      console.log("Data being sent to API:", optometryData);
    }
  };

  // Replace the refreshPage function with useEffect
  useEffect(() => {
    if (formSuccess) {
      // Reset the form or perform any other necessary actions
      setSelectedVoided("0");
      setEnteredIdNumDoc("");
      setEnteredMalaVisionLejos(false);
      setEnteredMalaVisionCerca(false);
      setEnteredOjoRojo(false);
      setEnteredPruritoOcular(false);
      setEnteredDolor(false);
      setEnteredHiperemia(false);
      setEnteredLagrimeo(false);
      setEnteredArdorOcular(false);
      setEnteredSaltoRenglon(false);
      setEnteredCansancioVisual(false);
      setEnteredCaspaParpados(false);
      setEnteredOtro(false);
      setEnteredCual("");
      setEnteredDiabetes(false);
      setEnteredTraumaOcular(false);
      setEnteredUsaCorreccion(false);
      setEnteredHta(false);
      setEnteredCirugiaOcular(false);
      setEnteredCardiovasculares(false);
      setEnteredViciosReflaccion(false);
      setEnteredArtritis(false);
      setEnteredCeguera(false);
      setEnteredFarmacos("");
      setEnteredOtros(false);
      setEnteredCuales("");
      setEnteredScvlod("");
      setEnteredScvloi("");
      setEnteredScvlao("");
      setEnteredCcvlod("");
      setEnteredCcvloi("");
      setEnteredCcvlao("");
      setEnteredLensometriaOd("");
      setEnteredLensometriaOi("");
      setEnteredTonometriaOd("");
      setEnteredTonometriaOi("");
      setEnteredCoverTest("");
      setEnteredCoverTest6m("");
      setEnteredCoverTest30cm("");
      setEnteredOftalmoscopiaOd("");
      setEnteredOftalmoscopiaOi("");
      setEnteredQueratometriaOd("");
      setEnteredQueratometriaOi("");
      setEnteredTestColor("");
      setEnteredEstereopsis("");
      setEnteredRetinoscopiaOd("");
      setEnteredRetinoscopiaOdAvvl("");
      setEnteredRetinoscopiaOdAvvp("");
      setEnteredRetinoscopiaOi("");
      setEnteredRetinoscopiaOiAvvl("");
      setEnteredRetinoscopiaOiAvvp("");
      setEnteredSubjetivoOd("");
      setEnteredSubjetivoOdAv("");
      setEnteredSubjetivoOdAdd("");
      setEnteredSubjetivoOi("");
      setEnteredSubjetivoOiAv("");
      setEnteredSubjetivoOiAdd("");
      setEnteredImpresionDiagnostica("");
      setEnteredCie10("");
      setEnteredConducta("");
      setEnteredFormulaFinalOD("");
      setEnteredFormulaFinalODAdd("");
      setEnteredFormulaFinalODDP("");
      setEnteredFormulaFinalOI("");
      setEnteredFormulaFinalOIAdd("");
      setEnteredFormulaFinalOIDP("");
      setEnteredTipo("");
      setEnteredMedicamentos("");
      setEnteredRX(false);
      setEnteredUso("");
      setEnteredControl("");
      refreshAsignados();
    }
  }, [formSuccess, refreshAsignados]);

  const handleCancel = () => {
    setSelectedVoided("0");
    setEnteredIdNumDoc("");
    setEnteredMalaVisionLejos(false);
    setEnteredMalaVisionCerca(false);
    setEnteredOjoRojo(false);
    setEnteredPruritoOcular(false);
    setEnteredDolor(false);
    setEnteredHiperemia(false);
    setEnteredLagrimeo(false);
    setEnteredArdorOcular(false);
    setEnteredSaltoRenglon(false);
    setEnteredCansancioVisual(false);
    setEnteredCaspaParpados(false);
    setEnteredOtro(false);
    setEnteredCual("");
    setEnteredDiabetes(false);
    setEnteredTraumaOcular(false);
    setEnteredUsaCorreccion(false);
    setEnteredHta(false);
    setEnteredCirugiaOcular(false);
    setEnteredCardiovasculares(false);
    setEnteredViciosReflaccion(false);
    setEnteredArtritis(false);
    setEnteredCeguera(false);
    setEnteredFarmacos("");
    setEnteredOtros(false);
    setEnteredCuales("");
    setEnteredScvlod("");
    setEnteredScvloi("");
    setEnteredScvlao("");
    setEnteredCcvlod("");
    setEnteredCcvloi("");
    setEnteredCcvlao("");
    setEnteredLensometriaOd("");
    setEnteredLensometriaOi("");
    setEnteredTonometriaOd("");
    setEnteredTonometriaOi("");
    setEnteredCoverTest("");
    setEnteredCoverTest6m("");
    setEnteredCoverTest30cm("");
    setEnteredOftalmoscopiaOd("");
    setEnteredOftalmoscopiaOi("");
    setEnteredQueratometriaOd("");
    setEnteredQueratometriaOi("");
    setEnteredTestColor("");
    setEnteredEstereopsis("");
    setEnteredRetinoscopiaOd("");
    setEnteredRetinoscopiaOdAvvl("");
    setEnteredRetinoscopiaOdAvvp("");
    setEnteredRetinoscopiaOi("");
    setEnteredRetinoscopiaOiAvvl("");
    setEnteredRetinoscopiaOiAvvp("");
    setEnteredSubjetivoOd("");
    setEnteredSubjetivoOdAv("");
    setEnteredSubjetivoOdAdd("");
    setEnteredSubjetivoOi("");
    setEnteredSubjetivoOiAv("");
    setEnteredSubjetivoOiAdd("");
    setEnteredImpresionDiagnostica("");
    setEnteredCie10("");
    setEnteredConducta("");
    setEnteredFormulaFinalOD("");
    setEnteredFormulaFinalODAdd("");
    setEnteredFormulaFinalODDP("");
    setEnteredFormulaFinalOI("");
    setEnteredFormulaFinalOIAdd("");
    setEnteredFormulaFinalOIDP("");
    setEnteredTipo("");
    setEnteredMedicamentos("");
    setEnteredRX(false);
    setEnteredUso("");
    setEnteredControl("");
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

  // const refreshPage = () => {
  //  window.location.reload(); // Reload the page
  // };

  const signosYSintomasItems = [
    {
      label: "Mala Visión Lejos",
      checked: enteredMalaVisionLejos,
      onChange: handleChangeMalaVisionLejos,
    },
    {
      label: "Mala Visión Cerca",
      checked: enteredMalaVisionCerca,
      onChange: handleChangeMalaVisionCerca,
    },
    {
      label: "Ojo Rojo",
      checked: enteredOjoRojo,
      onChange: handleChangeOjoRojo,
    },
    {
      label: "Prurito Ocular ",
      checked: enteredPruritoOcular,
      onChange: handleChangePruritoOcular,
    },
    { label: "Dolor ", checked: enteredDolor, onChange: handleChangeDolor },
    {
      label: "Hiperemia ",
      checked: enteredHiperemia,
      onChange: handleChangeHiperemia,
    },
    {
      label: "Lagrimeo ",
      checked: enteredLagrimeo,
      onChange: handleChangeLagrimeo,
    },
    {
      label: "Ardor Ocular ",
      checked: enteredArdorOcular,
      onChange: handleChangeArdorOcular,
    },
    {
      label: "Salto Renglon ",
      checked: enteredSaltoRenglon,
      onChange: handleChangeSaltoRenglon,
    },
    {
      label: "Cansancio Visual ",
      checked: enteredCansancioVisual,
      onChange: handleChangeCansancioVisual,
    },
    {
      label: "Caspa Parpados ",
      checked: enteredCaspaParpados,
      onChange: handleChangeCaspaParpados,
    },
  ];

  const signosOtros = [
    { label: "Otro ", checked: enteredOtro, onChange: handleChangeOtro },
    { label: "Cual?", value: enteredCual, onChange: handleChangeCual },
  ];

  const antecedentesItems = [
    {
      label: "Diabetes ",
      checked: enteredDiabetes,
      onChange: handleChangeDiabetes,
    },
    {
      label: "Trauma Ocular ",
      checked: enteredTraumaOcular,
      onChange: handleChangeTraumaOcular,
    },
    {
      label: "Usa Correccion ",
      checked: enteredUsaCorreccion,
      onChange: handleChangeUsaCorreccion,
    },
    {
      label: "HTA ",
      checked: enteredHta,
      onChange: handleChangeHta,
    },
    {
      label: "Cirugia Ocular ",
      checked: enteredCirugiaOcular,
      onChange: handleChangeCirugiaOcular,
    },
    {
      label: "Cardiovasculares ",
      checked: enteredCardiovasculares,
      onChange: handleChangeCardiovasculares,
    },
    {
      label: "Vicios Reflaccion ",
      checked: enteredViciosReflaccion,
      onChange: handleChangeViciosReflaccion,
    },
    {
      label: "Artritis ",
      checked: enteredArtritis,
      onChange: handleChangeArtritis,
    },
    {
      label: "Ceguera ",
      checked: enteredCeguera,
      onChange: handleChangeCeguera,
    },
    { label: "Otros ", checked: enteredOtros, onChange: handleChangeOtros },
    {
      label: "Farmacos",
      value: enteredFarmacos,
      onChange: handleChangeFarmacos,
    },
    {
      label: "Otros - Cuales?",
      value: enteredCuales,
      onChange: handleChangeCuales,
    },
  ];

  const avscItems = [
    {
      label: "AV SC VL OD *",
      value: enteredScvlod,
      onChange: handleChangeScvlod,
    },
    {
      label: "AV SC VL OI *",
      value: enteredScvloi,
      onChange: handleChangeScvloi,
    },
    {
      label: "AV SC VL AO *",
      value: enteredScvlao,
      onChange: handleChangeScvlao,
    },
  ];

  const avccItems = [
    {
      label: "AV CC VL OD *",
      value: enteredCcvlod,
      onChange: handleChangeCcvlod,
    },
    {
      label: "AV CC VL OI *",
      value: enteredCcvloi,
      onChange: handleChangeCcvloi,
    },
    {
      label: "AV CC VL AO *",
      value: enteredCcvlao,
      onChange: handleChangeCcvlao,
    },
  ];

  const avotrosItems = [
    {
      label: "Lensometria OD *",
      value: enteredLensometriaOd,
      onChange: handleChangeLensometriaOd,
    },
    {
      label: "Lensometria OI *",
      value: enteredLensometriaOi,
      onChange: handleChangeLensometriaOi,
    },
    {
      label: "Tonometria OD *",
      value: enteredTonometriaOd,
      onChange: handleChangeTonometriaOd,
    },
    {
      label: "Tonometria OI *",
      value: enteredTonometriaOi,
      onChange: handleChangeTonometriaOi,
    },
  ];

  const examenCoverT = [
    {
      label: "Cover Test *",
      value: enteredCoverTest,
      onChange: handleChangeCoverTest,
    },
    {
      label: "Cover Test 6m *",
      value: enteredCoverTest6m,
      onChange: handleChangeCoverTest6m,
    },
    {
      label: "Cover Test 30cm *",
      value: enteredCoverTest30cm,
      onChange: handleChangeCoverTest30cm,
    },
  ];

  const examenOQt = [
    {
      label: "Oftalmoscopia OD *",
      value: enteredOftalmoscopiaOd,
      onChange: handleChangeOftalmoscopiaOd,
    },
    {
      label: "Oftalmoscopia OI *",
      value: enteredOftalmoscopiaOi,
      onChange: handleChangeOftalmoscopiaOi,
    },
    {
      label: "Queratometria OD *",
      value: enteredQueratometriaOd,
      onChange: handleChangeQueratometriaOd,
    },
    {
      label: "Queratometria OI *",
      value: enteredQueratometriaOi,
      onChange: handleChangeQueratometriaOi,
    },
  ];

  const examenEBt = [
    {
      label: "Test Color *",
      value: enteredTestColor,
      onChange: handleChangeTestColor,
    },
    {
      label: "Estereopsis *",
      value: enteredEstereopsis,
      onChange: handleChangeEstereopsis,
    },
  ];

  const examenEBt2 = [
    {
      label: "Retinoscopia OD *",
      value: enteredRetinoscopiaOd,
      onChange: handleChangeRetinoscopiaOd,
    },
    {
      label: "Retinoscopia OD AV VL *",
      value: enteredRetinoscopiaOdAvvl,
      onChange: handleChangeRetinoscopiaOdAvvl,
    },
    {
      label: "Retinoscopia OD AV VP *",
      value: enteredRetinoscopiaOdAvvp,
      onChange: handleChangeRetinoscopiaOdAvvp,
    },
    {
      label: "Retinoscopia OI *",
      value: enteredRetinoscopiaOi,
      onChange: handleChangeRetinoscopiaOi,
    },
    {
      label: "Retinoscopia OI AV VL *",
      value: enteredRetinoscopiaOiAvvl,
      onChange: handleChangeRetinoscopiaOiAvvl,
    },
    {
      label: "Retinoscopia OI AV VP *",
      value: enteredRetinoscopiaOiAvvp,
      onChange: handleChangeRetinoscopiaOiAvvp,
    },
  ];

  const examenEBt3 = [
    {
      label: "Subjetivo OD *",
      value: enteredSubjetivoOd,
      onChange: handleChangeSubjetivoOd,
    },
    {
      label: "Subjetivo OD AV *",
      value: enteredSubjetivoOdAv,
      onChange: handleChangeSubjetivoOdAv,
    },
    {
      label: "Subjetivo OD ADD *",
      value: enteredSubjetivoOdAdd,
      onChange: handleChangeSubjetivoOdAdd,
    },
    {
      label: "Subjetivo OI *",
      value: enteredSubjetivoOi,
      onChange: handleChangeSubjetivoOi,
    },
    {
      label: "Subjetivo OI AV *",
      value: enteredSubjetivoOiAv,
      onChange: handleChangeSubjetivoOiAv,
    },
    {
      label: "Subjetivo OI ADD *",
      value: enteredSubjetivoOiAdd,
      onChange: handleChangeSubjetivoOiAdd,
    },
  ];

  const examenEBt4 = [
    {
      label: "Impresion Diagnostica *",
      value: enteredImpresionDiagnostica,
      onChange: handleChangeImpresionDiagnostica,
    },
    {
      label: "CIE 10 *",
      value: enteredCie10,
      onChange: handleChangeCie10,
    },
    {
      label: "Conducta *",
      value: enteredConducta,
      onChange: handleChangeConducta,
    },
  ];

  const formulaFinalO = [
    {
      label: "Formula Final OD *",
      value: enteredFormulaFinalOD,
      onChange: handleChangeFormulaFinalOD,
    },
    {
      label: "Formula Final OD ADD *",
      value: enteredFormulaFinalODAdd,
      onChange: handleChangeFormulaFinalODAdd,
    },
    {
      label: "Formula Final OD DP *",
      value: enteredFormulaFinalODDP,
      onChange: handleChangeFormulaFinalODDP,
    },
    {
      label: "Formula Final OI *",
      value: enteredFormulaFinalOI,
      onChange: handleChangeFormulaFinalOI,
    },
    {
      label: "Formula Final OI ADD *",
      value: enteredFormulaFinalOIAdd,
      onChange: handleChangeFormulaFinalOIAdd,
    },
    {
      label: "Formula Final OI DP *",
      value: enteredFormulaFinalOIDP,
      onChange: handleChangeFormulaFinalOIDP,
    },
    {
      label: "TIPO *",
      value: enteredTipo,
      onChange: handleChangeEnteredTipo,
    },
  ];

  const prescripcionOp = [
    {
      label: "RX ",
      checked: enteredRX,
      onChange: handleChangeRX,
    },
    {
      label: "Uso *",
      value: enteredUso,
      onChange: handleChangeUso,
    },
    {
      label: "Control *",
      value: enteredControl,
      onChange: handleChangeControl,
    },
  ];

  return (
    <form onSubmit={submitOptometryHandler}>
      <div className="new-medic__controls">
        <div className="new-medic__controls">
          <h1>Datos de Optometría del Paciente</h1>
          <div id="medic-item-container" className="medic-item-container">
            <label htmlFor="brigada_op"></label>
            <select
              id="brigada_op"
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

            <label htmlFor="id_num_op"></label>
            <input
              className="dropdown-select"
              id="id_num_op"
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
        <h1> Signos y Síntomas </h1>
        <p> ✅ para si</p>
        <div className="medic-item-container-wrapper">
          {signosYSintomasItems.map((item, index) => (
            <div
              key={`signosOP-${index}`}
              className="medic-item-container .new-medic__controls"
            >
              <CheckboxOrTextInput
                id={`inputOP1-${index}`}
                label={item.label}
                isCheckbox={item.checked !== undefined}
                checked={item.checked}
                value={item.value}
                onChange={item.onChange}
              />
            </div>
          ))}
        </div>
        <div className="medic-item-container-wrapper">
          {signosOtros.map((item, index) => (
            <div
              key={`signosOtros-${index}`}
              className="medic-item-container .new-medic__controls"
            >
              <CheckboxOrTextInput
                id={`inputOP2-${index}`}
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
        <h1> Antecedentes Personales y/o Familiares </h1>
        <p> ✅ para si</p>
        <div className="medic-item-container-wrapper">
          {antecedentesItems.map((item, index) => (
            <div
              key={`antecedentesOP-${index}`}
              className="medic-item-container .new-medic__controls"
            >
              <CheckboxOrTextInput
                id={`inputOP3-${index}`}
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
        <div className="new-medic__controls">
          <h1> Agudeza Visual Sin Corrección</h1>
          <div className="medic-item-container-wrapper">
            {avscItems.map((item, index) => (
              <div
                key={`agudeza_sn-${index}`}
                className="medic-item-container .new-medic__controls"
              >
                <CheckboxOrTextInput
                  id={`inputOP4-${index}`}
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
          <h1> Agudeza Visual Con Corrección</h1>
          <div className="medic-item-container-wrapper">
            {avccItems.map((item, index) => (
              <div
                key={`agudeza_cn-${index}`}
                className="medic-item-container .new-medic__controls"
              >
                <CheckboxOrTextInput
                  id={`inputOP5-${index}`}
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
          <h1> Agudeza Visual</h1>
          <div className="medic-item-container-wrapper">
            {avotrosItems.map((item, index) => (
              <div
                key={`agudeza_cn-${index}`}
                className="medic-item-container .new-medic__controls"
              >
                <CheckboxOrTextInput
                  id={`inputOP6-${index}`}
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
          <h1> Examen Externo y Biomicroscopia Cover </h1>
          <div className="medic-item-container-wrapper">
            {examenCoverT.map((item, index) => (
              <div
                key={`examenCover-${index}`}
                className="medic-item-container .new-medic__controls"
              >
                <CheckboxOrTextInput
                  id={`inputOP7-${index}`}
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
          <h1> Oftalmoscopia y Queratometria </h1>
          <div className="medic-item-container-wrapper">
            {examenOQt.map((item, index) => (
              <div
                key={`examenOQ-${index}`}
                className="medic-item-container .new-medic__controls"
              >
                <CheckboxOrTextInput
                  id={`inputOP8-${index}`}
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
          <h1> Examen Externo y Biomicroscopia </h1>
          <div className="medic-item-container">
            <div className="medic-item-container-wrapper">
              {examenEBt.map((item, index) => (
                <div
                  key={`examenEB-${index}`}
                  className="medic-item-container .new-medic__controls"
                >
                  <CheckboxOrTextInput
                    id={`inputOP9-${index}`}
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
        <div className="new-medic__controls">
          <div className="medic-item-container">
            <div className="medic-item-container-wrapper">
              {examenEBt2.map((item, index) => (
                <div
                  key={`examenEB2-${index}`}
                  className="medic-item-container .new-medic__controls"
                >
                  <CheckboxOrTextInput
                    id={`inputOP10-${index}`}
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
        <div className="new-medic__controls">
          <div className="medic-item-container">
            <div className="medic-item-container-wrapper">
              {examenEBt3.map((item, index) => (
                <div
                  key={`examenEB3-${index}`}
                  className="medic-item-container .new-medic__controls"
                >
                  <CheckboxOrTextInput
                    id={`inputOP11-${index}`}
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
        <div className="new-medic__controls">
          <div className="medic-item-container">
            <div className="medic-item-container-wrapper">
              {examenEBt4.map((item, index) => (
                <div
                  key={`examenEB4-${index}`}
                  className="medic-item-container .new-medic__controls"
                >
                  <CheckboxOrTextInput
                    id={`inputOP12-${index}`}
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
        <div className="new-medic__controls">
          <h1> Formula Final </h1>
          <div className="medic-item-container-wrapper">
            {formulaFinalO.map((item, index) => (
              <div
                key={`formulaFinal-${index}`}
                className="medic-item-container .new-medic__controls"
              >
                <CheckboxOrTextInput
                  id={`inputOP13-${index}`}
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
          <h1> Receta Farmacia </h1>
          <div className="medic-item-container">
            <div className="medic-item-container-wrapper">
              <div className="new-medic__control">
                <label htmlFor="medicineOP">Principio Activo</label>
                <input
                  id="medicineOP"
                  type="text"
                  value={enteredTitle}
                  onChange={titleChangeHandler}
                  list="medicineOptionsOP"
                  placeholder="Seleccionar"
                />
                <datalist id="medicineOptionsOP">
                  {medicineOptionsOP.map((option, index) => (
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
        <div className="new-medic__controls">
          <h1> Prescripción </h1>
          <p> ✅ para si</p>
          <div className="medic-item-container-wrapper">
            {prescripcionOp.map((item, index) => (
              <div
                key={`prescripcionOptica-${index}`}
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
      </div>

      <div className="new-medic__actions">
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
        <button type="button" onClick={submitOptometryHandler}>
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

export default OptometryForm;
