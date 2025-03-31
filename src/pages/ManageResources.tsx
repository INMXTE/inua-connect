
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Edit, Trash, ArrowLeft } from 'lucide-react';

function ManageResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [user, setUser] = useState(null);
  
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    category: "",
    type: "article",
    imageUrl: "",
    resourceUrl: "",
  });
  
  useEffect(() => {
    const fetchUserAndResources = async () => {
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
          
          // Fetch resources (all for admin, only own for employers)
          const query = supabase.from('resources').select('*');
          
          if (!isAdmin) {
            query.eq('created_by', user.id);
          }
          
          const { data, error } = await query;
          
          if (error) throw error;
          setResources(data || []);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
        toast.error("Failed to load resources");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserAndResources();
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
      category: "",
      type: "article",
      imageUrl: "",
      resourceUrl: "",
    });
    setIsEditing(false);
  };
  
  const handleEdit = (resource) => {
    setForm({
      id: resource.id,
      title: resource.title,
      description: resource.description,
      category: resource.category || "",
      type: resource.type || "article",
      imageUrl: resource.image_url || "",
      resourceUrl: resource.resource_url || "",
    });
    setIsEditing(true);
    setShowDialog(true);
  };
  
  const handleDelete = async (id) => {
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const resourceData = {
        title: form.title,
        description: form.description,
        category: form.category,
        type: form.type,
        image_url: form.imageUrl,
        resource_url: form.resourceUrl,
        created_by: user.id,
        updated_at: new Date(),
      };
      
      let result;
      
      if (isEditing) {
        const { data, error } = await supabase
          .from('resources')
          .update(resourceData)
          .eq('id', form.id)
          .select();
          
        if (error) throw error;
        result = data[0];
        
        setResources(resources.map(resource => resource.id === form.id ? result : resource));
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
      
      resetForm();
      setShowDialog(false);
    } catch (error) {
      console.error("Error saving resource:", error);
      toast.error("Failed to save resource");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Resources</h1>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setShowDialog(true); }}>
              <Plus className="mr-2 h-4 w-4" /> Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Resource" : "Add Resource"}</DialogTitle>
              <DialogDescription>
                Add or update resources for students.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Resource Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
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
                      value={form.category}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="type">Resource Type</Label>
                    <Select 
                      name="type"
                      value={form.type} 
                      onValueChange={(value) => setForm({...form, type: value})}
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
                    value={form.imageUrl}
                    onChange={handleChange}
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
                    value={form.resourceUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/resource"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    URL to the actual resource (video, article, webinar registration, etc.)
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
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
          <p className="text-muted-foreground mb-4">No resources have been added yet.</p>
          <Button onClick={() => setShowDialog(true)}>
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
                  <Button variant="outline" size="sm" onClick={() => handleEdit(resource)}>
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(resource.id)}>
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
    </div>
  );
}

export default ManageResources;
