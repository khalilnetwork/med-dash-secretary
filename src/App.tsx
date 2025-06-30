import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { CheckInQueue } from "./pages/CheckInQueue";
import { IntakeTasks } from "./pages/IntakeTasks";
import { CalendarView } from "./pages/CalendarView";
import { TodaysAgenda } from "./pages/TodaysAgenda";
import { PrescriptionRefills } from "./pages/PrescriptionRefills";
import { FollowUpCalls } from "./pages/FollowUpCalls";
import { LabAlerts } from "./pages/LabAlerts";
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
            <Route path="calendar" element={<CalendarView />} />
            <Route path="agenda" element={<TodaysAgenda />} />
            <Route path="check-in" element={<CheckInQueue />} />
            <Route path="intake" element={<IntakeTasks />} />
            <Route path="refills" element={<PrescriptionRefills />} />
            <Route path="callbacks" element={<FollowUpCalls />} />
            <Route path="lab-alerts" element={<LabAlerts />} />
            <Route
              path="reports"
              element={
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-foreground">
                    Reports - Coming Soon
                  </h1>
                </div>
              }
            />
            <Route
              path="settings"
              element={
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-foreground">
                    Settings - Coming Soon
                  </h1>
                </div>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
