import React from "react";

const Navbar = () => {
  return (
    <div className="navbar w-full border-b-2 border-gray-500 px-5 sm:px-12 py-4 text-lg bg-gradient-to-r from-green-400 via-teal-500 to-emerald-600 shadow-lg">
      <p className="text-white font-bold tracking-wide animate-pulse transition duration-300 ease-in-out">
        Admin Panel
      </p>
    </div>
  );
};

export default Navbar;
