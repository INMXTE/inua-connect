
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import RequireAuth from "@/components/RequireAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const ADMIN_PASSWORD = "admin123"; // In a real application, this would be stored securely

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <form onSubmit={handleLogin}>
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>
                  Enter your password to access the admin dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Label htmlFor="password">Password</Label>
                  <div className="flex mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-[32px]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4">
                  Login
                </Button>
              </CardContent>
            </form>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <RequireAuth requireAdmin>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="bg-primary text-white py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p>Manage your site content and settings</p>
          </div>
        </div>
        <main className="flex-grow container mx-auto p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>Your site statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold">Total Users</h3>
                      <p className="text-2xl">1,234</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold">Active Jobs</h3>
                      <p className="text-2xl">56</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold">Resources</h3>
                      <p className="text-2xl">89</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>Manage your site content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-4">
                      <div>
                        <h3 className="font-semibold">Job Listings</h3>
                        <p className="text-sm text-gray-500">Manage job postings</p>
                      </div>
                      <Button asChild>
                        <Link to="/admin/jobs">Manage Jobs</Link>
                      </Button>
                    </div>
                    <div className="flex justify-between items-center border-b pb-4">
                      <div>
                        <h3 className="font-semibold">Resources</h3>
                        <p className="text-sm text-gray-500">Update learning resources</p>
                      </div>
                      <Button asChild>
                        <Link to="/admin/resources">Manage Resources</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input placeholder="Search users..." />
                      <Button>Search</Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-center text-gray-500">User list will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                  <CardDescription>Manage admin settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="admin-password">Change Admin Password</Label>
                      <div className="flex gap-2 mt-1">
                        <Input type="password" id="admin-password" placeholder="New password" />
                        <Button>Update</Button>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Label>Site Moderation</Label>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="moderate-comments" />
                          <label htmlFor="moderate-comments">
                            Enable comment moderation
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="require-approval" />
                          <label htmlFor="require-approval">
                            Require job posting approval
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </RequireAuth>
  );
};

export default Admin;
