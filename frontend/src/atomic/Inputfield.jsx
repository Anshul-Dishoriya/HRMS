export const InputField = ({
  label,
  value,
  onChange,
  error,
  type = "text",
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>

    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-white text-black w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
        error
          ? "border-red-400 focus:ring-red-400"
          : "border-gray-200 focus:ring-indigo-500"
      }`}
    />

    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);
