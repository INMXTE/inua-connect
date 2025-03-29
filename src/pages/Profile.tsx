
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, Briefcase, Upload, GraduationCap, Calendar } from "lucide-react";
import JobCard from "@/components/JobCard";
import Navbar from "@/components/Navbar";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    location: "",
    profession: "",
    education: "",
    experience: "",
    skills: "",
    bio: "",
    graduationYear: "",
  });
  const [savedJobs] = useState([]);
  const [cv, setCv] = useState<File | null>(null);

  const handleProfileUpdate = () => {
    setIsEditing(false);
    // In a real app, save to backend
  };

  const handleCvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCv(file);
      // In a real app, upload to storage
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="font-medium">{profile.name}</h3>
                    <p className="text-sm text-muted-foreground">{profile.profession}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Profile Completion</p>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input 
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input 
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input 
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input 
                          value={profile.location}
                          onChange={(e) => setProfile({...profile, location: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Profession</Label>
                        <Input 
                          value={profile.profession}
                          onChange={(e) => setProfile({...profile, profession: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Education</Label>
                        <Input 
                          value={profile.education}
                          onChange={(e) => setProfile({...profile, education: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Graduation Year</Label>
                        <Input 
                          value={profile.graduationYear}
                          onChange={(e) => setProfile({...profile, graduationYear: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Experience</Label>
                        <Textarea 
                          value={profile.experience}
                          onChange={(e) => setProfile({...profile, experience: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Skills</Label>
                        <Textarea 
                          value={profile.skills}
                          onChange={(e) => setProfile({...profile, skills: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Bio</Label>
                        <Textarea 
                          value={profile.bio}
                          onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        />
                      </div>
                      <Button onClick={handleProfileUpdate} className="w-full">Save Changes</Button>
                    </>
                  ) : (
                    <>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{profile.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{profile.phone || "Add phone number"}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{profile.location || "Add location"}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span>{profile.profession || "Add profession"}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          <span>{profile.education || "Add education"}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{profile.graduationYear || "Add graduation year"}</span>
                        </div>
                      </div>
                      <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full">
                        Edit Profile
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CV/Resume</CardTitle>
                <CardDescription>Upload your latest CV</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <Input
                      type="file"
                      id="cv"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleCvUpload}
                    />
                    <Label
                      htmlFor="cv"
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {cv ? cv.name : "Click to upload CV"}
                      </span>
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full"
              onClick={() => navigate('/jobs')}
            >
              Find Opportunities
            </Button>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Jobs</CardTitle>
                <CardDescription>Jobs you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                {savedJobs.length > 0 ? (
                  <div className="space-y-4">
                    {savedJobs.map((job) => (
                      <JobCard key={job.id} {...job} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No saved jobs yet. Start exploring opportunities!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
