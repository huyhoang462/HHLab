import { Hamburger, House, ListTodo } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
const SideBar: React.FC = () => {
  type NavItem = {
    path: string;
    name: string;
    icon: React.ReactElement;
  };
  const iconClass: string = "h-5 md:h-6 ";
  const navItems: NavItem[] = [
    {
      path: "/",
      name: "Home",
      icon: <House className={iconClass} />,
    },
    {
      path: "/todo",
      name: "Todo",
      icon: <ListTodo className={iconClass} />,
    },
    {
      path: "/pomodoro",
      name: "Pomo",
      icon: <Hamburger className={iconClass} />,
    },
  ];
  return (
    <aside className="flex justify-around border-t-1 border-border items-center h-full w-full md:flex-col md:gap-y-8 md:pt-10 md:justify-start md:items-center">
      {navItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.path}
          className={({
            isActive,
          }) => `flex flex-col items-center rounded-lg w-14 h-14 md:w-20 md:h-20 justify-center hover:bg-surface-hover
            ${
              isActive
                ? " text-text-primary font-medium  bg-surface-hover "
                : "text-text-secondary"
            }`}
        >
          {item.icon}
          {item.name}
        </NavLink>
      ))}
    </aside>
  );
};
export default SideBar;
