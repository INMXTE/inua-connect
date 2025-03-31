
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Edit, Trash, ExternalLink } from "lucide-react";

const ManagePartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    logo_url: "",
    website_url: "",
  });
  
  useEffect(() => {
    fetchPartners();
  }, []);
  
  const fetchPartners = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('name');
        
      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error("Error fetching partners:", error);
      toast.error("Failed to load partners");
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  
  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      description: "",
      logo_url: "",
      website_url: "",
    });
    setIsEditing(false);
  };
  
  const handleEdit = (partner) => {
    setForm({
      id: partner.id,
      name: partner.name,
      description: partner.description,
      logo_url: partner.logo_url || "",
      website_url: partner.website_url || "",
    });
    setIsEditing(true);
    setShowDialog(true);
  };
  
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this partner?")) return;
    
    try {
      setLoading(true);
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setPartners(partners.filter(partner => partner.id !== id));
      toast.success("Partner deleted successfully");
    } catch (error) {
      console.error("Error deleting partner:", error);
      toast.error("Failed to delete partner");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const partnerData = {
        name: form.name,
        description: form.description,
        logo_url: form.logo_url,
        website_url: form.website_url,
      };
      
      let result;
      
      if (isEditing) {
        const { data, error } = await supabase
          .from('partners')
          .update(partnerData)
          .eq('id', form.id)
          .select();
          
        if (error) throw error;
        result = data[0];
        
        setPartners(partners.map(partner => partner.id === form.id ? result : partner));
        toast.success("Partner updated successfully");
      } else {
        const { data, error } = await supabase
          .from('partners')
          .insert(partnerData)
          .select();
          
        if (error) throw error;
        result = data[0];
        
        setPartners([...partners, result]);
        toast.success("Partner created successfully");
      }
      
      resetForm();
      setShowDialog(false);
    } catch (error) {
      console.error("Error saving partner:", error);
      toast.error("Failed to save partner");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Partners</h1>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setShowDialog(true); }}>
              <Plus className="mr-2 h-4 w-4" /> Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Partner" : "Add Partner"}</DialogTitle>
              <DialogDescription>
                Add or update partner information for the landing page.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Partner Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="logo_url">Logo URL *</Label>
                  <Input
                    id="logo_url"
                    name="logo_url"
                    type="url"
                    value={form.logo_url}
                    onChange={handleChange}
                    placeholder="https://example.com/logo.png"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    URL to the partner's logo image
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="website_url">Website URL</Label>
                  <Input
                    id="website_url"
                    name="website_url"
                    type="url"
                    value={form.website_url}
                    onChange={handleChange}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Partner"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {loading && partners.length === 0 ? (
        <div className="text-center py-8">Loading partners...</div>
      ) : partners.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No partners have been added yet.</p>
          <Button onClick={() => setShowDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Your First Partner
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((partner) => (
            <Card key={partner.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{partner.name}</CardTitle>
                  <div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(partner)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(partner.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {partner.logo_url && (
                  <div className="flex justify-center mb-4">
                    <img 
                      src={partner.logo_url} 
                      alt={partner.name} 
                      className="h-20 object-contain"
                    />
                  </div>
                )}
                
                {partner.description && (
                  <p className="text-sm mb-4">{partner.description}</p>
                )}
                
                {partner.website_url && (
                  <a 
                    href={partner.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-blue-600 hover:underline"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Visit Website
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePartners;
