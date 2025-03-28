
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
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
import { GraduationCap, Briefcase, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [userType, setUserType] = useState<string>("student");
  const [formStep, setFormStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Common fields
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    
    // Student fields
    university: "",
    fieldOfStudy: "",
    graduationYear: "",
    studentId: "",
    interests: "",
    jobType: "",
    bio: "",
    
    // Employer fields
    companyName: "",
    industry: "",
    contactName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, terms: checked }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For final step submission
    if ((userType === "student" && formStep === 3) || userType === "employer") {
      try {
        setLoading(true);
        
        // Password confirmation check
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        
        // Prepare user metadata based on user type
        const userData = userType === "student" 
          ? {
              firstName: formData.firstName,
              lastName: formData.lastName,
              userType: "student",
              university: formData.university,
              fieldOfStudy: formData.fieldOfStudy,
              graduationYear: formData.graduationYear,
              interests: formData.interests,
              jobType: formData.jobType,
              bio: formData.bio
            }
          : {
              firstName: formData.firstName,
              lastName: formData.lastName,
              userType: "employer",
              companyName: formData.companyName,
              industry: formData.industry,
              contactName: formData.contactName
            };
        
        await signUp(formData.email, formData.password, userData);
        
        toast.success(`${userType === "student" ? "Student" : "Employer"} account created!`, {
          description: "You can now sign in to access your account."
        });
        
        navigate('/login');
      } catch (error: any) {
        toast.error("Registration failed", { 
          description: error.message || "Please try again later" 
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Continue to next step for student registration
      setFormStep(formStep + 1);
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
                          <Input 
                            id="firstName" 
                            placeholder="John" 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Doe" 
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="john.doe@example.com" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input 
                          id="password" 
                          type="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input 
                          id="confirmPassword" 
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="terms" 
                          checked={formData.terms}
                          onCheckedChange={handleCheckboxChange}
                          required 
                        />
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
                        <Input 
                          id="university" 
                          placeholder="University of Nairobi" 
                          value={formData.university}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="fieldOfStudy">Field of Study</Label>
                        <Input 
                          id="fieldOfStudy" 
                          placeholder="Computer Science"
                          value={formData.fieldOfStudy}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                        <Select
                          value={formData.graduationYear}
                          onValueChange={(value) => handleSelectChange("graduationYear", value)}
                          required
                        >
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
                        <Input 
                          id="studentId" 
                          placeholder="Your student ID number"
                          value={formData.studentId}
                          onChange={handleInputChange}
                        />
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
                        <Select
                          value={formData.interests}
                          onValueChange={(value) => handleSelectChange("interests", value)}
                          required
                        >
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
                        <Select
                          value={formData.jobType}
                          onValueChange={(value) => handleSelectChange("jobType", value)}
                          required
                        >
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
                          value={formData.bio}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </TabsContent>
              
              <TabsContent value="employer">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          placeholder="Jane" 
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Smith" 
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input 
                        id="companyName" 
                        placeholder="Acme Inc." 
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Select
                        value={formData.industry}
                        onValueChange={(value) => handleSelectChange("industry", value)}
                        required
                      >
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
                      <Input 
                        id="contactName" 
                        placeholder="Jane Smith" 
                        value={formData.contactName}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="contact@acmeinc.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={formData.terms}
                        onCheckedChange={handleCheckboxChange}
                        required 
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the <Link to="/terms" className="text-primary hover:underline">Terms</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                      </Label>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        "Create Employer Account"
                      )}
                    </Button>
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
