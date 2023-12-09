import axios from "axios";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const fetchData = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const token = jwtDecode(storedToken);
        const response = await axios.get("", {
          headers: {
            Authorization: `${token}`,
          },
        });
        setName(response.data.result.name);
        setEmail(response.data.result.email);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <img
        src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg" // Replace with your image URL
        alt="Profile Image"
        className="m-4 h-16 w-16 rounded-full object-cover"
      />
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-4 text-center">Profile</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border rounded-md"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
