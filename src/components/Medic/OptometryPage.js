import React, { useState, useEffect, useCallback } from "react";
import Patients from "../Patients/Patients";
import Medicopto from "./Medicopto";
import NewOptometry from "../NewMedic/NewOptometry";
import useFetchData from "../../hooks/useFetchData";
// import FetchedDataDisplay from "../FetchedDataDisplay";

const OptometryPage = () => {
  const [patients, setPatient] = useState([]);
  const [optometries, setOptometry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Use the useFetchData hook to fetch data for patients
  const { data: patientsData, loading_p, refreshData: refreshPatient } = useFetchData("pacientes_json");
  const { data: optometryData, loading_o, refreshData: refreshOpto } = useFetchData("optometry_json");

  // Define callback functions to set data
  const setPatientsData = useCallback(() => {
    setPatient(patientsData);
  }, [patientsData]);

  useEffect(() => {
    // When patientData changes, update the patient state
    setPatientsData();
  }, [setPatientsData, patientsData]);

  // Define callback functions to set data
  const setOptometryData = useCallback(() => {
    setOptometry(optometryData);
  }, [optometryData]);

  useEffect(() => {
    // When patientData changes, update the patient state
    setOptometryData();
  }, [setOptometryData, optometryData]);

  const addOptometryHandler = (optometry) => {
    setOptometry((prevOptometry) => {
      return [optometry, ...prevOptometry];
    });
    refreshPatient();
    refreshOpto();
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
      <Patients items={patients} />
      <NewOptometry onAddPatient={addOptometryHandler}/>
      <Medicopto items={optometries} />
    </div>
  );
};

export default OptometryPage;

// 
