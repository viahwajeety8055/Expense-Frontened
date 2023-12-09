import React, { useEffect, useState } from "react";
import Expense from "../Expense/expense";
import CreateExpense from "../CreateExpense/createExpense";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [data, setData] = useState([]);
  const [budget, setBudget] = useState("");
  const [totalExpense, setTotalExpense] = useState("");
  const [redAlert, setRedAlert] = useState("");
  const [budgetId, setBudgetId] = useState("");
  const [showCreateExpense, setShowCreateExpense] = useState(false);
  const storedToken = localStorage.getItem("token");
  let token;

  if (storedToken) {
    token = jwtDecode(storedToken);
  }

  const fetchBudgetData = async () => {
    console.log(token);
    try {
      const response = await axios.get(
        `http://localhost:3000/budget/get/${token.id}`,
        {
          headers: {
            Authorization: `${storedToken}`,
          },
        }
      );
      setBudget(response.data.result.budget);
      setTotalExpense(response.data.result.totalExpense);
      setRedAlert(response.data.result.redAlert);
      setBudgetId(response.data.result.budgetId);
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExpenseData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/expense/${token.id}`,
        {
          headers: {
            Authorization: `${storedToken}`,
          },
        }
      );
      console.log(response);
      const modifiedData = response.data.result.map((r) => ({
        id: r.id,
        remark: r.reason,
        amount: r.amount,
      }));
      setData(modifiedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenseData();
    fetchBudgetData();
  }, []);

  const handleCreateExpenseClick = () => {
    setShowCreateExpense(true);
  };

  const handleCloseCreateExpense = () => {
    setShowCreateExpense(false);
  };

  const handleAddExpense = async (value) => {
    const expenseData = { remark: value.remark, amount: value.amount };
    try {
      const response = await axios.post(
        `http://localhost:3000/expense?amount=${value.amount}&reason=${value.remark}`,
        expenseData,
        {
          headers: {
            Authorization: storedToken,
          },
        }
      );
      expenseData.id = response.data.result.expenseId;
      fetchBudgetData();
      fetchExpenseData();
    } catch (error) {
      console.log(error);
    }
    setShowCreateExpense(false);
    setData([...data, expenseData]);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/expense/deleteExpense/${id}`,
        {},
        {
          headers: {
            Authorization: storedToken,
          },
        }
      );

      if (response.status === 200) {
        const filteredData = data.filter((d) => d.id !== id);
        fetchBudgetData();
        setData(filteredData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div className="w-60 h-28 bg-gray-400 rounded flex flex-col p-8 shadow-2xl">
          <h4 className="text-xl mb-1">Total Expense</h4>
          <p className="text-lg">{totalExpense ? totalExpense : 0} Rs</p>
        </div>
        <div className="w-60 h-28 bg-gray-400 rounded flex flex-col p-8 shadow-2xl">
          <h4 className="text-xl mb-1">Budget</h4>
          <p className="text-lg">{budget ? budget : 0} Rs</p>
        </div>
        <div className="w-60 h-28 bg-gray-400 rounded flex flex-col p-8 shadow-2xl">
          <h4 className="text-xl mb-1">Red Alert</h4>
          <p className="text-lg">{redAlert ? redAlert : 0} Rs</p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6 mt-10">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300 shadow-2xl"
          onClick={handleCreateExpenseClick}
        >
          Create Expense
        </button>
      </div>
      {showCreateExpense && (
        <CreateExpense
          onClose={handleCloseCreateExpense}
          onAdd={handleAddExpense}
        />
      )}
      <div>
        <ul className="space-y-4">
          {data.map((expense, index) => (
            <Expense
              key={index}
              id={expense.id}
              remark={expense.remark}
              amount={expense.amount}
              image={expense.image}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
