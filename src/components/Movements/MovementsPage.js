import React, { useState, useEffect, useCallback } from "react";
import Movements from "./Movements";
import NewMovement from "../NewMovement/NewMovement";
import useFetchData from "../../hooks/useFetchData";

const MovementsPage = () => {
  const [movements, setMovements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data: movementData, refreshData: refreshMove } = useFetchData(
    "med_movimientos_json"
  );

  const setMovementsData = useCallback(() => {
    setMovements(movementData);
    setIsLoading(false);
    setError(null);
  }, [movementData]);

  const addMovementHandler = async (movement) => {
    setMovements((prevMovements) => {
      return [movement, ...prevMovements];
    });
    try {
      await refreshMove();
    } catch (error) {
      console.error("Error refrescando los datos:", error);
      setError("Error refrescando los datos: Intente nuevamente.");
    }
  };

  useEffect(() => {
    // Fetch data for movements when the component mounts
    setMovementsData();
  }, [setMovementsData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <NewMovement onAddMovement={addMovementHandler} />
      <Movements items={movements} />
    </div>
  );
};

export default MovementsPage;
