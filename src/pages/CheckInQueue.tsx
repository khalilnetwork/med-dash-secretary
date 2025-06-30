import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, UserCheck, Send, CheckCircle } from "lucide-react";

export const CheckInQueue = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isSearching, setIsSearching] = useState(false);

  const [patients, setPatients] = useState([
    {
      id: 1,
      time: "9:00 AM",
      name: "Sarah Johnson",
      status: "Arrived",
      intakeComplete: true,
      avatar: "SJ",
    },
    {
      id: 2,
      time: "9:15 AM",
      name: "Michael Chen",
      status: "Pending",
      intakeComplete: false,
      avatar: "MC",
    },
    {
      id: 3,
      time: "9:30 AM",
      name: "Emily Davis",
      status: "Arrived",
      intakeComplete: true,
      avatar: "ED",
    },
    {
      id: 4,
      time: "9:45 AM",
      name: "Robert Wilson",
      status: "Pending",
      intakeComplete: false,
      avatar: "RW",
    },
    {
      id: 5,
      time: "10:00 AM",
      name: "Lisa Brown",
      status: "Arrived",
      intakeComplete: false,
      avatar: "LB",
    },
  ]);

  const updatePatientStatus = (patientId: number, newStatus: string) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === patientId ? { ...patient, status: newStatus } : patient,
      ),
    );
  };

  const markAllArrived = () => {
    setPatients((prev) =>
      prev.map((patient) => ({ ...patient, status: "Arrived" })),
    );
    setTimeout(() => alert("✅ All patients marked as arrived!"), 100);
  };

  const sendReminders = () => {
    const pendingCount = patients.filter((p) => p.status === "Pending").length;
    setTimeout(
      () => alert(`📱 Reminders sent to ${pendingCount} pending patients!`),
      100,
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Arrived: "bg-green-100 text-green-800",
      Pending: "bg-gray-100 text-gray-800",
      Roomed: "bg-blue-100 text-blue-800",
    };
    return (
      statusConfig[status as keyof typeof statusConfig] ||
      "bg-gray-100 text-gray-800"
    );
  };

  // Debounced search
  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const timeout = setTimeout(() => setIsSearching(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [searchTerm]);

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || patient.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Check-In Queue</h1>
        <div className="flex gap-2">
          <Button onClick={() => alert("All patients marked as arrived!")}>
            <UserCheck className="h-4 w-4 mr-2" />
            Mark All Arrived
          </Button>
          <Button
            variant="outline"
            onClick={() => alert("Reminders sent to all patients!")}
          >
            <Send className="h-4 w-4 mr-2" />
            Send Reminders
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Today's Check-In Queue</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="arrived">Arrived</option>
                <option value="pending">Pending</option>
                <option value="roomed">Roomed</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time Slot</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Intake Complete</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.time}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                        {patient.avatar}
                      </div>
                      <span>{patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(patient.status)}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {patient.intakeComplete ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {patient.status === "Pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => alert(`Checking in ${patient.name}`)}
                        >
                          Check In
                        </Button>
                      )}
                      {patient.status === "Arrived" && (
                        <Button
                          size="sm"
                          onClick={() => alert(`Rooming ${patient.name}`)}
                        >
                          Room Patient
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
