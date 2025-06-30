import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Search,
  User,
  Pill,
  FileText,
  Activity,
  Phone,
  Clock,
  Eye,
  Heart,
  AlertTriangle,
} from "lucide-react";

interface Patient {
  id: number;
  name: string;
  patientId: string;
  age: number;
  phone: string;
  email: string;
  lastVisit: string;
  totalVisits: number;
  activeMedications: number;
  status: "active" | "inactive";
}

interface Visit {
  id: number;
  date: string;
  type: string;
  diagnosis: string;
  treatment: string;
  doctor: string;
  notes: string;
  followUp: string;
}

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "discontinued";
  prescribedBy: string;
  notes: string;
}

export const MedicalHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState<
    "visits" | "medications" | "summary"
  >("summary");

  const [patients] = useState<Patient[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      patientId: "PAT001",
      age: 34,
      phone: "(555) 123-4567",
      email: "sarah.j@email.com",
      lastVisit: "2024-01-10",
      totalVisits: 8,
      activeMedications: 2,
      status: "active",
    },
    {
      id: 2,
      name: "Michael Chen",
      patientId: "PAT002",
      age: 45,
      phone: "(555) 234-5678",
      email: "michael.c@email.com",
      lastVisit: "2024-01-12",
      totalVisits: 15,
      activeMedications: 4,
      status: "active",
    },
    {
      id: 3,
      name: "Emily Davis",
      patientId: "PAT003",
      age: 28,
      phone: "(555) 345-6789",
      email: "emily.d@email.com",
      lastVisit: "2024-01-08",
      totalVisits: 3,
      activeMedications: 1,
      status: "active",
    },
    {
      id: 4,
      name: "Robert Wilson",
      patientId: "PAT004",
      age: 67,
      phone: "(555) 456-7890",
      email: "robert.w@email.com",
      lastVisit: "2024-01-15",
      totalVisits: 22,
      activeMedications: 6,
      status: "active",
    },
  ]);

  const [visitHistory] = useState<Visit[]>([
    {
      id: 1,
      date: "2024-01-10",
      type: "Follow-up",
      diagnosis: "Hypertension - controlled",
      treatment: "Continue current medication",
      doctor: "Dr. Smith",
      notes: "Blood pressure well controlled. Patient reports no side effects.",
      followUp: "3 months",
    },
    {
      id: 2,
      date: "2023-10-15",
      type: "Regular Checkup",
      diagnosis: "Hypertension",
      treatment: "Prescribed Lisinopril 10mg",
      doctor: "Dr. Smith",
      notes: "New diagnosis of hypertension. Patient education provided.",
      followUp: "3 months",
    },
    {
      id: 3,
      date: "2023-07-20",
      type: "Annual Physical",
      diagnosis: "Normal examination",
      treatment: "Routine care",
      doctor: "Dr. Smith",
      notes: "All vital signs normal. Lab work ordered.",
      followUp: "1 year",
    },
  ]);

  const [medications] = useState<Medication[]>([
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2023-10-15",
      endDate: "",
      status: "active",
      prescribedBy: "Dr. Smith",
      notes: "Take in the morning. Monitor blood pressure.",
    },
    {
      id: 2,
      name: "Vitamin D3",
      dosage: "2000 IU",
      frequency: "Once daily",
      startDate: "2023-07-20",
      endDate: "",
      status: "active",
      prescribedBy: "Dr. Smith",
      notes: "For vitamin D deficiency",
    },
    {
      id: 3,
      name: "Ibuprofen",
      dosage: "400mg",
      frequency: "As needed",
      startDate: "2023-09-10",
      endDate: "2023-09-20",
      status: "completed",
      prescribedBy: "Dr. Smith",
      notes: "For back pain - completed course",
    },
  ]);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  const getMedicationStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "discontinued":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateAge = (birthDate: string) => {
    // This would normally calculate from birth date
    return selectedPatient?.age || 0;
  };

  const getHealthSummary = () => {
    if (!selectedPatient) return null;

    const activeRx = medications.filter(
      (med) => med.status === "active",
    ).length;
    const lastVisitType = visitHistory[0]?.type || "No visits";
    const lastDiagnosis = visitHistory[0]?.diagnosis || "No diagnosis";

    return {
      activeRx,
      lastVisitType,
      lastDiagnosis,
      totalVisits: visitHistory.length,
    };
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Medical History
          </h1>
          <p className="text-muted-foreground mt-1">
            View patient visit history and medications
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/patient-records")}
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <FileText className="h-4 w-4 mr-2" />
            Patient Records
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/appointments")}
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Visit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Patient List */}
        <div className="lg:col-span-1">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Patients
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedPatient?.id === patient.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:bg-muted/30"
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm">
                      {patient.name}
                    </h4>
                    <Badge className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      ID: {patient.patientId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Age: {patient.age}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last visit: {patient.lastVisit}
                    </p>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        Visits: {patient.totalVisits}
                      </span>
                      <span className="text-muted-foreground">
                        Meds: {patient.activeMedications}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Patient Details */}
        <div className="lg:col-span-3">
          {selectedPatient ? (
            <div className="space-y-6">
              {/* Patient Header */}
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">
                        {selectedPatient.name}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>ID: {selectedPatient.patientId}</span>
                        <span>Age: {selectedPatient.age}</span>
                        <span>Phone: {selectedPatient.phone}</span>
                        <span>Email: {selectedPatient.email}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => navigate("/patient-records")}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        New Record
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Patient
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Navigation Tabs */}
              <div className="flex gap-2">
                {[
                  { id: "summary", label: "Summary", icon: Eye },
                  { id: "visits", label: "Visit History", icon: Calendar },
                  { id: "medications", label: "Medications", icon: Pill },
                ].map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "outline"}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className="hover:scale-105 active:scale-95 transition-transform duration-150"
                    >
                      <IconComponent className="h-4 w-4 mr-2" />
                      {tab.label}
                    </Button>
                  );
                })}
              </div>

              {/* Tab Content */}
              {activeTab === "summary" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Health Summary */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-red-600" />
                        Health Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Total Visits</p>
                          <p className="text-xl font-bold text-foreground">
                            {getHealthSummary()?.totalVisits}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Active Medications
                          </p>
                          <p className="text-xl font-bold text-foreground">
                            {getHealthSummary()?.activeRx}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Visit</p>
                          <p className="font-medium text-foreground">
                            {selectedPatient.lastVisit}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Last Visit Type
                          </p>
                          <p className="font-medium text-foreground">
                            {getHealthSummary()?.lastVisitType}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-2">
                          Recent Diagnosis
                        </p>
                        <p className="text-sm text-foreground bg-muted/30 p-2 rounded">
                          {getHealthSummary()?.lastDiagnosis}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => navigate("/appointments")}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Next Visit
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => navigate("/medications")}
                      >
                        <Pill className="h-4 w-4 mr-2" />
                        Manage Medications
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => navigate("/patient-records")}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Create Health Record
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Patient
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "visits" && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      Visit History ({visitHistory.length} visits)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {visitHistory.map((visit) => (
                        <div
                          key={visit.id}
                          className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-foreground">
                                {visit.type}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {visit.date} • {visit.doctor}
                              </p>
                            </div>
                            <Badge variant="outline">
                              {visit.followUp} follow-up
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                Diagnosis:
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {visit.diagnosis}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                Treatment:
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {visit.treatment}
                              </p>
                            </div>
                            {visit.notes && (
                              <div>
                                <p className="text-sm font-medium text-foreground">
                                  Notes:
                                </p>
                                <p className="text-sm text-muted-foreground bg-muted/30 p-2 rounded">
                                  {visit.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "medications" && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Pill className="h-5 w-5 text-green-600" />
                      Medications (
                      {
                        medications.filter((med) => med.status === "active")
                          .length
                      }{" "}
                      active)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {medications.map((medication) => (
                        <div
                          key={medication.id}
                          className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-foreground">
                                {medication.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {medication.dosage} • {medication.frequency}
                              </p>
                            </div>
                            <Badge
                              className={getMedicationStatusColor(
                                medication.status,
                              )}
                            >
                              {medication.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Started:</p>
                              <p className="text-foreground">
                                {medication.startDate}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">
                                Prescribed by:
                              </p>
                              <p className="text-foreground">
                                {medication.prescribedBy}
                              </p>
                            </div>
                          </div>
                          {medication.notes && (
                            <div className="mt-2">
                              <p className="text-sm text-muted-foreground bg-muted/30 p-2 rounded">
                                {medication.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="glass-card h-96 flex items-center justify-center">
              <div className="text-center">
                <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Patient Selected
                </h3>
                <p className="text-muted-foreground mb-4">
                  Select a patient from the list to view their medical history
                </p>
                <Button onClick={() => navigate("/new-patient")}>
                  Add New Patient
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
