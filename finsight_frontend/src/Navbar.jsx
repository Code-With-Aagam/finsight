import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/633/633684.png"
          alt="FinSight Logo"
          className="w-8 h-8"
        />
        <h1 className="text-2xl font-bold tracking-tight">FinSight Dashboard</h1>
      </div>

      <div className="space-x-6 hidden sm:flex">
        <a href="#" className="hover:text-gray-200 transition">
          Home
        </a>
        <a href="#" className="hover:text-gray-200 transition">
          Portfolio
        </a>
        <a href="#" className="hover:text-gray-200 transition">
          Analytics
        </a>
        <a href="#" className="hover:text-gray-200 transition">
          Contact
        </a>
      </div>

      <button className="bg-white text-blue-700 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition">
        Sign In
      </button>
    </nav>
  );
}
