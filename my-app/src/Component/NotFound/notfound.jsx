import React from "react";

const NotFoundPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
