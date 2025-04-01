
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Edit, Trash } from 'lucide-react';
import { UserRole } from '@/types/supabase';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [user, setUser] = useState(null);
  
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    location: "",
    type: "full-time",
    category: "",
    requirements: "",
    status: "open",
    applicationUrl: "",
  });
  
  useEffect(() => {
    const fetchUserAndJobs = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        if (user) {
          // Check if user is admin
          const { data: profileData } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
            
          const isAdmin = profileData?.role === 'admin';
          
          // Fetch jobs (all for admin, only own for employers)
          const query = supabase.from('job_postings').select('*');
          
          if (!isAdmin) {
            query.eq('posted_by', user.id);
          }
          
          const { data, error } = await query;
          
          if (error) throw error;
          setJobs(data || []);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserAndJobs();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  
  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      description: "",
      location: "",
      type: "full-time",
      category: "",
      requirements: "",
      status: "open",
      applicationUrl: "",
    });
    setIsEditing(false);
  };
  
  const handleEdit = (job) => {
    setForm({
      id: job.id,
      title: job.title,
      description: job.description,
      location: job.location || "",
      type: job.type || "full-time",
      category: job.category || "",
      requirements: job.requirements?.details || "",
      status: job.status || "open",
      applicationUrl: job.application_url || "",
    });
    setIsEditing(true);
    setShowDialog(true);
  };
  
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;
    
    try {
      setLoading(true);
      const { error } = await supabase
        .from('job_postings')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setJobs(jobs.filter(job => job.id !== id));
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const jobData = {
        title: form.title,
        description: form.description,
        location: form.location,
        type: form.type,
        category: form.category,
        requirements: { details: form.requirements },
        status: form.status,
        posted_by: user.id,
        application_url: form.applicationUrl,
        updated_at: new Date().toISOString(), // Convert to ISO string
      };
      
      let result;
      
      if (isEditing) {
        const { data, error } = await supabase
          .from('job_postings')
          .update(jobData)
          .eq('id', form.id)
          .select();
          
        if (error) throw error;
        result = data[0];
        
        setJobs(jobs.map(job => job.id === form.id ? result : job));
        toast.success("Job updated successfully");
      } else {
        const { data, error } = await supabase
          .from('job_postings')
          .insert(jobData)
          .select();
          
        if (error) throw error;
        result = data[0];
        
        setJobs([...jobs, result]);
        toast.success("Job created successfully");
      }
      
      resetForm();
      setShowDialog(false);
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error("Failed to save job");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Jobs</h1>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setShowDialog(true); }}>
              <Plus className="mr-2 h-4 w-4" /> Add Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Job Posting" : "Create Job Posting"}</DialogTitle>
              <DialogDescription>
                Fill in the details for this job posting. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="type">Job Type</Label>
                    <Select 
                      name="type"
                      value={form.type} 
                      onValueChange={(value) => setForm({...form, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={form.requirements}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      name="status"
                      value={form.status} 
                      onValueChange={(value) => setForm({...form, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="applicationUrl">Application URL *</Label>
                    <Input
                      id="applicationUrl"
                      name="applicationUrl"
                      type="url"
                      value={form.applicationUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/apply"
                      required
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Job"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {loading && jobs.length === 0 ? (
        <div className="text-center py-8">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No jobs have been posted yet.</p>
          <Button onClick={() => setShowDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> Post Your First Job
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle>{job.title}</CardTitle>
                  <Badge 
                    variant={job.status === 'open' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {job.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {job.location && `${job.location} • `}
                  {job.type && `${job.type}`}
                  {job.category && ` • ${job.category}`}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm line-clamp-3 mb-4">{job.description}</p>
                
                {job.application_url && (
                  <div className="mt-2">
                    <a 
                      href={job.application_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Application URL: {job.application_url}
                    </a>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(job)}>
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(job.id)}>
                    <Trash className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
