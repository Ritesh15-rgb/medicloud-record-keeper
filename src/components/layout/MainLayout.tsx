
import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Get the current route to set the page title
  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("dashboard")) return "Dashboard";
    if (path.includes("upload")) return "Upload Record";
    if (path.includes("patients")) return "Patients";
    if (path.includes("appointments")) return "Appointments";
    if (path.includes("profile")) return "Profile";
    if (path.includes("settings")) return "Settings";
    if (path.includes("record")) return "Record Details";
    return "MediVault";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title={getTitle()} 
        showSearch={location.pathname.includes("dashboard")}
      />
      <div className="flex flex-1 w-full">
        <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
