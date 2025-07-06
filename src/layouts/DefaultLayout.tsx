import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

const DefaultLayout: React.FC = () => {
  return (
    <>
      <div className="w-screen h-screen fixed">
        <div className="bg-background h-full">
          <Header />
          <div>
            <SideBar />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default DefaultLayout;
