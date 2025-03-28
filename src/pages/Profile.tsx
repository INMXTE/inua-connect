import { useState } from "react";
import { ResourceProps } from "@/types/resources";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourceCard from "@/components/ResourceCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Calendar, 
  User, 
  Settings 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'; // Added import for Card component

const Profile = () => {
  const { toast } = useToast();
  const [profileCompletion] = useState(75);

  // Sample profile data
  const profileData = {
    name: "James Mwangi",
    email: "james.mwangi@example.com",
    university: "University of Nairobi",
    field: "Computer Science",
    graduationYear: "2024",
    skills: ["JavaScript", "React", "Python", "Data Analysis", "UI/UX Design"],
    interests: ["Software Development", "AI/Machine Learning", "Web Design"]
  };

  // Sample saved jobs
  const savedJobs: JobProps[] = [
    {
      id: "1",
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
      id: "4",
      title: "Graduate Engineering Program",
      company: "EcoInnovate",
      location: "Kisumu, Kenya",
      type: "Apprenticeship",
      salary: "Ksh 45,000",
      posted: "5 days ago",
      skills: ["Engineering", "Sustainability", "Project Management"],
      description: "12-month structured program for recent engineering graduates focusing on sustainable technology implementation."
    }
  ];

  // Sample recommended resources
  const recommendedResources: ResourceProps[] = [
    {
      id: "1",
      title: "Resume Writing Workshop",
      type: "Workshop",
      icon: "workshop",
      date: "October 15, 2023",
      description: "Learn how to craft a professional resume that stands out to employers and highlights your strengths effectively."
    },
    {
      id: "3",
      title: "Tech Career Mentorship",
      type: "Mentorship",
      icon: "mentorship",
      description: "Connect with experienced professionals in the technology sector for personalized career guidance and networking."
    }
  ];

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing would open here. This feature is under development.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          {/* Profile Overview */}
          <div className="mb-10">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="bg-primary/10 rounded-full p-4">
                    <User className="h-16 w-16 text-primary" />
                  </div>

                  <div className="flex-grow">
                    <h1 className="text-2xl font-bold mb-1">{profileData.name}</h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        <span>{profileData.university}, {profileData.field}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        <span>{profileData.email}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Profile Completion: {profileCompletion}%</p>
                      <Progress value={profileCompletion} className="h-2" />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {profileData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="font-normal">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Button onClick={handleEditProfile}>Edit Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="saved-jobs">Saved Jobs</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                    <CardDescription>A brief summary of your background and career goals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      I'm a final-year Computer Science student passionate about software development and AI applications.
                      Looking for opportunities to apply my technical skills in innovative projects while continuing to learn and grow.
                    </p>
                    <p className="text-gray-600">
                      <strong>Career Goals:</strong> To become a skilled full-stack developer with expertise in AI integration,
                      working on projects that have meaningful social impact.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Interests</CardTitle>
                    <CardDescription>Areas you're interested in exploring</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {profileData.interests.map((interest, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          {interest}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Education & Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">Education</h3>
                    <div className="border-l-2 border-primary/30 pl-4 mb-4">
                      <div className="mb-4">
                        <h4 className="font-medium">BSc in Computer Science</h4>
                        <p className="text-sm text-gray-600">University of Nairobi | Expected Graduation: 2024</p>
                        <p className="mt-1 text-sm">
                          Relevant coursework: Data Structures, Algorithms, Database Systems, Web Development
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Experience</h3>
                    <div className="border-l-2 border-primary/30 pl-4">
                      <div className="mb-4">
                        <h4 className="font-medium">Student Developer</h4>
                        <p className="text-sm text-gray-600">University IT Department | Jun 2023 - Present</p>
                        <p className="mt-1 text-sm">
                          Assisted in maintaining university web applications and developing new features.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Volunteer Web Developer</h4>
                        <p className="text-sm text-gray-600">Local NGO | Jan 2023 - Apr 2023</p>
                        <p className="mt-1 text-sm">
                          Built and maintained website for a local non-profit organization.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button variant="outline" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </div>
            </TabsContent>

            {/* Saved Jobs Tab */}
            <TabsContent value="saved-jobs">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              {savedJobs.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No saved jobs yet</h3>
                  <p className="text-gray-600 mb-4">
                    Browse opportunities and save jobs that interest you for future reference.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/jobs">Browse Jobs</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedResources.map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications">
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No active applications</h3>
                <p className="text-gray-600 mb-4">
                  When you apply for opportunities, they will appear here for easy tracking.
                </p>
                <Button asChild>
                  <Link href="/jobs">Find Opportunities</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;