import axios from "axios";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchData = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const token = jwtDecode(storedToken);
        const response = await axios.get(
          `http://localhost:3000/auth/users/${token.id}`,
          {
            headers: {
              Authorization: `${storedToken}`,
            },
          }
        );
        setName(response.data.result[0].name);
        setEmail(response.data.result[0].email);
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
          <p className="w-full px-3 py-2 border rounded-md">{name}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-medium">
            Email
          </label>
          <p className="w-full px-3 py-2 border rounded-md">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
