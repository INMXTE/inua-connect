
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Eye, EyeOff, Check, X } from "lucide-react";

const ADMIN_PASSWORD = "admin123"; // In a real application, this would be stored securely

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("jobs");
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
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </CardFooter>
            </form>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p>Manage your site content</p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Tabs defaultValue="jobs" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Manage Job Listings</CardTitle>
                <CardDescription>
                  Add, edit, or remove job opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Job Listings</h3>
                    <Button size="sm">Add New Job</Button>
                  </div>
                  
                  <div className="border rounded-md divide-y">
                    {/* Example job listing row */}
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Legal Aid Internship</h4>
                        <p className="text-sm text-muted-foreground">Amka Africa • Nairobi, Kenya</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Junior Software Developer</h4>
                        <p className="text-sm text-muted-foreground">TechVentures • Nairobi, Kenya</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Manage Resources</CardTitle>
                <CardDescription>
                  Add, edit, or remove learning resources and workshops
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Resources</h3>
                    <Button size="sm">Add New Resource</Button>
                  </div>
                  
                  <div className="border rounded-md divide-y">
                    {/* Example resource listing row */}
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">CV Writing Workshop</h4>
                        <p className="text-sm text-muted-foreground">Workshop • Next Tuesday</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Guide to Internships</h4>
                        <p className="text-sm text-muted-foreground">Article • Published March 15</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>
                  Manage admin users and system settings
                </CardDescription>
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="job-moderation" />
                          <Label htmlFor="job-moderation" className="font-normal">Require approval for new job posts</Label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="comment-moderation" />
                          <Label htmlFor="comment-moderation" className="font-normal">Enable comments on resources</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2" onClick={() => navigate("/")}>
                  Logout
                </Button>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
