import React from "react";
import { Link } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";
import NewTodo from "./NewTodo";

export default function Sidebar({ user, setUser, fetchData, setDueDate }) {
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
    <div className="bg-neutral-900 text-white w-[12%] h-screen top-0 left-0 p-4 flex flex-col place-content-between">
      <div className="mb-6 space-y-20">
        <p className="text-3xl ">TODO</p>
        <div className="space-y-3">
          <Link
            to="/my-tasks"
            className="block p-2 hover:bg-gray-700"
          >
            My Tasks
          </Link>
          <NewTodo
            user={user}
            setUser={setUser}
            fetchData={fetchData}
            setDueDate={setDueDate}
          />
        </div>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="block p-2 hover:bg-gray-700 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
