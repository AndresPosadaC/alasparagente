import React, { useState, useEffect, useCallback } from "react";
import Patients from '../Patients/Patients';
import NewTriage from "../NewPatient/NewTriage";
import useFetchData from "../../hooks/useFetchData";

const TriagePage = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: patientsData, refreshData: patentsReforesh } = useFetchData("patients_json");
  
  const setPatientsData = useCallback(() => {
    setPatients(patientsData);
  }, [patientsData]);

  useEffect(() => {
    // When patientData changes, update the patient state
    setPatientsData();
    patentsReforesh();
  }, [setPatientsData, patentsReforesh, patientsData]);

  const {
    data: triageData,
    loading_t,
    refreshData: refreshTriage,
  } = useFetchData("ptriage_json");

  // Define callback functions to set data
  const setTriageData = useCallback(() => {
    // Process or use triageData as needed
  }, []);

  useEffect(() => {
    // When triageData changes, update the state
    setTriageData();
  }, [setTriageData, triageData]);

  const addTriageHandler = (triage) => {
    // Process or use triage as needed
    refreshTriage();
  };

  useEffect(() => {
    if (!loading_t) {
      setIsLoading(false);
    }
  }, [loading_t]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Patients items={patients} />
      <NewTriage onAddPatient={addTriageHandler} /> 
    </div>
  );
};

export default TriagePage;
