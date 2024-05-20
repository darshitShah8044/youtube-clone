import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Head from "./Head";
const Body = () => {
  return (
    <div className="m-2 p-2 ">
      <Head />
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
