import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [path, setPath] = useState(false);

  const isEmailValid = (email) => {
    // Regular expression for a simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const login = async (loginData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        loginData
      );
      if (response && response.status === 200) {
        const token = response.data.result.token;
        localStorage.setItem("token", token);
        setPath(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorResponse = error.response.data.message;
        setErrorMessage(errorResponse);
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  const handleLogin = async () => {
    // Reset previous error messages
    setEmailError("");
    setPasswordError("");
    setErrorMessage(null);

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!isEmailValid(email)) {
      setEmailError("Invalid email format");
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    const loginData = {
      email: email,
      password: password,
    };

    login(loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {errorMessage && (
          <p className="text-red-500 mt-1 text-center font-bold text-xl">
            {errorMessage}
          </p>
        )}
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full p-2 border rounded ${
                emailError ? "border-red-500" : ""
              }`}
              placeholder="john@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full p-2 border rounded ${
                passwordError ? "border-red-500" : ""
              }`}
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <Link
            type="button"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-center"
            onClick={handleLogin}
            to={path ? "/home" : null}
          >
            Login
          </Link>
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
