import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Heart,
  FileText,
  Save,
  X,
} from "lucide-react";

export const NewPatient = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [patientData, setPatientData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",

    // Emergency Contact
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",

    // Medical Information
    bloodType: "",
    allergies: "",
    currentMedications: "",
    medicalHistory: "",

    // Insurance
    insuranceProvider: "",
    policyNumber: "",
    groupNumber: "",

    // Visit Information
    reasonForVisit: "",
    referredBy: "",
    preferredAppointmentTime: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setPatientData((prev) => ({ ...prev, [field]: value }));
  };

  const savePatient = () => {
    // Validate required fields
    if (!patientData.firstName || !patientData.lastName || !patientData.phone) {
      alert("Please fill in all required fields (Name and Phone)");
      return;
    }

    // Simulate saving patient
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 500);
  };

  const completeAndSchedule = () => {
    setShowSuccessModal(false);
    navigate("/appointments");
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Add New Patient
          </h1>
          <p className="text-muted-foreground mt-1">
            Complete patient registration form
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={patientData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={patientData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={patientData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    value={patientData.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <select
                    id="bloodType"
                    value={patientData.bloodType}
                    onChange={(e) =>
                      handleInputChange("bloodType", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select...</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={patientData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    type="tel"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={patientData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="john.doe@email.com"
                    type="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={patientData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={patientData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Springfield"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={patientData.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                    placeholder="12345"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={patientData.allergies}
                  onChange={(e) =>
                    handleInputChange("allergies", e.target.value)
                  }
                  placeholder="List any known allergies..."
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentMedications">Current Medications</Label>
                <Textarea
                  id="currentMedications"
                  value={patientData.currentMedications}
                  onChange={(e) =>
                    handleInputChange("currentMedications", e.target.value)
                  }
                  placeholder="List current medications and dosages..."
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  value={patientData.medicalHistory}
                  onChange={(e) =>
                    handleInputChange("medicalHistory", e.target.value)
                  }
                  placeholder="Previous conditions, surgeries, family history..."
                  className="min-h-20"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Emergency Contact */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="emergencyName">Contact Name</Label>
                <Input
                  id="emergencyName"
                  value={patientData.emergencyName}
                  onChange={(e) =>
                    handleInputChange("emergencyName", e.target.value)
                  }
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Phone</Label>
                <Input
                  id="emergencyPhone"
                  value={patientData.emergencyPhone}
                  onChange={(e) =>
                    handleInputChange("emergencyPhone", e.target.value)
                  }
                  placeholder="(555) 987-6543"
                  type="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyRelation">Relationship</Label>
                <Input
                  id="emergencyRelation"
                  value={patientData.emergencyRelation}
                  onChange={(e) =>
                    handleInputChange("emergencyRelation", e.target.value)
                  }
                  placeholder="Spouse, Parent, etc."
                />
              </div>
            </CardContent>
          </Card>

          {/* Visit Information */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm">Visit Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="reasonForVisit">Reason for Visit</Label>
                <Textarea
                  id="reasonForVisit"
                  value={patientData.reasonForVisit}
                  onChange={(e) =>
                    handleInputChange("reasonForVisit", e.target.value)
                  }
                  placeholder="Brief description..."
                  className="min-h-16"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referredBy">Referred By</Label>
                <Input
                  id="referredBy"
                  value={patientData.referredBy}
                  onChange={(e) =>
                    handleInputChange("referredBy", e.target.value)
                  }
                  placeholder="Dr. Name or Self"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card className="glass-card">
            <CardContent className="p-4 space-y-3">
              <Button
                onClick={savePatient}
                className="w-full hover:scale-105 active:scale-95 transition-transform duration-150"
                disabled={
                  !patientData.firstName ||
                  !patientData.lastName ||
                  !patientData.phone
                }
              >
                <Save className="h-4 w-4 mr-2" />
                Save Patient
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate("/appointments")}
                className="w-full hover:scale-105 active:scale-95 transition-transform duration-150"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Save & Schedule Visit
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 glass-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <User className="h-5 w-5" />
                Patient Added Successfully!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-foreground font-medium">
                  {patientData.firstName} {patientData.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  has been added to the patient database
                </p>
              </div>

              <div className="flex gap-2">
                <Button onClick={completeAndSchedule} className="flex-1">
                  Schedule Appointment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/");
                  }}
                >
                  Done
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
