import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Mail, User, Phone, MapPin, Briefcase } from "lucide-react";
import JobCard from "@/components/JobCard";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    location: "",
    profession: ""
  });
  const [savedJobs] = useState([]); // In a real app, fetch from backend

  const handleProfileUpdate = () => {
    setIsEditing(false);
    // In a real app, save to backend
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

                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <Input 
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        placeholder="Name"
                      />
                      <Input 
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        placeholder="Email"
                      />
                      <Input 
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        placeholder="Phone"
                      />
                      <Input 
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        placeholder="Location"
                      />
                      <Input 
                        value={profile.profession}
                        onChange={(e) => setProfile({...profile, profession: e.target.value})}
                        placeholder="Profession"
                      />
                      <Button onClick={handleProfileUpdate} className="w-full">Save Changes</Button>
                    </>
                  ) : (
                    <>
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
                      <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full">
                        Edit Profile
                      </Button>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Profile Completion</p>
                  <Progress value={75} className="h-2" />
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