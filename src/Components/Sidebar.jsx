import React from "react";
import { Link } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";
import NewTodo from "./NewTodo";

import { IoExitOutline } from "react-icons/io5";
import { Button } from "@nextui-org/react";

export default function Sidebar({
  user,
  setUser,
  fetchData,
  dueDate,
  setDueDate,
}) {
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
    <div className="bg-neutral-800 text-white w-[12%] h-screen top-0 left-0 p-4 flex flex-col place-content-between">
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
            dueDate={dueDate}
            setDueDate={setDueDate}
          />
        </div>
      </div>
      <div>
        <Button
          onClick={handleLogout}
          color="warning"
        >
          <IoExitOutline />
          Logout
        </Button>
      </div>
    </div>
  );
}
