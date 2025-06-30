import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  FileText,
  AlertTriangle,
  Plus,
  MessageSquare,
  Bell,
  Heart,
  Activity,
  Phone,
  Clock,
  CheckCircle,
} from "lucide-react";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey((prev) => prev + 1);
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Secretary workflow functions
  const scheduleAppointment = () => {
    alert(
      "📅 Opening appointment scheduler...\n\n1. Select patient\n2. Choose time slot\n3. Confirm booking\n\nFeature ready for integration!",
    );
  };

  const sendIntakeForm = () => {
    alert(
      "📋 Sending intake form to patient...\n\n✅ Form sent via email/SMS\n⏰ Reminder set for follow-up\n\nPatient will receive form link shortly!",
    );
  };

  const sendReminders = () => {
    const count = checkInQueue.length;
    alert(
      `📱 Sending appointment reminders...\n\n✅ ${count} patients will receive:\n• Text message reminder\n• Email confirmation\n• Call 1 hour before\n\nReminders scheduled!`,
    );
  };

  const metrics = [
    {
      title: "Today's Appointments",
      value: "28",
      action: "View Schedule",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100/80",
      message: "Click to see today's schedule",
      onClick: () => navigate("/calendar"),
    },
    {
      title: "Forms to Send",
      value: "7",
      action: "Send Forms",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-100/80",
      message: "Patients need intake forms",
      onClick: () => navigate("/intake"),
    },
    {
      title: "Prescription Requests",
      value: "12",
      action: "Review Refills",
      icon: Heart,
      color: "text-green-600",
      bgColor: "bg-green-100/80",
      message: "Medications need approval",
      onClick: () => navigate("/refills"),
    },
    {
      title: "Urgent Lab Results",
      value: "3",
      action: "Check Alerts",
      icon: Activity,
      color: "text-red-600",
      bgColor: "bg-red-100/80",
      message: "Doctor needs to review",
      onClick: () => navigate("/lab-alerts"),
    },
  ];

  const [checkInQueue, setCheckInQueue] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      time: "9:00 AM",
      status: "Arrived",
      avatar: "SJ",
      healthStatus: "normal",
    },
    {
      id: 2,
      name: "Michael Chen",
      time: "9:15 AM",
      status: "Waiting",
      avatar: "MC",
      healthStatus: "normal",
    },
    {
      id: 3,
      name: "Emily Davis",
      time: "9:30 AM",
      status: "Roomed",
      avatar: "ED",
      healthStatus: "attention",
    },
    {
      id: 4,
      name: "Robert Wilson",
      time: "9:45 AM",
      status: "Pending",
      avatar: "RW",
      healthStatus: "normal",
    },
  ]);

  const updatePatientStatus = (patientId: number, newStatus: string) => {
    setCheckInQueue((prev) =>
      prev.map((patient) =>
        patient.id === patientId ? { ...patient, status: newStatus } : patient,
      ),
    );
  };

  const completeAppointment = (patientId: number) => {
    const patient = checkInQueue.find((p) => p.id === patientId);
    setCheckInQueue((prev) => prev.filter((p) => p.id !== patientId));
    // Show success message
    setTimeout(() => {
      alert(`✅ ${patient?.name}'s appointment completed successfully!`);
    }, 100);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Arrived: "bg-green-100 text-green-700 border-green-300",
      Waiting: "bg-yellow-100 text-yellow-700 border-yellow-300",
      Roomed: "bg-blue-100 text-blue-700 border-blue-300",
      Pending: "bg-gray-100 text-gray-700 border-gray-300",
    };
    return (
      statusConfig[status as keyof typeof statusConfig] ||
      "bg-gray-100 text-gray-700 border-gray-300"
    );
  };

  const getHealthStatusClass = (status: string) => {
    const statusClasses = {
      normal: "border-l-green-500",
      attention: "border-l-yellow-500",
      urgent: "border-l-red-500",
    };
    return (
      statusClasses[status as keyof typeof statusClasses] || "border-l-gray-500"
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Good morning! Ready to help patients today? 🌟
          </h1>
          <p className="text-muted-foreground mt-1">
            Secretary Dashboard • Last updated:{" "}
            {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            className="glass-card hover:neon-glow transition-all duration-300 text-white"
            onClick={scheduleAppointment}
          >
            <Plus className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
          <Button
            variant="outline"
            className="glass-subtle hover:glass-card transition-all duration-300"
            onClick={sendIntakeForm}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Form
          </Button>
          <Button
            variant="outline"
            className="glass-subtle hover:glass-card transition-all duration-300"
            onClick={sendReminders}
          >
            <Bell className="h-4 w-4 mr-2" />
            Send Reminders
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const IconComponent = metric.icon;
          return (
            <Card
              key={metric.title}
              className="glass-card hover:glass-elevated transition-all duration-300 slide-up"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div
                  className={`p-3 rounded-xl ${metric.bgColor} pulse-gentle`}
                >
                  <IconComponent className={`h-5 w-5 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {metric.value}
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  <span
                    className={
                      metric.change.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {metric.change}
                  </span>{" "}
                  from yesterday
                </p>
                <p className="text-xs text-blue-300 italic">{metric.message}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5 text-blue-600" />
              Live Check-In Queue
              <Badge className="bg-green-100 text-green-700 border-green-300 pulse-gentle">
                Live Updates
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {checkInQueue.map((patient) => (
                <div
                  key={patient.id}
                  className={`flex items-center justify-between p-4 glass-subtle rounded-xl border-l-4 ${getHealthStatusClass(patient.healthStatus)} hover:glass-card transition-all duration-200`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-medium shadow-lg">
                      {patient.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {patient.name}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {patient.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusBadge(patient.status)}>
                      {patient.status}
                    </Badge>
                    <div className="flex gap-2">
                      <button
                        className="quick-action-btn hover:scale-105 active:scale-95 transition-transform duration-150"
                        onClick={() => completeAppointment(patient.id)}
                      >
                        ✅ Complete
                      </button>
                      <button
                        className="quick-action-btn hover:scale-105 active:scale-95 transition-transform duration-150"
                        onClick={() => {
                          updatePatientStatus(patient.id, "Called");
                          setTimeout(
                            () =>
                              alert(`📞 Calling ${patient.name}... Connected!`),
                            300,
                          );
                        }}
                      >
                        📞 Call
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Wellness Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 border-l-4 border-green-500 glass-subtle rounded-lg">
                <p className="font-medium text-green-700">🎉 Great News!</p>
                <p className="text-sm text-muted-foreground">
                  John Doe's lab results are perfectly normal
                </p>
              </div>
              <div className="p-4 border-l-4 border-yellow-500 glass-subtle rounded-lg">
                <p className="font-medium text-yellow-700">💊 Refill Ready</p>
                <p className="text-sm text-muted-foreground">
                  Jane Smith - Metformin approved
                </p>
              </div>
              <div className="p-4 border-l-4 border-blue-500 glass-subtle rounded-lg">
                <p className="font-medium text-blue-700">📅 Schedule Update</p>
                <p className="text-sm text-muted-foreground">
                  Bob Johnson successfully rescheduled
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
