import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Plus,
  ChevronLeft,
  ChevronRight,
  MapPin,
  X,
  Save,
  Search,
} from "lucide-react";

interface Appointment {
  id: number;
  time: string;
  duration: number;
  patient: string;
  type: string;
  status: "scheduled" | "confirmed" | "in-progress" | "completed" | "cancelled";
  room?: string;
}

export const CalendarView = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [draggedAppointment, setDraggedAppointment] =
    useState<Appointment | null>(null);
  const [hoveredTimeSlot, setHoveredTimeSlot] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    patientPhone: "",
    appointmentType: "consultation",
    date: selectedDate.toISOString().split("T")[0],
    time: "09:00",
    duration: 30,
    room: "Room 101",
    notes: "",
  });

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      time: "09:00",
      duration: 30,
      patient: "Sarah Johnson",
      type: "Annual Checkup",
      status: "confirmed",
      room: "Room 101",
    },
    {
      id: 2,
      time: "09:30",
      duration: 15,
      patient: "Michael Chen",
      type: "Follow-up",
      status: "scheduled",
      room: "Room 102",
    },
    {
      id: 3,
      time: "10:00",
      duration: 45,
      patient: "Emily Davis",
      type: "Physical Therapy",
      status: "in-progress",
      room: "Room 103",
    },
    {
      id: 4,
      time: "11:00",
      duration: 30,
      patient: "Robert Wilson",
      type: "Consultation",
      status: "scheduled",
      room: "Room 101",
    },
    {
      id: 5,
      time: "14:00",
      duration: 60,
      patient: "Lisa Brown",
      type: "Surgery Consultation",
      status: "confirmed",
      room: "Room 104",
    },
  ]);

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8; // Starting from 8 AM
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: "bg-blue-100 text-blue-800 border-blue-200",
      confirmed: "bg-green-100 text-green-800 border-green-200",
      "in-progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
      completed: "bg-gray-100 text-gray-800 border-gray-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status as keyof typeof colors] || colors.scheduled;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    }
    setSelectedDate(newDate);
  };

  const updateAppointmentStatus = (
    appointmentId: number,
    newStatus: string,
  ) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId
          ? { ...apt, status: newStatus as Appointment["status"] }
          : apt,
      ),
    );
    const appointment = appointments.find((apt) => apt.id === appointmentId);
    setTimeout(() => {
      alert(`✅ ${appointment?.patient}'s appointment marked as ${newStatus}!`);
    }, 100);
  };

  // Drag and Drop functionality
  const handleDragStart = (e: React.DragEvent, appointment: Appointment) => {
    setDraggedAppointment(appointment);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", appointment.id.toString());
  };

  const handleDragOver = (e: React.DragEvent, timeSlot: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setHoveredTimeSlot(timeSlot);
  };

  const handleDragLeave = () => {
    setHoveredTimeSlot(null);
  };

  const handleDrop = (e: React.DragEvent, newTimeSlot: string) => {
    e.preventDefault();
    setHoveredTimeSlot(null);

    if (draggedAppointment && draggedAppointment.time !== newTimeSlot) {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === draggedAppointment.id
            ? { ...apt, time: newTimeSlot }
            : apt,
        ),
      );
      setTimeout(() => {
        alert(
          `📅 ${draggedAppointment.patient}'s appointment moved to ${newTimeSlot}!`,
        );
      }, 100);
    }
    setDraggedAppointment(null);
  };

  const handleDragEnd = () => {
    setDraggedAppointment(null);
    setHoveredTimeSlot(null);
  };

  // New appointment functions
  const openNewAppointmentModal = () => {
    setNewAppointment({
      ...newAppointment,
      date: selectedDate.toISOString().split("T")[0],
    });
    setShowNewAppointmentModal(true);
  };

  const createAppointment = () => {
    const newId = Math.max(...appointments.map((apt) => apt.id)) + 1;
    const appointment: Appointment = {
      id: newId,
      time: newAppointment.time,
      duration: newAppointment.duration,
      patient: newAppointment.patientName,
      type: newAppointment.appointmentType,
      status: "scheduled",
      room: newAppointment.room,
    };

    setAppointments((prev) => [...prev, appointment]);
    setShowNewAppointmentModal(false);
    setNewAppointment({
      patientName: "",
      patientPhone: "",
      appointmentType: "consultation",
      date: selectedDate.toISOString().split("T")[0],
      time: "09:00",
      duration: 30,
      room: "Room 101",
      notes: "",
    });

    setTimeout(() => {
      alert(
        `✅ Appointment scheduled for ${newAppointment.patientName} at ${newAppointment.time}!`,
      );
    }, 100);
  };

  const deleteAppointment = (appointmentId: number) => {
    const appointment = appointments.find((apt) => apt.id === appointmentId);
    if (
      confirm(
        `Are you sure you want to cancel ${appointment?.patient}'s appointment?`,
      )
    ) {
      setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId));
      setTimeout(() => {
        alert(`❌ ${appointment?.patient}'s appointment has been cancelled.`);
      }, 100);
    }
  };

  // Quick actions
  const blockTimeSlot = () => {
    alert(
      "🚫 Time blocking feature:\n\n1. Select time slots\n2. Mark as unavailable\n3. Add reason (lunch, meeting, etc.)\n\nFeature ready for implementation!",
    );
  };

  const viewAvailability = () => {
    const availableSlots = timeSlots.filter(
      (slot) => !appointments.some((apt) => apt.time === slot),
    ).length;
    alert(
      `📅 Availability Summary:\n\n✅ Available slots: ${availableSlots}\n📋 Booked slots: ${appointments.length}\n⏰ Next available: ${timeSlots.find((slot) => !appointments.some((apt) => apt.time === slot)) || "None today"}`,
    );
  };

  const patientLookup = () => {
    navigate("/check-in");
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendar View</h1>
          <p className="text-muted-foreground mt-1">
            Manage your appointments and schedule
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setSelectedDate(new Date())}
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            Today
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/check-in")}
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <User className="h-4 w-4 mr-2" />
            Check-In Queue
          </Button>
          <Button
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
            onClick={openNewAppointmentModal}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate("prev")}
              className="hover:scale-105 active:scale-95 transition-transform duration-150"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold text-foreground min-w-[200px]">
              {formatDate(selectedDate)}
            </h2>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate("next")}
              className="hover:scale-105 active:scale-95 transition-transform duration-150"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {["day", "week", "month"].map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode(mode as "day" | "week" | "month")}
              className="capitalize hover:scale-105 active:scale-95 transition-transform duration-150"
            >
              {mode}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Daily Schedule - Drag to Reschedule
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-48"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {timeSlots.map((timeSlot) => {
                  const appointment = appointments.find(
                    (apt) =>
                      apt.time === timeSlot &&
                      (searchTerm === "" ||
                        apt.patient
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        apt.type
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())),
                  );
                  const isHovered = hoveredTimeSlot === timeSlot;

                  return (
                    <div
                      key={timeSlot}
                      className={`grid grid-cols-12 gap-4 py-2 border-b border-border/50 transition-all duration-200 ${
                        isHovered
                          ? "bg-primary/10 border-primary/30"
                          : "hover:bg-muted/30"
                      }`}
                      onDragOver={(e) => handleDragOver(e, timeSlot)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, timeSlot)}
                    >
                      <div className="col-span-1 text-sm text-muted-foreground font-medium">
                        {timeSlot}
                      </div>
                      <div className="col-span-11">
                        {appointment ? (
                          <div
                            draggable
                            onDragStart={(e) => handleDragStart(e, appointment)}
                            onDragEnd={handleDragEnd}
                            className={`p-3 glass-subtle rounded-lg border-l-4 border-primary hover:glass-card transition-all duration-200 slide-up cursor-move ${
                              draggedAppointment?.id === appointment.id
                                ? "opacity-50"
                                : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div>
                                  <h4 className="font-medium text-foreground">
                                    {appointment.patient}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {appointment.type}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                      {appointment.duration} min
                                    </span>
                                    {appointment.room && (
                                      <>
                                        <MapPin className="h-3 w-3 text-muted-foreground ml-2" />
                                        <span className="text-xs text-muted-foreground">
                                          {appointment.room}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  className={getStatusColor(appointment.status)}
                                >
                                  {appointment.status}
                                </Badge>
                                <div className="flex gap-1">
                                  {appointment.status === "scheduled" && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        updateAppointmentStatus(
                                          appointment.id,
                                          "in-progress",
                                        )
                                      }
                                      className="hover:scale-105 active:scale-95 transition-transform duration-150"
                                    >
                                      Start
                                    </Button>
                                  )}
                                  {appointment.status === "in-progress" && (
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        updateAppointmentStatus(
                                          appointment.id,
                                          "completed",
                                        )
                                      }
                                      className="hover:scale-105 active:scale-95 transition-transform duration-150"
                                    >
                                      Complete
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      deleteAppointment(appointment.id)
                                    }
                                    className="hover:scale-105 active:scale-95 transition-transform duration-150 text-red-600 hover:text-red-700"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className={`h-12 flex items-center text-muted-foreground text-sm italic transition-all duration-200 ${
                              isHovered
                                ? "bg-primary/5 text-primary font-medium"
                                : "opacity-50"
                            }`}
                          >
                            {isHovered
                              ? "📅 Drop here to reschedule"
                              : 'Available - Click "New Appointment" to book'}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-3">
          <div className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm">Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Appointments
                  </span>
                  <span className="font-semibold text-foreground">
                    {appointments.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Completed
                  </span>
                  <span className="font-semibold text-green-600">
                    {
                      appointments.filter((apt) => apt.status === "completed")
                        .length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    In Progress
                  </span>
                  <span className="font-semibold text-yellow-600">
                    {
                      appointments.filter((apt) => apt.status === "in-progress")
                        .length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Upcoming
                  </span>
                  <span className="font-semibold text-blue-600">
                    {
                      appointments.filter(
                        (apt) =>
                          apt.status === "scheduled" ||
                          apt.status === "confirmed",
                      ).length
                    }
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start hover:scale-105 active:scale-95 transition-transform duration-150"
                  onClick={blockTimeSlot}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Block Time
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start hover:scale-105 active:scale-95 transition-transform duration-150"
                  onClick={viewAvailability}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  View Availability
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start hover:scale-105 active:scale-95 transition-transform duration-150"
                  onClick={patientLookup}
                >
                  <User className="h-4 w-4 mr-2" />
                  Patient Lookup
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start hover:scale-105 active:scale-95 transition-transform duration-150"
                  onClick={() => navigate("/agenda")}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Today's Agenda
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start hover:scale-105 active:scale-95 transition-transform duration-150"
                  onClick={() => navigate("/callbacks")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Follow-up Calls
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* New Appointment Modal */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-[600px] max-h-[90vh] overflow-y-auto glass-elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Schedule New Appointment
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNewAppointmentModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    value={newAppointment.patientName}
                    onChange={(e) =>
                      setNewAppointment((prev) => ({
                        ...prev,
                        patientName: e.target.value,
                      }))
                    }
                    placeholder="Enter patient full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientPhone">Phone Number</Label>
                  <Input
                    id="patientPhone"
                    value={newAppointment.patientPhone}
                    onChange={(e) =>
                      setNewAppointment((prev) => ({
                        ...prev,
                        patientPhone: e.target.value,
                      }))
                    }
                    placeholder="(555) 123-4567"
                    type="tel"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appointmentType">Appointment Type</Label>
                  <select
                    id="appointmentType"
                    value={newAppointment.appointmentType}
                    onChange={(e) =>
                      setNewAppointment((prev) => ({
                        ...prev,
                        appointmentType: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="consultation">Consultation</option>
                    <option value="checkup">Annual Checkup</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="physical-therapy">Physical Therapy</option>
                    <option value="surgery-consultation">
                      Surgery Consultation
                    </option>
                    <option value="lab-work">Lab Work</option>
                    <option value="vaccination">Vaccination</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room">Room Assignment</Label>
                  <select
                    id="room"
                    value={newAppointment.room}
                    onChange={(e) =>
                      setNewAppointment((prev) => ({
                        ...prev,
                        room: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="Room 101">Room 101</option>
                    <option value="Room 102">Room 102</option>
                    <option value="Room 103">Room 103</option>
                    <option value="Room 104">Room 104</option>
                    <option value="Room 105">Room 105</option>
                    <option value="Surgery Suite 1">Surgery Suite 1</option>
                    <option value="Surgery Suite 2">Surgery Suite 2</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) =>
                      setNewAppointment((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <select
                    id="time"
                    value={newAppointment.time}
                    onChange={(e) =>
                      setNewAppointment((prev) => ({
                        ...prev,
                        time: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <select
                    id="duration"
                    value={newAppointment.duration}
                    onChange={(e) =>
                      setNewAppointment((prev) => ({
                        ...prev,
                        duration: parseInt(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                    <option value={120}>2 hours</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={newAppointment.notes}
                  onChange={(e) =>
                    setNewAppointment((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  placeholder="Additional notes about the appointment..."
                  className="min-h-20"
                />
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">
                  Appointment Summary
                </h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <strong>Patient:</strong>{" "}
                    {newAppointment.patientName || "Not specified"}
                  </p>
                  <p>
                    <strong>Type:</strong> {newAppointment.appointmentType}
                  </p>
                  <p>
                    <strong>Date & Time:</strong> {newAppointment.date} at{" "}
                    {newAppointment.time}
                  </p>
                  <p>
                    <strong>Duration:</strong> {newAppointment.duration} minutes
                  </p>
                  <p>
                    <strong>Room:</strong> {newAppointment.room}
                  </p>
                  {newAppointment.patientPhone && (
                    <p>
                      <strong>Phone:</strong> {newAppointment.patientPhone}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={createAppointment}
                  disabled={!newAppointment.patientName.trim()}
                  className="flex-1 hover:scale-105 active:scale-95 transition-transform duration-150"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowNewAppointmentModal(false)}
                  className="hover:scale-105 active:scale-95 transition-transform duration-150"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
