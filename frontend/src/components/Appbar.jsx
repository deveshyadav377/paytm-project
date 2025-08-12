import { jwtDecode } from "jwt-decode";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bell, X, User as UserIcon, LogOut } from "lucide-react";

export const Appbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [userName, setUserName] = useState("User");
  const [firstLetter, setFirstLetter] = useState("U");

  const navigate = useNavigate();
  const menuRef = useRef(null);
  const notifRef = useRef(null);

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (menuRef.current && !menuRef.current.contains(event.target)) &&
        (notifRef.current && !notifRef.current.contains(event.target))
      ) {
        setShowMenu(false);
        setShowNotification(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="shadow-lg h-16 px-6 flex items-center justify-between relative bg-blue-600">
      {/* Logo */}
      <Link
        to="/dashboard"
        className="text-2xl font-bold text-white tracking-wide cursor-pointer hover:opacity-90 transition-opacity"
      >
        PayMate
      </Link>

      {/* Right Section */}
      <div className="flex items-center space-x-4 relative">
        {/* Notification Bell */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => {
              setShowNotification(!showNotification);
              setShowMenu(false);
            }}
            className="text-white hover:bg-blue-500 p-2 rounded-full transition-colors"
          >
            <Bell className="h-6 w-6" />
          </button>

          {/* Notification Dropdown */}
          {showNotification && (
            <div className="absolute top-12 right-0 bg-white shadow-xl border rounded-lg w-60 animate-fadeIn p-4 z-50">
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                <X
                  className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => setShowNotification(false)}
                />
              </div>
              <p className="text-sm text-gray-500 text-center">No new notifications</p>
            </div>
          )}
        </div>

        {/* Greeting */}
        <div className="text-white text-sm hidden sm:block">
          Hello, <span className="font-semibold">{userName}</span>
        </div>

        {/* Avatar */}
        <div ref={menuRef} className="relative">
          <div
            className="rounded-full h-11 w-11 bg-white text-blue-600 font-semibold flex items-center justify-center shadow-lg border-2 border-white hover:scale-105 transition-transform cursor-pointer"
            onClick={() => {
              setShowMenu(!showMenu);
              setShowNotification(false);
            }}
          >
            {firstLetter}
          </div>

          {/* Modern User Dropdown */}
          {showMenu && (
            <div className="absolute top-14 right-0 bg-white border rounded-xl shadow-xl w-56 animate-fadeIn overflow-hidden z-50">
              {/* Profile Preview */}
              <div className="p-4 bg-blue-50 flex items-center gap-3 border-b">
                <div className="rounded-full h-10 w-10 bg-blue-600 text-white flex items-center justify-center font-semibold">
                  {firstLetter}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-500">Member</p>
                </div>
              </div>

              {/* Menu Items */}
              <button
                onClick={() => navigate("/dashboard/profile")}
                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 transition-colors w-full"
              >
                <UserIcon className="h-4 w-4 text-gray-500" /> Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
