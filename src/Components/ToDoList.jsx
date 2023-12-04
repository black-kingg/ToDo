import React, { useState, useEffect, useRef } from "react";
import { CiCirclePlus } from "react-icons/ci";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue } from "firebase/database";

function ToDoList() {
  const firebaseConfig = {
    apiKey: "AIzaSyAVgTWP4PnjexwOcrrxcgXWMNyDXaNtnTs",
    authDomain: "todo-d508b.firebaseapp.com",
    projectId: "todo-d508b",
    storageBucket: "todo-d508b.appspot.com",
    messagingSenderId: "919777973523",
    appId: "1:919777973523:web:b01ff9f22f34d49e46f6e6",
    measurementId: "G-3QZSTEWCV8",
    databaseURL: "https://ToDo.firebaseio.com/",
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase(app);
  const text = useRef(null);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(db, "todo_items");
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const todoItems = Object.values(data);
          setTodoList(todoItems);
        }
      });
    };

    fetchData();
  }, [db]);

  const addItem = (event) => {
    event.preventDefault();

    set(ref(db, "todo_items"), {
      text: text.current.value,
      status: "active",
    });
    text.current.value = "";
  };

  return (
    <>
      <div className="bg-gray-200 w-screen h-screen">
        <div className="w-fit min-h-screen justify-center items-center">
          <div
            className={`
              flex flex-wrap px-5 md:px-0 lg:px-10 relative md:w-[75%]  gap-3 md:gap-4 lg:gap-10`}
          >
            <div
              className="bg-white flex flex-col justify-center items-center w-[48%] min-w-[140px] md:min-w-[180px] lg:min-w-[200px] md:w-[40%] lg:w-[22%] rounded-lg mt-16 md:mt-10 p-16 relative cursor-pointer hover:border-gray-300 shadow-md hover:shadow-none"
              onClick={"addItem"}
            >
              <CiCirclePlus
                size={30}
                className="text-base text-yellow-300"
              />
              <form onSubmit={addItem}>
                <input
                  id="todo_input"
                  type="text"
                  placeholder="Create a new todo"
                  ref={text}
                />
              </form>
            </div>
          </div>
        </div>

        <div>
          {/* Display the todo list */}
          <ul>
            {todoList.map((todo, index) => (
              <li key={index}>{todo.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ToDoList;
