import { useState } from 'react';
import { Mail, User, GraduationCap, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { JobProps } from '@/components/JobCard';
import type { ResourceProps } from '@/components/ResourceCard';
import JobCard from '@/components/JobCard';
import ResourceCard from '@/components/ResourceCard';


const Profile = () => {
  const { toast } = useToast();
  const [profileCompletion] = useState(75);
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "James Mwangi",
    email: "james.mwangi@example.com",
    phone: "+254 123 456 789",
    university: "University of Nairobi",
    field: "Computer Science",
    graduationYear: "2024",
    skills: ["JavaScript", "React", "Python", "Data Analysis", "UI/UX Design"],
    interests: ["Software Development", "AI/Machine Learning", "Web Design"],
    linkedIn: "https://linkedin.com/in/jamesmwangi",
    github: "https://github.com/jamesmwangi",
    portfolio: "https://jamesmwangi.dev",
    cvUrl: null as string | null,
    avatarUrl: null as string | null,
    bio: "A highly motivated and results-oriented individual with a passion for technology and innovation.",
  });

  const handleProfileChange = (field: string, value: string | string[]) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, avatarUrl: url }));
      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been successfully updated.",
      });
    }
  };

  const handleCVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, cvUrl: url }));
      toast({
        title: "CV Uploaded",
        description: "Your CV has been successfully uploaded.",
      });
    }
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

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    toast({ title: 'Profile Saved', description: 'Your profile has been saved.' });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDownloadCV = () => {
    if (profileData.cvUrl) {
      window.open(profileData.cvUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="bg-primary/10 rounded-full p-4">
                    <User className="h-16 w-16 text-primary" />
                  </div>

                  <div className="flex-grow">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img 
                              src={profileData.avatarUrl || "/placeholder.svg"} 
                              alt="Profile" 
                              className="h-20 w-20 rounded-full object-cover"
                            />
                            <input
                              type="file"
                              id="avatar-upload"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              className="absolute bottom-0 right-0"
                              onClick={() => document.getElementById('avatar-upload')?.click()}
                            >
                              Change
                            </Button>
                          </div>
                          <div className="flex-1 space-y-2">
                            <Input
                              value={profileData.name}
                              onChange={(e) => handleProfileChange('name', e.target.value)}
                              placeholder="Full Name"
                            />
                            <Input
                              value={profileData.email}
                              onChange={(e) => handleProfileChange('email', e.target.value)}
                              placeholder="Email"
                              type="email"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            value={profileData.university}
                            onChange={(e) => handleProfileChange('university', e.target.value)}
                            placeholder="Institution"
                          />
                          <Input
                            value={profileData.field}
                            onChange={(e) => handleProfileChange('field', e.target.value)}
                            placeholder="Field of Study"
                          />
                          <Input
                            value={profileData.graduationYear}
                            onChange={(e) => handleProfileChange('graduationYear', e.target.value)}
                            placeholder="Graduation Year"
                          />
                          <Input
                            value={profileData.phone}
                            onChange={(e) => handleProfileChange('phone', e.target.value)}
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
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
                      </>
                    )}

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
                    {isEditing ? (
                      <div>
                        <textarea value={profileData.bio} onChange={(e)=> setProfileData({...profileData, bio: e.target.value})} placeholder="Enter Bio"/>
                        <div className="mt-4 flex justify-end gap-2">
                          <Button onClick={handleSaveProfile}>Save</Button>
                          <Button variant="ghost" onClick={handleCancelEdit}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <p className="text-gray-600">{profileData.bio}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex gap-2">
                      <Button onClick={handleEditProfile}>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</Button>
                      <div className="relative">
                        <input
                          type="file"
                          id="cv-upload"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleCVUpload}
                        />
                        <Button asChild>
                          <label htmlFor="cv-upload" className="cursor-pointer">
                            Upload CV
                          </label>
                        </Button>
                      </div>
                      {profileData.cvUrl && (
                        <Button variant="outline" onClick={handleDownloadCV}>
                          Download CV
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="saved-jobs">Saved Jobs</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Education & Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-l-2 border-primary/30 pl-4 mb-4">
                      <h4 className="font-medium">BSc in Computer Science</h4>
                      <p className="text-sm text-gray-600">University of Nairobi | Expected: 2024</p>
                      <p className="mt-1 text-sm">Relevant coursework: Data Structures, Algorithms, Web Development</p>
                    </div>
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
              <div className="flex justify-center mt-6">
                <Button variant="outline" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </div>
            </TabsContent>

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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;