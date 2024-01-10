import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const handleLogout = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  };

  return (
    <div className="w-auto h-16 relative bg-neutral-900">
      <div className="absolute top-3 right-5">
        <button
          onClick={handleLogout}
          className=" bg-green-500 text-white py-2 px-4 rounded"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
