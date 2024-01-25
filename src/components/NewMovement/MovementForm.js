import React, { useState, useEffect } from "react";
import useApiData from "../../hooks/useApiData";
import useApiPost from "../../hooks/useApiPost";
import useFetchData from "../../hooks/useFetchData";
import FarmaDataDisplay from "../FarmaDataDisplay";
import PopupMessage from "../PopupMessage";


import "./MovementForm.css";
//import FetchedDataDisplay from "../FetchedDataDisplay";
//{props.length > 0 && <FetchedDataDisplay data={props} />}

const MovementForm = (props) => {
  //console.log('MovementsForm:', props);
  const [selectedVoidedB, setSelectedVoidedB] = useState("0");
  const [selectedVoided, setSelectedVoided] = useState("0");
  const [selectedPatientID, setSelectedPatientID] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredQuantity, setEnteredQuantity] = useState("");
  const [enteredOrigen, setEnteredOrigen] = useState("");
  const [enteredDestination, setEnteredDestination] = useState("");
  const [selectedBrigada, setSelectedBrigada] = useState("");
  const [newBrigada, setNewBrigada] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Existing state variables and hooks...
  const [filteredData, setFilteredData] = useState([]); // State for filtered data

  const { data: brigadaNames, refreshData: refreshBrigadaNames } = useApiData(
    "brigadas_json",
    "location_b"
  );

  const sortedBrigadaNames = brigadaNames.slice().sort();

  const { data: medicineOptions } = useApiData(
    "medlist_json",
    "principio_activo_f"
  );

  const { data: storeOptions } = useApiData("med_store_json", "store");

  const { data: destinationOptions, refreshData: refreshMove } = useFetchData(
    "med_movimientos_json"
  );

  const { data: medicineMovements, refreshData: refreshMedBrigada } =
    useFetchData("med_brigada_json");

  const { data: farmaOptions, refreshData: refreshFarma } =
    useFetchData("farma_json");

  // Fetch the data:
  const { data: farmaData } = useFetchData("farma_json");

  const { postData: postBrigadaData, error: brigadaError } =
    useApiPost("brigadas_json");

  const { postData: postMovementData, error: movementError } = useApiPost(
    "med_movimientos_json"
  );

  const getDestinationOptions = (destinationOptions) => {
    const uniqueDestinations = new Set(
      destinationOptions.map((option) => option.destination)
    );
    uniqueDestinations.add("Compras");
    uniqueDestinations.delete("Pacientes");
    return [...uniqueDestinations].sort();
  };

  const submitBrigadaHandler = async (event) => {
    event.preventDefault();

    // Create brigadaData object
    const brigadaData = {
      voided: selectedVoidedB,
      location_b: newBrigada,
    };

    // Use the postBrigadaData function to make the POST request
    const success = await postBrigadaData(brigadaData);

    if (success) {
      // The POST request was successful, handle accordingly
      // Clear input field after successful insertion
      setSelectedVoidedB("0");
      setNewBrigada("");
      // Fetch the updated Brigada names after the POST request
      refreshBrigadaNames();
    } else {
      // Handle the error, e.g., show an error message to the user
      console.error("Error adding Brigada:", brigadaError);
      setErrorMessage("Error añadiendo Brigada:", brigadaError);
      // console.log("brigada", brigadaData)
    }
  };

  useEffect(() => {
    if (selectedBrigada && selectedPatientID) {
      // Filter the fetched data based on selectedBrigada and selectedPatientID
      const filteredData = farmaData.filter(
        (item) =>
          item.location_b === selectedBrigada &&
          item.id_num_doc === selectedPatientID
      );
      // Set the filtered data in state
      setFilteredData(filteredData);
    }
  }, [selectedBrigada, selectedPatientID, farmaData]);

  const uniquePatientIDs = [
    ...new Set(
      farmaOptions
        .filter((option) => option.location_b === selectedBrigada)
        .map((option) => option.id_num_doc)
    ),
  ];

  const sortedPatientIDs = uniquePatientIDs.slice().sort();

  // Handle ID search and filter data
  const findIDHandler = (event) => {
    const selectedID = event.target.value;
    const filteredFarmaOptions = farmaOptions.filter(
      (option) =>
        option.location_b === selectedBrigada &&
        option.id_num_doc === selectedID
    );

    if (filteredFarmaOptions.length > 0) {
      setSelectedPatientID(selectedID);
    } else {
      setSelectedPatientID("");
      console.log(
        "No se encontraron coincidencias o se encontraron varias coincidencias para ID:",
        selectedID
      );
      setErrorMessage("No se encontraron coincidencias o se encontraron varias coincidencias para ID: ", selectedID); 
    }
  };

  const brigadaChangeHandler = (event) => {
    setSelectedBrigada(event.target.value);
  };

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const quantityChangeHandler = (event) => {
    setEnteredQuantity(event.target.value);
  };

  const origenChangeHandler = (event) => {
    setEnteredOrigen(event.target.value);
  };

  const destinationChangeHandler = (event) => {
    setEnteredDestination(event.target.value);
  };

  const handleCancel = () => {
    setSelectedVoided("0");
    setSelectedPatientID("");
    setEnteredTitle("");
    setEnteredQuantity("");
    setEnteredOrigen("");
    setEnteredDestination("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (selectedBrigada === "Selecciona Brigada" || !selectedBrigada) {
      setErrorMessage("Por favor, selecciona una Brigada ");
      return; // Exit the function early, no need to continue checking other conditions
    }

    if (
      !enteredTitle ||
      !enteredQuantity ||
      !enteredOrigen ||
      !enteredDestination
    ) {
      setErrorMessage("Por favor, completa todos los campos ");
      return; // Exit the function early, no need to continue checking other conditions
    }

    // Check if the entered origin is 'Compras'
    if (enteredOrigen === "Compras") {
      // If 'Compras', allow the user to submit without checking medicineMovements
      // Proceed with the POST request
      const movementData = {
        voided: selectedVoided,
        brigada: selectedBrigada,
        medicine: enteredTitle,
        quantity: parseInt(enteredQuantity, 10),
        origen: enteredOrigen,
        destination: enteredDestination,
      };

      // Use the postBrigadaData function to make the POST request
      const success = await postMovementData(movementData);

      if (success) {
        // Show the success message
        setShowSuccessMessage(true);

        // Hide the success message after a certain duration (e.g., 3000 milliseconds)
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        setErrorMessage("Error añadiendo el movimiento");
        console.error("Error añadiendo el movimiento:", movementError);
      }
    } else {
      // Check if the entered medicine exists in the selected origin
      const isMedicineInOrigin = destinationOptions.some(
        (item) =>
          item.medicine === enteredTitle && item.destination === enteredOrigen
      );

      if (!isMedicineInOrigin) {
        setErrorMessage("La medicina no existe en el origen seleccionado ");
      } else {
        // Find the maximum quantity for the entered medicine
        const maxQuantityForMedicine = medicineMovements.find(
          (item) => item.medicine === enteredTitle
        );

        const enteredQuantityAsInt = parseInt(enteredQuantity, 10);

        if (enteredQuantityAsInt <= 0) {
          setErrorMessage("La cantidad debe ser mayor que cero ");
        } else if (
          enteredQuantityAsInt > maxQuantityForMedicine.total_quantity
        ) {
          setErrorMessage(
            "Cantidad debe ser menor o igual de: " +
              maxQuantityForMedicine.total_quantity +
              ", corregir "
          );
        } else {
          // All conditions passed, proceed with the POST request
          const movementData = {
            voided: selectedVoided,
            brigada: selectedBrigada,
            medicine: enteredTitle,
            quantity: enteredQuantityAsInt,
            origen: enteredOrigen,
            destination: enteredDestination,
          };

          // Use the postBrigadaData function to make the POST request
          const success = await postMovementData(movementData);

          if (success) {
            setShowSuccessMessage(true);
            // Hide the success message after a certain duration (e.g., 3000 milliseconds)
            setTimeout(() => {
              setShowSuccessMessage(false);
            }, 3000);
          } else {
            setErrorMessage("Error añadiendo el movimiento ", movementError);
            console.error("Error añadiendo el movimiento:", movementError);
          }
        }
      }
    }
  };

  //const refreshPage = () => {
  //  window.location.reload(); // Reload the page
  //};

  // Replace the refreshPage function with useEffect
  useEffect(() => {
    if (showSuccessMessage) {
      // Reset the form or perform any other necessary actions
      setSelectedVoided("");
      setSelectedPatientID("");
      setEnteredTitle("");
      setEnteredQuantity("");
      setEnteredOrigen("");
      setEnteredDestination("");
      setNewBrigada("");
      refreshMove();
    }
  }, [showSuccessMessage, refreshMedBrigada, refreshMove, refreshFarma]);

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="new-movement__controls">
        <div className="new-movement__control">
          <label htmlFor="brigada">Brigada</label>
          <select
            id="brigada"
            value={selectedBrigada}
            onChange={brigadaChangeHandler}
          >
            <option value="">Selecciona Brigada</option>
            {sortedBrigadaNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <label htmlFor="new_brigada"></label>
          <button type="button" onClick={submitBrigadaHandler}>
            +Brigada:
          </button>
          <input
            id="new_brigada"
            type="text"
            value={newBrigada}
            onChange={(event) => setNewBrigada(event.target.value)}
          />
        </div>
        <div className="new-movement__control">
          <label htmlFor="id_num">ID Paciente</label>
          <input
            id="id_num"
            type="text"
            value={selectedPatientID}
            onChange={findIDHandler}
            list="farmaOptions"
            placeholder="Seleccionar"
          />
          <datalist id="farmaOptions">
            {sortedPatientIDs.map((patientID) => (
              <option key={patientID} value={patientID} />
            ))}
          </datalist>
          {filteredData.length > 0 && <FarmaDataDisplay data={filteredData} />}
        </div>
      </div>

      <div className="new-movement__controls">
        <div className="new-movement__control">
          <label htmlFor="medicine">Principio Activo</label>
          <input
            id="medicine"
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
            list="medicineOptions"
            placeholder="Seleccionar"
          />
          <datalist id="medicineOptions">
            {medicineOptions.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
        </div>
        <div className="new-movement__control">
          <label htmlFor="quantity">Cantidad</label>
          <input
            id="quantity"
            type="number"
            min="1"
            step="1"
            value={enteredQuantity}
            onChange={quantityChangeHandler}
          />
        </div>
        <div className="new-movement__control">
          <label htmlFor="origen">Origen</label>
          <input
            id="origen"
            type="text"
            value={enteredOrigen}
            onChange={origenChangeHandler}
            list="destinationOptions"
            placeholder="Seleccionar"
          />
          <datalist id="destinationOptions">
            {getDestinationOptions(destinationOptions).map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
        </div>
        <div className="new-movement__control">
          <label htmlFor="destination">Destino</label>
          <input
            id="destination"
            type="text"
            value={enteredDestination}
            onChange={destinationChangeHandler}
            list="storeOptions"
            placeholder="Seleccionar"
          />
          <datalist id="storeOptions">
            {storeOptions
              .filter((option) => option !== "Compras") // Exclude 'Compras'
              .map((option) => (
                <option key={option} value={option} />
              ))}
          </datalist>
        </div>
      </div>
      <div className="new-movement__actions">
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
        <button type="button" onClick={handleFormSubmit}>
          Agregar
        </button>
        {showSuccessMessage && (
          <PopupMessage
            message="¡Datos agregados exitosamente!"
            onClose={() => setShowSuccessMessage(false)}
          />
        )}
        {errorMessage && (
          <div className="error-message">
            <PopupMessage
              message={errorMessage}
              onClose={() => setErrorMessage(null)}
            />
          </div>
        )}
        {/*<button onClick={refreshPage}>Refrescar</button>*/}
      </div>
    </form>
  );
};

export default MovementForm;
