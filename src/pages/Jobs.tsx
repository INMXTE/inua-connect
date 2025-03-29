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
import { Search } from "lucide-react";

const ITEMS_PER_PAGE = 9;

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

const jobTypes: JobType[] = ["Full-time", "Part-time", "Internship", "Apprenticeship"];
const locations = ["Nairobi, Kenya", "Mombasa, Kenya", "Kisumu, Kenya"];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId);
      }
      return [...prev, jobId];
    });
  };

  const filteredJobs = sampleJobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = jobType === "all" || job.type === jobType;
    const matchesLocation = location === "all" || job.location === location;

    return matchesSearch && matchesType && matchesLocation;
  });

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const Pagination = () => (
    <div className="flex justify-center gap-2 my-4">
      <Button
        variant="outline"
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i + 1}
          variant={currentPage === i + 1 ? "default" : "outline"}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
      <Button
        variant="outline"
        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Next Opportunity</h1>

          <div className="bg-card p-6 rounded-lg shadow-sm">
            <form onSubmit={handleSearch} className="grid md:grid-cols-6 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
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
                    <SelectItem value="all">All Types</SelectItem>
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
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <Button type="submit">
                  Search Jobs
                </Button>
              </div>
            </form>
          </div>
        </section>

        <Pagination />

        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'Opportunity' : 'Opportunities'} Available
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job}
                    onSave={handleSaveJob}
                    isSaved={savedJobs.includes(job.id)}
                  />
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

        <Pagination />
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;