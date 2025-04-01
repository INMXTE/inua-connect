import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { Grid, Users, Briefcase, BookOpen, Building, BarChart3 } from 'lucide-react';

interface Stats {
  users: number;
  jobs: number;
  resources: number;
  partners: number;
}

const Admin = () => {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    jobs: 0,
    resources: 0,
    partners: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Get user stats
        const { count: userCount, error: userError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        if (userError) throw userError;

        // Get job stats
        const { count: jobCount, error: jobError } = await supabase
          .from('job_postings')
          .select('*', { count: 'exact', head: true });

        if (jobError) throw jobError;

        // Use any to bypass type checking for supabase query
        const { count: resourceCount, error: resourceError } = await supabase
          .from('resources')
          .select('*', { count: 'exact', head: true }) as any;

        if (resourceError) throw resourceError;

        // Use any to bypass type checking for supabase query
        const { count: partnerCount, error: partnerError } = await supabase
          .from('partners')
          .select('*', { count: 'exact', head: true }) as any;

        if (partnerError) throw partnerError;

        setStats({
          users: userCount || 0,
          jobs: jobCount || 0,
          resources: resourceCount || 0,
          partners: partnerCount || 0
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {loading ? (
        <div className="text-center py-8">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users}</div>
              <CardDescription className="text-gray-500">
                <Link to="/manage-users" className="hover:underline">
                  Manage Users
                </Link>
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Job Postings</CardTitle>
              <Briefcase className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.jobs}</div>
              <CardDescription className="text-gray-500">
                <Link to="/manage-jobs" className="hover:underline">
                  Manage Jobs
                </Link>
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
              <BookOpen className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.resources}</div>
              <CardDescription className="text-gray-500">
                <Link to="/manage-resources" className="hover:underline">
                  Manage Resources
                </Link>
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
              <Building className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.partners}</div>
              <CardDescription className="text-gray-500">
                <Link to="/manage-partners" className="hover:underline">
                  Manage Partners
                </Link>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link to="/manage-jobs" className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              Manage Jobs
            </Link>
          </Button>
          <Button asChild>
            <Link to="/manage-resources" className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Manage Resources
            </Link>
          </Button>
          <Button asChild>
            <Link to="/manage-partners" className="flex items-center">
              <Building className="w-4 h-4 mr-2" />
              Manage Partners
            </Link>
          </Button>
          <Button asChild>
            <Link to="/admin/resources" className="flex items-center">
              <Grid className="w-4 h-4 mr-2" />
               Admin Resources
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
