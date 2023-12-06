import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Navbar from "../Components/Navbar";
import ToDoList from "../Components/ToDoList";

import { getFirestore, collection, getDocs } from "firebase/firestore";

import { firebaseConfig } from "../Script";

function Home() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
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
  }, [db]);

  return (
    <>
      <Navbar />
      <ToDoList />
    </>
  );
}

export default Home;
