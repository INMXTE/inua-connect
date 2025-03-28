
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard, { JobProps, JobType } from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

const sampleJobs: JobProps[] = [
  {
    id: "1",
    title: "Legal Aid Internship",
    company: "Amka Africa",
    location: "Nairobi, Kenya",
    type: "Internship",
    posted: "3 days ago",
    skills: ["Legal Research", "Documentation", "Communication"],
    description: "Opportunity for law students to gain practical experience in legal aid and community support services."
  },
  {
    id: "2",
    title: "Junior Software Developer",
    company: "TechVentures",
    location: "Nairobi, Kenya",
    type: "Full-time",
    salary: "Ksh 60,000 - 80,000",
    posted: "1 week ago",
    skills: ["JavaScript", "React", "Node.js"],
    description: "We are looking for a Junior Software Developer to join our dynamic team, working on innovative web applications for clients."
  },
  {
    id: "3",
    title: "Marketing Assistant",
    company: "ConsultPlus",
    location: "Mombasa, Kenya",
    type: "Part-time",
    salary: "Ksh 25,000 - 35,000",
    posted: "2 weeks ago",
    skills: ["Social Media", "Content Creation", "Market Research"],
    description: "Part-time role suitable for marketing students looking to gain practical experience while completing their studies."
  },
  {
    id: "4",
    title: "Graduate Engineering Program",
    company: "EcoInnovate",
    location: "Kisumu, Kenya",
    type: "Apprenticeship",
    salary: "Ksh 45,000",
    posted: "5 days ago",
    skills: ["Engineering", "Sustainability", "Project Management"],
    description: "12-month structured program for recent engineering graduates focusing on sustainable technology implementation."
  },
  {
    id: "5",
    title: "Research Assistant",
    company: "University Research Center",
    location: "Nairobi, Kenya",
    type: "Internship",
    posted: "3 days ago",
    skills: ["Research Methods", "Data Analysis", "Academic Writing"],
    description: "Assist senior researchers in conducting studies, analyzing data, and preparing reports."
  },
  {
    id: "6",
    title: "Finance Graduate Trainee",
    company: "ProDev Solutions",
    location: "Nairobi, Kenya",
    type: "Full-time",
    salary: "Ksh 50,000 - 65,000",
    posted: "1 week ago",
    skills: ["Financial Analysis", "Excel", "Accounting"],
    description: "Comprehensive graduate program for finance and accounting graduates looking to start their careers in corporate finance."
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  const jobTypes: JobType[] = ["Full-time", "Part-time", "Internship", "Apprenticeship"];
  const locations = ["Nairobi, Kenya", "Mombasa, Kenya", "Kisumu, Kenya"];

  const filteredJobs = sampleJobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = jobType ? job.type === jobType : true;
    const matchesLocation = location ? job.location === location : true;
    
    return matchesSearch && matchesType && matchesLocation;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-primary text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Opportunity</h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Browse through internships, apprenticeships, and job openings matched to your skills and interests.
            </p>
          </div>
        </section>
        
        {/* Search and Filters */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2">
                <Label htmlFor="search">Search jobs</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input 
                    id="search"
                    placeholder="Search by title, company, or skills..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="jobType">Job Type</Label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger id="jobType">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-types">All Types</SelectItem>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-locations">All Locations</SelectItem>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-4 flex justify-end">
                <Button type="submit">
                  Search Jobs
                </Button>
              </div>
            </form>
          </div>
        </section>
        
        {/* Job Listings */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'Opportunity' : 'Opportunities'} Available
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No matches found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setJobType("");
                      setLocation("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
