import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard, { JobProps, JobType } from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [jobType, setJobType] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const jobTypes: JobType[] = ["Full-time", "Part-time", "Internship", "Apprenticeship"];
  const locations = ["Nairobi, Kenya", "Mombasa, Kenya", "Kisumu, Kenya"];

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

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  const PaginationControls = () => (
    <div className="flex justify-center items-center gap-2 my-6">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Find Your Next Opportunity</h1>
            <form onSubmit={(e) => e.preventDefault()} className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
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
            </form>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'Opportunity' : 'Opportunities'} Available
              </h2>
            </div>

            <PaginationControls />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
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
                      setJobType("all");
                      setLocation("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            <PaginationControls />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;