import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import JobCard from '@/components/JobCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: "James Mwangi",
    email: "james.mwangi@example.com",
    university: "University of Nairobi",
    field: "Computer Science",
    graduationYear: "2024",
    skills: ["JavaScript", "React", "Python", "Data Analysis", "UI/UX Design"],
    interests: ["Software Development", "AI/Machine Learning", "Web Design"]
  });

  const savedJobs = [
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

  const handleProfileUpdate = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Profile Information</h2>
                <Button onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="university">University</Label>
                  <Input
                    id="university"
                    value={profileData.university}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({...profileData, university: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="field">Field of Study</Label>
                  <Input
                    id="field"
                    value={profileData.field}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({...profileData, field: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                  <Input
                    id="graduationYear"
                    value={profileData.graduationYear}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({...profileData, graduationYear: e.target.value})}
                  />
                </div>
                {isEditing && (
                  <Button onClick={handleProfileUpdate} className="w-full">
                    Save Changes
                  </Button>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedJobs.map((job) => (
                <JobCard key={job.id} job={job} onSave={() => {}} isSaved={true} />
              ))}
              {savedJobs.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No saved jobs</h3>
                  <p className="text-gray-600 mb-4">
                    Save jobs you're interested in to keep track of them here.
                  </p>
                  <Button asChild>
                    <Link to="/jobs">Find Opportunities</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No active applications</h3>
              <p className="text-gray-600 mb-4">
                When you apply for opportunities, they will appear here for easy tracking.
              </p>
              <Button asChild>
                <Link to="/jobs">Find Opportunities</Link>
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