import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

const DefaultLayout: React.FC = () => {
  return (
    <>
      <div className=" flex flex-col bg-background h-screen relative">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <div className="fixed z-30 h-hsidebar bottom-0 left-0 right-0 md:flex md:h-full md:w-wsidebar md:right-auto  md:top-hheader ">
            <SideBar />
          </div>
          <main className="  pt-hheader pb-hsidebar md:pb-0 md:pl-wsidebar ">
            <div className="">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
export default DefaultLayout;
