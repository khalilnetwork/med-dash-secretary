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

  const updateCallStatus = (
    callId: number,
    newStatus: string,
    notes?: string,
  ) => {
    setCalls((prev) =>
      prev.map((call) =>
        call.id === callId
          ? {
              ...call,
              status: newStatus as FollowUpCall["status"],
              notes: notes || call.notes,
              attempts: call.attempts + 1,
              lastContact: new Date().toISOString().split("T")[0],
            }
          : call,
      ),
    );

    const call = calls.find((c) => c.id === callId);
    setTimeout(() => {
      alert(`📞 Call to ${call?.patientName} marked as ${newStatus}!`);
    }, 100);
  };

  const makeCall = (call: FollowUpCall) => {
    setSelectedCall(call);
    setCallNotes("");
    setShowCallModal(true);
    // Simulate making a call
    setTimeout(() => {
      alert(`📞 Calling ${call.patientName} at ${call.phone}...`);
    }, 100);
  };

  const completeCall = (status: string) => {
    if (selectedCall) {
      updateCallStatus(selectedCall.id, status, callNotes);
      setShowCallModal(false);
      setSelectedCall(null);
      setCallNotes("");
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

  const filteredCalls = calls.filter((call) => {
    const matchesSearch =
      call.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || call.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || call.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: calls.length,
    scheduled: calls.filter((c) => c.status === "scheduled").length,
    completed: calls.filter((c) => c.status === "completed").length,
    noAnswer: calls.filter((c) => c.status === "no-answer").length,
    urgent: calls.filter((c) => c.priority === "urgent").length,
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
            Follow-Up Calls
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage patient follow-up communications
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={callAllScheduled}
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            <PhoneCall className="h-4 w-4 mr-2" />
            Start Call Queue
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Calls</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.total}
                </p>
              </div>
              <Phone className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.scheduled}
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
                <p className="text-sm text-muted-foreground">No Answer</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.noAnswer}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
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
              <Phone className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Call List
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search patients or reasons..."
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
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="no-answer">No Answer</option>
                <option value="rescheduled">Rescheduled</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Priority</option>
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
                <TableHead>Contact</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attempts</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.map((call) => (
                <TableRow
                  key={call.id}
                  className="hover:bg-muted/30 transition-colors duration-200"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                        {call.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium">{call.patientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {call.assignedTo}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{call.phone}</p>
                      <p className="text-sm text-muted-foreground">
                        Last: {call.lastContact}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{call.reason}</p>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{call.scheduledDate}</p>
                      <p className="text-muted-foreground">
                        {call.scheduledTime}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${getPriorityColor(call.priority)}`}
                      ></div>
                      <span className="text-sm capitalize">
                        {call.priority}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(call.status)}
                      <Badge className={getStatusColor(call.status)}>
                        {call.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{call.attempts}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {call.status === "scheduled" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => makeCall(call)}
                            className="hover:scale-105 active:scale-95 transition-transform duration-150"
                          >
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateCallStatus(call.id, "rescheduled")
                            }
                            className="hover:scale-105 active:scale-95 transition-transform duration-150"
                          >
                            Reschedule
                          </Button>
                        </>
                      )}
                      {call.status === "no-answer" && (
                        <Button
                          size="sm"
                          onClick={() => makeCall(call)}
                          className="hover:scale-105 active:scale-95 transition-transform duration-150"
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Retry
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

      {/* Call Modal */}
      {showCallModal && selectedCall && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 glass-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Call in Progress: {selectedCall.patientName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p>
                  <strong>Phone:</strong> {selectedCall.phone}
                </p>
                <p>
                  <strong>Reason:</strong> {selectedCall.reason}
                </p>
                <p>
                  <strong>Priority:</strong> {selectedCall.priority}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Call Notes:</label>
                <Textarea
                  value={callNotes}
                  onChange={(e) => setCallNotes(e.target.value)}
                  placeholder="Enter call notes..."
                  className="min-h-20"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => completeCall("completed")}
                  className="flex-1"
                >
                  Completed
                </Button>
                <Button
                  onClick={() => completeCall("no-answer")}
                  variant="outline"
                  className="flex-1"
                >
                  No Answer
                </Button>
                <Button
                  onClick={() => setShowCallModal(false)}
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
