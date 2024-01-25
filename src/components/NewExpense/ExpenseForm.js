import React, { useState, useEffect } from "react";
import useApiPost from "../../hooks/useApiPost";
import PopupMessage from "../PopupMessage";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [selectedVoided, setSelectedVoided] = useState("0");
  const [enteredDateReceived, setEnteredDateReceived] = useState("");
  const [enteredPrincipioActivo, setEenteredPrincipioActivo] = useState("");
  const [enteredForma, setEnteredForma] = useState("");
  const [enteredConcentracion, setEnteredConcentracion] = useState("");
  const [enteredPresentacion, setEnteredPresentacion] = useState("");
  const [enteredUnidadMedida, setEnteredUnidadMedida] = useState("");
  const [enteredRegistroInvima, setEnteredRegistroInvima] = useState("");
  const [enteredLote, setEnteredLote] = useState("");
  const [enteredVencimiento, setEnteredVencimiento] = useState("");
  const [enteredObservaciones, setEnteredObservaciones] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Make the POST request using the useApiPost hook
  const { postData: postExpensetData, error: expenseError } = useApiPost(
    "medinvima_json"
  );

  const dateReceivedChangeHandler = (event) => {
    setEnteredDateReceived(event.target.value);
  };

  const principioActivoChangeHandler = (event) => {
    setEenteredPrincipioActivo(event.target.value);
  };

  const formaChangeHandler = (event) => {
    setEnteredForma(event.target.value);
  };

  const concentracionChangeHandler = (event) => {
    setEnteredConcentracion(event.target.value);
  };

  const presentacionChangeHandler = (event) => {
    setEnteredPresentacion(event.target.value);
  };

  const unidadMedidaChangeHandler = (event) => {
    setEnteredUnidadMedida(event.target.value);
  };

  const registroInvimaChangeHandler = (event) => {
    setEnteredRegistroInvima(event.target.value);
  };

  const loteChangeHandler = (event) => {
    setEnteredLote(event.target.value);
  };

  const vencimientoChangeHandler = (event) => {
    setEnteredVencimiento(event.target.value);
  };

  const observacionesChangeHandler = (event) => {
    setEnteredObservaciones(event.target.value);
  };

  const submitMedInvimaHandler = async (event) => {
    event.preventDefault();

    if (
      !enteredPrincipioActivo ||
      !enteredForma ||
      !enteredConcentracion ||
      !enteredPresentacion ||
      !enteredUnidadMedida ||
      !enteredRegistroInvima 
    ) {
      setErrorMessage("Por favor, completa todos los campos requeridos con * ");
      return; // Exit the function early, no need to continue checking other conditions
    }

    const formattedDate1 = new Date(enteredDateReceived)
    .toISOString()
    .split("T")[0];

    const formattedDate2 = new Date(enteredVencimiento)
    .toISOString()
    .split("T")[0];

    const expenseData = {
      voided: selectedVoided,
      fecha_R: formattedDate1,
      principio_activo: enteredPrincipioActivo,
      forma: enteredForma,
      concentracion: enteredConcentracion,
      presentacion: enteredPresentacion,
      unidad_medida: enteredUnidadMedida,
      registro_invima: enteredRegistroInvima,
      lote: enteredLote,
      vencimiento: formattedDate2,
      observaciones: enteredObservaciones,
    };

    // Send the data to the API
    const success = await postExpensetData(expenseData);

    if (success) {
      // The POST request was successful, handle accordingly
      setSelectedVoided("0");
      setEnteredDateReceived("");
      setEenteredPrincipioActivo("");
      setEnteredForma("");
      setEnteredConcentracion("");
      setEnteredPresentacion("");
      setEnteredUnidadMedida("");
      setEnteredRegistroInvima("");
      setEnteredLote("");
      setEnteredVencimiento("");
      setEnteredObservaciones("");

      // Show the success message
      setShowSuccessMessage(true);

      // Hide the success message after a certain duration (e.g., 3000 milliseconds)
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      // Or show a success message to the user
    } else {
      // Handle the error, e.g., show an error message to the user
      console.error("Error adding data:", expenseError);
      setErrorMessage("Error agregando los datos:", expenseError);
    }
  };

  // Replace the refreshPage function with useEffect
  useEffect(() => {
    if (showSuccessMessage) {
      // Clear input fields
      setSelectedVoided("0");
      setEnteredDateReceived("");
      setEenteredPrincipioActivo("");
      setEnteredForma("");
      setEnteredConcentracion("");
      setEnteredPresentacion("");
      setEnteredUnidadMedida("");
      setEnteredRegistroInvima("");
      setEnteredLote("");
      setEnteredVencimiento("");
      setEnteredObservaciones("");
    }
  }, [showSuccessMessage]);

  return (
    <form onSubmit={submitMedInvimaHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label htmlFor="date_received">Fecha Recibido formato</label>
          <input
            type="date"
            min="2023-01-01"
            id="date_received"
            value={enteredDateReceived}
            onChange={dateReceivedChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label htmlFor="principio_activo">Principio Activo *</label>
          <input
            id="principio_activo"
            type="text"
            value={enteredPrincipioActivo}
            onChange={principioActivoChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label htmlFor="forma">Forma Farmaceutica *</label>
          <select
            id="forma"
            value={enteredForma}
            onChange={formaChangeHandler}
            className="dropdown-select" // Apply a CSS class for styling
          >
            <option value="">Seleccionar forma farmaceutica</option>
            <option defaultValue="AMPOLLAS">AMPOLLAS</option>
            <option defaultValue="CÁPSULAS">CÁPSULAS</option>
            <option defaultValue="CREMA">CREMA</option>
            <option defaultValue="GEL">GEL</option>
            <option defaultValue="GOTAS">GOTAS</option>
            <option defaultValue="JALEA">JALEA</option>
            <option defaultValue="JARABE">JARABE</option>
            <option defaultValue="LATEX">LATEX</option>
            <option defaultValue="LÍQUIDO">LÍQUIDO</option>
            <option defaultValue="LOCIÓN">LOCIÓN</option>
            <option defaultValue="ÓVULOS">ÓVULOS</option>
            <option defaultValue="POLVO">POLVO</option>
            <option defaultValue="SACHETS">SACHETS</option>
            <option defaultValue="SOLUCIÓN INYECTABLE">
              SOLUCIÓN INYECTABLE
            </option>
            <option defaultValue="SOLUCIÓN ORAL">SOLUCIÓN ORAL</option>
            <option defaultValue="SPRAY">SPRAY</option>
            <option defaultValue="SUSPENSIÓN ORAL">SUSPENSIÓN ORAL</option>
            <option defaultValue="TABLETAS">TABLETAS</option>
            <option defaultValue="TIRILLAS">TIRILLAS</option>
            <option defaultValue="UNGÜENTO">UNGÜENTO</option>
          </select>
        </div>
        <div className="new-expense__control">
          <label htmlFor="concentracion">Concentración *</label>
          <input
            type="text"
            id="concentracion"
            value={enteredConcentracion}
            onChange={concentracionChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label htmlFor="presentacion">Presentación Comercial *</label>
          <input
            type="text"
            id="presentacion"
            value={enteredPresentacion}
            onChange={presentacionChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label htmlFor="unidad_medida">Unidad de Medida *</label>
          <select
            id="unidad_medida"
            value={enteredUnidadMedida}
            onChange={unidadMedidaChangeHandler}
            className="dropdown-select" // Apply a CSS class for styling
          >
            <option value="">Seleccionar unidad de medida</option>
            <option defaultValue="ml">ml</option>
            <option defaultValue="mg">mg</option>
            <option defaultValue="mg/ml">mg/ml</option>
            <option defaultValue="g">g</option>
            <option defaultValue="µg">µg</option>
            <option defaultValue="und">und</option>
          </select>
        </div>
        <div className="new-expense__control">
          <label htmlFor="registro_invima">Registro Invima *</label>
          <input
            type="text"
            id="registro_invima"
            value={enteredRegistroInvima}
            onChange={registroInvimaChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label htmlFor="lote">Lote *</label>
          <input
            type="text"
            id="lote"
            value={enteredLote}
            onChange={loteChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label htmlFor="vencimiento">Vencimiento formato</label>
          <input
            type="date"
            min="2023-09-01"
            id="vencimiento"
            value={enteredVencimiento}
            onChange={vencimientoChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label htmlFor="observaciones">Observaciones</label>
          <input
            type="text"
            id="observaciones"
            value={enteredObservaciones}
            onChange={observacionesChangeHandler}
          />
        </div>
      </div>

      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>
          Cancelar
        </button>
        <button type="button" onClick={submitMedInvimaHandler}>
          Agregar
        </button>
        {errorMessage && (
          <div className="error-message">
            <PopupMessage
              message={errorMessage}
              onClose={() => setErrorMessage(null)}
            />
          </div>
        )}
        {showSuccessMessage && (
          <PopupMessage
            message="¡Datos agregados exitosamente!"
            onClose={() => setShowSuccessMessage(false)}
          />
        )}

        {/*<button onClick={refreshPage}>Refrescar</button>*/}
      </div>
    </form>
  );
};

export default ExpenseForm;
