
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Users, Briefcase, Book, Building2 } from "lucide-react";

const Admin = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalResources: 0,
    totalPartners: 0,
    applications: 0,
  });

  const [activityData, setActivityData] = useState([]);
  const [jobData, setJobData] = useState([]);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch users count
        const { count: usersCount, error: usersError } = await supabase
          .from('profiles')
          .select('id', { count: 'exact' });
          
        // Fetch jobs count
        const { count: jobsCount, error: jobsError } = await supabase
          .from('job_postings')
          .select('id', { count: 'exact' });
          
        // Fetch resources count  
        const { count: resourcesCount, error: resourcesError } = await supabase
          .from('resources')
          .select('id', { count: 'exact' });
          
        // Fetch partners count (assuming partners table exists)
        const { count: partnersCount, error: partnersError } = await supabase
          .from('partners')
          .select('id', { count: 'exact', head: true });
          
        // Fetch applications count
        const { count: applicationsCount, error: applicationsError } = await supabase
          .from('job_applications')
          .select('id', { count: 'exact' });
          
        setStats({
          totalUsers: usersCount || 0,
          totalJobs: jobsCount || 0,
          totalResources: resourcesCount || 0,
          totalPartners: partnersCount || 0,
          applications: applicationsCount || 0,
        });
        
        // Generate sample activity data
        const currentDate = new Date();
        const activityData = [];
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(currentDate.getDate() - i);
          
          activityData.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            users: Math.floor(Math.random() * 10),
            resources: Math.floor(Math.random() * 5),
            jobs: Math.floor(Math.random() * 7),
          });
        }
        
        setActivityData(activityData);
        
        // Generate sample job data
        const jobData = [
          { name: "Technology", jobs: 12 },
          { name: "Marketing", jobs: 8 },
          { name: "Finance", jobs: 5 },
          { name: "Design", jobs: 7 },
          { name: "Sales", jobs: 9 },
        ];
        
        setJobData(jobData);
        
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Job Postings</p>
                <h3 className="text-2xl font-bold">{stats.totalJobs}</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resources</p>
                <h3 className="text-2xl font-bold">{stats.totalResources}</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Book className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Partners</p>
                <h3 className="text-2xl font-bold">{stats.totalPartners}</h3>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <Building2 className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Platform Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="resources" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="jobs" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Jobs by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="jobs" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add, edit or remove resources for students.
            </p>
            <Link to="/admin/resources">
              <Button className="w-full">Manage Resources</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Manage Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add, edit or remove job postings.
            </p>
            <Link to="/manage-jobs">
              <Button className="w-full">Manage Jobs</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Manage Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add, edit or remove partner organizations.
            </p>
            <Link to="/manage-partners">
              <Button className="w-full">Manage Partners</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
