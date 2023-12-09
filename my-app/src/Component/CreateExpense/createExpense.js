import React, { useState } from "react";

export default function CreateExpense({ onClose, onAdd }) {
  const [remark, setRemark] = useState("");
  const [amount, setAmount] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "remark") {
      setRemark(value);
    } else if (name === "amount") {
      setAmount(value);
    }

    setIsValid(remark.trim() !== "" && amount.trim() !== "");
  };

  const handleAddExpense = () => {
    if (isValid) {
      onAdd({ remark, amount });
      setRemark("");
      setAmount("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Expense</h2>
      <div className="mb-4">
        <input
          type="text"
          name="remark"
          value={remark}
          placeholder="Enter Remark"
          onChange={handleInput}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="amount"
          value={amount}
          placeholder="Enter Amount"
          onChange={handleInput}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex justify-between">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300 ${
            !isValid && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleAddExpense}
        >
          Add Expense
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
