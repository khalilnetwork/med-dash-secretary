import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, FileText } from "lucide-react";

export const IntakeTasks = () => {
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [tasks, setTasks] = useState({
    "not-started": [
      {
        id: 1,
        patientName: "Sarah Johnson",
        dueTime: "9:00 AM",
        formType: "New Patient",
        priority: "high",
      },
      {
        id: 2,
        patientName: "Michael Chen",
        dueTime: "9:15 AM",
        formType: "Update Info",
        priority: "medium",
      },
    ],
    "in-progress": [
      {
        id: 3,
        patientName: "Emily Davis",
        dueTime: "9:30 AM",
        formType: "New Patient",
        priority: "high",
      },
    ],
    completed: [
      {
        id: 4,
        patientName: "Robert Wilson",
        dueTime: "8:45 AM",
        formType: "Update Info",
        priority: "low",
      },
      {
        id: 5,
        patientName: "Lisa Brown",
        dueTime: "8:30 AM",
        formType: "New Patient",
        priority: "medium",
      },
    ],
  });

  const columns = [
    {
      id: "not-started",
      title: "Not Started",
      count: tasks["not-started"].length,
    },
    {
      id: "in-progress",
      title: "In Progress",
      count: tasks["in-progress"].length,
    },
    { id: "completed", title: "Completed", count: tasks["completed"].length },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFormTypeIcon = (formType: string) => {
    return formType === "New Patient" ? User : FileText;
  };

  const handleDragStart = (
    e: React.DragEvent,
    taskId: number,
    sourceColumn: string,
  ) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ taskId, sourceColumn }),
    );
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumn: string) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const { taskId, sourceColumn } = data;

    if (sourceColumn === targetColumn) return;

    setTasks((prev) => {
      const task = prev[sourceColumn as keyof typeof prev].find(
        (t) => t.id === taskId,
      );
      if (!task) return prev;

      return {
        ...prev,
        [sourceColumn]: prev[sourceColumn as keyof typeof prev].filter(
          (t) => t.id !== taskId,
        ),
        [targetColumn]: [...prev[targetColumn as keyof typeof prev], task],
      };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Intake Tasks</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <span>High Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-health-warning rounded-full"></div>
            <span>Medium Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-health-success rounded-full"></div>
            <span>Low Priority</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  {column.title}
                  <Badge variant="secondary" className="text-xs">
                    {column.count}
                  </Badge>
                </CardTitle>
              </CardHeader>
            </Card>

            <div
              className="space-y-3 min-h-[400px] p-2 bg-gray-50 rounded-lg"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {tasks[column.id as keyof typeof tasks].map((task) => {
                const IconComponent = getFormTypeIcon(task.formType);
                return (
                  <Card
                    key={task.id}
                    className="cursor-move hover:shadow-md transition-shadow"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">
                            {task.patientName}
                          </h3>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>Due: {task.dueTime}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <IconComponent className="h-4 w-4" />
                          <span>{task.formType}</span>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() =>
                              alert(`Viewing form for ${task.patientName}`)
                            }
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() =>
                              alert(`Editing form for ${task.patientName}`)
                            }
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
