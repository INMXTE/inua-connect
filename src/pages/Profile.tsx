
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { updateProfile } from "@/store/profileSlice";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Profile = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEmployer, setIsEmployer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    skills: "",
    interests: "",
    education: "",
    experience: "",
    profileImage: "",
    cvFile: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        // Fetch user profile data from Supabase
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data) {
          // Check if user is employer or admin
          setIsEmployer(data.role === 'employer');
          setIsAdmin(data.role === 'admin');
          
          // Initialize form with data from database
          setFormData({
            fullName: data.full_name || "",
            email: user.email || "",
            phone: data.phone || "",
            bio: data.bio || "",
            skills: Array.isArray(data.skills) ? data.skills.join(", ") : data.skills || "",
            interests: Array.isArray(data.interests) ? data.interests.join(", ") : data.interests || "",
            education: data.education || "",
            experience: data.experience || "",
            profileImage: data.photo || "",
            cvFile: data.cv_url || "",
          });
          
          // Update Redux store
          dispatch(updateProfile({
            fullName: data.full_name,
            email: user.email,
            phone: data.phone,
            bio: data.bio,
            skills: data.skills,
            interests: data.interests,
            education: data.education,
            experience: data.experience,
            profileImage: data.photo,
            cvFile: data.cv_url,
          }));
        }
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `profile-images/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('profiles').getPublicUrl(filePath);
      
      setFormData({ ...formData, profileImage: data.publicUrl });
      toast.success("Profile image uploaded successfully");
    } catch (error) {
      toast.error("Error uploading image: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCVUpload = async (e) => {
    if (isEmployer) return; // Employers don't need CV
    
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `cvs/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('profiles').getPublicUrl(filePath);
      
      setFormData({ ...formData, cvFile: data.publicUrl });
      toast.success("CV uploaded successfully");
    } catch (error) {
      toast.error("Error uploading CV: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Convert comma-separated strings to arrays
      const skillsArray = formData.skills ? formData.skills.split(',').map(skill => skill.trim()) : [];
      const interestsArray = formData.interests ? formData.interests.split(',').map(interest => interest.trim()) : [];
      
      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          phone: formData.phone,
          bio: formData.bio,
          skills: skillsArray,
          interests: interestsArray,
          education: formData.education,
          experience: formData.experience,
          photo: formData.profileImage,
          cv_url: formData.cvFile,
          updated_at: new Date()
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Update Redux store
      dispatch(updateProfile({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio,
        skills: skillsArray,
        interests: interestsArray,
        education: formData.education,
        experience: formData.experience,
        profileImage: formData.profileImage,
        cvFile: formData.cvFile,
      }));
      
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Error updating profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  {formData.profileImage ? (
                    <AvatarImage src={formData.profileImage} alt={formData.fullName} />
                  ) : (
                    <AvatarFallback>{formData.fullName.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
              </div>
              <CardTitle>{formData.fullName || "Your Name"}</CardTitle>
              <p className="text-sm text-gray-500">{formData.email}</p>
              {isEmployer && <p className="text-sm text-blue-500 font-medium">Employer</p>}
              {isAdmin && <p className="text-sm text-purple-500 font-medium">Admin</p>}
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="profileImageUpload">Profile Image</Label>
                <Input 
                  id="profileImageUpload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  disabled={loading}
                />
              </div>

              {!isEmployer && (
                <div>
                  <Label htmlFor="cvUpload">CV/Resume</Label>
                  <Input 
                    id="cvUpload" 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleCVUpload}
                    disabled={loading}
                  />
                  {formData.cvFile && (
                    <a 
                      href={formData.cvFile} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-blue-500 underline block mt-2"
                    >
                      View Current CV
                    </a>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleChange} 
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      disabled={true} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    name="bio" 
                    value={formData.bio} 
                    onChange={handleChange} 
                    rows={4}
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Textarea 
                    id="skills" 
                    name="skills" 
                    value={formData.skills} 
                    onChange={handleChange}
                    rows={2}
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interests">Interests (comma-separated)</Label>
                  <Textarea 
                    id="interests" 
                    name="interests" 
                    value={formData.interests} 
                    onChange={handleChange}
                    rows={2}
                    disabled={loading}
                  />
                </div>
                
                {!isEmployer && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="education">Education</Label>
                      <Textarea 
                        id="education" 
                        name="education" 
                        value={formData.education} 
                        onChange={handleChange}
                        rows={3}
                        disabled={loading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience</Label>
                      <Textarea 
                        id="experience" 
                        name="experience" 
                        value={formData.experience} 
                        onChange={handleChange}
                        rows={3}
                        disabled={loading}
                      />
                    </div>
                  </>
                )}
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
