import React, { useEffect, useState } from "react";
import Expense from "../Expense/expense";
import CreateExpense from "../CreateExpense/createExpense";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import RupeeLogo from "../../Asset/rup.jpg";

export default function Home() {
  const [data, setData] = useState([]);
  const [budget, setBudget] = useState("");
  const [totalExpense, setTotalExpense] = useState("");
  const [redAlert, setRedAlert] = useState("");
  const [budgetId, setBudgetId] = useState("");
  const [showCreateExpense, setShowCreateExpense] = useState(false);
  const storedToken = localStorage.getItem("token");
  const [isEditBudgetMode, setIsEditBudgetMode] = useState(false);
  const [isEditRedAlertMode, setIsEditRedAlertMode] = useState(false);

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
      const response = await axios.get(`http://localhost:3000/expense`, {
        headers: {
          Authorization: `${storedToken}`,
        },
      });
      console.log(response.data.result.data);

      const modifiedData = response.data.result.data.map((r) => ({
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

  const handleEditBudgetClick = () => {
    setIsEditBudgetMode(true);
  };

  const handleEditRedAlertClick = () => {
    setIsEditRedAlertMode(true);
  };

  const handleRedAlert = (e) => {
    setRedAlert(e.target.value);
  };

  const handleBudget = (e) => {
    setBudget(e.target.value);
  };

  const handleUpdateClick = (key) => {
    if (key === "BUDGET") {
      updateValueOfBudget();
      setIsEditBudgetMode(false);
      return;
    }
    if (key === "REDALERT") {
      updateValueOfBudget();
      setIsEditRedAlertMode(false);
      return;
    }
  };

  const updateValueOfBudget = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/budget/update?redAlert=${redAlert}&budget=${budget}`,
        {},
        {
          headers: {
            Authorization: storedToken,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div className="w-60 h-28 bg-gray-400 rounded flex flex-col pt-10 pl-7 shadow-2xl">
          <h4 className="text-xl mt-1 mr-3">Total Expense</h4>
          <p className="text-lg">{totalExpense ? totalExpense : 0} Rs</p>
        </div>
        <div className="w-60 h-28 bg-gray-400 rounded flex flex-col shadow-2xl">
          <button
            className="hover:bg-gray-600 text-white mr-4 p-1 rounded-md transition duration-300 self-end mt-3 "
            onClick={
              isEditBudgetMode
                ? () => handleUpdateClick("BUDGET")
                : handleEditBudgetClick
            }
          >
            {isEditBudgetMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
              </svg>
            )}
          </button>
          <h4 className="text-xl pl-8">Budget</h4>
          {isEditBudgetMode ? (
            <>
              <input
                type="text"
                className="text-xl font-semibold text-gray-800 border-2 border-black mb-2 rounded"
                value={budget}
                onChange={handleBudget}
              />
            </>
          ) : (
            <p className="text-lg pl-8">{budget ? budget : 0} Rs</p>
          )}
        </div>
        <div className="w-60 h-28 bg-gray-400 rounded flex flex-col shadow-2xl">
          <button
            className="hover:bg-gray-600 text-white mr-4 rounded-md transition duration-300 self-end mt-3 p-1 "
            onClick={
              isEditRedAlertMode
                ? () => handleUpdateClick("REDALERT")
                : handleEditRedAlertClick
            }
          >
            {isEditRedAlertMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
              </svg>
            )}
          </button>
          <h4 className="text-xl pl-8">Red Alert</h4>
          {isEditRedAlertMode ? (
            <>
              <input
                type="text"
                className="text-xl font-semibold text-gray-800 border-2 border-black mb-2 rounded"
                value={redAlert}
                onChange={handleRedAlert}
              />
            </>
          ) : (
            <p className="text-lg pl-8">{redAlert ? redAlert : 0} Rs</p>
          )}
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
              image={RupeeLogo}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
