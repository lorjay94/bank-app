import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "password")
    {
      navigate("/home");
    } 
    else if (email !== "admin@gmail.com")
    {
      setError("Invalid Email");
    }
    else if (password !== "password")
    {
      setError("Invalid Password")
    }
    
  };

  return (
    <div className="login-container">
      <h2 className="login">Login</h2>
      <form>
        <div className="userpass-container">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="use admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="use password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btnLogin" type="button" onClick={handleLogin}>
          Login
        </button>
          <div className="error">
            {error && <p>{error}</p>}
          </div>
      </form>
    </div>
  );
};

export default Login;
