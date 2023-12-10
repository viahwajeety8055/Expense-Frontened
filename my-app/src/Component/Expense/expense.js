import axios from "axios";
import React, { useState } from "react";

export default function Expense({
  id: initialId,
  remark: initialRemark,
  amount: initialAmount,
  image: initialImage,
  onDelete,
}) {
  const [id, setId] = useState(initialId);
  const [remark, setRemark] = useState(initialRemark);
  const [amount, setAmount] = useState(initialAmount);
  const [image, setImage] = useState(initialImage);
  const [isEditMode, setIsEditMode] = useState(false);
  const storedToken = localStorage.getItem("token");

  const handleRemarkChange = (event) => {
    setRemark(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleUpdateClick = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/expense?amount=${amount}&remark=${remark}&expenseId=${id}`,
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

    console.log(id);
    setIsEditMode(false);
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <li className="border p-4 my-2 rounded-md bg-white shadow-lg hover:shadow-xl flex justify-between items-center transition duration-300">
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col ml-5">
          {isEditMode ? (
            <>
              <input
                type="text"
                className="text-xl font-semibold text-gray-800 border-2 border-black mb-2 rounded"
                value={remark}
                onChange={handleRemarkChange}
              />
              <input
                type="text"
                className="text-gray-800 border-2 border-black rounded"
                value={amount}
                onChange={handleAmountChange}
              />
            </>
          ) : (
            <>
              <p className="text-xl font-semibold text-gray-800">{remark}</p>
              <p className="text-gray-600">₹{amount}</p>
            </>
          )}
        </div>
      </div>
      <div className="flex space-x-4">
        {isEditMode ? (
          <button
            className="hover:bg-green-500 text-white px-4 py-2 rounded-md transition duration-300"
            onClick={handleUpdateClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </button>
        ) : (
          <button
            className="hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
            onClick={handleEditClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
            </svg>
          </button>
        )}
        <button
          className="hover:bg-red-700 text-red-500 px-4 py-2 rounded-md transition duration-300"
          onClick={handleDeleteClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="red"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button>
      </div>
    </li>
  );
}
