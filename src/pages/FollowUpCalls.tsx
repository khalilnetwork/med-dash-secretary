import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Phone,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  PhoneCall,
} from "lucide-react";

interface FollowUpCall {
  id: number;
  patientName: string;
  phone: string;
  reason: string;
  scheduledDate: string;
  scheduledTime: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "scheduled" | "completed" | "no-answer" | "rescheduled" | "cancelled";
  lastContact: string;
  assignedTo: string;
  notes?: string;
  attempts: number;
}

export const FollowUpCalls = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showRevisitModal, setShowRevisitModal] = useState(false);
  const [revisitDate, setRevisitDate] = useState("");
  const [revisitNotes, setRevisitNotes] = useState("");

  const [todaysPatients, setTodaysPatients] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      visitTime: "09:00 AM",
      diagnosis: "Hypertension follow-up",
      treatment: "Continue current medication",
      status: "completed",
      needsFollowUp: true,
      priority: "medium",
    },
    {
      id: 2,
      name: "Michael Chen",
      phone: "(555) 234-5678",
      visitTime: "10:30 AM",
      diagnosis: "Diabetes check",
      treatment: "Adjust insulin dosage",
      status: "completed",
      needsFollowUp: true,
      priority: "high",
    },
    {
      id: 3,
      name: "Emily Davis",
      phone: "(555) 345-6789",
      visitTime: "11:15 AM",
      diagnosis: "Annual checkup",
      treatment: "All normal",
      status: "completed",
      needsFollowUp: false,
      priority: "low",
    },
    {
      id: 4,
      name: "Robert Wilson",
      phone: "(555) 456-7890",
      visitTime: "02:00 PM",
      diagnosis: "Back pain",
      treatment: "Physical therapy recommended",
      status: "completed",
      needsFollowUp: true,
      priority: "medium",
    },
    {
      id: 5,
      name: "Lisa Brown",
      phone: "(555) 567-8901",
      visitTime: "03:30 PM",
      diagnosis: "Cold symptoms",
      treatment: "Rest and fluids",
      status: "completed",
      needsFollowUp: false,
      priority: "low",
    },
  ]);

  const scheduleRevisit = (patient: any) => {
    setSelectedPatient(patient);
    setRevisitDate("");
    setRevisitNotes("");
    setShowRevisitModal(true);
  };

  const confirmRevisit = () => {
    if (!revisitDate) {
      alert("Please select a date for the revisit");
      return;
    }

    setTodaysPatients((prev) =>
      prev.map((p) =>
        p.id === selectedPatient.id ? { ...p, status: "revisit-scheduled" } : p,
      ),
    );

    setTimeout(() => {
      alert(
        `✅ Revisit scheduled for ${selectedPatient.name} on ${revisitDate}\n\nAppointment has been added to the calendar.`,
      );
    }, 100);

    setShowRevisitModal(false);
    setSelectedPatient(null);
  };

  const markPatientDone = (patientId: number) => {
    const patient = todaysPatients.find((p) => p.id === patientId);

    if (
      confirm(
        `Mark ${patient?.name} as completed?\n\nThis patient will be removed from follow-up list.`,
      )
    ) {
      setTodaysPatients((prev) =>
        prev.map((p) =>
          p.id === patientId ? { ...p, status: "discharged" } : p,
        ),
      );

      setTimeout(() => {
        alert(
          `✅ ${patient?.name} marked as completed.\n\nPatient care cycle finished.`,
        );
      }, 100);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "no-answer":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "rescheduled":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <Phone className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      "no-answer": "bg-red-100 text-red-800",
      rescheduled: "bg-blue-100 text-blue-800",
      cancelled: "bg-gray-100 text-gray-800",
    };
    return colors[status as keyof typeof colors] || colors.scheduled;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredPatients = todaysPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const stats = {
    total: todaysPatients.length,
    needsFollowUp: todaysPatients.filter(
      (p) => p.needsFollowUp && p.status === "completed",
    ).length,
    completed: todaysPatients.filter((p) => p.status === "completed").length,
    revisitScheduled: todaysPatients.filter(
      (p) => p.status === "revisit-scheduled",
    ).length,
    discharged: todaysPatients.filter((p) => p.status === "discharged").length,
  };

  const callAllScheduled = () => {
    const scheduledCalls = calls.filter((c) => c.status === "scheduled");
    setTimeout(() => {
      alert(
        `📞 Starting call queue for ${scheduledCalls.length} scheduled calls!`,
      );
    }, 100);
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Follow-Up Visits
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage post-visit follow-up for today's patients
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/appointments")}
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/medical-history")}
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <FileText className="h-4 w-4 mr-2" />
            Patient History
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Today's Patients
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.total}
                </p>
              </div>
              <User className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Needs Follow-up</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.needsFollowUp}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Revisit Scheduled
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.revisitScheduled}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.discharged}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Patients - Follow-up Decision
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  patient.status === "revisit-scheduled"
                    ? "border-blue-300 bg-blue-50/50"
                    : patient.status === "discharged"
                      ? "border-green-300 bg-green-50/50"
                      : "border-border bg-card hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-medium">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        {patient.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Visit: {patient.visitTime}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Phone: {patient.phone}
                      </p>
                    </div>
                    <div className="ml-6">
                      <p className="text-sm font-medium text-foreground">
                        Diagnosis: {patient.diagnosis}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Treatment: {patient.treatment}
                      </p>
                      {patient.needsFollowUp && (
                        <Badge className="mt-1 bg-yellow-100 text-yellow-800">
                          Needs Follow-up
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {patient.status === "completed" && (
                      <>
                        <Button
                          onClick={() => scheduleRevisit(patient)}
                          className="hover:scale-105 active:scale-95 transition-transform duration-150"
                          disabled={!patient.needsFollowUp}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Revisit
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => markPatientDone(patient.id)}
                          className="hover:scale-105 active:scale-95 transition-transform duration-150"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Done
                        </Button>
                      </>
                    )}

                    {patient.status === "revisit-scheduled" && (
                      <Badge className="bg-blue-100 text-blue-800">
                        Revisit Scheduled
                      </Badge>
                    )}

                    {patient.status === "discharged" && (
                      <Badge className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revisit Modal */}
      {showRevisitModal && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 glass-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Schedule Revisit: {selectedPatient.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p>
                  <strong>Patient:</strong> {selectedPatient.name}
                </p>
                <p>
                  <strong>Last Visit:</strong> {selectedPatient.visitTime}
                </p>
                <p>
                  <strong>Diagnosis:</strong> {selectedPatient.diagnosis}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Revisit Date:</label>
                <Input
                  type="date"
                  value={revisitDate}
                  onChange={(e) => setRevisitDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes:</label>
                <Textarea
                  value={revisitNotes}
                  onChange={(e) => setRevisitNotes(e.target.value)}
                  placeholder="Reason for revisit, specific instructions..."
                  className="min-h-20"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={confirmRevisit}
                  className="flex-1"
                  disabled={!revisitDate}
                >
                  Schedule Revisit
                </Button>
                <Button
                  onClick={() => setShowRevisitModal(false)}
                  variant="outline"
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
