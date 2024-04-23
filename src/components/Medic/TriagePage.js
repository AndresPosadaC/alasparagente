import React, { useState, useEffect, useCallback } from "react";
import Patients from '../Patients/Patients';
import NewTriage from "../NewPatient/NewTriage";
import useFetchData from "../../hooks/useFetchData"; 

const TriagePage = () => {
  const [triagePatients, setTriagePatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: patientsTriageData, loading, refreshData: refreshTriagePatients } = useFetchData("patients_json");
  
  // Define callback functions to set data
  const setPatientsData = useCallback(() => {
    setTriagePatients(patientsTriageData);
  }, [patientsTriageData]);
  
  useEffect(() => {
    // When patientData changes, update the patient state
    setPatientsData();
  }, [setPatientsData, patientsTriageData]);

  const addTriageHandler = (triagePatient) => {
    setTriagePatients((prevTriagePatients) => {
      return [triagePatient, ...prevTriagePatients];
    });
    refreshTriagePatients();
  };

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Patients items={triagePatients} />
      <NewTriage onAddPatient={addTriageHandler} /> 
    </div>
  );
};

export default TriagePage;
