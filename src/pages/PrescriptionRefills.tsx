import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pill,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
} from "lucide-react";

interface Refill {
  id: number;
  patientName: string;
  medication: string;
  dosage: string;
  quantity: number;
  refillsRemaining: number;
  requestDate: string;
  urgency: "low" | "medium" | "high" | "urgent";
  status: "pending" | "approved" | "denied" | "processing" | "ready";
  prescriber: string;
  lastFilled: string;
  notes?: string;
}

export const PrescriptionRefills = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderSettings, setReminderSettings] = useState({
    enabled: false,
    frequency: "daily",
    time: "09:00",
    message: "",
  });

  const [todaysPatients, setTodaysPatients] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      visitTime: "09:00 AM",
      medications: [
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
        { name: "Vitamin D", dosage: "2000 IU", frequency: "Once daily" },
      ],
      reminderEnabled: false,
      reminderTime: "09:00",
    },
    {
      id: 2,
      name: "Michael Chen",
      phone: "(555) 234-5678",
      visitTime: "10:30 AM",
      medications: [
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
        { name: "Metformin", dosage: "1000mg", frequency: "Twice daily" },
        { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily" },
      ],
      reminderEnabled: true,
      reminderTime: "08:00",
    },
    {
      id: 3,
      name: "Emily Davis",
      phone: "(555) 345-6789",
      visitTime: "11:15 AM",
      medications: [
        {
          name: "Levothyroxine",
          dosage: "75mcg",
          frequency: "Once daily morning",
        },
      ],
      reminderEnabled: false,
      reminderTime: "07:00",
    },
    {
      id: 4,
      name: "Robert Wilson",
      phone: "(555) 456-7890",
      visitTime: "02:00 PM",
      medications: [
        { name: "Ibuprofen", dosage: "400mg", frequency: "As needed" },
        { name: "Physical therapy exercises", dosage: "", frequency: "Daily" },
      ],
      reminderEnabled: false,
      reminderTime: "18:00",
    },
    {
      id: 5,
      name: "Lisa Brown",
      phone: "(555) 567-8901",
      visitTime: "03:30 PM",
      medications: [],
      reminderEnabled: false,
      reminderTime: "09:00",
    },
  ]);

  const setupReminder = (patient: any) => {
    if (!patient.phone) {
      alert("Patient phone number is required for reminders");
      return;
    }

    setSelectedPatient(patient);
    setReminderSettings({
      enabled: patient.reminderEnabled,
      frequency: "daily",
      time: patient.reminderTime,
      message: `Hi ${patient.name}, this is a reminder to take your medications as prescribed.`,
    });
    setShowReminderModal(true);
  };

  const saveReminderSettings = () => {
    setTodaysPatients((prev) =>
      prev.map((p) =>
        p.id === selectedPatient.id
          ? {
              ...p,
              reminderEnabled: reminderSettings.enabled,
              reminderTime: reminderSettings.time,
            }
          : p,
      ),
    );

    setTimeout(() => {
      const status = reminderSettings.enabled ? "enabled" : "disabled";
      alert(
        `✅ Medication reminder ${status} for ${selectedPatient.name}\n\n${reminderSettings.enabled ? `Reminder set for ${reminderSettings.time} daily` : "No reminders will be sent"}`,
      );
    }, 100);

    setShowReminderModal(false);
    setSelectedPatient(null);
  };

  const disableReminder = (patientId: number) => {
    const patient = todaysPatients.find((p) => p.id === patientId);

    setTodaysPatients((prev) =>
      prev.map((p) =>
        p.id === patientId ? { ...p, reminderEnabled: false } : p,
      ),
    );

    setTimeout(() => {
      alert(`❌ Medication reminder disabled for ${patient?.name}`);
    }, 100);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "denied":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "processing":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "ready":
        return <CheckCircle className="h-4 w-4 text-purple-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      denied: "bg-red-100 text-red-800",
      processing: "bg-blue-100 text-blue-800",
      ready: "bg-purple-100 text-purple-800",
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  const filteredPatients = todaysPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const stats = {
    total: todaysPatients.length,
    withMedications: todaysPatients.filter((p) => p.medications.length > 0)
      .length,
    remindersEnabled: todaysPatients.filter((p) => p.reminderEnabled).length,
    needsSetup: todaysPatients.filter(
      (p) => p.medications.length > 0 && !p.reminderEnabled,
    ).length,
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Medication Reminders
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage medication reminders for today's patients
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/patient-records")}
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <User className="h-4 w-4 mr-2" />
            Patient Records
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/medical-history")}
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <FileText className="h-4 w-4 mr-2" />
            Medical History
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.total}
                </p>
              </div>
              <Pill className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
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
                <p className="text-sm text-muted-foreground">Approved Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.approved}
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
                <p className="text-sm text-muted-foreground">Urgent</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.urgent}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-primary" />
              Refill Requests
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search patients or medications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="processing">Processing</option>
                <option value="ready">Ready</option>
                <option value="denied">Denied</option>
              </select>
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Urgency</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRefills.map((refill) => (
                <TableRow
                  key={refill.id}
                  className="hover:bg-muted/30 transition-colors duration-200"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                        {refill.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium">{refill.patientName}</p>
                        <p className="text-sm text-muted-foreground">
                          Dr. {refill.prescriber}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{refill.medication}</p>
                      <p className="text-sm text-muted-foreground">
                        {refill.dosage}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>Qty: {refill.quantity}</p>
                      <p className="text-muted-foreground">
                        Refills left: {refill.refillsRemaining}
                      </p>
                      <p className="text-muted-foreground">
                        Last filled: {refill.lastFilled}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{refill.requestDate}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${getUrgencyColor(refill.urgency)}`}
                      ></div>
                      <span className="text-sm capitalize">
                        {refill.urgency}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(refill.status)}
                      <Badge className={getStatusColor(refill.status)}>
                        {refill.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {refill.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateRefillStatus(refill.id, "approved")
                            }
                            className="hover:scale-105 active:scale-95 transition-transform duration-150"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateRefillStatus(refill.id, "denied")
                            }
                            className="hover:scale-105 active:scale-95 transition-transform duration-150"
                          >
                            Deny
                          </Button>
                        </>
                      )}
                      {refill.status === "approved" && (
                        <Button
                          size="sm"
                          onClick={() =>
                            updateRefillStatus(refill.id, "processing")
                          }
                          className="hover:scale-105 active:scale-95 transition-transform duration-150"
                        >
                          Process
                        </Button>
                      )}
                      {refill.status === "processing" && (
                        <Button
                          size="sm"
                          onClick={() => updateRefillStatus(refill.id, "ready")}
                          className="hover:scale-105 active:scale-95 transition-transform duration-150"
                        >
                          Mark Ready
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
