
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourceCard, { ResourceProps } from "@/components/ResourceCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, Calendar, GraduationCap, FileText } from "lucide-react";
import { useState } from "react";

const sampleResources: ResourceProps[] = [
  {
    id: "1",
    title: "Resume Writing Workshop",
    type: "Workshop",
    icon: "workshop",
    date: "October 15, 2023",
    description: "Learn how to craft a professional resume that stands out to employers and highlights your strengths effectively.",
    featured: true
  },
  {
    id: "2",
    title: "Interview Skills Training",
    type: "Workshop",
    icon: "workshop",
    date: "October 22, 2023",
    description: "Practice and master common interview questions and techniques to increase your confidence and success rate."
  },
  {
    id: "3",
    title: "Tech Career Mentorship",
    type: "Mentorship",
    icon: "mentorship",
    description: "Connect with experienced professionals in the technology sector for personalized career guidance and networking."
  },
  {
    id: "4",
    title: "CV Review Service",
    type: "CV Assistance",
    icon: "cv",
    description: "Submit your CV for detailed feedback from industry professionals to improve your chances of getting noticed."
  },
  {
    id: "5",
    title: "Networking Fundamentals",
    type: "Article",
    icon: "article",
    description: "Building professional relationships is crucial for career growth. Learn effective networking strategies for students."
  },
  {
    id: "6",
    title: "Finance Industry Insights",
    type: "Mentorship",
    icon: "mentorship",
    description: "Connect with finance professionals to understand career paths, industry trends, and job expectations."
  },
  {
    id: "7",
    title: "LinkedIn Profile Optimization",
    type: "Workshop",
    icon: "workshop",
    date: "November 5, 2023",
    description: "Learn how to create a compelling LinkedIn profile that attracts recruiters and showcases your professional brand."
  },
  {
    id: "8",
    title: "Cover Letter Writing Guide",
    type: "CV Assistance",
    icon: "cv",
    description: "Master the art of writing persuasive cover letters that complement your resume and make a strong impression."
  }
];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredResources = sampleResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "workshops" && resource.type === "Workshop") ||
      (activeTab === "mentorship" && resource.type === "Mentorship") ||
      (activeTab === "cv" && resource.type === "CV Assistance") ||
      (activeTab === "articles" && resource.type === "Article");
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-primary text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Career Resources</h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Access workshops, mentorship programs, CV assistance, and educational content to help advance your career.
            </p>
          </div>
        </section>
        
        {/* Search and Tabs */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto mb-6">
              <Label htmlFor="search-resources" className="mb-2 block">Search resources</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  id="search-resources"
                  placeholder="Search by keyword..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs 
              defaultValue="all" 
              className="w-full"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <div className="flex justify-center mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Resources</TabsTrigger>
                  <TabsTrigger value="workshops">Workshops</TabsTrigger>
                  <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
                  <TabsTrigger value="cv">CV Assistance</TabsTrigger>
                  <TabsTrigger value="articles">Articles</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                {/* Content shown by filter function */}
              </TabsContent>
              <TabsContent value="workshops" className="mt-0">
                {/* Content shown by filter function */}
              </TabsContent>
              <TabsContent value="mentorship" className="mt-0">
                {/* Content shown by filter function */}
              </TabsContent>
              <TabsContent value="cv" className="mt-0">
                {/* Content shown by filter function */}
              </TabsContent>
              <TabsContent value="articles" className="mt-0">
                {/* Content shown by filter function */}
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Resource Listings */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveTab("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Workshop Registration CTA */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-4">Upcoming Featured Workshop</h2>
                  <h3 className="text-xl text-primary font-medium mb-2">Resume Writing Masterclass</h3>
                  <p className="text-gray-600 mb-4">
                    Join our professional career coaches for a hands-on workshop where you'll learn how to create 
                    a compelling resume that showcases your skills and experiences effectively.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>October 15, 2023</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      <span>Online via Zoom</span>
                    </div>
                  </div>
                  <Button>Register Now</Button>
                </div>
                <div className="md:w-1/3 flex items-center justify-center">
                  <div className="bg-primary/10 p-8 rounded-full">
                    <FileText className="h-16 w-16 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
