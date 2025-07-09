import { Globe, Moon, Palette, Sun } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../hooks/useTheme";

const Header: React.FC = () => {
  const [isShowLanguageMenu, setIsShowLanguageMenu] = useState(false);
  const [isShowThemeMenu, setIsShowThemeMenu] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  const { theme, setTheme } = useTheme();
  const handleThemeChange = (selectedTheme: "light" | "dark") => {
    setTheme(selectedTheme);
    setIsShowThemeMenu(false);
  };

  useEffect(() => {
    const handleClickOutsite = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsShowLanguageMenu(false);
      }
      if (
        themeRef.current &&
        !themeRef.current.contains(event.target as Node)
      ) {
        setIsShowThemeMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsite);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsite);
    };
  }, []);
  return (
    <header className=" fixed top-0 left-0 right-0  border-b-1 border-border">
      <div className="flex h-hheader justify-between  items-center mx-4 md:mx-8">
        <div>
          <img src="/HL.png" className="h-10" />
        </div>
        <div className="flex items-center gap-x-2 md:gap-x-4">
          <div className="relative">
            <Globe
              className="h-8 cursor-pointer text-text-primary hover:text-primary "
              onClick={() => {
                setIsShowLanguageMenu(!isShowLanguageMenu);
              }}
            />
            {isShowLanguageMenu && (
              <div
                ref={langRef}
                className="absolute top-8 right-0  bg-background rounded-sm p-2 shadow-sm"
              >
                <div className="font-medium flex flex-col gap-y-2">
                  <button className="px-2 cursor-pointer">EN</button>
                  <button className="px-2 cursor-pointer">VI</button>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <Palette
              className="h-8 cursor-pointer text-text-primary hover:text-primary"
              onClick={() => {
                setIsShowThemeMenu(!isShowThemeMenu);
              }}
            />
            {isShowThemeMenu && (
              <div
                ref={themeRef}
                className="absolute top-8 right-0  bg-background rounded-sm p-2 shadow-sm"
              >
                <div className="font-medium flex flex-col gap-y-2">
                  <button
                    onClick={() => handleThemeChange("light")}
                    className={`flex cursor-pointer items-center rounded-md px-2 py-1 hover:bg-primary/10 ${
                      theme === "light" ? "text-primary" : "text-text-primary"
                    }`}
                  >
                    <Sun className="mr-2 h-6" /> Light
                  </button>
                  <button
                    onClick={() => handleThemeChange("dark")}
                    className={`flex cursor-pointer items-center rounded-md px-2 py-1 hover:bg-primary/10 ${
                      theme === "dark" ? "text-primary" : "text-text-primary"
                    }`}
                  >
                    <Moon className="mr-2 h-6" /> Dark
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
