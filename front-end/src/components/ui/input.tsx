import React from "react";

interface typeInput {
  label?: string;
  isRequired?: boolean;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
      {label && (
        <label className="block text-sm font-medium">
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          className="p-3 border rounded-md border-[#F2B05E] w-full"
          value={value}
          onChange={onChange}
          rows={4}
          required={isRequired}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="p-3 border rounded-md border-[#F2B05E] w-full"
          value={value}
          onChange={onChange}
          required={isRequired}
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
