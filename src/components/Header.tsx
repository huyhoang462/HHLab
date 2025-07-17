import {
  AlertTriangle,
  Globe,
  LogOut,
  Moon,
  Palette,
  Sun,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const nav = useNavigate();
  const [isShowLanguageMenu, setIsShowLanguageMenu] = useState(false);
  const [isShowThemeMenu, setIsShowThemeMenu] = useState(false);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (lang: "en" | "vi") => {
    i18n.changeLanguage(lang);
    setIsShowLanguageMenu(false);
  };

  const { theme, setTheme } = useTheme();
  const handleThemeChange = (selectedTheme: "light" | "dark") => {
    setTheme(selectedTheme);
    setIsShowThemeMenu(false);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("todoState");
    localStorage.removeItem("pomodoroSettings");
    localStorage.setItem("theme", "light");

    nav("/");
    setIsLogoutModalOpen(false);
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
    <header className=" fixed top-0 left-0 right-0 z-30 border-b-[1px] border-border ">
      <div className="flex h-hheader justify-between items-center mx-4 md:mx-8">
        <div>
          <img
            src="/HL.png"
            className="h-10 cursor-pointer"
            onClick={() => nav("/")}
            alt="Logo"
          />
        </div>
        <div className="flex items-center gap-x-2 md:gap-x-4 bg-surface-hover/20 rounded-lg">
          {localStorage.getItem("user") && (
            <div className="">
              <LogOut
                className="h-8 w-8 p-1 cursor-pointer text-text-primary hover:scale-105 hover:text-primary"
                onClick={() => setIsLogoutModalOpen(true)}
              />
            </div>
          )}
          <div className="relative">
            <Globe
              className="h-8 w-8 p-1 cursor-pointer text-text-primary hover:scale-105 hover:text-primary "
              onClick={() => {
                setIsShowLanguageMenu(!isShowLanguageMenu);
              }}
            />
            {isShowLanguageMenu && (
              <div
                ref={langRef}
                className="absolute top-10 right-0 z-40 w-32 bg-surface rounded-md p-2 shadow-lg border border-border"
              >
                <div className="font-medium flex flex-col gap-y-2">
                  <button
                    onClick={() => handleChangeLanguage("en")}
                    className={`px-2 py-1 text-left cursor-pointer hover:bg-primary/10 rounded-md ${
                      i18n.language === "en"
                        ? "text-primary font-semibold"
                        : "text-text-primary"
                    }`}
                  >
                    {t("global.header.languages.en")}
                  </button>
                  <button
                    onClick={() => handleChangeLanguage("vi")}
                    className={`px-2 py-1 text-left cursor-pointer hover:bg-primary/10 rounded-md ${
                      i18n.language === "vi"
                        ? "text-primary font-semibold"
                        : "text-text-primary"
                    }`}
                  >
                    {t("global.header.languages.vi")}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <Palette
              className="h-8 w-8 p-1 cursor-pointer text-text-primary hover:scale-105 hover:text-primary"
              onClick={() => {
                setIsShowThemeMenu(!isShowThemeMenu);
              }}
            />
            {isShowThemeMenu && (
              <div
                ref={themeRef}
                className="absolute top-10 right-0 z-40 bg-surface rounded-md p-2 shadow-lg w-36 border border-border"
              >
                <div className="font-medium flex flex-col gap-y-2">
                  <button
                    onClick={() => handleThemeChange("light")}
                    className={`flex cursor-pointer items-center rounded-md px-2 py-1 hover:bg-primary/10 ${
                      theme === "light"
                        ? "text-primary font-semibold"
                        : "text-text-primary"
                    }`}
                  >
                    <Sun className="mr-2 h-5 w-5" /> Light
                  </button>
                  <button
                    onClick={() => handleThemeChange("dark")}
                    className={`flex cursor-pointer items-center rounded-md px-2 py-1 hover:bg-primary/10 ${
                      theme === "dark"
                        ? "text-primary font-semibold"
                        : "text-text-primary"
                    }`}
                  >
                    <Moon className="mr-2 h-5 w-5" /> Dark
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-sm">
            <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                {t("global.header.log_out")}
              </h3>
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Đóng"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>

              <div>
                <p className="font-medium text-slate-700 dark:text-slate-300">
                  {t("global.header.log_out_description")}
                </p>
              </div>
            </div>

            <div className="px-6 pb-4 pt-2 flex justify-end gap-x-3">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 rounded-lg font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {t("global.buttons.cancel")}
              </button>

              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span> {t("global.header.log_out")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
