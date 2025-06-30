
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { CheckInQueue } from "./pages/CheckInQueue";
import { IntakeTasks } from "./pages/IntakeTasks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="calendar" element={<div className="p-8"><h1 className="text-2xl font-bold text-white">Calendar View - Coming Soon</h1></div>} />
            <Route path="agenda" element={<div className="p-8"><h1 className="text-2xl font-bold text-white">Today's Agenda - Coming Soon</h1></div>} />
            <Route path="check-in" element={<CheckInQueue />} />
            <Route path="intake" element={<IntakeTasks />} />
            <Route path="refills" element={<div className="p-8"><h1 className="text-2xl font-bold text-white">Prescription Refills - Coming Soon</h1></div>} />
            <Route path="callbacks" element={<div className="p-8"><h1 className="text-2xl font-bold text-white">Follow-Up Calls - Coming Soon</h1></div>} />
            <Route path="lab-alerts" element={<div className="p-8"><h1 className="text-2xl font-bold text-white">Lab Alerts - Coming Soon</h1></div>} />
            <Route path="reports" element={<div className="p-8"><h1 className="text-2xl font-bold text-white">Reports - Coming Soon</h1></div>} />
            <Route path="settings" element={<div className="p-8"><h1 className="text-2xl font-bold text-white">Settings - Coming Soon</h1></div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
