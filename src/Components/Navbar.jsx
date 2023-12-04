import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
const Menu = () => {
  return (
    <div className=" bg-white w-max font-semibold py-4 text-normal md:text-xl flex justify-center flex-col rounded-2xl absolute top-16 right-1 z-50 shadow-md">
      <p className=" py-2 px-8">
        <a href="#">Home</a>
      </p>
      <p className="hidden max-sm:flex py-2 px-8">
        <a href="">Collaboration</a>
      </p>
      <p className="hidden max-sm:flex py-2 px-8">
        <a href="">New Arrivals</a>
      </p>
      <p className=" py-2 px-8">
        <a href="">Help</a>
      </p>
      <p className=" py-2 px-8 text-orange-600">
        <a href="">Log in</a>
      </p>
    </div>
  );
};
const Navbar = () => {
  return (
    <div className=" w-screen bg-cyan-200 flex justify-between items-center pt-8 pb-4 px-80 max-2xl:px-16 max-xl:px-8 max-md:px-8">
      <div className="flex ">
        <div className=" flex items-center gap-8">
          <div className="flex">
            <p className="text-3xl ">TODO</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
