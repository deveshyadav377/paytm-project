// pages/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/footer";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Top Navigation */}
      <Appbar />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 max-w-5xl mx-auto w-full">
          <Outlet /> {/* Nested content renders here */}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
