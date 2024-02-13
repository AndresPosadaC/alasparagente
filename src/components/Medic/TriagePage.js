import React, { useState, useEffect, useCallback } from "react";
// import Patients from "../Patients/Patients";

import NewTriage from "../NewPatient/NewTriage";
import useFetchData from "../../hooks/useFetchData";
// import FetchedDataDisplay from "../FetchedDataDisplay";

const TriagePage = () => {
  const [triage, setTriage] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: triageData,
    loading_t,
    refreshData: refreshTriage,
  } = useFetchData("ptriage_json");

  // Define callback functions to set data
  const setTriageData = useCallback(() => {
    setTriage(triageData);
  }, [triageData]);

  useEffect(() => {
    // When patientData changes, update the patient state
    setTriageData();
  }, [setTriageData, triageData]);

  const addTriageHandler = (triage) => {
    setTriage((prevTriage) => {
      return [triage, ...prevTriage];
    });
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
      <NewTriage onAddPatient={addTriageHandler} />
    </div>
  );
};

export default TriagePage;

//
