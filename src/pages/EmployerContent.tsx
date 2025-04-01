import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { TableName } from '@/types/database';

const EmployerContent = () => {
  const [user, setUser] = useState(null);
  
  // Job management logic
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [jobForm, setJobForm] = useState({
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
  
  // Resource management logic
  const [resourcesLoading, setResourcesLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const [isEditingResource, setIsEditingResource] = useState(false);
  const [showResourceDialog, setShowResourceDialog] = useState(false);
  const [resourceForm, setResourceForm] = useState({
    id: null,
    title: "",
    description: "",
    category: "",
    type: "article",
    imageUrl: "",
    resourceUrl: "",
  });
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        if (user) {
          // Fetch jobs
          const { data: jobData, error: jobError } = await supabase
            .from('job_postings')
            .select('*')
            .eq('posted_by', user.id)
            .order('created_at', { ascending: false });
            
          if (jobError) throw jobError;
          setJobs(jobData || []);
          
          // Fetch resources
          // Use any to bypass type checking for supabase query
          const { data: resourceData, error: resourceError } = await supabase
            .from('resources')
            .select('*')
            .eq('created_by', user.id)
            .order('created_at', { ascending: false }) as any;
            
          if (resourceError) throw resourceError;
          setResources(resourceData || []);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        toast.error("Failed to load content");
      } finally {
        setJobsLoading(false);
        setResourcesLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  // Job form handlers
  const resetJobForm = () => {
    setJobForm({
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
    setIsEditingJob(false);
  };
  
  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setJobForm({
      ...jobForm,
      [name]: value
    });
  };
  
  const handleJobTypeChange = (value) => {
    setJobForm({
      ...jobForm,
      type: value
    });
  };
  
  const handleJobStatusChange = (value) => {
    setJobForm({
      ...jobForm,
      status: value
    });
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
      status: job.status || "open",
      applicationUrl: job.application_url || "",
    });
    setIsEditingJob(true);
    setShowJobDialog(true);
  };
  
  const handleDeleteJob = async (id) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;
    
    try {
      setJobsLoading(true);
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
      setJobsLoading(false);
    }
  };
  
  const handleSubmitJob = async (e) => {
    e.preventDefault();
    
    try {
      setJobsLoading(true);
      
      const jobData = {
        title: jobForm.title,
        description: jobForm.description,
        location: jobForm.location,
        type: jobForm.type,
        category: jobForm.category,
        requirements: { details: jobForm.requirements },
        status: jobForm.status,
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
      setJobsLoading(false);
    }
  };
  
  // Resource form handlers
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
  
  const handleResourceChange = (e) => {
    const { name, value } = e.target;
    setResourceForm({
      ...resourceForm,
      [name]: value
    });
  };
  
  const handleResourceTypeChange = (value) => {
    setResourceForm({
      ...resourceForm,
      type: value
    });
  };
  
  const handleEditResource = (resource) => {
    setResourceForm({
      id: resource.id,
      title: resource.title,
      description: resource.description || "",
      category: resource.category || "",
      type: resource.type || "article",
      imageUrl: resource.image_url || "",
      resourceUrl: resource.resource_url || "",
    });
    setIsEditingResource(true);
    setShowResourceDialog(true);
  };
  
  const handleDeleteResource = async (id) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    
    try {
      setResourcesLoading(true);
      // Use any to bypass type checking for supabase query
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id) as any;
        
      if (error) throw error;
      
      setResources(resources.filter(resource => resource.id !== id));
      toast.success("Resource deleted successfully");
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error("Failed to delete resource");
    } finally {
      setResourcesLoading(false);
    }
  };
  
  const handleSubmitResource = async (e) => {
    e.preventDefault();
    
    try {
      setResourcesLoading(true);
      
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
        // Use any to bypass type checking for supabase query
        const { data, error } = await supabase
          .from('resources')
          .update(resourceData)
          .eq('id', resourceForm.id)
          .select() as any;
          
        if (error) throw error;
        result = data[0];
        
        setResources(resources.map(resource => resource.id === resourceForm.id ? result : resource));
        toast.success("Resource updated successfully");
      } else {
        // Use any to bypass type checking for supabase query
        const { data, error } = await supabase
          .from('resources')
          .insert(resourceData)
          .select() as any;
          
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
      setResourcesLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Employer Content Management</h1>
      
      <Tabs defaultValue="jobs" className="w-full">
        <TabsList>
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        {/* Job Postings Tab */}
        <TabsContent value="jobs" className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Manage Job Postings</h2>
            <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetJobForm(); setShowJobDialog(true); }}>
                  <Plus className="mr-2 h-4 w-4" /> Add Job
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
                        onChange={handleJobChange}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">Job Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={jobForm.description}
                        onChange={handleJobChange}
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
                          onChange={handleJobChange}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="type">Job Type</Label>
                        <Select 
                          name="type"
                          value={jobForm.type} 
                          onValueChange={handleJobTypeChange}
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
                        onChange={handleJobChange}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="requirements">Requirements</Label>
                      <Textarea
                        id="requirements"
                        name="requirements"
                        value={jobForm.requirements}
                        onChange={handleJobChange}
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select 
                          name="status"
                          value={jobForm.status} 
                          onValueChange={handleJobStatusChange}
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
                          value={jobForm.applicationUrl}
                          onChange={handleJobChange}
                          placeholder="https://example.com/apply"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowJobDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={jobsLoading}>
                      {jobsLoading ? "Saving..." : "Save Job"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          {jobsLoading && jobs.length === 0 ? (
            <div className="text-center py-8">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No jobs have been posted yet.</p>
              <Button onClick={() => setShowJobDialog(true)}>
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
                      <Button variant="outline" size="sm" onClick={() => handleEditJob(job)}>
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteJob(job.id)}>
                        <Trash className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources" className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Manage Resources</h2>
            <Dialog open={showResourceDialog} onOpenChange={setShowResourceDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetResourceForm(); setShowResourceDialog(true); }}>
                  <Plus className="mr-2 h-4 w-4" /> Add Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>{isEditingResource ? "Edit Resource" : "Add Resource"}</DialogTitle>
                  <DialogDescription>
                    Add or update resources for students.
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
                        onChange={handleResourceChange}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={resourceForm.description}
                        onChange={handleResourceChange}
                        rows={3}
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
                          onChange={handleResourceChange}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="type">Resource Type</Label>
                        <Select 
                          name="type"
                          value={resourceForm.type} 
                          onValueChange={handleResourceTypeChange}
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
                      <Label htmlFor="imageUrl">Image URL *</Label>
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        type="url"
                        value={resourceForm.imageUrl}
                        onChange={handleResourceChange}
                        placeholder="https://example.com/image.jpg"
                        required
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
                        onChange={handleResourceChange}
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
                    <Button type="submit" disabled={resourcesLoading}>
                      {resourcesLoading ? "Saving..." : "Save Resource"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          {resourcesLoading && resources.length === 0 ? (
            <div className="text-center py-8">Loading resources...</div>
          ) : resources.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No resources have been added yet.</p>
              <Button onClick={() => setShowResourceDialog(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Your First Resource
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden">
                  <div className="aspect-video relative bg-gray-100">
                    {resource.image_url ? (
                      <img 
                        src={resource.image_url} 
                        alt={resource.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="line-clamp-1">{resource.title}</CardTitle>
                    <div className="flex text-sm text-muted-foreground">
                      <span className="capitalize">{resource.type || "Resource"}</span>
                      {resource.category && (
                        <>
                          <span className="mx-1">•</span>
                          <span>{resource.category}</span>
                        </>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-2 mb-4">{resource.description}</p>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => handleEditResource(resource)}>
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteResource(resource.id)}>
                        <Trash className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                    {resource.resource_url && (
                      <div className="mt-2">
                        <a 
                          href={resource.resource_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View Resource
                        </a>
                      </div>
                    )}
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
