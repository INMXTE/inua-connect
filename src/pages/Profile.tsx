import { useState } from 'react';
import { Mail, User, GraduationCap, FileText, Upload, Phone, MapPin, Globe, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import ResourceCard from '@/components/ResourceCard'; // Added import for ResourceCard
import type { JobProps } from '@/components/JobCard';
import type { ResourceProps } from '@/components/ResourceCard';


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const [cv, setCV] = useState<File | null>(null);

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCV(e.target.files[0]);
      toast({
        title: "CV uploaded successfully",
        description: `File: ${e.target.files[0].name}`,
      });
    }
  };

  // Sample profile data (from original code)
  const profileData = {
    name: "James Mwangi",
    email: "james.mwangi@example.com",
    university: "University of Nairobi",
    field: "Computer Science",
    graduationYear: "2024",
    skills: ["JavaScript", "React", "Python", "Data Analysis", "UI/UX Design"],
    interests: ["Software Development", "AI/Machine Learning", "Web Design"]
  };

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
      description: "We are looking for a Junior Software Developer to join our dynamic team."
    }
  ];

  const recommendedResources: ResourceProps[] = [
    {
      id: "1",
      title: "Resume Writing Workshop",
      type: "Workshop",
      icon: "workshop",
      date: "October 15, 2023",
      description: "Learn how to craft a professional resume that stands out."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">My Profile</CardTitle>
              <Button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input value={profileData.name} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={profileData.email} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input type="tel" placeholder="+1234567890" disabled={!isEditing} />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input placeholder="City, Country" disabled={!isEditing} />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Education Level</Label>
                  <Input value={profileData.university} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Field of Study</Label>
                  <Input value={profileData.field} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Current Role</Label>
                  <Input placeholder="Software Developer" disabled={!isEditing} />
                </div>
                <div>
                  <Label>Years of Experience</Label>
                  <Input type="number" placeholder="2" disabled={!isEditing} />
                </div>
              </div>
            </div>

            <div>
              <Label>Bio</Label>
              <Textarea placeholder="Tell us about yourself..." disabled={!isEditing} className="h-32" />
            </div>

            <div>
              <Label>Skills</Label>
              <Input value={profileData.skills.join(', ')} disabled={!isEditing} />
            </div>

            <div className="flex items-center gap-4">
              <Button asChild className="w-full md:w-auto">
                <label>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload CV
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCVUpload}
                  />
                </label>
              </Button>
              {cv && <span className="text-sm text-muted-foreground">{cv.name}</span>}
            </div>

            <div>
              <Label>Profile Completion</Label>
              <Progress value={75} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="saved-jobs" className="space-y-8">
          <TabsList className="mx-auto">
            <TabsTrigger value="saved-jobs">Saved Jobs</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

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

          <TabsContent value="recommendations">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>

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
      </main>

      <Footer />
    </div>
  );
};

export default Profile;