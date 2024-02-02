import React, { useState, useEffect, useCallback } from "react";
import Patients from "../Patients/Patients";
import Medicodonto from "./Medicodonto";
import NewOdontology from "../NewMedic/NewOdontology";
import useFetchData from "../../hooks/useFetchData";
// import FetchedDataDisplay from "../FetchedDataDisplay";

const OdontologyPage = () => {
  const [patients, setPatient] = useState([]);
  const [odontologies, setOdontology] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Use the useFetchData hook to fetch data for patients
  const {
    data: patientsData,
    loading_p,
    refreshData: refreshPatient,
  } = useFetchData("pacientes_json");
  const {
    data: odontologyData,
    loading_o,
    refreshData: refreshOdonto,
  } = useFetchData("odontology_json");

  // Define callback functions to set data
  const setPatientsData = useCallback(() => {
    setPatient(patientsData);
  }, [patientsData]);

  useEffect(() => {
    // When patientData changes, update the patient state
    setPatientsData();
  }, [setPatientsData, patientsData]);

  // Define callback functions to set data
  const setOdontologyData = useCallback(() => {
    setOdontology(odontologyData);
  }, [odontologyData]);

  useEffect(() => {
    // When patientData changes, update the patient state
    setOdontologyData();
  }, [setOdontologyData, odontologyData]);

  const addOdontologyHandler = (odontology) => {
    setOdontology((prevOdontology) => {
      return [odontology, ...prevOdontology];
    });
    refreshPatient();
    refreshOdonto();
  };

  useEffect(() => {
    if (!loading_p || !loading_o) {
      setIsLoading(false);
    }
  }, [loading_p, loading_o]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NewOdontology onAddPatient={addOdontologyHandler} />
      <Medicodonto items={odontologies} />
      <Patients items={patients} />
    </div>
  );
};

export default OdontologyPage;

//
