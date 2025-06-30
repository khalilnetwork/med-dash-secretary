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

  const [refills, setRefills] = useState<Refill[]>([
    {
      id: 1,
      patientName: "Sarah Johnson",
      medication: "Metformin",
      dosage: "500mg",
      quantity: 90,
      refillsRemaining: 2,
      requestDate: "2024-01-15",
      urgency: "medium",
      status: "pending",
      prescriber: "Dr. Smith",
      lastFilled: "2023-12-15",
      notes: "Patient reports good tolerance",
    },
    {
      id: 2,
      patientName: "Michael Chen",
      medication: "Lisinopril",
      dosage: "10mg",
      quantity: 30,
      refillsRemaining: 0,
      requestDate: "2024-01-15",
      urgency: "high",
      status: "pending",
      prescriber: "Dr. Johnson",
      lastFilled: "2023-12-20",
      notes: "Needs new prescription - no refills remaining",
    },
    {
      id: 3,
      patientName: "Emily Davis",
      medication: "Levothyroxine",
      dosage: "75mcg",
      quantity: 90,
      refillsRemaining: 3,
      requestDate: "2024-01-14",
      urgency: "low",
      status: "approved",
      prescriber: "Dr. Wilson",
      lastFilled: "2023-11-14",
    },
    {
      id: 4,
      patientName: "Robert Wilson",
      medication: "Atorvastatin",
      dosage: "20mg",
      quantity: 30,
      refillsRemaining: 1,
      requestDate: "2024-01-16",
      urgency: "urgent",
      status: "processing",
      prescriber: "Dr. Brown",
      lastFilled: "2023-12-16",
      notes: "Patient out of medication",
    },
    {
      id: 5,
      patientName: "Lisa Brown",
      medication: "Amlodipine",
      dosage: "5mg",
      quantity: 90,
      refillsRemaining: 4,
      requestDate: "2024-01-13",
      urgency: "medium",
      status: "ready",
      prescriber: "Dr. Davis",
      lastFilled: "2023-10-13",
    },
    {
      id: 6,
      patientName: "David Kim",
      medication: "Omeprazole",
      dosage: "20mg",
      quantity: 30,
      refillsRemaining: 2,
      requestDate: "2024-01-12",
      urgency: "low",
      status: "denied",
      prescriber: "Dr. Wilson",
      lastFilled: "2023-12-12",
      notes: "Too early for refill",
    },
  ]);

  // Debounced search
  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const timeout = setTimeout(() => setIsSearching(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [searchTerm]);

  const updateRefillStatus = (refillId: number, newStatus: string) => {
    setRefills((prev) =>
      prev.map((refill) =>
        refill.id === refillId
          ? { ...refill, status: newStatus as Refill["status"] }
          : refill,
      ),
    );

    const refill = refills.find((r) => r.id === refillId);
    setTimeout(() => {
      alert(
        `✅ ${refill?.medication} refill for ${refill?.patientName} ${newStatus}!`,
      );
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

  const filteredRefills = refills.filter((refill) => {
    const matchesSearch =
      refill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      refill.medication.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || refill.status === statusFilter;
    const matchesUrgency =
      urgencyFilter === "all" || refill.urgency === urgencyFilter;
    return matchesSearch && matchesStatus && matchesUrgency;
  });

  const stats = {
    total: refills.length,
    pending: refills.filter((r) => r.status === "pending").length,
    approved: refills.filter((r) => r.status === "approved").length,
    urgent: refills.filter((r) => r.urgency === "urgent").length,
  };

  const approveAll = () => {
    const pendingRefills = refills.filter((r) => r.status === "pending");
    setRefills((prev) =>
      prev.map((refill) =>
        refill.status === "pending"
          ? { ...refill, status: "approved" }
          : refill,
      ),
    );
    setTimeout(
      () => alert(`✅ ${pendingRefills.length} refills approved!`),
      100,
    );
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Prescription Refills
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage medication refill requests
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={approveAll}
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve All Pending
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
