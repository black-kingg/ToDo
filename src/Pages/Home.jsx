import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Navbar from "../Components/Navbar";
import ToDoList from "../Components/ToDoList";

import { firebaseConfig } from "../Script";

function Home() {
  const app = initializeApp(firebaseConfig);
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        fetchData(user.uid);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [app]);

  return (
    <>
      <Navbar />
      <ToDoList />
    </>
  );
}

export default Home;
