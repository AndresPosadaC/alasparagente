import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import logoImage from "../../apg_logo.png";

import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const { data: userData, loading } = useFetchData("users_json");

  const history = useNavigate();

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
        window.location.reload(); // Recargar la página después de 3 segundos
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showError]);

  const handleLogin = (e) => {
    e.preventDefault();

    try {
      if (!loading && !error) {
        const authenticatedUser = userData.find(
          (user) => user.username === username && user.password === password
        );

        if (authenticatedUser) {
          //console.log("Fetched Data:", userData);
          onLoginSuccess(authenticatedUser.role);
          switch (authenticatedUser.role) {
            case 1:
              history("/movements");
              break;
            case 2:
              history("/patients");
              break;
            case 3:
              history("/generalmed");
              break;
            case 4:
              history("/movements");
              break;
            default:
              return [];
          }
        } else {
          setError("Falla en Autenticación");
          setShowError(true);
        }
      } else {
        setError("Falla en Autenticación");
        setShowError(true);
      }
    } catch (error) {
      console.error("Error durante login:", error);
      setError("Ocurrió un error durante el login");
      setShowError(true);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logoImage} alt="Company Logo" className="logo-image" />
      </div>
      <form onSubmit={handleLogin}>
        <br />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {showError && (
          <>
            <p className="error-message">{error}</p>
            <button type="button" onClick={handleRefresh}>
              Refresh
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
