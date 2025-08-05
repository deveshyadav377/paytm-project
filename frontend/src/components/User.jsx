import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Debounce search input
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
      setUsers(response.data.user || []);
      setError("");
    } catch (err) {
      setError("Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="font-bold text-lg mb-2">Send Money to Other Users</h2>

      <input
        onChange={(e) => setFilter(e.target.value)}
        type="text"
        placeholder="Search users..."
        className="w-full px-3 py-2 border rounded border-slate-300 mb-4"
      />

      {loading && <div className="text-gray-500">Loading users...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && users.length === 0 && (
        <div className="text-gray-500">No users found</div>
      )}

      <div className="space-y-3">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  if (!user) return null;

  const initials = user.firstName ? user.firstName[0] : "U";

  return (
    <div className="flex items-center justify-between bg-white shadow-sm border rounded-lg px-4 py-3 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-lg mr-4">
          {initials}
        </div>
        <div className="text-sm font-medium text-gray-700">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <Button
        onClick={() => {
          navigate(`/send?id=${user._id}&name=${user.firstName}`);
        }}
        label={"Send Money"}
      />
    </div>
  );
}
