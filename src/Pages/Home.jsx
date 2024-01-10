import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../Firebase";

import ToDoList from "../Components/ToDoList";
import Sidebar from "../Components/Sidebar";

function Home() {
  const [user, setUser] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [dueDate, setDueDate] = useState(null);

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

  return (
    <>
      <div className="flex">
        <Sidebar
          user={user}
          setUser={setUser}
          fetchData={fetchData}
          setDueDate={setDueDate}
        />
        <ToDoList
          user={user}
          setUser={setUser}
        />
      </div>
    </>
  );
}

export default Home;
