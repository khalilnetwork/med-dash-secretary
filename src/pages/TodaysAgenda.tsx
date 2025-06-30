import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Phone,
  FileText,
  Pill,
} from "lucide-react";

interface AgendaItem {
  id: number;
  time: string;
  type: "appointment" | "task" | "call" | "reminder";
  title: string;
  patient?: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed" | "overdue";
  description: string;
  duration?: number;
}

export const TodaysAgenda = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "appointments" | "tasks" | "calls"
  >("all");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([
    {
      id: 1,
      time: "09:00",
      type: "appointment",
      title: "Annual Checkup",
      patient: "Sarah Johnson",
      priority: "high",
      status: "completed",
      description: "Routine annual physical examination",
      duration: 30,
    },
    {
      id: 2,
      time: "09:30",
      type: "appointment",
      title: "Follow-up Consultation",
      patient: "Michael Chen",
      priority: "medium",
      status: "in-progress",
      description: "Post-surgery follow-up examination",
      duration: 15,
    },
    {
      id: 3,
      time: "10:00",
      type: "call",
      title: "Insurance Authorization Call",
      patient: "Emily Davis",
      priority: "high",
      status: "pending",
      description: "Call insurance for pre-authorization of treatment",
    },
    {
      id: 4,
      time: "10:30",
      type: "task",
      title: "Lab Results Review",
      priority: "medium",
      status: "pending",
      description: "Review and analyze morning lab results",
    },
    {
      id: 5,
      time: "11:00",
      type: "appointment",
      title: "Physical Therapy Session",
      patient: "Robert Wilson",
      priority: "medium",
      status: "pending",
      description: "Weekly physical therapy session",
      duration: 45,
    },
    {
      id: 6,
      time: "12:00",
      type: "reminder",
      title: "Medication Refill Approvals",
      priority: "high",
      status: "pending",
      description: "Review and approve pending prescription refills",
    },
    {
      id: 7,
      time: "14:00",
      type: "appointment",
      title: "New Patient Consultation",
      patient: "Lisa Brown",
      priority: "high",
      status: "pending",
      description: "Initial consultation for new patient",
      duration: 60,
    },
    {
      id: 8,
      time: "15:30",
      type: "call",
      title: "Follow-up Call",
      patient: "David Kim",
      priority: "low",
      status: "pending",
      description: "Check on patient recovery progress",
    },
  ]);

  const updateItemStatus = (itemId: number, newStatus: string) => {
    setAgendaItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, status: newStatus as AgendaItem["status"] }
          : item,
      ),
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-4 w-4" />;
      case "call":
        return <Phone className="h-4 w-4" />;
      case "task":
        return <FileText className="h-4 w-4" />;
      case "reminder":
        return <Pill className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50/50";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50/50";
      case "low":
        return "border-l-green-500 bg-green-50/50";
      default:
        return "border-l-gray-500 bg-gray-50/50";
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-blue-100 text-blue-800",
      "in-progress": "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      overdue: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const filteredItems = agendaItems.filter((item) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "appointments") return item.type === "appointment";
    if (selectedFilter === "tasks")
      return item.type === "task" || item.type === "reminder";
    if (selectedFilter === "calls") return item.type === "call";
    return true;
  });

  const getCurrentTimeSlot = () => {
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  };

  const stats = {
    total: agendaItems.length,
    completed: agendaItems.filter((item) => item.status === "completed").length,
    inProgress: agendaItems.filter((item) => item.status === "in-progress")
      .length,
    pending: agendaItems.filter((item) => item.status === "pending").length,
    overdue: agendaItems.filter((item) => item.status === "overdue").length,
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Today's Agenda</h1>
          <p className="text-muted-foreground mt-1">
            Current time: {currentTime.toLocaleTimeString()} •{" "}
            {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          {["all", "appointments", "tasks", "calls"].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter as typeof selectedFilter)}
              className="capitalize hover:scale-105 active:scale-95 transition-transform duration-150"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.total}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.completed}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.inProgress}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.pending}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Timeline View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border-l-4 transition-all duration-300 hover:shadow-md ${getPriorityColor(item.priority)} slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                        {item.time}
                      </span>
                      {getTypeIcon(item.type)}
                      {getStatusIcon(item.status)}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {item.title}
                      </h3>
                      {item.patient && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {item.patient}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                      {item.duration && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Duration: {item.duration} minutes
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${getStatusColor(item.status)} capitalize`}
                    >
                      {item.status.replace("-", " ")}
                    </Badge>
                    <div className="flex gap-1">
                      {item.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateItemStatus(item.id, "in-progress")
                            }
                            className="hover:scale-105 active:scale-95 transition-transform duration-150"
                          >
                            Start
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              updateItemStatus(item.id, "completed")
                            }
                            className="hover:scale-105 active:scale-95 transition-transform duration-150"
                          >
                            Complete
                          </Button>
                        </>
                      )}
                      {item.status === "in-progress" && (
                        <Button
                          size="sm"
                          onClick={() => updateItemStatus(item.id, "completed")}
                          className="hover:scale-105 active:scale-95 transition-transform duration-150"
                        >
                          Complete
                        </Button>
                      )}
                      {item.status === "completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateItemStatus(item.id, "pending")}
                          className="hover:scale-105 active:scale-95 transition-transform duration-150"
                        >
                          Reopen
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
