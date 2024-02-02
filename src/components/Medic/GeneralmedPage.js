import React, { useState, useEffect, useCallback } from "react";
import NewGeneralmed from "../NewMedic/NewGeneralmed";
import useFetchData from "../../hooks/useFetchData";
import Medicgen from "./Medicgen";
// import FetchedDataDisplay from "../FetchedDataDisplay";

const GeneralmedPage = () => {
  const [generalmeds, setGeneralmed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Use the useFetchData hook to fetch data for patients
  const {
    data: generalmedData,
    loading_g,
    refreshData: refreshGmed,
  } = useFetchData("generalmed_json");

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

    refreshGmed();
  };

  useEffect(() => {
    if (!loading_g) {
      setIsLoading(false);
    }
  }, [loading_g]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NewGeneralmed onAddPatient={addGeneralmedHandler} />
      <Medicgen items={generalmeds} />
    </div>
  );
};

export default GeneralmedPage;

//
