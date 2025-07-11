import React from "react";
import { Outlet } from "react-router-dom";

const HomeLayout: React.FC = () => {
  return (
    <>
      <div className=" flex flex-col bg-background h-screen relative">
        <main className="flex  overflow-hidden  ">
          <Outlet />
        </main>
      </div>
    </>
  );
};
export default HomeLayout;
