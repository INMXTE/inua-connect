
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourceCard from "@/components/ResourceCard";
import ResourcesFilter from "@/components/ResourcesFilter";
import { resourcesData } from "@/data/resources";
import { ResourceProps } from "@/types/resources";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedResource, setSelectedResource] = useState<ResourceProps | null>(null);

  // Filter resources based on search, type, and tags
  const filteredResources = resourcesData.filter((resource) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Filter by selected types
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(resource.type);

    // Filter by selected tags
    const matchesTags =
      selectedTags.length === 0 ||
      resource.tags.some((tag) => selectedTags.includes(tag));

    return matchesSearch && matchesType && matchesTags;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-primary/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
            <p className="text-gray-600 max-w-2xl">
              Explore our collection of resources to help you develop your skills, prepare for interviews, and advance your career.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ResourcesFilter 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            </div>

            <div className="lg:col-span-3">
              {filteredResources.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No resources found</h3>
                  <p className="text-gray-500">
                    Try adjusting your filters or search query to find resources.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      onClick={() => setSelectedResource(resource)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
        {selectedResource && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedResource.title}</DialogTitle>
              <DialogDescription>
                {selectedResource.type} • {selectedResource.date || "Available anytime"}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              {selectedResource.imageUrl && (
                <div className="rounded-md overflow-hidden h-64">
                  <img
                    src={selectedResource.imageUrl}
                    alt={selectedResource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <p>{selectedResource.description}</p>
              
              {selectedResource.learningOutcomes && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Learning Outcomes:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedResource.learningOutcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedResource.location && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Event Details</h4>
                  <p className="text-sm">
                    <span className="font-medium">Date:</span> {selectedResource.date}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Location:</span> {selectedResource.location}
                  </p>
                  {selectedResource.capacity && (
                    <p className="text-sm">
                      <span className="font-medium">Capacity:</span> {selectedResource.capacity} seats
                    </p>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Resources;
