import axios from "axios";
import React, { useState } from "react";

const Budget = () => {
  const [budget, setBudget] = useState("");
  const [limit, setLimit] = useState("");
  const [error, setError] = useState("");

  const handleBudgetChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) || inputValue === "") {
      setBudget(inputValue);
      setError("");
    } else {
      setError("Please enter only digits for budget.");
    }
  };

  const handleLimitChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) || inputValue === "") {
      setLimit(inputValue);
      setError("");
    } else {
      setError("Please enter only digits for limit.");
    }
  };

  const handleSubmit = () => {
    // Basic validation
    if (!budget.trim() || !limit.trim()) {
      setError("Please enter both budget and limit.");
      return;
    }

    setError("");

    console.log("Budget:", budget);
    console.log("Limit:", limit);
  };

  const createBudget = async () => {
    try {
      const response = await axios.post(
        "",
        {},
        {
          headers: {
            Authorization: "",
          },
        }
      );
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4">Budget Tracker</h1>
        <div className="mb-4">
          <label
            htmlFor="budget"
            className="block text-gray-700 font-bold mb-2"
          >
            Enter your budget:
          </label>
          <input
            type="text"
            id="budget"
            className="w-full border p-2 rounded"
            placeholder="Enter your budget amount"
            value={budget}
            onChange={handleBudgetChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="limit" className="block text-gray-700 font-bold mb-2">
            Enter your limit:
          </label>
          <input
            type="text"
            id="limit"
            className="w-full border p-2 rounded"
            placeholder="Enter your limit amount"
            value={limit}
            onChange={handleLimitChange}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Budget;
