import React, { useState, useEffect, useCallback } from "react";
import Patients from "../Patients/Patients";
import NewGeneralmed from "../NewMedic/NewGeneralmed";
import useFetchData from "../../hooks/useFetchData";
import Medicgen from "./Medicgen";
// import FetchedDataDisplay from "../FetchedDataDisplay"; 

const GeneralmedPage = () => {
  const [patients, setPatient] = useState([]);
  const [generalmeds, setGeneralmed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Define the API URLs for patients
  const patientApiUrl = "http://localhost:3001/api/pacientes_json";
  const generalmedApiUrl = "http://localhost:3001/api/generalmed_json";

  // Use the useFetchData hook to fetch data for patients
  const { data: patientsData, loading_p, refreshData: refreshPatient } = useFetchData(patientApiUrl);
  const { data: generalmedData, loading_g, refreshData: refreshGmed } = useFetchData(generalmedApiUrl);

  // Define callback functions to set data
  const setPatientsData = useCallback(() => {
    setPatient(patientsData);
  }, [patientsData]);

  useEffect(() => {
    // When patientData changes, update the patient state
    setPatientsData();
  }, [setPatientsData, patientsData]);

  // Define callback functions to set data
  const setGeneralmedData = useCallback(() => {
    setGeneralmed(generalmedData);
  }, [generalmedData]);

  useEffect(() => {
    // When patientData changes, update the patient state
    setGeneralmedData();
  }, [setGeneralmedData, generalmedData]);

  const addGeneralmedHandler = (generalmed) => {
    setGeneralmed((prevGeneralmed) => {
      return [generalmed, ...prevGeneralmed];
    });
    refreshPatient();
    refreshGmed();
  };

  useEffect(() => {
    if (!loading_p || !loading_g) {
      setIsLoading(false);
    }
  }, [loading_p, loading_g]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Patients items={patients} />
      <NewGeneralmed onAddPatient={addGeneralmedHandler}/>
      <Medicgen items={generalmeds} />
    </div> 
  );
};

export default GeneralmedPage;

// 
