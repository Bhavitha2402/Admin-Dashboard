import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Recycle, Shield, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simple authentication - in a real app, this would connect to a backend
    if (username === "admin" && password === "waste2024") {
      setTimeout(() => {
        toast({
          title: "Login Successful",
          description: "Welcome to the Smart Waste Management Dashboard",
        });
        onLogin(username);
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setError("Invalid credentials. Use username: admin, password: waste2024");
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Branding */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <Recycle className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">PureCity</h1>
            <p className="text-muted-foreground mt-2">Secure Admin Dashboard Login</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="dashboard-card border-primary/20 shadow-large">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl text-primary">Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-destructive/10 border-destructive/20">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Admin Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-secondary/50 border-primary/20 focus:border-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary/50 border-primary/20 focus:border-primary"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full btn-dashboard h-11 text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  "Login to Dashboard"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground">Demo Credentials:</p>
          <div className="bg-secondary/30 rounded-lg p-3 text-sm">
            <p className="text-primary font-medium">Username: admin</p>
            <p className="text-primary font-medium">Password: waste2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;