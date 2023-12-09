import React from "react";
import Sidebar from "../Sidebar/sidebar";
import Home from "../Home/home";
import Graph from "../Graph/graph";
import CreateExpense from "../CreateExpense/createExpense";
import Profile from "../Profile/profile";
import { Outlet } from "react-router-dom";

export default function Container(props) {
  return (
    <div className="flex">
      <div className="w-1/5 bg-gray-800 p-4">
        <Sidebar />
      </div>

      <div className="w-4/5 bg-white p-4">
        <Outlet />
      </div>
    </div>
  );
}
