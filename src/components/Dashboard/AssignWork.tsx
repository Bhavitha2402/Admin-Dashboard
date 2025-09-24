import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserCheck,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Plus,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Worker {
  id: string;
  name: string;
  role: string;
  status: "available" | "busy" | "offline";
  currentTasks: number;
  completedTasks: number;
  area: string;
}

interface Assignment {
  id: string;
  complaintId: string;
  workerId: string;
  workerName: string;
  taskDescription: string;
  priority: "high" | "medium" | "low";
  status: "assigned" | "in-progress" | "completed";
  assignedAt: string;
  estimatedCompletion: string;
  location: string;
}

const AssignWork = () => {
  const { toast } = useToast();
  const [selectedComplaint, setSelectedComplaint] = useState("");
  const [selectedWorker, setSelectedWorker] = useState("");
  const [taskNotes, setTaskNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const workers: Worker[] = [
    {
      id: "W-001",
      name: "Tech Team Alpha",
      role: "Sensor Maintenance",
      status: "available",
      currentTasks: 2,
      completedTasks: 45,
      area: "Downtown District",
    },
    {
      id: "W-002",
      name: "Waste Collection Team A",
      role: "Waste Management",
      status: "busy",
      currentTasks: 5,
      completedTasks: 89,
      area: "Residential Zone A-B",
    },
    {
      id: "W-003",
      name: "IT Support Team",
      role: "System Support",
      status: "available",
      currentTasks: 1,
      completedTasks: 67,
      area: "City Wide",
    },
    {
      id: "W-004",
      name: "Maintenance Crew Beta",
      role: "Hardware Repair",
      status: "available",
      currentTasks: 3,
      completedTasks: 34,
      area: "Commercial District",
    },
    {
      id: "W-005",
      name: "Waste Collection Team B",
      role: "Waste Management",
      status: "offline",
      currentTasks: 0,
      completedTasks: 78,
      area: "Residential Zone C-D",
    },
  ];

  const availableComplaints = [
    {
      id: "WM-001",
      description: "Overflowing waste bin on Main Street causing hygiene issues",
      location: "Main Street, Downtown Area",
      priority: "high" as const,
      reportCount: 8,
    },
    {
      id: "WM-003",
      description: "E-waste bin missing - citizens dumping electronic waste in regular bins",
      location: "Shopping Center, Block A",
      priority: "high" as const,
      reportCount: 15,
    },
    {
      id: "WM-004",
      description: "Recyclable bin contamination - mixed waste found",
      location: "Residential Complex, Zone B",
      priority: "medium" as const,
      reportCount: 5,
    },
  ];

  const assignments: Assignment[] = [
    {
      id: "A-001",
      complaintId: "WM-002",
      workerId: "W-001",
      workerName: "Tech Team Alpha",
      taskDescription: "Fix broken sensor in smart bin",
      priority: "medium",
      status: "in-progress",
      assignedAt: "2024-01-15 09:30",
      estimatedCompletion: "2024-01-15 14:00",
      location: "Park Avenue, Sector 5",
    },
    {
      id: "A-002",
      complaintId: "WM-005",
      workerId: "W-003",
      workerName: "IT Support Team",
      taskDescription: "Resolve smart bin app connectivity issues",
      priority: "high",
      status: "completed",
      assignedAt: "2024-01-14 11:15",
      estimatedCompletion: "2024-01-14 16:00",
      location: "Tech Park, Building 7",
    },
    {
      id: "A-003",
      complaintId: "WM-006",
      workerId: "W-002",
      workerName: "Waste Collection Team A",
      taskDescription: "Empty overflowing bins in residential area",
      priority: "high",
      status: "assigned",
      assignedAt: "2024-01-15 08:00",
      estimatedCompletion: "2024-01-15 12:00",
      location: "Residential Complex, Zone A",
    },
  ];

  const handleAssignWork = () => {
    if (!selectedComplaint || !selectedWorker) {
      toast({
        title: "Assignment Failed",
        description: "Please select both a complaint and a worker",
        variant: "destructive",
      });
      return;
    }

    const complaint = availableComplaints.find(c => c.id === selectedComplaint);
    const worker = workers.find(w => w.id === selectedWorker);

    toast({
      title: "Work Assigned Successfully",
      description: `Complaint ${selectedComplaint} has been assigned to ${worker?.name}`,
    });

    // Reset form
    setSelectedComplaint("");
    setSelectedWorker("");
    setTaskNotes("");
  };

  const getWorkerStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-success text-success-foreground";
      case "busy":
        return "bg-warning text-warning-foreground";
      case "offline":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getAssignmentStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-primary text-primary-foreground";
      case "in-progress":
        return "bg-warning text-warning-foreground";
      case "completed":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Assign Work</h2>
        <p className="text-muted-foreground">Manage task assignments and worker allocation</p>
      </div>

      {/* Assignment Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader className="dashboard-card-header">
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create New Assignment
            </CardTitle>
            <CardDescription>Assign complaints to available workers</CardDescription>
          </CardHeader>
          <CardContent className="dashboard-card-content space-y-4">
            <div>
              <Label htmlFor="complaint-select">Select Complaint</Label>
              <Select value={selectedComplaint} onValueChange={setSelectedComplaint}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a complaint to assign" />
                </SelectTrigger>
                <SelectContent>
                  {availableComplaints.map((complaint) => (
                    <SelectItem key={complaint.id} value={complaint.id}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{complaint.id}</span>
                        <Badge className={getPriorityColor(complaint.priority)}>
                          {complaint.priority}
                        </Badge>
                        <span className="text-sm text-muted-foreground truncate">
                          {complaint.location}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="worker-select">Select Worker/Team</Label>
              <Select value={selectedWorker} onValueChange={setSelectedWorker}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a worker or team" />
                </SelectTrigger>
                <SelectContent>
                  {workers
                    .filter(worker => worker.status !== "offline")
                    .map((worker) => (
                    <SelectItem key={worker.id} value={worker.id}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{worker.name}</span>
                        <Badge className={getWorkerStatusColor(worker.status)}>
                          {worker.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {worker.currentTasks} active tasks
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="task-notes">Task Notes (Optional)</Label>
              <Textarea
                id="task-notes"
                placeholder="Add any specific instructions or notes for the assigned worker..."
                value={taskNotes}
                onChange={(e) => setTaskNotes(e.target.value)}
                rows={3}
              />
            </div>

            <Button onClick={handleAssignWork} className="w-full btn-dashboard">
              <UserCheck className="w-4 h-4 mr-2" />
              Assign Work
            </Button>
          </CardContent>
        </Card>

        {/* Worker Status */}
        <Card className="dashboard-card">
          <CardHeader className="dashboard-card-header">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Worker Status
            </CardTitle>
            <CardDescription>Current availability and workload</CardDescription>
          </CardHeader>
          <CardContent className="dashboard-card-content">
            <div className="space-y-2 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search workers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-3">
              {filteredWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className="p-3 bg-secondary/30 rounded-lg border border-border/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{worker.name}</span>
                    <Badge className={getWorkerStatusColor(worker.status)}>
                      {worker.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{worker.role} • {worker.area}</p>
                    <div className="flex items-center gap-4">
                      <span>Active: {worker.currentTasks}</span>
                      <span>Completed: {worker.completedTasks}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Assignments */}
      <Card className="dashboard-card">
        <CardHeader className="dashboard-card-header">
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Active Assignments
          </CardTitle>
          <CardDescription>Currently assigned tasks and their progress</CardDescription>
        </CardHeader>
        <CardContent className="dashboard-card-content p-0">
          <div className="overflow-x-auto">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Assignment ID</th>
                  <th>Complaint</th>
                  <th>Assigned To</th>
                  <th>Task Description</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Estimated Completion</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td className="font-medium text-primary">{assignment.id}</td>
                    <td className="font-medium text-accent">{assignment.complaintId}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{assignment.workerName}</span>
                      </div>
                    </td>
                    <td>
                      <div className="max-w-xs truncate" title={assignment.taskDescription}>
                        {assignment.taskDescription}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{assignment.location}</span>
                      </div>
                    </td>
                    <td>
                      <Badge className={getPriorityColor(assignment.priority)}>
                        {assignment.priority.toUpperCase()}
                      </Badge>
                    </td>
                    <td>
                      <Badge className={getAssignmentStatusColor(assignment.status)}>
                        {assignment.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{assignment.estimatedCompletion}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignWork;