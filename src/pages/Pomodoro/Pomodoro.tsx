import { Minus, Plus, Settings } from "lucide-react";
import React from "react";

const Pomodoro: React.FC = () => {
  return (
    <div className="fixed top-hheader right-0 left-0 bottom-hsidebar flex flex-col md:left-wsidebar md:bottom-0 text-text-primary ">
      <div className="flex-1 flex flex-col items-center justify-center ">
        <div className="flex flex-col">
          <div className="bg-primary/30 rounded-2xl  mt-[-160px] flex flex-col shadow-2xl py-6 px-20 relative">
            <div className="absolute top-6 right-6">
              <Settings className="h-6  rotate-0 hover:rotate-90  hover:text-accent cursor-pointer " />
            </div>
            <div className="grid grid-cols-2 mx-10 mb-6">
              <button className="flex cursor-pointer items-center justify-center hover:text-accent bg-primary/50 px-3 rounded-lg">
                <p className="text-lg font-medium">Pomodoro</p>
              </button>
              <button className="flex cursor-pointer items-center justify-center hover:text-accent ">
                <p className="text-lg font-medium">Break</p>
              </button>
            </div>
            <div className="">
              <p className="text-9xl font-medium">25:00</p>
            </div>
            <div className="flex items-center justify-between mt-8">
              <button className=" cursor-pointer font-medium rounded-full p-1 hover:scale-110 hover:text-accent ">
                <Minus className="h-6 hover:scale-110" />
              </button>
              <button className="text-2xl bg-primary/50 py-4 px-6  cursor-pointer font-medium hover:scale-105 hover:text-accent  rounded-lg">
                START
              </button>
              <button className=" cursor-pointer font-medium rounded-full p-1 hover:scale-110 hover:text-accent ">
                <Plus className="h-6 hover:scale-110" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
