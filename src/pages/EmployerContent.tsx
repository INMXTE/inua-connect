
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Edit, Trash, ExternalLink } from "lucide-react";

const EmployerContent = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  
  // Job form state
  const [jobForm, setJobForm] = useState({
    id: null,
    title: "",
    description: "",
    location: "",
    type: "full-time",
    category: "",
    requirements: "",
    applicationUrl: "",
  });
  
  // Resource form state
  const [resourceForm, setResourceForm] = useState({
    id: null,
    title: "",
    description: "",
    category: "",
    type: "article",
    imageUrl: "",
    resourceUrl: "",
  });
  
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [isEditingResource, setIsEditingResource] = useState(false);
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [showResourceDialog, setShowResourceDialog] = useState(false);
  
  useEffect(() => {
    const fetchUserAndContent = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        if (user) {
          fetchJobs(user.id);
          fetchResources(user.id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserAndContent();
  }, []);
  
  const fetchJobs = async (userId) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .eq('posted_by', userId);
        
      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchResources = async (userId) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('created_by', userId);
        
      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast.error("Failed to load resources");
    } finally {
      setLoading(false);
    }
  };
  
  const handleJobFormChange = (e) => {
    const { name, value } = e.target;
    setJobForm({ ...jobForm, [name]: value });
  };
  
  const handleResourceFormChange = (e) => {
    const { name, value } = e.target;
    setResourceForm({ ...resourceForm, [name]: value });
  };
  
  const resetJobForm = () => {
    setJobForm({
      id: null,
      title: "",
      description: "",
      location: "",
      type: "full-time",
      category: "",
      requirements: "",
      applicationUrl: "",
    });
    setIsEditingJob(false);
  };
  
  const resetResourceForm = () => {
    setResourceForm({
      id: null,
      title: "",
      description: "",
      category: "",
      type: "article",
      imageUrl: "",
      resourceUrl: "",
    });
    setIsEditingResource(false);
  };
  
  const handleEditJob = (job) => {
    setJobForm({
      id: job.id,
      title: job.title,
      description: job.description,
      location: job.location || "",
      type: job.type || "full-time",
      category: job.category || "",
      requirements: job.requirements?.details || "",
      applicationUrl: job.application_url || "",
    });
    setIsEditingJob(true);
    setShowJobDialog(true);
  };
  
  const handleEditResource = (resource) => {
    setResourceForm({
      id: resource.id,
      title: resource.title,
      description: resource.description,
      category: resource.category || "",
      type: resource.type || "article",
      imageUrl: resource.image_url || "",
      resourceUrl: resource.resource_url || "",
    });
    setIsEditingResource(true);
    setShowResourceDialog(true);
  };
  
  const handleDeleteJob = async (id) => {
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
  
  const handleDeleteResource = async (id) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    
    try {
      setLoading(true);
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setResources(resources.filter(resource => resource.id !== id));
      toast.success("Resource deleted successfully");
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error("Failed to delete resource");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmitJob = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const jobData = {
        title: jobForm.title,
        description: jobForm.description,
        location: jobForm.location,
        type: jobForm.type,
        category: jobForm.category,
        requirements: { details: jobForm.requirements },
        posted_by: user.id,
        application_url: jobForm.applicationUrl,
      };
      
      let result;
      
      if (isEditingJob) {
        const { data, error } = await supabase
          .from('job_postings')
          .update(jobData)
          .eq('id', jobForm.id)
          .select();
          
        if (error) throw error;
        result = data[0];
        
        setJobs(jobs.map(job => job.id === jobForm.id ? result : job));
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
      
      resetJobForm();
      setShowJobDialog(false);
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error("Failed to save job");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmitResource = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const resourceData = {
        title: resourceForm.title,
        description: resourceForm.description,
        category: resourceForm.category,
        type: resourceForm.type,
        image_url: resourceForm.imageUrl,
        resource_url: resourceForm.resourceUrl,
        created_by: user.id,
      };
      
      let result;
      
      if (isEditingResource) {
        const { data, error } = await supabase
          .from('resources')
          .update(resourceData)
          .eq('id', resourceForm.id)
          .select();
          
        if (error) throw error;
        result = data[0];
        
        setResources(resources.map(resource => resource.id === resourceForm.id ? result : resource));
        toast.success("Resource updated successfully");
      } else {
        const { data, error } = await supabase
          .from('resources')
          .insert(resourceData)
          .select();
          
        if (error) throw error;
        result = data[0];
        
        setResources([...resources, result]);
        toast.success("Resource created successfully");
      }
      
      resetResourceForm();
      setShowResourceDialog(false);
    } catch (error) {
      console.error("Error saving resource:", error);
      toast.error("Failed to save resource");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Content Management</h1>
      
      <Tabs defaultValue="jobs" onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Manage Job Postings</h2>
            <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetJobForm(); setShowJobDialog(true); }}>
                  <Plus className="mr-2 h-4 w-4" /> Add New Job
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>{isEditingJob ? "Edit Job Posting" : "Create Job Posting"}</DialogTitle>
                  <DialogDescription>
                    Fill in the details for this job posting. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitJob}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Job Title *</Label>
                      <Input
                        id="title"
                        name="title"
                        value={jobForm.title}
                        onChange={handleJobFormChange}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description">Job Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={jobForm.description}
                        onChange={handleJobFormChange}
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
                          value={jobForm.location}
                          onChange={handleJobFormChange}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="type">Job Type</Label>
                        <Select 
                          name="type"
                          value={jobForm.type} 
                          onValueChange={(value) => setJobForm({...jobForm, type: value})}
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
                        value={jobForm.category}
                        onChange={handleJobFormChange}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="requirements">Requirements</Label>
                      <Textarea
                        id="requirements"
                        name="requirements"
                        value={jobForm.requirements}
                        onChange={handleJobFormChange}
                        rows={3}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="applicationUrl">Application URL *</Label>
                      <Input
                        id="applicationUrl"
                        name="applicationUrl"
                        type="url"
                        value={jobForm.applicationUrl}
                        onChange={handleJobFormChange}
                        placeholder="https://example.com/apply"
                        required
                      />
                      <p className="text-sm text-muted-foreground">
                        Students will be directed to this URL to complete their application
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowJobDialog(false)}>
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
              <p className="text-muted-foreground mb-4">You haven't posted any jobs yet.</p>
              <Button onClick={() => setShowJobDialog(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Your First Job
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {jobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle>{job.title}</CardTitle>
                      <div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditJob(job)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>
                      {job.location && `${job.location} • `}
                      {job.type && `${job.type} • `}
                      {job.status || "Open"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-2">{job.description}</p>
                    {job.application_url && (
                      <div className="mt-4">
                        <a 
                          href={job.application_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Application URL
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Manage Resources</h2>
            <Dialog open={showResourceDialog} onOpenChange={setShowResourceDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetResourceForm(); setShowResourceDialog(true); }}>
                  <Plus className="mr-2 h-4 w-4" /> Add New Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>{isEditingResource ? "Edit Resource" : "Create Resource"}</DialogTitle>
                  <DialogDescription>
                    Fill in the details for this resource. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitResource}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Resource Title *</Label>
                      <Input
                        id="title"
                        name="title"
                        value={resourceForm.title}
                        onChange={handleResourceFormChange}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={resourceForm.description}
                        onChange={handleResourceFormChange}
                        rows={4}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          name="category"
                          value={resourceForm.category}
                          onChange={handleResourceFormChange}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="type">Resource Type</Label>
                        <Select 
                          name="type"
                          value={resourceForm.type} 
                          onValueChange={(value) => setResourceForm({...resourceForm, type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="article">Article</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="webinar">Webinar</SelectItem>
                            <SelectItem value="guide">Guide</SelectItem>
                            <SelectItem value="tool">Tool</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        type="url"
                        value={resourceForm.imageUrl}
                        onChange={handleResourceFormChange}
                        placeholder="https://example.com/image.jpg"
                      />
                      <p className="text-sm text-muted-foreground">
                        URL to an image that represents this resource
                      </p>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="resourceUrl">Resource URL *</Label>
                      <Input
                        id="resourceUrl"
                        name="resourceUrl"
                        type="url"
                        value={resourceForm.resourceUrl}
                        onChange={handleResourceFormChange}
                        placeholder="https://example.com/resource"
                        required
                      />
                      <p className="text-sm text-muted-foreground">
                        URL to the actual resource (video, article, webinar registration, etc.)
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowResourceDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Saving..." : "Save Resource"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          {loading && resources.length === 0 ? (
            <div className="text-center py-8">Loading resources...</div>
          ) : resources.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You haven't created any resources yet.</p>
              <Button onClick={() => setShowResourceDialog(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Your First Resource
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {resources.map((resource) => (
                <Card key={resource.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle>{resource.title}</CardTitle>
                      <div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditResource(resource)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteResource(resource.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>
                      {resource.type && `${resource.type} • `}
                      {resource.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-2">{resource.description}</p>
                    <div className="flex gap-4 mt-4">
                      {resource.image_url && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Image:</p>
                          <a 
                            href={resource.image_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-blue-600 hover:underline"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Image
                          </a>
                        </div>
                      )}
                      
                      {resource.resource_url && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Resource:</p>
                          <a 
                            href={resource.resource_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-blue-600 hover:underline"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Resource
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployerContent;
