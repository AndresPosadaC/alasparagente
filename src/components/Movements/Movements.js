import React, { useState } from "react";
import Card from "../UI/Card";
import MovementsFilter from "./MovementsFilter";
import MovementsList from "./MovementsList";
import useApiData from "../../hooks/useApiData";
import "./Movements.css";

const Movements = (props) => {
  // console.log('Movements:', props);
  const [filteredStore, setFilteredStore] = useState("Todos");
  const [filteredMedicine, setFilteredMedicine] = useState("Todos");
  const { data: storeOptions } = useApiData(
    "http://localhost:3001/api/med_store_json",
    "store"
  );
  const { data: medicineOptions } = useApiData(
    "http://localhost:3001/api/medlist_json",
    "principio_activo_f"
  );

  const filterChangeHandler = (filterName, selectedValue) => {
    if (filterName === "store") {
      setFilteredStore(selectedValue);
    } else if (filterName === "medicine") {
      setFilteredMedicine(selectedValue);
    }
  };

  // Add a conditional check to handle undefined props.items
  const filteredMovements = props.items
    ? props.items.filter((movement) => {
        const storeFilter =
          movement.origen.toLowerCase() === filteredStore.toLowerCase() ||
          movement.destination.toLowerCase() === filteredStore.toLowerCase() ||
          filteredStore.toLowerCase() === "todos";
        const medicineFilter =
          movement.medicine.toLowerCase() === filteredMedicine.toLowerCase() ||
          filteredMedicine.toLowerCase() === "todos";
        return storeFilter && medicineFilter;
      })
    : [];

  const summedQuantity = filteredMovements.reduce((sum, movement) => {
    return filteredStore === movement.destination
      ? sum + movement.quantity
      : sum - movement.quantity;
  }, 0);

  return (
    <div>
      <Card className="movements">
        <MovementsFilter
          selectedStore={filteredStore}
          storeOptions={storeOptions} // Use the fetched store options
          selectedMedicine={filteredMedicine}
          medicineOptions={medicineOptions}
          onChangeFilter={filterChangeHandler}
        />
        {filteredStore !== "Todos" && filteredMedicine !== "Todos" && (
          <h2 className="movements-filter">
            Cantidad total en almacén: {summedQuantity}
          </h2>
        )}
        <MovementsList items={filteredMovements} />
      </Card>
    </div>
  );
};

export default Movements;
