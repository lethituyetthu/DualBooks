import React from "react";

interface typeInput {
  label?: string; // Add label as a required prop
  isRequired?: boolean; // Make isRequired optional
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField: React.FC<typeInput> = ({
  label,
  isRequired = false, 
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="p-3 border rounded-md border-[#F2B05E] w-full"
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;