// PatientsPage.js
import React, { useState, useEffect, useCallback } from 'react';
import Patients from './Patients';
import NewPatient from '../NewPatient/NewPatient';
import useFetchData from '../../hooks/useFetchData';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Define the API URLs for patients
  const patientApiUrl = 'http://localhost:3001/api/pacientes_json';
 
  // Use the useFetchData hook to fetch data for patients
  const { data: patientsData, loading, refreshData } = useFetchData(patientApiUrl);

  // Define callback functions to set data
  const setPatientsData = useCallback(() => {
    setPatients(patientsData);
  }, [patientsData]);
  
  useEffect(() => {
    // When patientData changes, update the patient state
    setPatientsData();
  }, [setPatientsData, patientsData]);

  const addPatientHandler = (patient) => {
    setPatients((prevPatients) => {
      return [patient, ...prevPatients];
    });
    refreshData();
  };

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //useEffect(() => {
    // Fetch data for patient
  //  fetchPatient();

  //}, [fetchPatient, patientsData]);

  return (
    <div>
      <Patients items={patients} />
      <NewPatient onAddPatient={addPatientHandler} />
    </div>
  );
}; 


export default PatientsPage;
