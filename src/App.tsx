import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "@/components/Login";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";
import ComplaintsTable from "@/components/Dashboard/ComplaintsTable";
import AssignWork from "@/components/Dashboard/AssignWork";
import HeatmapAnalytics from "@/components/Dashboard/HeatmapAnalytics";
import SensorHealth from "@/components/Dashboard/SensorHealth";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
    setAdminName(username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminName("");
    setActiveSection("dashboard");
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "complaints":
        return <ComplaintsTable />;
      case "assign-work":
        return <AssignWork />;
      case "heatmap":
        return <HeatmapAnalytics />;
      case "sensors":
        return <SensorHealth />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!isAuthenticated ? (
          <Login onLogin={handleLogin} />
        ) : (
          <DashboardLayout
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            onLogout={handleLogout}
            adminName={adminName}
          >
            {renderActiveSection()}
          </DashboardLayout>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
