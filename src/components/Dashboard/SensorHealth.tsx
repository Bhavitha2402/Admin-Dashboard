import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Battery,
  MapPin,
  Wifi,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SmartBin {
  id: string;
  location: string;
  sensorStatus: "active" | "inactive" | "maintenance";
  batteryLevel: number;
  fillLevel: number;
  wasteType: "general" | "recyclable" | "e-waste";
  lastUpdate: string;
  gpsCoordinates: { lat: number; lng: number };
  alerts: string[];
}

const SensorHealth = () => {
  const { toast } = useToast();
  
  const [smartBins, setSmartBins] = useState<SmartBin[]>([
    {
      id: "SB-001",
      location: "Main Street, Downtown",
      sensorStatus: "active",
      batteryLevel: 85,
      fillLevel: 67,
      wasteType: "general",
      lastUpdate: "2 mins ago",
      gpsCoordinates: { lat: 40.7128, lng: -74.0060 },
      alerts: [],
    },
    {
      id: "SB-002",
      location: "Park Avenue, Sector 5",
      sensorStatus: "maintenance",
      batteryLevel: 23,
      fillLevel: 89,
      wasteType: "recyclable",
      lastUpdate: "45 mins ago",
      gpsCoordinates: { lat: 40.7589, lng: -73.9851 },
      alerts: ["Low Battery", "Near Full"],
    },
    {
      id: "SB-003",
      location: "Tech Park, Building 7",
      sensorStatus: "active",
      batteryLevel: 92,
      fillLevel: 34,
      wasteType: "e-waste",
      lastUpdate: "1 min ago",
      gpsCoordinates: { lat: 40.7505, lng: -73.9934 },
      alerts: [],
    },
    {
      id: "SB-004",
      location: "Shopping Center, Block A",
      sensorStatus: "inactive",
      batteryLevel: 0,
      fillLevel: 78,
      wasteType: "general",
      lastUpdate: "3 hours ago",
      gpsCoordinates: { lat: 40.7282, lng: -74.0776 },
      alerts: ["Offline", "Battery Dead", "Manual Check Required"],
    },
    {
      id: "SB-005",
      location: "Residential Complex, Zone B",
      sensorStatus: "active",
      batteryLevel: 76,
      fillLevel: 45,
      wasteType: "recyclable",
      lastUpdate: "5 mins ago",
      gpsCoordinates: { lat: 40.7831, lng: -73.9712 },
      alerts: [],
    },
    {
      id: "SB-006",
      location: "University Campus, Block C",
      sensorStatus: "maintenance",
      batteryLevel: 58,
      fillLevel: 91,
      wasteType: "general",
      lastUpdate: "1 hour ago",
      gpsCoordinates: { lat: 40.7829, lng: -73.9654 },
      alerts: ["Overflowing", "Scheduled Maintenance"],
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "inactive":
        return <XCircle className="w-4 h-4 text-destructive" />;
      case "maintenance":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case "inactive":
        return <Badge className="bg-destructive text-destructive-foreground">Offline</Badge>;
      case "maintenance":
        return <Badge className="bg-warning text-warning-foreground">Maintenance</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return "bg-success";
    if (level > 30) return "bg-warning";
    return "bg-destructive";
  };

  const getFillLevelColor = (level: number) => {
    if (level < 50) return "bg-success";
    if (level < 80) return "bg-warning";
    return "bg-destructive";
  };

  const getWasteTypeColor = (type: string) => {
    switch (type) {
      case "general":
        return "bg-muted text-muted-foreground";
      case "recyclable":
        return "bg-primary text-primary-foreground";
      case "e-waste":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const refreshSensor = (id: string) => {
    toast({
      title: "Sensor Refreshed",
      description: `Requesting data update for sensor ${id}`,
    });
  };

  const healthyBins = smartBins.filter(bin => bin.sensorStatus === "active").length;
  const offlineBins = smartBins.filter(bin => bin.sensorStatus === "inactive").length;
  const maintenanceBins = smartBins.filter(bin => bin.sensorStatus === "maintenance").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Sensor Health Dashboard</h2>
        <p className="text-muted-foreground">Monitor IoT smart bins and sensor performance</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="dashboard-card border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bins</p>
                <p className="text-2xl font-bold text-foreground">{smartBins.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Healthy</p>
                <p className="text-2xl font-bold text-success">{healthyBins}</p>
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
                <p className="text-sm text-muted-foreground">Maintenance</p>
                <p className="text-2xl font-bold text-warning">{maintenanceBins}</p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-destructive/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Offline</p>
                <p className="text-2xl font-bold text-destructive">{offlineBins}</p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sensor Details */}
      <Card className="dashboard-card">
        <CardHeader className="dashboard-card-header">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Smart Bin Status Monitor
          </CardTitle>
          <CardDescription>Real-time sensor data and health monitoring</CardDescription>
        </CardHeader>
        <CardContent className="dashboard-card-content p-0">
          <div className="overflow-x-auto">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Bin ID</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Battery</th>
                  <th>Fill Level</th>
                  <th>Last Update</th>
                  <th>Alerts</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {smartBins.map((bin) => (
                  <tr key={bin.id}>
                    <td className="font-medium text-primary">{bin.id}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{bin.location}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(bin.sensorStatus)}
                        {getStatusBadge(bin.sensorStatus)}
                      </div>
                    </td>
                    <td>
                      <Badge className={getWasteTypeColor(bin.wasteType)}>
                        {bin.wasteType.replace("-", " ").toUpperCase()}
                      </Badge>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Battery className={`w-4 h-4 ${bin.batteryLevel > 30 ? 'text-success' : 'text-destructive'}`} />
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium">{bin.batteryLevel}%</span>
                          <Progress 
                            value={bin.batteryLevel} 
                            className={`h-1 w-16 ${getBatteryColor(bin.batteryLevel)}`}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Trash2 className={`w-4 h-4 ${bin.fillLevel < 80 ? 'text-success' : 'text-destructive'}`} />
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium">{bin.fillLevel}%</span>
                          <Progress 
                            value={bin.fillLevel} 
                            className={`h-1 w-16 ${getFillLevelColor(bin.fillLevel)}`}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{bin.lastUpdate}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-1">
                        {bin.alerts.length > 0 ? (
                          bin.alerts.map((alert, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-warning text-warning">
                              {alert}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="outline" className="text-xs border-success text-success">
                            No Issues
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => refreshSensor(bin.id)}
                        className="flex items-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
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

export default SensorHealth;