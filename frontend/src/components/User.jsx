import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [allUsers, setAllUsers] = useState([]); // store full list from backend
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [filter]);

  // Fetch all users on filter change (debounced)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [filter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://paytm-backend-p8ix.onrender.com/api/v1/user/bulk?filter=${filter}`
      );
      setAllUsers(response.data.users || []);
      setError("");
    } catch (err) {
      setError("Failed to load users");
      console.error(err);
      setAllUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate pagination slices
  const totalPages = Math.ceil(allUsers.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const usersToShow = allUsers.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Send Money to Other Users
      </h2>

      <input
        onChange={(e) => setFilter(e.target.value)}
        type="search"
        placeholder="Search users..."
        className="
          w-full
          px-4 py-3
          border
          border-gray-300
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:border-indigo-500
          mb-6
          text-gray-700
          placeholder-gray-400
          transition
          shadow-sm
        "
      />

      {loading && (
        <div className="text-center text-gray-500 py-10">
          <svg
            className="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Loading users...
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 font-semibold mb-4">{error}</div>
      )}

      {!loading && usersToShow.length === 0 && (
        <div className="text-center text-gray-500 font-medium py-10">
          No users found
        </div>
      )}

      <div className="space-y-4">
        {usersToShow.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>

      {/* Pagination Controls */}
      {!loading && usersToShow.length > 0 && (
        <div className="flex justify-center items-center space-x-6 mt-8 select-none">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`
              px-4 py-2 rounded-md font-semibold
              ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"}
              transition
            `}
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className={`
              px-4 py-2 rounded-md font-semibold
              ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"}
              transition
            `}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  if (!user) return null;

  const initials = user.firstName ? user.firstName[0].toUpperCase() : "U";

  return (
    <div
      className="
        flex items-center justify-between
        bg-white
        rounded-xl
        shadow-lg
        border
        border-gray-200
        px-6 py-4
        hover:shadow-xl
        transition-shadow
        cursor-pointer
      "
      onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          navigate(`/send?id=${user._id}&name=${user.firstName}`);
        }
      }}
    >
      <div className="flex items-center space-x-4">
        <div
          className="
            rounded-full
            h-14 w-14
            bg-gradient-to-br from-indigo-400 to-purple-600
            text-white
            font-bold
            flex items-center justify-center
            text-xl
            select-none
            shadow-md
          "
        >
          {initials}
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-500">{user.email || "No email"}</p>
        </div>
      </div>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/send?id=${user._id}&name=${user.firstName}`);
        }}
        label="Send Money"
        className="px-5 py-2 text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition"
      />
    </div>
  );
}
