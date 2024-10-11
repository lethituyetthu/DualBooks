import React from 'react'


interface typeInput {
    type: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const InputField: React.FC<typeInput>=({
    type,
    name,
    placeholder,
    value,
    onChange,
    error,
})=>{
    return (
        <div className="mb-4">
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
}
export default InputField