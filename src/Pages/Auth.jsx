import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { firebaseConfig } from "../Script";

import { useNavigate } from "react-router-dom";
import AuthUi from "../Components/AuthUi";

const app = initializeApp(firebaseConfig);

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to the todo list page after successful signin
      navigate("/todo");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignup = async () => {
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to the todo list page after successful signup

      navigate("/todo");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthUi
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      handleSignin={handleSignin}
      handleSignup={handleSignup}
    />
  );
}

export default AuthPage;
