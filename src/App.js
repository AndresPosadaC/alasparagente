// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navigation from "./Navigation"; // Import the Navigation component
import Login from "./components/Users/Login";
import ExpensesPage from "./components/Expenses/ExpensesPage";
import MovementsPage from "./components/Movements/MovementsPage";
import PatientsPage from "./components/Patients/PatientsPage";
import TriagePage from "./components/Medic/TriagePage";
import OptometryPage from "./components/Medic/OptometryPage";
import OdontologyPage from "./components/Medic/OdontologyPage";
import GeneralmedPage from "./components/Medic/GeneralmedPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // Store the user's role

  const handleLoginSuccess = (role) => {
    setIsAuthenticated(true);
    setRole(role);
  }; 
 
  return (
    <Router>
      <Navigation isAuthenticated={isAuthenticated} role={role} onLogout={() => setIsAuthenticated(false)} />
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        {isAuthenticated ? (
          <>
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/movements" element={<MovementsPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/triage" element={<TriagePage />} />
            <Route path="/generalmed" element={<GeneralmedPage />} />
            <Route path="/odontology" element={<OdontologyPage />} />
            <Route path="/optometry" element={<OptometryPage />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;

