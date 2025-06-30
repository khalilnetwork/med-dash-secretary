import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Search,
  Plus,
  Save,
  User,
  Heart,
  Activity,
  AlertTriangle,
  Calendar,
  Phone,
} from "lucide-react";

interface HealthRecord {
  id: number;
  patientName: string;
  patientId: string;
  age: number;
  lastVisit: string;
  condition: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "active" | "completed" | "pending";
}

export const PatientRecords = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<HealthRecord | null>(
    null,
  );
  const [showNewRecordForm, setShowNewRecordForm] = useState(false);

  const [healthSummary, setHealthSummary] = useState({
    chiefComplaint: "",
    symptomsDescription: "",
    symptomsDuration: "",
    painLevel: "",
    vitalSigns: {
      bloodPressure: "",
      temperature: "",
      pulse: "",
      respiratoryRate: "",
      oxygenSaturation: "",
    },
    physicalExamination: "",
    currentMedications: "",
    allergies: "",
    familyHistory: "",
    socialHistory: "",
    reviewOfSystems: "",
    assessment: "",
    treatmentPlan: "",
    followUpInstructions: "",
    nextAppointment: "",
  });

  const [patients] = useState<HealthRecord[]>([
    {
      id: 1,
      patientName: "Sarah Johnson",
      patientId: "PAT001",
      age: 34,
      lastVisit: "2024-01-10",
      condition: "Hypertension follow-up",
      priority: "medium",
      status: "active",
    },
    {
      id: 2,
      patientName: "Michael Chen",
      patientId: "PAT002",
      age: 45,
      lastVisit: "2024-01-12",
      condition: "Diabetes management",
      priority: "high",
      status: "pending",
    },
    {
      id: 3,
      patientName: "Emily Davis",
      patientId: "PAT003",
      age: 28,
      lastVisit: "2024-01-08",
      condition: "Annual checkup",
      priority: "low",
      status: "completed",
    },
    {
      id: 4,
      patientName: "Robert Wilson",
      patientId: "PAT004",
      age: 67,
      lastVisit: "2024-01-15",
      condition: "Chest pain evaluation",
      priority: "urgent",
      status: "active",
    },
    {
      id: 5,
      patientName: "Lisa Brown",
      patientId: "PAT005",
      age: 52,
      lastVisit: "2024-01-11",
      condition: "Medication review",
      priority: "medium",
      status: "pending",
    },
  ]);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("vitalSigns.")) {
      const vitalField = field.split(".")[1];
      setHealthSummary((prev) => ({
        ...prev,
        vitalSigns: {
          ...prev.vitalSigns,
          [vitalField]: value,
        },
      }));
    } else {
      setHealthSummary((prev) => ({ ...prev, [field]: value }));
    }
  };

  const saveHealthRecord = () => {
    if (!selectedPatient) {
      alert("Please select a patient first");
      return;
    }

    if (!healthSummary.chiefComplaint.trim()) {
      alert("Please enter the chief complaint");
      return;
    }

    setTimeout(() => {
      alert(
        `✅ Health record saved for ${selectedPatient.patientName}!\n\nRecord updated with today's visit information.`,
      );
      setHealthSummary({
        chiefComplaint: "",
        symptomsDescription: "",
        symptomsDuration: "",
        painLevel: "",
        vitalSigns: {
          bloodPressure: "",
          temperature: "",
          pulse: "",
          respiratoryRate: "",
          oxygenSaturation: "",
        },
        physicalExamination: "",
        currentMedications: "",
        allergies: "",
        familyHistory: "",
        socialHistory: "",
        reviewOfSystems: "",
        assessment: "",
        treatmentPlan: "",
        followUpInstructions: "",
        nextAppointment: "",
      });
      setSelectedPatient(null);
      setShowNewRecordForm(false);
    }, 100);
  };

  const startNewRecord = (patient: HealthRecord) => {
    setSelectedPatient(patient);
    setShowNewRecordForm(true);
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Patient Records
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and manage patient health summaries
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/medical-history")}
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Medical History
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/new-patient")}
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Patient
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="lg:col-span-1">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Select Patient
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
                    <h4 className="font-medium text-foreground">
                      {patient.patientName}
                    </h4>
                    <Badge className={getPriorityColor(patient.priority)}>
                      {patient.priority}
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
                    <p className="text-sm text-foreground">
                      {patient.condition}
                    </p>
                    <Badge className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </div>
                  {selectedPatient?.id === patient.id && (
                    <Button
                      size="sm"
                      className="w-full mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        startNewRecord(patient);
                      }}
                    >
                      Create Health Record
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Health Record Form */}
        <div className="lg:col-span-2">
          {showNewRecordForm && selectedPatient ? (
            <div className="space-y-6">
              {/* Patient Info Header */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Health Record: {selectedPatient.patientName}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Patient ID: {selectedPatient.patientId} • Age:{" "}
                    {selectedPatient.age} • Date:{" "}
                    {new Date().toLocaleDateString()}
                  </div>
                </CardHeader>
              </Card>

              {/* Chief Complaint & Symptoms */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Chief Complaint & Symptoms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chiefComplaint">Chief Complaint *</Label>
                    <Textarea
                      id="chiefComplaint"
                      value={healthSummary.chiefComplaint}
                      onChange={(e) =>
                        handleInputChange("chiefComplaint", e.target.value)
                      }
                      placeholder="Primary reason for today's visit..."
                      className="min-h-20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="symptomsDescription">
                        Symptoms Description
                      </Label>
                      <Textarea
                        id="symptomsDescription"
                        value={healthSummary.symptomsDescription}
                        onChange={(e) =>
                          handleInputChange(
                            "symptomsDescription",
                            e.target.value,
                          )
                        }
                        placeholder="Describe symptoms in detail..."
                        className="min-h-20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="symptomsDuration">Duration</Label>
                      <Input
                        id="symptomsDuration"
                        value={healthSummary.symptomsDuration}
                        onChange={(e) =>
                          handleInputChange("symptomsDuration", e.target.value)
                        }
                        placeholder="e.g., 2 days, 1 week"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="painLevel">Pain Level (0-10)</Label>
                    <Input
                      id="painLevel"
                      type="number"
                      min="0"
                      max="10"
                      value={healthSummary.painLevel}
                      onChange={(e) =>
                        handleInputChange("painLevel", e.target.value)
                      }
                      placeholder="0 = No pain, 10 = Severe pain"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Vital Signs */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-red-600" />
                    Vital Signs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodPressure">Blood Pressure</Label>
                      <Input
                        id="bloodPressure"
                        value={healthSummary.vitalSigns.bloodPressure}
                        onChange={(e) =>
                          handleInputChange(
                            "vitalSigns.bloodPressure",
                            e.target.value,
                          )
                        }
                        placeholder="120/80"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temperature (°F)</Label>
                      <Input
                        id="temperature"
                        value={healthSummary.vitalSigns.temperature}
                        onChange={(e) =>
                          handleInputChange(
                            "vitalSigns.temperature",
                            e.target.value,
                          )
                        }
                        placeholder="98.6"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pulse">Pulse (bpm)</Label>
                      <Input
                        id="pulse"
                        value={healthSummary.vitalSigns.pulse}
                        onChange={(e) =>
                          handleInputChange("vitalSigns.pulse", e.target.value)
                        }
                        placeholder="72"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="respiratoryRate">Respiratory Rate</Label>
                      <Input
                        id="respiratoryRate"
                        value={healthSummary.vitalSigns.respiratoryRate}
                        onChange={(e) =>
                          handleInputChange(
                            "vitalSigns.respiratoryRate",
                            e.target.value,
                          )
                        }
                        placeholder="16"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="oxygenSaturation">
                        O2 Saturation (%)
                      </Label>
                      <Input
                        id="oxygenSaturation"
                        value={healthSummary.vitalSigns.oxygenSaturation}
                        onChange={(e) =>
                          handleInputChange(
                            "vitalSigns.oxygenSaturation",
                            e.target.value,
                          )
                        }
                        placeholder="98"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Clinical Assessment */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-green-600" />
                    Clinical Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="physicalExamination">
                      Physical Examination
                    </Label>
                    <Textarea
                      id="physicalExamination"
                      value={healthSummary.physicalExamination}
                      onChange={(e) =>
                        handleInputChange("physicalExamination", e.target.value)
                      }
                      placeholder="Physical examination findings..."
                      className="min-h-24"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="assessment">Assessment/Diagnosis</Label>
                      <Textarea
                        id="assessment"
                        value={healthSummary.assessment}
                        onChange={(e) =>
                          handleInputChange("assessment", e.target.value)
                        }
                        placeholder="Clinical assessment and diagnosis..."
                        className="min-h-20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="treatmentPlan">Treatment Plan</Label>
                      <Textarea
                        id="treatmentPlan"
                        value={healthSummary.treatmentPlan}
                        onChange={(e) =>
                          handleInputChange("treatmentPlan", e.target.value)
                        }
                        placeholder="Treatment recommendations..."
                        className="min-h-20"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Medical History */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Medical Background</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentMedications">
                      Current Medications
                    </Label>
                    <Textarea
                      id="currentMedications"
                      value={healthSummary.currentMedications}
                      onChange={(e) =>
                        handleInputChange("currentMedications", e.target.value)
                      }
                      placeholder="List current medications and dosages..."
                      className="min-h-16"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      value={healthSummary.allergies}
                      onChange={(e) =>
                        handleInputChange("allergies", e.target.value)
                      }
                      placeholder="Known allergies and reactions..."
                      className="min-h-16"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="familyHistory">Family History</Label>
                      <Textarea
                        id="familyHistory"
                        value={healthSummary.familyHistory}
                        onChange={(e) =>
                          handleInputChange("familyHistory", e.target.value)
                        }
                        placeholder="Relevant family medical history..."
                        className="min-h-16"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="socialHistory">Social History</Label>
                      <Textarea
                        id="socialHistory"
                        value={healthSummary.socialHistory}
                        onChange={(e) =>
                          handleInputChange("socialHistory", e.target.value)
                        }
                        placeholder="Smoking, alcohol, lifestyle factors..."
                        className="min-h-16"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Follow-up */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Follow-up Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="followUpInstructions">
                      Instructions for Patient
                    </Label>
                    <Textarea
                      id="followUpInstructions"
                      value={healthSummary.followUpInstructions}
                      onChange={(e) =>
                        handleInputChange(
                          "followUpInstructions",
                          e.target.value,
                        )
                      }
                      placeholder="Patient care instructions, medication instructions, lifestyle recommendations..."
                      className="min-h-20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nextAppointment">Next Appointment</Label>
                    <Input
                      id="nextAppointment"
                      value={healthSummary.nextAppointment}
                      onChange={(e) =>
                        handleInputChange("nextAppointment", e.target.value)
                      }
                      placeholder="e.g., 2 weeks, 1 month, as needed"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card className="glass-card">
                <CardContent className="flex gap-3 p-4">
                  <Button
                    onClick={saveHealthRecord}
                    className="flex-1 hover:scale-105 active:scale-95 transition-transform duration-150"
                    disabled={!healthSummary.chiefComplaint.trim()}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Health Record
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/schedule")}
                    className="hover:scale-105 active:scale-95 transition-transform duration-150"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Follow-up
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewRecordForm(false)}
                    className="hover:scale-105 active:scale-95 transition-transform duration-150"
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="glass-card h-96 flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Patient Selected
                </h3>
                <p className="text-muted-foreground mb-4">
                  Select a patient from the list to create their health record
                </p>
                <Button onClick={() => navigate("/new-patient")}>
                  <Plus className="h-4 w-4 mr-2" />
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
