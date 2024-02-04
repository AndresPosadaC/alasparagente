import React from "react";
import "./PopupMessage.css";

const PopupMessage = ({ message, onClose }) => {
  return (
    <div className="popup-message">
      <div className="popup-message-content">
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button> 
      </div>
    </div>
  );
};

export default PopupMessage;
