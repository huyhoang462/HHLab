import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
const Home: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [name, setName] = useState("");
  const { t } = useTranslation();
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const formattedTime = useMemo(() => {
    return time.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [time]);
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleContinue = () => {
    if (name) {
      localStorage.setItem("user", name);
    }
  };
  const greetText: string =
    time.getHours() >= 18 || time.getHours() < 5
      ? t("page.home.evening")
      : time.getHours() >= 12
      ? t("page.home.afternoon")
      : t("page.home.morning");
  return (
    <div className="flex h-full w-full">
      <img
        className="fixed top-0 left-0 z-10 h-full w-full object-cover"
        src="/img2.jpg"
      />
      <div className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center ">
        {localStorage.getItem("user") ? (
          <div className="flex flex-col items-center mt-[-64px] justify-center text-white">
            <p className="text-9xl font-bold ">{formattedTime}</p>
            <p className="text-6xl text-center font-medium mt-4">
              {greetText}, {localStorage.getItem("user")}
            </p>
          </div>
        ) : (
          <div className="flex flex-col mt-[-64px] items-center justify-center text-white">
            <p className="text-6xl  text-center font-medium">
              {t("page.home.hello")}
            </p>
            <input
              className="  w-full border-0  outline-0 my-6 line-clamp-1 text-5xl border-b-2 text-center"
              type="text"
              spellCheck="false"
              autoFocus={true}
              value={name}
              onChange={handleChangeName}
              onKeyDown={(e) =>
                e.key === "Enter" && name.trim() && handleContinue()
              }
            />
            <button
              className=" cursor-pointer rounded-full px-8 flex items-center  justify-center py-3 text-3xl border-2  border-white hover:bg-surface/10 transition-colors"
              onClick={handleContinue}
            >
              {t("page.home.continue")}
            </button>
          </div>
        )}
        <div className=""></div>
      </div>
    </div>
  );
};

export default Home;
