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
    <div className=" w-screen bg-cyan-200 items-center pt-8 pb-4 px-80 max-2xl:px-16 max-xl:px-8 max-md:px-8">
      <div className=" flex justify-between ">
        <p className="text-3xl ">TODO</p>
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
