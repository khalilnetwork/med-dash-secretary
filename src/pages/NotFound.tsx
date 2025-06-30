import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Calendar,
  Users,
  Stethoscope,
  Activity,
  Pill,
  FileText,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Calendar,
      title: "Appointments",
      description: "Schedule and manage patient visits",
      delay: "0.2s",
      onClick: () => navigate("/appointments"),
    },
    {
      icon: Users,
      title: "Patient Records",
      description: "Complete medical histories",
      delay: "0.4s",
      onClick: () => navigate("/patient-records"),
    },
    {
      icon: Pill,
      title: "Medications",
      description: "Prescription management",
      delay: "0.6s",
      onClick: () => navigate("/medications"),
    },
    {
      icon: FileText,
      title: "Daily Reports",
      description: "Health summaries & analytics",
      delay: "0.8s",
      onClick: () => navigate("/reports"),
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-sky-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Floating Medical Icons */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute animate-float-${(i % 4) + 1}`}
              style={{
                left: `${10 + i * 12}%`,
                top: `${15 + i * 8}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + (i % 3)}s`,
              }}
            >
              {i % 4 === 0 && <Heart className="h-6 w-6 text-health-mint/20" />}
              {i % 4 === 1 && (
                <Stethoscope className="h-6 w-6 text-health-sky/20" />
              )}
              {i % 4 === 2 && (
                <Activity className="h-6 w-6 text-health-warm/20" />
              )}
              {i % 4 === 3 && (
                <Pill className="h-6 w-6 text-health-success/20" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          {/* Header Section */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Logo and Brand */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-2xl">
                  <Stethoscope className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-health-success rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4 animate-gradient">
              Dr. Smith's Office
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-light">
              Family Medicine & Patient Care
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4 text-health-success animate-pulse" />
              <span>Live System</span>
              <span className="mx-2">•</span>
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className={`glass-card hover:glass-elevated cursor-pointer transition-all duration-500 ease-out hover:scale-105 group ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    animationDelay: feature.delay,
                    transitionDelay: feature.delay,
                  }}
                  onClick={feature.onClick}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-primary group-hover:text-secondary transition-colors duration-300" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Access Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ease-out ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "1s" }}
          >
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-medium bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group"
              onClick={() => navigate("/")}
            >
              <Activity className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Enter Dashboard
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-medium glass-subtle hover:glass-card transition-all duration-300 transform hover:scale-105 group"
              onClick={() => navigate("/new-patient")}
            >
              <Users className="h-5 w-5 mr-2 group-hover:animate-bounce" />
              Add New Patient
            </Button>
          </div>

          {/* Footer */}
          <div
            className={`text-center mt-16 transition-all duration-1000 ease-out ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "1.2s" }}
          >
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive healthcare management system
            </p>
            <div className="flex items-center justify-center gap-8 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Heart className="h-3 w-3 text-health-success" />
                <span>Patient Care</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-3 w-3 text-health-sky" />
                <span>Digital Records</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 text-health-warm" />
                <span>Smart Scheduling</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float-1 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes float-2 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-5deg);
          }
        }
        @keyframes float-3 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(3deg);
          }
        }
        @keyframes float-4 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-18px) rotate(-3deg);
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float-1 {
          animation: float-1 3s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 4s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float-3 3.5s ease-in-out infinite;
        }
        .animate-float-4 {
          animation: float-4 4.5s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .bg-grid-pattern {
          background-image: radial-gradient(
            circle,
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px
          );
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
