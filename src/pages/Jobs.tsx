import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard, { JobProps } from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const Jobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState<string>("all");

  // In a real app, fetch from backend
  const jobs: JobProps[] = [
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


  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (jobType === "all" || job.type === jobType)
  );

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const Pagination = () => (
    <div className="flex justify-center gap-2 my-6">
      <Button
        variant="outline"
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => setCurrentPage(page)}
        >
          {page}
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
      <main className="container mx-auto py-8 px-4">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Pagination />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>

          <Pagination />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;