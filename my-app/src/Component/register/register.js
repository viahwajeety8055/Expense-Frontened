import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const validateName = (name) => {
    if (!name) {
      return "Name is required";
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return "Name should only contain letters and spaces";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required";
    }
    // Basic email format validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Invalid email format";
    }
    return "";
  };

  const handleRegister = async () => {
    // Reset previous error messages
    setNameError("");
    setEmailError("");
    setPasswordError("");

    // Validate name
    const nameValidationResult = validateName(name);
    if (nameValidationResult) {
      setNameError(nameValidationResult);
      return;
    }

    // Validate email
    const emailValidationResult = validateEmail(email);
    if (emailValidationResult) {
      setEmailError(emailValidationResult);
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    const registerData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        registerData
      );
    } catch (error) {
      if (error.response) {
        const errorResponse = error.response.data.message;
        setErrorMessage(errorResponse);
      } else {
        console.log("Error:", error.message);
      }
    }
    // Add your registration logic here
    console.log("Registering with:", name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {errorMessage && (
          <p className="text-red-500 mt-1 text-center font-bold text-xl">
            {errorMessage}
          </p>
        )}
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`w-full p-2 border rounded ${
                nameError ? "border-red-500" : ""
              }`}
              placeholder="John Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
              required
            />
            {nameError && (
              <p className="text-red-500 text-sm mt-1">{nameError}</p>
            )}
          </div>
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
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 text-center"
            onClick={handleRegister}
            to={errorMessage !== null ? "/login" : null}
          >
            Register
          </Link>
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
