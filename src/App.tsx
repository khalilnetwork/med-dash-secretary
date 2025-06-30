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
            {/* Pre-Visit Routes */}
            <Route path="appointments" element={<CalendarView />} />
            <Route
              path="patient-records"
              element={
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-foreground">
                    Patient Records - Building...
                  </h1>
                </div>
              }
            />
            <Route
              path="medical-history"
              element={
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-foreground">
                    Medical History - Building...
                  </h1>
                </div>
              }
            />

            {/* Visit Routes */}
            <Route path="schedule" element={<TodaysAgenda />} />
            <Route path="queue" element={<CheckInQueue />} />
            <Route
              path="new-patient"
              element={
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-foreground">
                    New Patient Form - Building...
                  </h1>
                </div>
              }
            />

            {/* Post-Visit Routes */}
            <Route path="follow-up" element={<FollowUpCalls />} />
            <Route path="medications" element={<PrescriptionRefills />} />
            <Route path="reports" element={<LabAlerts />} />

            <Route
              path="settings"
              element={
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-foreground">
                    Settings - Building...
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
