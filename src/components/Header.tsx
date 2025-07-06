import { Globe, Moon, Palette, Sun } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const Header: React.FC = () => {
  const [isShowLanguageMenu, setIsShowLanguageMenu] = useState(false);
  const [isShowThemeMenu, setIsShowThemeMenu] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

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
    <header className=" flex w-screen bg-primary">
      <div className="flex h-hheader-sm md:h-hheader-md justify-between w-full items-center mx-4 md:mx-8">
        <div>
          <img src="/vite.svg" className="h-8" />
        </div>
        <div className="flex items-center gap-x-2 md:gap-x-4">
          <div className="relative">
            <Globe
              className="h-8 cursor-pointer text-text-primary hover:text-accent "
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
                  <div className="px-2">EN</div>
                  <div className="px-2">VI</div>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <Palette
              className="h-8 cursor-pointer text-text-primary hover:text-accent"
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
                  <div className="px-2 flex items-center">
                    <Sun className="h-6 mr-2" /> Light
                  </div>
                  <div className="px-2 flex items-center ">
                    <Moon className="h-6 mr-2" /> Dark
                  </div>
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
