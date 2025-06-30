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
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState<LabAlert | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [alerts, setAlerts] = useState<LabAlert[]>([
    {
      id: 1,
      patientName: "Sarah Johnson",
      testType: "Hemoglobin A1C",
      value: "9.2%",
      normalRange: "4.0-5.6%",
      severity: "high",
      status: "new",
      resultDate: "2024-01-15",
      orderingPhysician: "Dr. Smith",
      flagType: "high",
    },
    {
      id: 2,
      patientName: "Michael Chen",
      testType: "Creatinine",
      value: "2.8 mg/dL",
      normalRange: "0.7-1.3 mg/dL",
      severity: "critical",
      status: "reviewed",
      resultDate: "2024-01-15",
      orderingPhysician: "Dr. Johnson",
      flagType: "high",
      notes: "Patient contacted. Follow-up appointment scheduled.",
    },
    {
      id: 3,
      patientName: "Emily Davis",
      testType: "Potassium",
      value: "2.9 mEq/L",
      normalRange: "3.5-5.0 mEq/L",
      severity: "high",
      status: "follow-up-scheduled",
      resultDate: "2024-01-14",
      orderingPhysician: "Dr. Wilson",
      flagType: "low",
    },
    {
      id: 4,
      patientName: "Robert Wilson",
      testType: "Thyroid Stimulating Hormone",
      value: "0.1 mIU/L",
      normalRange: "0.4-4.0 mIU/L",
      severity: "medium",
      status: "acknowledged",
      resultDate: "2024-01-14",
      orderingPhysician: "Dr. Brown",
      flagType: "low",
    },
    {
      id: 5,
      patientName: "Lisa Brown",
      testType: "White Blood Cell Count",
      value: "15,200 /μL",
      normalRange: "4,000-11,000 /μL",
      severity: "high",
      status: "new",
      resultDate: "2024-01-16",
      orderingPhysician: "Dr. Davis",
      flagType: "high",
    },
    {
      id: 6,
      patientName: "David Kim",
      testType: "Troponin I",
      value: "0.8 ng/mL",
      normalRange: "<0.04 ng/mL",
      severity: "critical",
      status: "resolved",
      resultDate: "2024-01-12",
      orderingPhysician: "Dr. Wilson",
      flagType: "critical",
      notes: "Patient admitted to cardiology. Treated successfully.",
    },
    {
      id: 7,
      patientName: "Jennifer Martinez",
      testType: "Glucose (Fasting)",
      value: "250 mg/dL",
      normalRange: "70-100 mg/dL",
      severity: "high",
      status: "new",
      resultDate: "2024-01-16",
      orderingPhysician: "Dr. Smith",
      flagType: "high",
    },
    {
      id: 8,
      patientName: "Thomas Anderson",
      testType: "Hemoglobin",
      value: "6.8 g/dL",
      normalRange: "12.0-15.5 g/dL",
      severity: "critical",
      status: "new",
      resultDate: "2024-01-16",
      orderingPhysician: "Dr. Johnson",
      flagType: "low",
    },
  ]);

  const updateAlertStatus = (
    alertId: number,
    newStatus: string,
    notes?: string,
  ) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status: newStatus as LabAlert["status"],
              notes: notes || alert.notes,
            }
          : alert,
      ),
    );

    const alert = alerts.find((a) => a.id === alertId);
    setTimeout(() => {
      alert(
        `✅ ${alert?.testType} alert for ${alert?.patientName} marked as ${newStatus}!`,
      );
    }, 100);
  };

  const viewAlertDetails = (alert: LabAlert) => {
    setSelectedAlert(alert);
    setShowDetailModal(true);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Activity className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "reviewed":
        return <FileText className="h-4 w-4 text-blue-600" />;
      case "acknowledged":
        return <CheckCircle className="h-4 w-4 text-purple-600" />;
      case "follow-up-scheduled":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: "bg-red-100 text-red-800",
      reviewed: "bg-blue-100 text-blue-800",
      acknowledged: "bg-purple-100 text-purple-800",
      "follow-up-scheduled": "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
    };
    return colors[status as keyof typeof colors] || colors.new;
  };

  const getFlagColor = (flagType: string) => {
    switch (flagType) {
      case "critical":
        return "text-red-600 font-bold";
      case "high":
        return "text-red-600";
      case "low":
        return "text-blue-600";
      default:
        return "text-orange-600";
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.testType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity =
      severityFilter === "all" || alert.severity === severityFilter;
    const matchesStatus =
      statusFilter === "all" || alert.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const stats = {
    total: alerts.length,
    new: alerts.filter((a) => a.status === "new").length,
    critical: alerts.filter((a) => a.severity === "critical").length,
    resolved: alerts.filter((a) => a.status === "resolved").length,
    pending: alerts.filter((a) =>
      ["new", "reviewed", "acknowledged"].includes(a.status),
    ).length,
  };

  const acknowledgeAll = () => {
    const newAlerts = alerts.filter((a) => a.status === "new");
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.status === "new" ? { ...alert, status: "acknowledged" } : alert,
      ),
    );
    setTimeout(
      () => alert(`✅ ${newAlerts.length} new alerts acknowledged!`),
      100,
    );
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lab Alerts</h1>
          <p className="text-muted-foreground mt-1">
            Critical lab values requiring attention
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={acknowledgeAll}
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Acknowledge All New
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Alerts</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.total}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New Alerts</p>
                <p className="text-2xl font-bold text-red-600">{stats.new}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.critical}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
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
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.resolved}
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
              <AlertTriangle className="h-5 w-5 text-primary" />
              Lab Alert Dashboard
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search patients or tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Severity</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="follow-up-scheduled">Follow-up Scheduled</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Test Type</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Normal Range</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow
                  key={alert.id}
                  className="hover:bg-muted/30 transition-colors duration-200"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                        {alert.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium">{alert.patientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {alert.orderingPhysician}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{alert.testType}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-medium ${getFlagColor(alert.flagType)}`}
                      >
                        {alert.value}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${alert.flagType === "high" ? "border-red-300 text-red-700" : alert.flagType === "low" ? "border-blue-300 text-blue-700" : "border-orange-300 text-orange-700"}`}
                      >
                        {alert.flagType.toUpperCase()}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {alert.normalRange}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}`}
                      ></div>
                      <span className="text-sm capitalize">
                        {alert.severity}
                      </span>
                      {getSeverityIcon(alert.severity)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(alert.status)}
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{alert.resultDate}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => viewAlertDetails(alert)}
                        className="hover:scale-105 active:scale-95 transition-transform duration-150"
                      >
                        View
                      </Button>
                      {alert.status === "new" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() =>
                              updateAlertStatus(alert.id, "reviewed")
                            }
                            className="hover:scale-105 active:scale-95 transition-transform duration-150"
                          >
                            Review
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateAlertStatus(alert.id, "acknowledged")
                            }
                            className="hover:scale-105 active:scale-95 transition-transform duration-150"
                          >
                            Acknowledge
                          </Button>
                        </>
                      )}
                      {alert.status === "reviewed" && (
                        <Button
                          size="sm"
                          onClick={() =>
                            updateAlertStatus(alert.id, "follow-up-scheduled")
                          }
                          className="hover:scale-105 active:scale-95 transition-transform duration-150"
                        >
                          Schedule Follow-up
                        </Button>
                      )}
                      {alert.status === "follow-up-scheduled" && (
                        <Button
                          size="sm"
                          onClick={() =>
                            updateAlertStatus(alert.id, "resolved")
                          }
                          className="hover:scale-105 active:scale-95 transition-transform duration-150"
                        >
                          Resolve
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
