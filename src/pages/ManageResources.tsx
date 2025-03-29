
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addResource, updateResource, deleteResource } from "@/store/resourcesSlice";
import { Resource } from "@/types/resource";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const ResourceForm = ({ 
  resource, 
  onSubmit, 
  onCancel 
}: { 
  resource?: Resource; 
  onSubmit: (data: Partial<Resource>) => void; 
  onCancel: () => void; 
}) => {
  const [formData, setFormData] = useState(resource || {
    title: "",
    type: "",
    description: "",
    url: "",
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Input
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSubmit(formData)}>Submit</Button>
      </div>
    </div>
  );
};

const ManageResources = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const resources = useSelector((state: RootState) => state.resources.resources);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  const handleSubmit = (data: Partial<Resource>) => {
    if (editingResource) {
      dispatch(updateResource({ ...editingResource, ...data }));
      toast({
        title: "Resource Updated",
        description: "The resource has been successfully updated.",
      });
    } else {
      dispatch(addResource({ ...data, id: crypto.randomUUID() } as Resource));
      toast({
        title: "Resource Added",
        description: "The new resource has been successfully added.",
      });
    }
    setIsDialogOpen(false);
    setEditingResource(null);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteResource(id));
    toast({
      title: "Resource Deleted",
      description: "The resource has been successfully deleted.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Resources</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add New Resource</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingResource ? "Edit Resource" : "Add New Resource"}
                </DialogTitle>
              </DialogHeader>
              <ResourceForm
                resource={editingResource || undefined}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsDialogOpen(false);
                  setEditingResource(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {resources.map((resource) => (
            <Card key={resource.id}>
              <CardHeader>
                <CardTitle>{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">{resource.type}</p>
                    <p className="text-sm">{resource.description}</p>
                  </div>
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditingResource(resource);
                        setIsDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDelete(resource.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ManageResources;
