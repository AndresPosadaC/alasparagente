// Navigation.js
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"; // Import useLocation hook

const Navigation = ({ role, onLogout }) => {
  // console.log("navigation:", role)
  const location = useLocation(); // Get the current path

  const renderLink = (to, label) => (
    <li key={to}>
      <Link to={to}>{label}</Link>
    </li>
  );

  const renderLinksBasedOnRole = () => {
    switch (role) {
      case 1:
        return [
          renderLink("/expenses", "Medicamentos"),
          renderLink("/movements", "Movimientos"),
        ];
      case 2:
        return [
          renderLink("/patients", "RegistroPacientes"),
          renderLink("/triage", "Triage"),
        ];
      case 3:
        return [
          renderLink("/generalmed", "Medicina General"),
          renderLink("/odontology", "Odontologia"),
          renderLink("/optometry", "Optometria"),
        ];
      case 4:
        return [
          renderLink("/expenses", "Medicamentos"),
          renderLink("/movements", "Movimientos"),
          renderLink("/patients", "Registro Pacientes"),
          renderLink("/triage", "Triage"),
          renderLink("/generalmed", "Medicina General"),
          renderLink("/odontology", "Odontologia"),
          renderLink("/optometry", "Optometria"),
        ];
      default:
        return [];
    }
  };

  return (
    <nav>
      <ul>
        {location.pathname !== "/login" && ( // Render links only on non-login pages
          <>
            {renderLinksBasedOnRole()}
            <li>
              <Link to="/login" onClick={onLogout}>
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
