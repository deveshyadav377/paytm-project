
export function Button({ label, onClick, loading = false, loadingLabel = "Loading...", disabled = false }) {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled || loading}
      className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transition
        ${disabled || loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300"}
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          {loadingLabel}
        </div>
      ) : (
        label
      )}
    </button>
  );
}
