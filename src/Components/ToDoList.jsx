import React, { useState, useEffect, useRef } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { app, db } from "../Firebase";

import Navbar from "../Components/Navbar";

function ToDoList({ user, setUser, todoList, setTodoList }) {
  const navigate = useNavigate();
  const analytics = getAnalytics(app);
  const text = useRef(null);

  useEffect(() => {
    const auth = getAuth(app);
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (isMounted) {
        setUser(user);

        if (user) {
          fetchData(user.uid);
        } else {
          // If user is not authenticated, clear the to-do list
          navigate("/");
          setTodoList([]);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [app, navigate]);

  const fetchData = async (userId) => {
    const todoCollection = collection(db, `users/${userId}/todo_items`);
    const querySnapshot = await getDocs(todoCollection);
    const todos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(todos);
    setTodoList(todos);
  };

  useEffect(() => {
    fetchData();
    console.log(todoList);
  }, [db]);

  const deleteItem = async (id) => {
    try {
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      const userId = user.uid;
      await deleteDoc(doc(db, `users/${userId}/todo_items`, id));
      fetchData(userId);
      console.log("Document deleted with ID:", id);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    // Format the date as needed (e.g., "MM/DD/YYYY")
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <>
      <div className="bg-neutral-900 text-gray-300 w-[88%] h-screen">
        <Navbar />
        <div className=" justify-center items-center">
          <div className="flex flex-col p-10">
            <p className="text-xl font-semibold mb-4">
              Welcome, {user ? user.email : "Guest"}
            </p>
            <div className="flex flex-wrap px-5 md:px-0 lg:px-10 relative md:w-[100%] gap-3 md:gap-4 lg:gap-10">
              {todoList.map((todo) => (
                <div
                  key={todo.id}
                  className="bg-neutral-600 w-[48%] min-w-[140px] md:min-w-[180px] lg:min-w-[200px] md:w-[40%] lg:w-[22%] rounded-lg mt-16 md:mt-10 h-[200px] p-5 relative hover:border-gray-300 shadow-md hover:shadow-none"
                >
                  <span className="flex flex-col space-y-2 text-gray-100">
                    <span>{todo.text}</span>
                    <span>{formatDate(todo.dueDate)}</span>
                  </span>
                  <MdDeleteSweep
                    size={20}
                    className="absolute bottom-0 right-0 m-1 text-black  cursor-pointer hover:text-red-500"
                    onClick={() => deleteItem(todo.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ToDoList;
