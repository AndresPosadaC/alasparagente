import React, { useState, useEffect, useCallback } from "react";
// import Patients from "../Patients/Patients";
import Medicopto from "./Medicopto";
import NewOptometry from "../NewMedic/NewOptometry";
import useFetchData from "../../hooks/useFetchData";
// import FetchedDataDisplay from "../FetchedDataDisplay";

const OptometryPage = () => {
  const [optometries, setOptometry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: optometryData,
    loading_o,
    refreshData: refreshOpto,
  } = useFetchData("optometry_json");

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
    refreshOpto();
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
      <NewOptometry onAddPatient={addOptometryHandler} />
      <Medicopto items={optometries} />
    </div>
  );
};

export default OptometryPage;

//
