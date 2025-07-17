import React from "react";

interface InputProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
}

const NumberInput = ({ title, value, onChange }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(e.target.value, 10);
    onChange(numValue);
  };

  return (
    <div>
      <p className="mb-2 font-medium text-text-secondary">{title}</p>
      <input
        type="number"
        value={value === 0 || isNaN(value) ? "" : value}
        onChange={handleChange}
        min="1"
        className="bg-surface-hover rounded-md py-1 px-2 w-24 md:w-32 focus:outline-1 outline-none focus:outline-primary text-text-primary"
      />
    </div>
  );
};

export default NumberInput;
