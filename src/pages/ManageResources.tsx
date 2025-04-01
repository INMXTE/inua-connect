import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types/supabase';
import { TableName } from '@/types/database';
import { useNavigate } from 'react-router-dom';
import { ExtendedUserRole } from '@/types/database';

const ManageResources = () => {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [resource_url, setResourceUrl] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkAccessPermissions = () => {
    if ((userRole as ExtendedUserRole) === 'admin') {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const fetchResources = async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*');

      if (error) {
        console.error('Error fetching resources:', error);
        toast({
          title: "Error",
          description: "Failed to fetch resources!",
          variant: "destructive",
        });
      } else {
        setResources(data || []);
      }
    };

    const fetchUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
        
      if (session?.user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
            
        if (data) {
          setUserRole(data.role as UserRole);
        }
      }
    };

    fetchResources();
    fetchUserRole();
  }, [toast]);
  
  useEffect(() => {
    if (!checkAccessPermissions()) {
      navigate('/');
    }
  }, [userRole, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !type) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newResource = {
      title,
      description,
      category,
      type,
      image_url: imageUrl,
      resource_url,
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from('resources')
          .update(newResource)
          .eq('id', editingId);

        if (error) {
          throw error;
        } else {
          setResources(resources.map(resource =>
            resource.id === editingId ? { ...resource, ...newResource } : resource
          ));
          toast({
            title: "Success",
            description: "Resource updated successfully.",
          });
        }
        setEditingId(null);
      } else {
        const { data, error } = await supabase
          .from('resources')
          .insert([newResource])
          .select();

        if (error) {
          throw error;
        } else if (data && data.length > 0) {
          setResources([...resources, data[0]]);
          toast({
            title: "Success",
            description: "Resource created successfully.",
          });
        }
      }

      setTitle('');
      setDescription('');
      setCategory('');
      setType('');
      setImageUrl('');
      setResourceUrl('');
    } catch (error) {
      console.error('Error creating/updating resource:', error);
      toast({
        title: "Error",
        description: `Failed to create/update resource: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (resource) => {
    setEditingId(resource.id);
    setTitle(resource.title);
    setDescription(resource.description || '');
    setCategory(resource.category || '');
    setType(resource.type || '');
    setImageUrl(resource.image_url || '');
    setResourceUrl(resource.resource_url || '');
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      } else {
        setResources(resources.filter(resource => resource.id !== id));
        toast({
          title: "Success",
          description: "Resource deleted successfully.",
        });
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast({
        title: "Error",
        description: `Failed to delete resource: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Manage Resources</CardTitle>
          <CardDescription>Create, edit, and delete resources.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Category 1">Category 1</SelectItem>
                <SelectItem value="Category 2">Category 2</SelectItem>
                <SelectItem value="Category 3">Category 3</SelectItem>
              </SelectContent>
            </Select>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Type 1">Type 1</SelectItem>
                <SelectItem value="Type 2">Type 2</SelectItem>
                <SelectItem value="Type 3">Type 3</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Resource URL"
              value={resource_url}
              onChange={(e) => setResourceUrl(e.target.value)}
            />
            <Button type="submit">{editingId ? 'Update Resource' : 'Add Resource'}</Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell>{resource.title}</TableCell>
                <TableCell>{resource.category}</TableCell>
                <TableCell>{resource.type}</TableCell>
                <TableCell className="text-right">
                  <Button variant="secondary" size="sm" onClick={() => handleEdit(resource)}>
                    Edit
                  </Button>{' '}
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(resource.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageResources;
