import React, { useState } from "react";

import backgroundPhoto from "../assets/backgroundPhoto.jpg";

export default function AuthUi({
  email,
  setEmail,
  password,
  setPassword,
  error,
  handleSignin,
  handleSignup,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="flex">
      <div className="w-1/5 bg-neutral-800 h-screen flex justify-center items-center px-16">
        <div className="flex justify-center items-center gap-8 ">
          <div className=" flex flex-col gap-3 text-[2rem] max-sm:text-[1.7rem] font-bold">
            <p
              className={`hover:text-[#6b66da]  cursor-pointer duration-200 ease-in-out ${
                currentSlide === 0 ? "text-indigo-800" : "text-neutral-400"
              }`}
              onClick={() => {
                setCurrentSlide(0);
              }}
            >
              Sign Up
            </p>
            <p
              className={`hover:text-[#6b66da] cursor-pointer duration-200 ease-in-out ${
                currentSlide === 1 ? "text-indigo-800" : "text-neutral-400"
              }`}
              onClick={() => {
                setCurrentSlide(1);
              }}
            >
              Sign In
            </p>
          </div>
        </div>
      </div>
      <div
        className="w-4/5 bg-cover bg-center flex items-center justify-center px-8"
        style={{ backgroundImage: `url(${backgroundPhoto})` }}
      >
        <div className={`w-screen rounded-2xl overflow-hidden`}>
          {currentSlide === 0 && (
            <div>
              <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-8">
                <p className="text-indigo-800 text-[2.2rem] max-sm:text-[1.7rem] font-bold mb-7">
                  Create your Account
                </p>
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
                  className="mt-7 bg-neutral-500 hover:bg-neutral-700 text-white py-2 px-4 rounded"
                >
                  Sign Up
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
            </div>
          )}
          {currentSlide === 1 && (
            <div>
              <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-8">
                <p className="text-indigo-800 text-[2.2rem] max-sm:text-[1.7rem] font-bold mb-7">
                  Log Into your Account
                </p>
                <div className="space-y-6 w-[30%]">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    autoComplete="Email"
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
                  className="mt-7 bg-neutral-500 hover:bg-neutral-700 text-white py-2 px-4 rounded"
                >
                  Sign In
                </button>

                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
