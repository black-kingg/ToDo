import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { firebaseConfig } from "../Script";

import { useNavigate } from "react-router-dom";

const app = initializeApp(firebaseConfig);

const Signup = ({ setIsHidden }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to the todo list page after successful signup
      setIsHidden(false);
      navigate("/todo");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="absolute z-50 w-screen h-screen bg-white flex flex-col justify-center items-center">
      <div className="space-y-6 w-[30%]">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>

      <button
        onClick={handleSignup}
        className="mt-2 bg-pink-500 text-white py-2 px-4 rounded"
      >
        Sign Up
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

function AuthPage({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isHidden, setIsHidden] = useState(false);

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

  return (
    <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="space-y-6 w-[30%]">
        <input
          type="email"
          placeholder="Email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>

      <button
        onClick={handleSignin}
        className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
      >
        Sign In
      </button>

      <p>
        Don't have an account? Sign up{" "}
        <button
          className="mt-2 bg-slate-500 text-white py-2 px-4 rounded"
          onClick={() => {
            setIsHidden(!isHidden);
          }}
        >
          {" "}
          Sign Up
        </button>
      </p>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {isHidden && <Signup setIsHidden={setIsHidden} />}
    </div>
  );
}

export default AuthPage;
