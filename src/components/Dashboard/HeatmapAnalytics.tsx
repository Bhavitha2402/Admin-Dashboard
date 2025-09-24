import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Map,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Users,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HotspotData {
  id: string;
  location: string;
  complaintCount: number;
  severity: "high" | "medium" | "low";
  coordinates: { lat: number; lng: number };
  lastReported: string;
  category: string;
}

const HeatmapAnalytics = () => {
  const { toast } = useToast();

  const hotspots: HotspotData[] = [
    {
      id: "HS-001",
      location: "Main Street, Downtown Area",
      complaintCount: 23,
      severity: "high",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      lastReported: "2 hours ago",
      category: "Overflowing Bins",
    },
    {
      id: "HS-002",
      location: "Shopping Center, Block A",
      complaintCount: 18,
      severity: "high",
      coordinates: { lat: 40.7282, lng: -74.0776 },
      lastReported: "4 hours ago",
      category: "Sensor Malfunction",
    },
    {
      id: "HS-003",
      location: "Park Avenue, Sector 5",
      complaintCount: 12,
      severity: "medium",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      lastReported: "1 day ago",
      category: "Waste Sorting Issues",
    },
    {
      id: "HS-004",
      location: "Residential Complex, Zone B",
      complaintCount: 8,
      severity: "medium",
      coordinates: { lat: 40.7831, lng: -73.9712 },
      lastReported: "6 hours ago",
      category: "Collection Delays",
    },
    {
      id: "HS-005",
      location: "Tech Park, Building 7",
      complaintCount: 5,
      severity: "low",
      coordinates: { lat: 40.7505, lng: -73.9934 },
      lastReported: "2 days ago",
      category: "E-waste Management",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Overflowing Bins":
        return "bg-red-100 text-red-800 border-red-200";
      case "Sensor Malfunction":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Waste Sorting Issues":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Collection Delays":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "E-waste Management":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const refreshHeatmap = () => {
    toast({
      title: "Heatmap Updated",
      description: "Latest complaint data has been refreshed",
    });
  };

  const viewOnMap = (coordinates: { lat: number; lng: number }) => {
    toast({
      title: "Opening Map View",
      description: `Coordinates: ${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`,
    });
  };

  const totalComplaints = hotspots.reduce((sum, hotspot) => sum + hotspot.complaintCount, 0);
  const highSeverityCount = hotspots.filter(h => h.severity === "high").length;
  const mediumSeverityCount = hotspots.filter(h => h.severity === "medium").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Heatmap Analytics</h2>
          <p className="text-muted-foreground">Visualize complaint hotspots and sensor data across the city</p>
        </div>
        <Button onClick={refreshHeatmap} className="btn-dashboard">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="dashboard-card border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Complaints</p>
                <p className="text-2xl font-bold text-foreground">{totalComplaints}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-destructive/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-destructive">{highSeverityCount}</p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Medium Priority</p>
                <p className="text-2xl font-bold text-warning">{mediumSeverityCount}</p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold text-success">4.2h</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Placeholder */}
        <Card className="dashboard-card">
          <CardHeader className="dashboard-card-header">
            <CardTitle className="flex items-center gap-2">
              <Map className="w-5 h-5" />
              City Complaint Heatmap
            </CardTitle>
            <CardDescription>Interactive map showing complaint density by area</CardDescription>
          </CardHeader>
          <CardContent className="dashboard-card-content">
            <div className="bg-secondary/20 border-2 border-dashed border-primary/20 rounded-lg h-80 flex items-center justify-center">
              <div className="text-center">
                <Map className="w-12 h-12 text-primary/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Heatmap</h3>
                <p className="text-muted-foreground mb-4">Live complaint distribution across the city</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <Badge className="bg-red-500 text-white">High Density</Badge>
                  <Badge className="bg-yellow-500 text-black">Medium Density</Badge>
                  <Badge className="bg-green-500 text-white">Low Density</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sensor Status Map */}
        <Card className="dashboard-card">
          <CardHeader className="dashboard-card-header">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Smart Bin Locations
            </CardTitle>
            <CardDescription>Real-time sensor status and GPS data</CardDescription>
          </CardHeader>
          <CardContent className="dashboard-card-content">
            <div className="bg-secondary/20 border-2 border-dashed border-accent/20 rounded-lg h-80 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-accent/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Sensor Network</h3>
                <p className="text-muted-foreground mb-4">IoT device locations and health status</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <Badge className="bg-green-500 text-white">Online</Badge>
                  <Badge className="bg-yellow-500 text-black">Maintenance</Badge>
                  <Badge className="bg-red-500 text-white">Offline</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hotspot Details */}
      <Card className="dashboard-card">
        <CardHeader className="dashboard-card-header">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Complaint Hotspots
          </CardTitle>
          <CardDescription>Areas requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent className="dashboard-card-content p-0">
          <div className="overflow-x-auto">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Hotspot ID</th>
                  <th>Location</th>
                  <th>Complaints</th>
                  <th>Severity</th>
                  <th>Category</th>
                  <th>Last Reported</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hotspots.map((hotspot) => (
                  <tr key={hotspot.id}>
                    <td className="font-medium text-primary">{hotspot.id}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{hotspot.location}</span>
                      </div>
                    </td>
                    <td>
                      <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                        <Users className="w-3 h-3" />
                        {hotspot.complaintCount}
                      </Badge>
                    </td>
                    <td>
                      <Badge className={getSeverityColor(hotspot.severity)}>
                        {hotspot.severity.toUpperCase()}
                      </Badge>
                    </td>
                    <td>
                      <Badge variant="outline" className={getCategoryColor(hotspot.category)}>
                        {hotspot.category}
                      </Badge>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{hotspot.lastReported}</span>
                      </div>
                    </td>
                    <td>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewOnMap(hotspot.coordinates)}
                        className="flex items-center gap-2"
                      >
                        <Map className="w-4 h-4" />
                        View
                      </Button>
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

export default HeatmapAnalytics;