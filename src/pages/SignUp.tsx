import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { GraduationCap, Briefcase } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string>("student");
  const [formStep, setFormStep] = useState(1);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formStep < 3) {
      setFormStep(formStep + 1);
    } else {
      toast.success("Account created successfully!", {
        description: "Welcome to Inua Stude! You can now start exploring opportunities."
      });
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Join Inua Stude</h1>
              <p className="text-gray-600">Create your account to get started</p>
            </div>
            
            <Tabs 
              value={userType} 
              onValueChange={setUserType}
              className="mb-6"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="student" className="flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="employer" className="flex items-center justify-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Employer
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="student">
                {formStep === 1 && (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" required />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" required />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" required />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the <Link to="/terms" className="text-primary hover:underline">Terms</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                        </Label>
                      </div>
                      
                      <Button type="submit" className="w-full">Continue</Button>
                    </div>
                  </form>
                )}
                
                {formStep === 2 && (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="university">University/College</Label>
                        <Input id="university" placeholder="University of Nairobi" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="fieldOfStudy">Field of Study</Label>
                        <Input id="fieldOfStudy" placeholder="Computer Science" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                        <Select required>
                          <SelectTrigger id="graduationYear">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                            <SelectItem value="2027">2027</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="studentId">Student ID (Optional)</Label>
                        <Input id="studentId" placeholder="Your student ID number" />
                      </div>
                      
                      <Button type="submit" className="w-full">Continue</Button>
                    </div>
                  </form>
                )}
                
                {formStep === 3 && (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="interests">Career Interests</Label>
                        <Select required>
                          <SelectTrigger id="interests">
                            <SelectValue placeholder="Select your primary interest" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="software">Software Development</SelectItem>
                            <SelectItem value="data">Data Science</SelectItem>
                            <SelectItem value="design">UI/UX Design</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="legal">Legal</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="jobType">Preferred Job Type</Label>
                        <Select required>
                          <SelectTrigger id="jobType">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="apprenticeship">Apprenticeship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="bio">Brief Bio (Optional)</Label>
                        <textarea
                          id="bio"
                          className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Tell us a bit about yourself, your skills and career goals..."
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">Create Account</Button>
                    </div>
                  </form>
                )}
              </TabsContent>
              
              <TabsContent value="employer">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" placeholder="Acme Inc." required />
                    </div>
                    
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Select required>
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="energy">Energy</SelectItem>
                          <SelectItem value="transportation">Transportation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="contactName">Contact Person Name</Label>
                      <Input id="contactName" placeholder="Jane Smith" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="employerEmail">Email</Label>
                      <Input id="employerEmail" type="email" placeholder="contact@acmeinc.com" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="employerPassword">Password</Label>
                      <Input id="employerPassword" type="password" required />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="employerTerms" required />
                      <Label htmlFor="employerTerms" className="text-sm">
                        I agree to the <Link to="/terms" className="text-primary hover:underline">Terms</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                      </Label>
                    </div>
                    
                    <Button type="submit" className="w-full">Create Employer Account</Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6">
              <Separator className="my-4" />
              <p className="text-center text-sm text-gray-600">
                Already have an account? <Link to="/login" className="text-primary hover:underline">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignUp;
