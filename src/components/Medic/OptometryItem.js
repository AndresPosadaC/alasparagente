import React from "react";
import Card from "../UI/Card";
import "./MedicItem.css";

const OptometryItem = (props) => {
  // console.log('OptometryItem:', props);
  // Create an array of JSX elements
  const formulaFinalItems = [
    <p className="history-item"> OD: {props.formula_final_od}</p>,
    <p className="history-item"> OD_ADD: {props.formula_final_od_add}</p>,
    <p className="history-item"> OD_DP: {props.formula_final_od_dp}</p>,
    <p className="history-item"> OI: {props.formula_final_oi}</p>,
    <p className="history-item"> OI_ADD: {props.formula_final_oi_add}</p>,
    <p className="history-item"> OI_DP: {props.formula_final_oi_dp}</p>,
  ];

  return (
    <Card className="history-item">
      <div>
        <h2 className="history-item">OPTOMETRIA ID: {props.id_num_doc}</h2>
        <div className="history-item">
          <div className="history-item-container">
            <h2>Formula Final</h2>
            {formulaFinalItems} {/* Render the array of elements */}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OptometryItem;
