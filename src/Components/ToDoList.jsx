import React, { useEffect, useRef } from "react";

import { MdDeleteSweep } from "react-icons/md";

import { app, db } from "../Firebase";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";

function ToDoList({ user, setUser, todoList, setTodoList }) {
  const navigate = useNavigate();
  const analytics = getAnalytics(app);
  const text = useRef(null);

  const groupedTodoMap = new Map();

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

  todoList.forEach((todo) => {
    const dueDateKey = todo.dueDate;

    if (groupedTodoMap.has(dueDateKey)) {
      groupedTodoMap.get(dueDateKey).push(todo);
    } else {
      groupedTodoMap.set(dueDateKey, [todo]);
    }
  });

  const sortedGroups = Array.from(groupedTodoMap).sort(
    ([dateA], [dateB]) => new Date(dateA) - new Date(dateB)
  );

  return (
    <>
      <div className="bg-neutral-900 text-gray-300 w-[88%] h-screen">
        <Navbar />
        <div className=" justify-center items-center">
          <div className="flex flex-col p-10">
            <p className="text-xl font-semibold mb-4">
              Welcome, {user ? user.email : "Guest"}
            </p>

            <div className="flex px-5 md:px-0 lg:px-10 relative w-11/12 h-auto gap-3 md:gap-4 lg:gap-10 overflow-x-auto hideScroll">
              {sortedGroups.map(([dueDateKey, todos]) => (
                <div
                  key={dueDateKey}
                  className="flex flex-col min-w-[17%] md:w-[40%] lg:w-[22%] mt-16 md:mt-10 gap-4"
                >
                  <div className=" px-3 hover:border-gray-300 shadow-md hover:shadow-none">
                    <span className="text-gray-100">
                      {formatDate(todos[0].dueDate)}
                    </span>
                  </div>
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="bg-neutral-600 rounded-lg p-5 relative hover:border-gray-300 shadow-md hover:shadow-none"
                    >
                      <span className="flex flex-col space-y-2 text-gray-100">
                        <span>{todo.text}</span>
                      </span>
                      <MdDeleteSweep
                        size={20}
                        className="absolute bottom-0 right-0 m-1 text-black cursor-pointer hover:text-red-500"
                        onClick={() => deleteItem(todo.id)}
                      />
                    </div>
                  ))}
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
