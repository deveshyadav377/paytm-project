export function InputBox({ label, placeholder, onChange, type = "text" }) {
  return (
    <div className="flex flex-col space-y-1 mb-4">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
      />
    </div>
  );
}
