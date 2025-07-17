// src/pages/Pomodoro.tsx
import { Minus, Plus, Settings } from "lucide-react";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import SettingModal from "./partials/SettingModal";
import { useTranslation } from "react-i18next";

interface PomodoroSettings {
  pomodoro: number;
  break: number;
  interval: number;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const Pomodoro: React.FC = () => {
  const [settings, setSettings] = useState<PomodoroSettings>(() => {
    const savedSettings = localStorage.getItem("pomodoroSettings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : { pomodoro: 25, break: 5, interval: 4 };
  });
  const { t } = useTranslation();

  const [mode, setMode] = useState<"pomodoro" | "break">("pomodoro");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.pomodoro * 60);
  const [isShowModal, setIsShowModal] = useState(false);

  const [currentCycle, setCurrentCycle] = useState(1);

  useEffect(() => {
    let timer: number;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      const nextMode = mode === "pomodoro" ? "break" : "pomodoro";
      const nextTime =
        (nextMode === "pomodoro" ? settings.pomodoro : settings.break) * 60;

      if (nextMode === "pomodoro") {
        if (currentCycle >= settings.interval) {
          setCurrentCycle(1);
        } else {
          setCurrentCycle((prev) => prev + 1);
        }
      }

      setMode(nextMode);
      setTimeLeft(nextTime);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, settings, currentCycle]);

  const handleToggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const handleModeChange = useCallback(
    (newMode: "pomodoro" | "break") => {
      setIsRunning(false);
      setMode(newMode);
      setTimeLeft(settings[newMode] * 60);
    },
    [settings]
  );

  const handleSaveSettings = (newSettings: PomodoroSettings) => {
    setSettings(newSettings);
    localStorage.setItem("pomodoroSettings", JSON.stringify(newSettings));
    setIsShowModal(false);
    if (!isRunning) {
      setTimeLeft(newSettings[mode] * 60);
      setCurrentCycle(1);
    }
  };

  const adjustTime = (amount: number) => {
    if (isRunning) return;
    setTimeLeft((prev) => Math.max(60, prev + amount * 60));
  };

  const containerBgClass = useMemo(() => {
    return mode === "pomodoro" ? "bg-primary/30" : "bg-accent/30";
  }, [mode]);

  return (
    <div className="fixed top-hheader right-0 left-0 bottom-hsidebar flex flex-col md:left-wsidebar md:bottom-0 text-text-primary">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          {" "}
          <div
            className={`transition-colors duration-500 ${containerBgClass} rounded-2xl mt-[-160px] flex flex-col py-6 px-10 sm:px-20 relative`}
          >
            <div className="absolute top-6 right-6">
              <Settings
                className="h-6 w-6 transition-transform duration-300 hover:rotate-90 hover:text-accent cursor-pointer"
                onClick={() => setIsShowModal(true)}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4 sm:mx-10 mb-6">
              <button
                className={`flex cursor-pointer items-center justify-center px-3 py-1 rounded-lg transition-colors ${
                  mode === "pomodoro" ? "bg-primary/50" : "hover:text-accent"
                }`}
                onClick={() => handleModeChange("pomodoro")}
              >
                <p className="text-lg font-medium">Pomodoro</p>
              </button>
              <button
                className={`flex cursor-pointer items-center justify-center px-3 py-1 rounded-lg transition-colors ${
                  mode === "break" ? "bg-primary/50" : "hover:text-accent"
                }`}
                onClick={() => handleModeChange("break")}
              >
                <p className="text-lg font-medium">{t("page.pomo.break")}</p>
              </button>
            </div>
            <div className="text-center">
              <p className="text-8xl sm:text-9xl font-medium">
                {formatTime(timeLeft)}
              </p>
            </div>
            <div className="flex items-center justify-between mt-8">
              <button
                className="cursor-pointer font-medium rounded-full p-1 transition-transform hover:scale-110 hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => adjustTime(-1)}
                disabled={isRunning}
              >
                <Minus className="h-6 w-6" />
              </button>
              <button
                className="text-2xl bg-primary/50 py-4 px-6 cursor-pointer font-medium transition-transform hover:scale-105 hover:text-accent rounded-lg"
                onClick={handleToggleTimer}
              >
                {isRunning
                  ? t("global.buttons.pause")
                  : t("global.buttons.start")}
              </button>
              <button
                className="cursor-pointer font-medium rounded-full p-1 transition-transform hover:scale-110 hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => adjustTime(1)}
                disabled={isRunning}
              >
                <Plus className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="mt-4 text-lg font-medium text-text-secondary">
            {t("page.pomo.round")}: {currentCycle} / {settings.interval}
          </div>
        </div>
      </div>
      {isShowModal && (
        <SettingModal
          onClose={() => setIsShowModal(false)}
          onSave={handleSaveSettings}
          currentSettings={settings}
        />
      )}
    </div>
  );
};

export default Pomodoro;
