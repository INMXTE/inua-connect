
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, Users, Eye, FileText } from "lucide-react";

const EmployerDashboard = () => {
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    resources: 0,
    resourceViews: 0,
  });

  const [applicationData, setApplicationData] = useState([]);
  const [resourceData, setResourceData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndStats = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          // Fetch jobs count
          const { count: jobsCount, error: jobsError } = await supabase
            .from('job_postings')
            .select('id', { count: 'exact' })
            .eq('posted_by', user.id);

          // Fetch applications count
          const { count: applicationsCount, error: applicationsError } = await supabase
            .from('job_applications')
            .select('job_id', { count: 'exact' })
            .in('job_id', (
              supabase
                .from('job_postings')
                .select('id')
                .eq('posted_by', user.id)
            ));

          // Fetch resources count
          const { count: resourcesCount, error: resourcesError } = await supabase
            .from('resources')
            .select('id', { count: 'exact' })
            .eq('created_by', user.id);

          // Fetch resources view count (assuming there's a view tracking field)
          const { data: resourcesData, error: resourcesViewError } = await supabase
            .from('resources')
            .select('views')
            .eq('created_by', user.id);

          const totalViews = resourcesData?.reduce((sum, resource) => sum + (resource.views || 0), 0) || 0;

          setStats({
            activeJobs: jobsCount || 0,
            totalApplications: applicationsCount || 0,
            resources: resourcesCount || 0,
            resourceViews: totalViews,
          });

          // Generate application data
          const applicationStatuses = [
            { name: 'Pending', value: Math.floor(Math.random() * 30) + 10 },
            { name: 'Reviewing', value: Math.floor(Math.random() * 20) + 5 },
            { name: 'Interviewed', value: Math.floor(Math.random() * 15) + 3 },
            { name: 'Hired', value: Math.floor(Math.random() * 10) + 1 },
            { name: 'Rejected', value: Math.floor(Math.random() * 20) + 5 },
          ];
          setApplicationData(applicationStatuses);

          // Generate resource engagement data
          const resourceTypes = [
            { name: 'Webinars', views: Math.floor(Math.random() * 100) + 50 },
            { name: 'Articles', views: Math.floor(Math.random() * 120) + 60 },
            { name: 'Videos', views: Math.floor(Math.random() * 150) + 70 },
            { name: 'Guides', views: Math.floor(Math.random() * 80) + 40 },
          ];
          setResourceData(resourceTypes);
        }
      } catch (error) {
        console.error("Error fetching employer dashboard data:", error);
      }
    };

    fetchUserAndStats();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Employer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                <h3 className="text-2xl font-bold">{stats.activeJobs}</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <h3 className="text-2xl font-bold">{stats.totalApplications}</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resources</p>
                <h3 className="text-2xl font-bold">{stats.resources}</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resource Views</p>
                <h3 className="text-2xl font-bold">{stats.resourceViews}</h3>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <Eye className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={applicationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {applicationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployerDashboard;
