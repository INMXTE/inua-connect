import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, User, GraduationCap, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import type { ResourceProps } from '@/components/ResourceCard';
import ResourceCard from '@/components/ResourceCard';
import Footer from '@/components/Footer'; //Preserving this import
import type { JobProps } from '@/components/JobCard'; //Preserving this import


const Profile = () => {
  const { toast } = useToast();
  const [profileCompletion] = useState(75);
  const [isEditing, setIsEditing] = useState(false);
  const [savedJobs] = useState([]);

  const [profileData, setProfileData] = useState({
    name: "James Mwangi",
    email: "james.mwangi@example.com",
    phone: "+254 123 456 789",
    university: "University of Nairobi",
    field: "Computer Science",
    graduationYear: "2024",
    skills: ["JavaScript", "React", "Python", "Data Analysis", "UI/UX Design"],
    interests: ["Software Development", "AI/Machine Learning", "Web Design"],
    education: [
      {
        institution: "University of Nairobi",
        degree: "Bachelor of Science in Computer Science",
        year: "2020-2024"
      }
    ],
    experience: [
      {
        company: "Tech Solutions Ltd",
        position: "Software Developer Intern",
        duration: "Jun 2023 - Present"
      }
    ],
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

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    toast({ title: 'Profile Saved', description: 'Your profile has been saved.' });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle CV upload logic here
      toast({ title: 'CV Uploaded', description: 'Your CV has been uploaded successfully.' });
    }
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
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  {profileData.avatarUrl ? (
                    <img
                      src={profileData.avatarUrl}
                      alt="Profile"
                      className="h-32 w-32 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-16 w-16 text-primary" />
                    </div>
                  )}
                  {isEditing && (
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  )}
                </div>

                <div className="flex-grow">
                  {isEditing ? (
                    <div className="space-y-4">
                      <Input
                        value={profileData.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        placeholder="Full Name"
                      />
                      <Input
                        value={profileData.university}
                        onChange={(e) => handleProfileChange('university', e.target.value)}
                        placeholder="Institution"
                      />
                      <Input
                        value={profileData.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        placeholder="Email"
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleSaveProfile}>Save Changes</Button>
                        <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold mb-2">{profileData.name}</h2>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-600">
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          <span>{profileData.university}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          <span>{profileData.email}</span>
                        </div>
                      </div>
                      <Button onClick={handleEditProfile} className="mt-4">
                        Edit Profile
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Profile Completion: {profileCompletion}%</p>
                  <Progress value={profileCompletion} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {profileData.interests.map((interest, index) => (
                        <Badge key={index} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Education & Experience</h3>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label>Education</Label>
                        {profileData.education.map((edu, index) => (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                            <Input
                              value={edu.institution}
                              onChange={(e) => {
                                const newEducation = [...profileData.education];
                                newEducation[index].institution = e.target.value;
                                handleProfileChange('education', newEducation);
                              }}
                              placeholder="Institution"
                            />
                            <Input
                              value={edu.degree}
                              onChange={(e) => {
                                const newEducation = [...profileData.education];
                                newEducation[index].degree = e.target.value;
                                handleProfileChange('education', newEducation);
                              }}
                              placeholder="Degree"
                            />
                            <Input
                              value={edu.year}
                              onChange={(e) => {
                                const newEducation = [...profileData.education];
                                newEducation[index].year = e.target.value;
                                handleProfileChange('education', newEducation);
                              }}
                              placeholder="Year"
                            />
                          </div>
                        ))}
                      </div>

                      <div>
                        <Label>Experience</Label>
                        {profileData.experience.map((exp, index) => (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                            <Input
                              value={exp.company}
                              onChange={(e) => {
                                const newExperience = [...profileData.experience];
                                newExperience[index].company = e.target.value;
                                handleProfileChange('experience', newExperience);
                              }}
                              placeholder="Company"
                            />
                            <Input
                              value={exp.position}
                              onChange={(e) => {
                                const newExperience = [...profileData.experience];
                                newExperience[index].position = e.target.value;
                                handleProfileChange('experience', newExperience);
                              }}
                              placeholder="Position"
                            />
                            <Input
                              value={exp.duration}
                              onChange={(e) => {
                                const newExperience = [...profileData.experience];
                                newExperience[index].duration = e.target.value;
                                handleProfileChange('experience', newExperience);
                              }}
                              placeholder="Duration"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Education</h4>
                        {profileData.education.map((edu, index) => (
                          <div key={index} className="mb-2">
                            <p className="font-medium">{edu.institution}</p>
                            <p className="text-gray-600">{edu.degree}</p>
                            <p className="text-gray-500 text-sm">{edu.year}</p>
                          </div>
                        ))}
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Experience</h4>
                        {profileData.experience.map((exp, index) => (
                          <div key={index} className="mb-2">
                            <p className="font-medium">{exp.company}</p>
                            <p className="text-gray-600">{exp.position}</p>
                            <p className="text-gray-500 text-sm">{exp.duration}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex gap-2">
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
            </CardContent>
          </Card>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Saved Jobs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedJobs.map((job: any) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;