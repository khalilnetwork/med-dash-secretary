import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Calendar,
  Users,
  TrendingUp,
  Download,
  Printer,
  Mail,
  BarChart3,
  Activity,
  Heart,
  Pill,
  Clock,
} from "lucide-react";

interface TodayVisit {
  id: number;
  patientName: string;
  time: string;
  diagnosis: string;
  treatment: string;
  medications: string[];
  followUp: string;
  notes: string;
  vitals: {
    bloodPressure: string;
    temperature: string;
    pulse: string;
  };
  status: "completed" | "in-progress" | "no-show";
}

export const LabAlerts = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [reportType, setReportType] = useState<
    "summary" | "detailed" | "statistics"
  >("summary");
  const [searchTerm, setSearchTerm] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportNotes, setReportNotes] = useState("");

  const [todaysVisits, setTodaysVisits] = useState<TodayVisit[]>([
    {
      id: 1,
      patientName: "Sarah Johnson",
      time: "09:00 AM",
      diagnosis: "Hypertension follow-up",
      treatment: "Continue current medication, lifestyle counseling",
      medications: ["Lisinopril 10mg daily", "Vitamin D 2000 IU daily"],
      followUp: "3 months",
      notes: "Blood pressure well controlled. Patient reports no side effects.",
      vitals: {
        bloodPressure: "128/82",
        temperature: "98.6°F",
        pulse: "74 bpm",
      },
      status: "completed",
    },
    {
      id: 2,
      patientName: "Michael Chen",
      time: "10:30 AM",
      diagnosis: "Type 2 Diabetes management",
      treatment: "Adjust insulin dosage, dietary consultation",
      medications: [
        "Metformin 1000mg twice daily",
        "Insulin aspart 8 units before meals",
      ],
      followUp: "2 weeks",
      notes:
        "HbA1c improved to 7.2%. Continue current regimen with minor adjustments.",
      vitals: {
        bloodPressure: "134/88",
        temperature: "98.4°F",
        pulse: "78 bpm",
      },
      status: "completed",
    },
    {
      id: 3,
      patientName: "Emily Davis",
      time: "11:15 AM",
      diagnosis: "Annual physical examination",
      treatment: "Routine preventive care",
      medications: ["Multivitamin daily"],
      followUp: "1 year",
      notes:
        "All screening tests normal. Discussed preventive care recommendations.",
      vitals: {
        bloodPressure: "118/76",
        temperature: "98.2°F",
        pulse: "68 bpm",
      },
      status: "completed",
    },
    {
      id: 4,
      patientName: "Robert Wilson",
      time: "02:00 PM",
      diagnosis: "Lower back pain",
      treatment: "Physical therapy, pain management",
      medications: ["Ibuprofen 400mg as needed", "Physical therapy exercises"],
      followUp: "2 weeks",
      notes:
        "MRI shows mild disc herniation. Conservative treatment recommended.",
      vitals: {
        bloodPressure: "142/90",
        temperature: "98.8°F",
        pulse: "82 bpm",
      },
      status: "completed",
    },
    {
      id: 5,
      patientName: "Lisa Brown",
      time: "03:30 PM",
      diagnosis: "Upper respiratory infection",
      treatment: "Symptomatic care, rest",
      medications: ["Rest and fluids", "Acetaminophen as needed"],
      followUp: "As needed",
      notes: "Viral symptoms improving. No antibiotics needed.",
      vitals: {
        bloodPressure: "120/78",
        temperature: "99.2°F",
        pulse: "76 bpm",
      },
      status: "completed",
    },
  ]);

  const generateDailyReport = () => {
    const reportData = {
      date: selectedDate,
      totalPatients: todaysVisits.length,
      completedVisits: todaysVisits.filter((v) => v.status === "completed")
        .length,
      commonDiagnoses: getCommonDiagnoses(),
      medicationsPrescribed: getAllMedications(),
      followUpRequired: todaysVisits.filter(
        (v) => v.followUp !== "As needed" && v.followUp !== "1 year",
      ).length,
    };

    setReportNotes(generateReportText(reportData));
    setShowReportModal(true);
  };

  const getCommonDiagnoses = () => {
    const diagnoses = todaysVisits.map((v) => v.diagnosis);
    const counts = diagnoses.reduce(
      (acc, diagnosis) => {
        acc[diagnosis] = (acc[diagnosis] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const getAllMedications = () => {
    const allMeds = todaysVisits.flatMap((v) => v.medications);
    return [...new Set(allMeds)].filter((med) => med.length > 0);
  };

  const generateReportText = (data: any) => {
    return `DAILY MEDICAL REPORT - ${new Date(selectedDate).toLocaleDateString()}

SUMMARY:
- Total Patients Seen: ${data.totalPatients}
- Completed Visits: ${data.completedVisits}
- Follow-up Required: ${data.followUpRequired}

COMMON DIAGNOSES:
${data.commonDiagnoses.map((d: any) => `• ${d[0]} (${d[1]} cases)`).join("\n")}

MEDICATIONS PRESCRIBED:
${data.medicationsPrescribed
  .slice(0, 10)
  .map((med: string) => `• ${med}`)
  .join("\n")}

NOTES:
${reportNotes}

Generated by Dr. Smith's Office Management System`;
  };

  const downloadReport = () => {
    const reportText = generateReportText({
      date: selectedDate,
      totalPatients: todaysVisits.length,
      completedVisits: todaysVisits.filter((v) => v.status === "completed")
        .length,
      commonDiagnoses: getCommonDiagnoses(),
      medicationsPrescribed: getAllMedications(),
      followUpRequired: todaysVisits.filter(
        (v) => v.followUp !== "As needed" && v.followUp !== "1 year",
      ).length,
    });

    const blob = new Blob([reportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `daily-report-${selectedDate}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    window.print();
  };

  const emailReport = () => {
    alert(
      "📧 Report prepared for email\n\nThis would normally integrate with your email system to send the daily report to supervisors or colleagues.",
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "no-show":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <FileText className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "no-show":
        return <Users className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredVisits = todaysVisits.filter(
    (visit) =>
      visit.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const stats = {
    totalVisits: todaysVisits.length,
    completed: todaysVisits.filter((v) => v.status === "completed").length,
    followUpNeeded: todaysVisits.filter(
      (v) => v.followUp !== "As needed" && v.followUp !== "1 year",
    ).length,
    medicationsPrescribed: getAllMedications().length,
    avgVisitTime: "25 minutes", // This would be calculated from actual data
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Daily Health Reports
          </h1>
          <p className="text-muted-foreground mt-1">
            Generate comprehensive reports for today's patient visits
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/patient-records")}
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <Users className="h-4 w-4 mr-2" />
            Patient Records
          </Button>
          <Button
            onClick={generateDailyReport}
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Visits</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.totalVisits}
                </p>
              </div>
              <Users className="h-8 w-8 text-primary" />
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
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Follow-ups Needed
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.followUpNeeded}
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
                <p className="text-sm text-muted-foreground">Medications</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.medicationsPrescribed}
                </p>
              </div>
              <Pill className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Visit Time</p>
                <p className="text-lg font-bold text-purple-600">
                  {stats.avgVisitTime}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Today's Visits Summary
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-40"
                  />
                  <div className="relative">
                    <Input
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-48"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredVisits.map((visit, index) => (
                  <div
                    key={visit.id}
                    className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-all duration-200 slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {visit.patientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">
                            {visit.patientName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {visit.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(visit.status)}
                        <Badge className={getStatusColor(visit.status)}>
                          {visit.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-foreground">
                          Diagnosis:
                        </p>
                        <p className="text-muted-foreground">
                          {visit.diagnosis}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          Treatment:
                        </p>
                        <p className="text-muted-foreground">
                          {visit.treatment}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Vitals:</p>
                        <p className="text-muted-foreground">
                          BP: {visit.vitals.bloodPressure}, Temp:{" "}
                          {visit.vitals.temperature}, HR: {visit.vitals.pulse}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          Follow-up:
                        </p>
                        <p className="text-muted-foreground">
                          {visit.followUp}
                        </p>
                      </div>
                    </div>

                    {visit.medications.length > 0 && (
                      <div className="mt-3">
                        <p className="font-medium text-foreground text-sm mb-1">
                          Medications:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {visit.medications.map((med, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {med}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {visit.notes && (
                      <div className="mt-3 p-2 bg-muted/30 rounded text-sm">
                        <p className="font-medium text-foreground mb-1">
                          Notes:
                        </p>
                        <p className="text-muted-foreground">{visit.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Report Generation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={generateDailyReport}
                  className="w-full hover:scale-105 active:scale-95 transition-transform duration-150"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Daily Report
                </Button>

                <Button
                  variant="outline"
                  onClick={downloadReport}
                  className="w-full hover:scale-105 active:scale-95 transition-transform duration-150"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>

                <Button
                  variant="outline"
                  onClick={printReport}
                  className="w-full hover:scale-105 active:scale-95 transition-transform duration-150"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Report
                </Button>

                <Button
                  variant="outline"
                  onClick={emailReport}
                  className="w-full hover:scale-105 active:scale-95 transition-transform duration-150"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Report
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Today's Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Common Diagnoses:</h4>
                  {getCommonDiagnoses()
                    .slice(0, 3)
                    .map((diagnosis, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {diagnosis[0]}
                        </span>
                        <span className="font-medium">{diagnosis[1]}</span>
                      </div>
                    ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Key Metrics:</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Completion Rate:
                      </span>
                      <span className="font-medium text-green-600">
                        {Math.round(
                          (stats.completed / stats.totalVisits) * 100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Follow-ups:</span>
                      <span className="font-medium text-yellow-600">
                        {stats.followUpNeeded}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-[500px] glass-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Lab Alert Details: {selectedAlert.patientName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Test Type
                  </p>
                  <p className="font-medium">{selectedAlert.testType}</p>
                </div>
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Result
                  </p>
                  <p
                    className={`font-bold ${getFlagColor(selectedAlert.flagType)}`}
                  >
                    {selectedAlert.value} (
                    {selectedAlert.flagType.toUpperCase()})
                  </p>
                </div>
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Normal Range
                  </p>
                  <p>{selectedAlert.normalRange}</p>
                </div>
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Severity
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${getSeverityColor(selectedAlert.severity)}`}
                    ></div>
                    <span className="capitalize">{selectedAlert.severity}</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Ordering Physician
                  </p>
                  <p>{selectedAlert.orderingPhysician}</p>
                </div>
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Result Date
                  </p>
                  <p>{selectedAlert.resultDate}</p>
                </div>
              </div>

              {selectedAlert.notes && (
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Notes
                  </p>
                  <p className="text-sm bg-muted p-2 rounded">
                    {selectedAlert.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => {
                    updateAlertStatus(selectedAlert.id, "reviewed");
                    setShowDetailModal(false);
                  }}
                  className="flex-1"
                >
                  Mark as Reviewed
                </Button>
                <Button
                  onClick={() => setShowDetailModal(false)}
                  variant="outline"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
