import { X } from "lucide-react";
import { useState, useEffect } from "react";
import NumberInput from "./NumberInput";
import { useTranslation } from "react-i18next";

interface PomodoroSettings {
  pomodoro: number;
  break: number;
  interval: number;
}

interface SettingModalProps {
  onClose: () => void;
  onSave: (newSettings: PomodoroSettings) => void;
  currentSettings: PomodoroSettings;
}

const SettingModal = ({
  onClose,
  onSave,
  currentSettings,
}: SettingModalProps) => {
  const { t } = useTranslation();
  const [localSettings, setLocalSettings] =
    useState<PomodoroSettings>(currentSettings);

  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const { pomodoro, break: breakTime, interval } = localSettings;
    if (pomodoro > 0 && breakTime > 0 && interval > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [localSettings]);

  const handleInputChange = (field: keyof PomodoroSettings, value: number) => {
    setLocalSettings((prev) => ({
      ...prev,
      [field]: isNaN(value) ? 0 : value,
    }));
  };

  const handleSaveClick = () => {
    if (!isValid) return;
    onSave(localSettings);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-background rounded-2xl p-6 md:ml-wsidebar text-text-primary">
        <div className="flex flex-col">
          <div className="relative flex items-center justify-center">
            <p className="font-medium text-xl">{t("page.pomo.setting")}</p>
            <X
              className="absolute top-0 right-0 h-5 w-5 cursor-pointer hover:text-primary"
              onClick={onClose}
            />
          </div>
          <div className="flex items-center gap-x-4 mt-6">
            <NumberInput
              title="Pomodoro"
              value={localSettings.pomodoro}
              onChange={(val) => handleInputChange("pomodoro", val)}
            />
            <NumberInput
              title={t("page.pomo.break")}
              value={localSettings.break}
              onChange={(val) => handleInputChange("break", val)}
            />
            <NumberInput
              title={t("page.pomo.interval")}
              value={localSettings.interval}
              onChange={(val) => handleInputChange("interval", val)}
            />
          </div>
          <div className="flex items-center justify-end mt-4">
            <button
              className="cursor-pointer bg-primary px-4 py-2 rounded-xl font-medium transition-transform hover:scale-105 hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSaveClick}
              disabled={!isValid}
            >
              {t("global.buttons.save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;
