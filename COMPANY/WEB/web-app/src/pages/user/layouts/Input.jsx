import React from "react";

function Input({ label, type = "text", value, onChange, name, required = true }) {
  return (
    <div className="relative w-full mb-4">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        required={required}
        className="peer h-12 w-full text-gray-900 placeholder-transparent border border-gray-300 rounded-md px-3 pt-5 pb-2 focus:outline-none focus:ring-1 focus:ring-[#8CA566] focus:border-[#8CA566]"
      />
      <label
        htmlFor={name}
        className="absolute left-3 -top-2 bg-white px-1 text-gray-500 text-[10px] transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-[#8CA566]"
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
