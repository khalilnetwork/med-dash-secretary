
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, FileText, AlertTriangle, Plus, MessageSquare, Bell, Heart, Activity } from 'lucide-react';

export const Dashboard = () => {
  const metrics = [
    {
      title: "Today's Appointments",
      value: "28",
      change: "+12%",
      icon: Calendar,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      message: "Great day ahead with your scheduled appointments!",
    },
    {
      title: "Pending Intake Forms",
      value: "7",
      change: "-3%",
      icon: FileText,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
      message: "Almost there! A few more forms to complete.",
    },
    {
      title: "Pending Refills",
      value: "12",
      change: "+8%",
      icon: Heart,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      message: "Helping patients stay healthy with their medications.",
    },
    {
      title: "Lab Alerts",
      value: "3",
      change: "0%",
      icon: Activity,
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      message: "Quick review needed for optimal patient care.",
    },
  ];

  const checkInQueue = [
    {
      id: 1,
      name: "Sarah Johnson",
      time: "9:00 AM",
      status: "Arrived",
      avatar: "SJ",
      healthStatus: "normal"
    },
    {
      id: 2,
      name: "Michael Chen",
      time: "9:15 AM",
      status: "Waiting",
      avatar: "MC",
      healthStatus: "normal"
    },
    {
      id: 3,
      name: "Emily Davis",
      time: "9:30 AM",
      status: "Roomed",
      avatar: "ED",
      healthStatus: "attention"
    },
    {
      id: 4,
      name: "Robert Wilson",
      time: "9:45 AM",
      status: "Pending",
      avatar: "RW",
      healthStatus: "normal"
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Arrived: "bg-green-500/20 text-green-300 border-green-500/30",
      Waiting: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      Roomed: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      Pending: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    };
    return statusConfig[status as keyof typeof statusConfig] || "bg-gray-500/20 text-gray-300 border-gray-500/30";
  };

  const getHealthStatusClass = (status: string) => {
    const statusClasses = {
      normal: "border-l-green-400",
      attention: "border-l-yellow-400",
      urgent: "border-l-red-400"
    };
    return statusClasses[status as keyof typeof statusClasses] || "border-l-gray-400";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Good morning! Ready to help patients today? 🌟
          </h1>
          <p className="text-muted-foreground mt-1">Your wellness dashboard - keeping care connected</p>
        </div>
        <div className="flex gap-3">
          <Button className="glass-card hover:neon-glow transition-all duration-300">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
          <Button variant="outline" className="glass-subtle hover:glass-card transition-all duration-300">
            <MessageSquare className="h-4 w-4 mr-2" />
            📄 Send Intake Form
          </Button>
          <Button variant="outline" className="glass-subtle hover:glass-card transition-all duration-300">
            <Bell className="h-4 w-4 mr-2" />
            🔔 Batch Reminders
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const IconComponent = metric.icon;
          return (
            <Card key={metric.title} className="glass-card hover:glass-elevated transition-all duration-300 slide-up">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div className={`p-3 rounded-xl ${metric.bgColor} pulse-gentle`}>
                  <IconComponent className={`h-5 w-5 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">{metric.value}</div>
                <p className="text-xs text-muted-foreground mb-2">
                  <span className={metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                    {metric.change}
                  </span>
                  {' '}from yesterday
                </p>
                <p className="text-xs text-blue-300 italic">{metric.message}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5 text-blue-400" />
              Live Check-In Queue
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 pulse-gentle">
                Live Updates
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {checkInQueue.map((patient) => (
                <div
                  key={patient.id}
                  className={`flex items-center justify-between p-4 glass-subtle rounded-xl border-l-4 ${getHealthStatusClass(patient.healthStatus)} hover:glass-card transition-all duration-200`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-medium shadow-lg">
                      {patient.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{patient.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {patient.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusBadge(patient.status)}>
                      {patient.status}
                    </Badge>
                    <div className="flex gap-2">
                      <button className="quick-action-btn">
                        ✅ Complete
                      </button>
                      <button className="quick-action-btn">
                        📞 Call
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              Wellness Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 border-l-4 border-green-400 glass-subtle rounded-lg">
                <p className="font-medium text-green-300">🎉 Great News!</p>
                <p className="text-sm text-muted-foreground">John Doe's lab results are perfectly normal</p>
              </div>
              <div className="p-4 border-l-4 border-yellow-400 glass-subtle rounded-lg">
                <p className="font-medium text-yellow-300">💊 Refill Ready</p>
                <p className="text-sm text-muted-foreground">Jane Smith - Metformin approved</p>
              </div>
              <div className="p-4 border-l-4 border-blue-400 glass-subtle rounded-lg">
                <p className="font-medium text-blue-300">📅 Schedule Update</p>
                <p className="text-sm text-muted-foreground">Bob Johnson successfully rescheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
