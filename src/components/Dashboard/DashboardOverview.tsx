import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  FileText,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Recycle,
  Battery,
  MapPin,
  Activity,
} from "lucide-react";

const DashboardOverview = () => {
  // Sample data - in a real app, this would come from an API
  const stats = {
    totalComplaints: 156,
    completedComplaints: 89,
    pendingComplaints: 67,
    totalBins: 240,
    activeBins: 198,
    maintenanceBins: 23,
    offlineBins: 19,
    weeklyGrowth: 12.5,
  };

  const recentComplaints = [
    {
      id: "WM-156",
      location: "Main Street Plaza",
      status: "pending",
      priority: "high",
      reportCount: 8,
      timeAgo: "2 mins ago",
    },
    {
      id: "WM-155",
      location: "Tech Park Building 5",
      status: "completed",
      priority: "medium",
      reportCount: 3,
      timeAgo: "15 mins ago",
    },
    {
      id: "WM-154",
      location: "Shopping Center Block B",
      status: "pending",
      priority: "high",
      reportCount: 12,
      timeAgo: "1 hour ago",
    },
  ];

  const binAlerts = [
    {
      id: "SB-045",
      location: "University Campus",
      issue: "Battery Low (15%)",
      severity: "warning",
      timeAgo: "30 mins ago",
    },
    {
      id: "SB-067",
      location: "City Center Mall",
      issue: "Sensor Offline",
      severity: "critical",
      timeAgo: "1 hour ago",
    },
    {
      id: "SB-023",
      location: "Residential Area Zone C",
      issue: "Near Full (87%)",
      severity: "warning",
      timeAgo: "2 hours ago",
    },
  ];

  const completionRate = Math.round((stats.completedComplaints / stats.totalComplaints) * 100);
  const binHealthRate = Math.round((stats.activeBins / stats.totalBins) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome to the Smart Waste Management System</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="dashboard-card border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Complaints</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalComplaints}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-success" />
                  <span className="text-xs text-success">+{stats.weeklyGrowth}% this week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">{stats.completedComplaints}</p>
                <div className="mt-2">
                  <Progress value={completionRate} className="h-1 bg-success/20" />
                  <span className="text-xs text-muted-foreground mt-1">{completionRate}% completion rate</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">{stats.pendingComplaints}</p>
                <div className="mt-2">
                  <Badge className="bg-warning/20 text-warning border-warning/30">
                    Requires Attention
                  </Badge>
                </div>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Smart Bins</p>
                <p className="text-2xl font-bold text-accent">{stats.totalBins}</p>
                <div className="mt-2">
                  <Progress value={binHealthRate} className="h-1 bg-accent/20" />
                  <span className="text-xs text-muted-foreground mt-1">{binHealthRate}% operational</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Recycle className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Complaints */}
        <Card className="dashboard-card">
          <CardHeader className="dashboard-card-header">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Recent Complaints
            </CardTitle>
            <CardDescription>Latest citizen reports requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="dashboard-card-content">
            <div className="space-y-4">
              {recentComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-primary">{complaint.id}</span>
                      <Badge
                        className={
                          complaint.priority === "high"
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-warning text-warning-foreground"
                        }
                      >
                        {complaint.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {complaint.location}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {complaint.reportCount} reports
                      </span>
                      <span className="text-xs text-muted-foreground">• {complaint.timeAgo}</span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      complaint.status === "completed"
                        ? "border-success text-success"
                        : "border-warning text-warning"
                    }
                  >
                    {complaint.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bin Alerts */}
        <Card className="dashboard-card">
          <CardHeader className="dashboard-card-header">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Smart Bin Alerts
            </CardTitle>
            <CardDescription>Sensor issues and maintenance requirements</CardDescription>
          </CardHeader>
          <CardContent className="dashboard-card-content">
            <div className="space-y-4">
              {binAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-primary">{alert.id}</span>
                      <Badge
                        className={
                          alert.severity === "critical"
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-warning text-warning-foreground"
                        }
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {alert.location}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Battery className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-foreground font-medium">{alert.issue}</span>
                      <span className="text-xs text-muted-foreground">• {alert.timeAgo}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health Summary */}
      <Card className="dashboard-card">
        <CardHeader className="dashboard-card-header">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System Health Summary
          </CardTitle>
          <CardDescription>Overall performance metrics and system status</CardDescription>
        </CardHeader>
        <CardContent className="dashboard-card-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <p className="text-2xl font-bold text-success">{stats.activeBins}</p>
              <p className="text-sm text-muted-foreground">Active Bins</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
              <p className="text-2xl font-bold text-warning">{stats.maintenanceBins}</p>
              <p className="text-sm text-muted-foreground">Maintenance</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <p className="text-2xl font-bold text-destructive">{stats.offlineBins}</p>
              <p className="text-sm text-muted-foreground">Offline</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">{completionRate}%</p>
              <p className="text-sm text-muted-foreground">Efficiency</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;