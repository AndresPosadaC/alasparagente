import React, { useState, useEffect, useCallback } from "react";
import Medicodonto from "./Medicodonto";
import NewOdontology from "../NewMedic/NewOdontology";
import useFetchData from "../../hooks/useFetchData";
// import FetchedDataDisplay from "../FetchedDataDisplay";

const OdontologyPage = () => {
  const [odontologies, setOdontology] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Use the useFetchData hook to fetch data for patients
  const {
    data: odontologyData,
    loading_o,
    refreshData: refreshOdonto,
  } = useFetchData("odontology_json");

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
    refreshOdonto();
  };

  useEffect(() => {
    if (!loading_o) {
      setIsLoading(false);
    }
  }, [loading_o]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NewOdontology onAddPatient={addOdontologyHandler} />
      <Medicodonto items={odontologies} />
    </div>
  );
};

export default OdontologyPage;

//
