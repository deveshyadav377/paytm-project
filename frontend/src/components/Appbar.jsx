
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState("User");
  const [firstLetter, setFirstLetter] = useState("U");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const firstName = decoded.firstName || "";
      const lastName = decoded.lastName || "";

      const fullName = `${firstName} ${lastName}`.trim();
      setUserName(fullName);
      setFirstLetter(firstName.charAt(0).toUpperCase() || "U");
    } catch (e) {
      console.error("❌ Invalid token:", e.message);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="shadow-md h-16 bg-white px-6 flex items-center justify-between relative">
      <div className="text-2xl font-extrabold text-indigo-600 tracking-wide">
        PayMate
      </div>

      <div className="flex items-center space-x-4 relative">
        <div className="text-gray-600 text-sm hidden sm:block">
          Hello, <span className="font-medium">{userName}</span>
        </div>

        <div
          className="rounded-full h-11 w-11 bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center shadow hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          {firstLetter}
        </div>

        {showMenu && (
          <div className="absolute top-14 right-0 bg-white border rounded-md shadow-lg z-50 w-40">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              {userName}
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
