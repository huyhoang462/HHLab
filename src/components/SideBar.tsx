import { Hamburger, House, ListTodo } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
const SideBar: React.FC = () => {
  type NavItem = {
    path: string;
    nameKey: string;
    icon: React.ReactElement;
  };
  const iconClass: string = "h-6 ";
  const { t } = useTranslation();
  const navItems: NavItem[] = [
    {
      path: "/",
      nameKey: "global.nav.home",
      icon: <House className={iconClass} />,
    },
    {
      path: "/todo",
      nameKey: "global.nav.todo",
      icon: <ListTodo className={iconClass} />,
    },
    {
      path: "/pomodoro",
      nameKey: "global.nav.pomodoro",
      icon: <Hamburger className={iconClass} />,
    },
  ];
  return (
    <aside className="flex justify-around border-t-1  border-border md:border-0 items-center h-full w-full md:flex-col md:gap-y-8 md:pt-10 md:justify-start md:items-center">
      {navItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.path}
          title={t(item.nameKey)}
          className={({
            isActive,
          }) => `flex flex-col items-center rounded-lg whitespace-nowrap w-14 h-14 md:w-20 md:h-20 justify-center hover:text-text-primary hover:scale-105
            ${
              isActive
                ? " text-text-primary font- scale-105 -translate-y-0.5 "
                : "text-text-secondary"
            } `}
        >
          {item.icon}
          <span className="hidden md:flex">{t(item.nameKey)}</span>
        </NavLink>
      ))}
    </aside>
  );
};
export default SideBar;
