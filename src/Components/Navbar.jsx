import React, { useState } from "react";

const Navbar = () => {
  return (
    <div className=" w-screen bg-cyan-200 flex justify-between items-center pt-8 pb-4 px-80 max-2xl:px-16 max-xl:px-8 max-md:px-8">
      <div className="flex ">
        <div className=" flex items-center">
          <div className="flex">
            <p className="text-3xl ">TODO</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
