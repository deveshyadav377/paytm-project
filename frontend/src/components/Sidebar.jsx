// components/Sidebar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  CreditCard,
  Gift,
  Users
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640); // sm breakpoint
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Transactions", path: "/dashboard/transactions", icon: <CreditCard size={20} /> },
    { name: "Rewards", path: "/dashboard/rewards", icon: <Gift size={20} /> },
    { name: "Users", path: "/dashboard/users", icon: <Users size={20} /> },
  ];

  // Detect screen size to control collapse mode
  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 640;
      setIsDesktop(isNowDesktop);
      if (!isNowDesktop) {
        setIsOpen(false); // Mobile starts closed
      } else {
        setIsOpen(true); // Desktop starts expanded
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile top bar toggle button */}
      {!isDesktop && (
        <div className="sm:hidden p-4">
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-700 focus:outline-none"
          >
            <Menu size={28} />
          </button>
        </div>
      )}

      {/* Backdrop for mobile */}
      {!isDesktop && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${isDesktop ? (isOpen ? "w-64" : "w-20") : "w-64"}
          bg-white shadow-lg h-full sm:h-screen
          ${isDesktop ? "relative" : "fixed top-0 left-0 z-20"}
          transition-all duration-300 overflow-hidden
          ${!isDesktop ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {isOpen && <span className="font-bold text-xl text-blue-600">Dashboard</span>}
          {isDesktop && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden sm:block text-gray-700 hover:bg-gray-100 rounded p-1"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          {!isDesktop && (
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:bg-gray-100 rounded p-1"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-3 p-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  onClick={() => !isDesktop && setIsOpen(false)} // Close on mobile click
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 relative
                    ${isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-blue-100 hover:shadow"}`}
                >
                  {/* Slim vertical line indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-700 rounded-r"></span>
                  )}
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isOpen && (isDesktop || !isDesktop) && <span className="font-medium">{item.name}</span>}
                </Link>

                {/* Tooltip when collapsed on desktop */}
                {isDesktop && !isOpen && (
                  <span
                    className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                  >
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
