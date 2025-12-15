class Tools {
  static Input = ({ type, placeholder, value, onChange }) => {
    return (
      <div className="relative w-full mb-6">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="peer h-12 w-full text-[14px] border border-gray-300 rounded-md px-3 pt-5 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#8CA566] focus:border-[#8CA566]"
          required
        />
        <label className="absolute left-3 -top-2 bg-white px-1 text-gray-500 text-[10px]">
          {placeholder}
        </label>
      </div>
    );
  };
}

export default Tools;
