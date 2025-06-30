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

  const workflowPhases = [
    {
      title: "Pre-Visit",
      description: "Prepare for patient visits",
      tasks: [
        { name: "Schedule appointments", count: 8, priority: "medium" },
        { name: "Review patient records", count: 5, priority: "high" },
        { name: "Prepare medical files", count: 3, priority: "low" },
      ],
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100/80",
      onClick: () => navigate("/appointments"),
    },
    {
      title: "Visit",
      description: "Manage current patient visits",
      tasks: [
        { name: "Patients in queue", count: 4, priority: "high" },
        { name: "Current consultation", count: 1, priority: "urgent" },
        { name: "Waiting for doctor", count: 2, priority: "medium" },
      ],
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100/80",
      onClick: () => navigate("/schedule"),
    },
    {
      title: "Post-Visit",
      description: "Follow-up and health management",
      tasks: [
        { name: "Schedule follow-ups", count: 6, priority: "medium" },
        { name: "Medication reminders", count: 12, priority: "high" },
        { name: "Health reports", count: 3, priority: "low" },
      ],
      icon: ListTodo,
      color: "text-purple-600",
      bgColor: "bg-purple-100/80",
      onClick: () => navigate("/follow-up"),
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
            Welcome to Dr. Smith's Office 👩‍���️
          </h1>
          <p className="text-muted-foreground mt-1">
            Patient Care Workflow • Today's Schedule •{" "}
            {lastUpdate.toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            className="glass-card hover:neon-glow transition-all duration-300 text-white"
            onClick={() => navigate("/new-patient")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Patient
          </Button>
          <Button
            variant="outline"
            className="glass-subtle hover:glass-card transition-all duration-300"
            onClick={() => navigate("/schedule")}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Today's Schedule
          </Button>
          <Button
            variant="outline"
            className="glass-subtle hover:glass-card transition-all duration-300"
            onClick={() => navigate("/appointments")}
          >
            <Clock className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {workflowPhases.map((phase) => {
          const IconComponent = phase.icon;
          const getPriorityColor = (priority: string) => {
            switch (priority) {
              case "urgent":
                return "text-red-600 bg-red-100";
              case "high":
                return "text-orange-600 bg-orange-100";
              case "medium":
                return "text-yellow-600 bg-yellow-100";
              case "low":
                return "text-green-600 bg-green-100";
              default:
                return "text-gray-600 bg-gray-100";
            }
          };

          return (
            <Card
              key={phase.title}
              className="glass-card hover:glass-elevated transition-all duration-300 slide-up cursor-pointer"
              onClick={phase.onClick}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {phase.title}
                  </CardTitle>
                  <div
                    className={`p-3 rounded-xl ${phase.bgColor} pulse-gentle`}
                  >
                    <IconComponent className={`h-6 w-6 ${phase.color}`} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {phase.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {phase.tasks.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 glass-subtle rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {task.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-foreground">
                          {task.count}
                        </span>
                        <Badge
                          className={`text-xs ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full mt-4 hover:scale-105 active:scale-95 transition-transform duration-150"
                  onClick={(e) => {
                    e.stopPropagation();
                    phase.onClick();
                  }}
                >
                  Manage {phase.title}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Clock className="h-5 w-5 text-blue-600" />
                Today's Schedule ({checkInQueue.length} patients)
              </CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate("/schedule")}
                className="hover:scale-105 active:scale-95 transition-transform duration-150"
              >
                View Full Schedule
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {checkInQueue.slice(0, 4).map((patient) => (
                <div
                  key={patient.id}
                  className={`flex items-center justify-between p-3 glass-subtle rounded-lg border-l-4 ${getHealthStatusClass(patient.healthStatus)} hover:glass-card transition-all duration-200`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {patient.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {patient.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {patient.time}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusBadge(patient.status)}>
                    {patient.status}
                  </Badge>
                </div>
              ))}
              {checkInQueue.length > 4 && (
                <div className="text-center text-sm text-muted-foreground py-2">
                  +{checkInQueue.length - 4} more patients...
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Quick Tasks
              </CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate("/agenda")}
                className="hover:scale-105 active:scale-95 transition-transform duration-150"
              >
                View All Tasks
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 border-l-4 border-blue-500 glass-subtle rounded-lg hover:glass-card transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-700">
                      📞 Follow-up Calls
                    </p>
                    <p className="text-sm text-muted-foreground">
                      5 patients need callbacks
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => navigate("/callbacks")}
                    className="hover:scale-105 active:scale-95 transition-transform duration-150"
                  >
                    Call Now
                  </Button>
                </div>
              </div>

              <div className="p-4 border-l-4 border-green-500 glass-subtle rounded-lg hover:glass-card transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-700">
                      💊 Refills Ready
                    </p>
                    <p className="text-sm text-muted-foreground">
                      3 prescriptions approved
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => navigate("/refills")}
                    className="hover:scale-105 active:scale-95 transition-transform duration-150"
                  >
                    Notify Patients
                  </Button>
                </div>
              </div>

              <div className="p-4 border-l-4 border-yellow-500 glass-subtle rounded-lg hover:glass-card transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-yellow-700">
                      📋 Forms Pending
                    </p>
                    <p className="text-sm text-muted-foreground">
                      7 patients need intake forms
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => navigate("/intake")}
                    className="hover:scale-105 active:scale-95 transition-transform duration-150"
                  >
                    Send Forms
                  </Button>
                </div>
              </div>

              <div className="p-4 border-l-4 border-red-500 glass-subtle rounded-lg hover:glass-card transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-700">🚨 Lab Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      3 urgent results for doctor
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => navigate("/lab-alerts")}
                    className="hover:scale-105 active:scale-95 transition-transform duration-150"
                  >
                    Review
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
