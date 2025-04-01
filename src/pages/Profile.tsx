import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from 'react-redux';
import { setIsEditing, updateProfile } from '@/store/profileSlice';
import { RootState } from '@/store';
import { FileText } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ExtendedProfile } from '@/types/database';
import { UserRole } from '@/types/supabase';

const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setProfileData: React.Dispatch<React.SetStateAction<Partial<ExtendedProfile>>>) => {
  try {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `profile-photos/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);
    
    if (uploadError) {
      throw uploadError;
    }
    
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);
    
    setProfileData(prev => ({
      ...prev,
      photo: data.publicUrl
    }));
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>, setProfileData: React.Dispatch<React.SetStateAction<Partial<ExtendedProfile>>>) => {
  try {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `cv-files/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);
    
    if (uploadError) {
      throw uploadError;
    }
    
    const { data } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);
    
    setProfileData(prev => ({
      ...prev,
      cv_url: data.publicUrl
    }));
  } catch (error) {
    console.error('Error uploading CV:', error);
  }
};

const Profile = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const isEditing = useSelector((state: RootState) => state.profile.isEditing);
  const storeProfile = useSelector((state: RootState) => state.profile.profile);
  
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Partial<ExtendedProfile>>({
    id: '',
    full_name: '',
    phone: '',
    skills: [],
    photo: '',
    bio: '',
    interests: [],
    education: '',
    experience: '',
    role: 'worker' as UserRole,
    cv_url: '',
  });
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchUserProfile();
  }, []);
  
  useEffect(() => {
    if (storeProfile) {
      setProfile(storeProfile);
    }
  }, [storeProfile]);
  
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          const profileData = {
            ...data,
            bio: data.bio || '',
            interests: data.interests || [],
            education: data.education || '',
            experience: data.experience || '',
            cv_url: data.cv_url || '',
          };
          
          setProfile(profileData);
          dispatch(updateProfile(profileData as ExtendedProfile));
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };
  
  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setProfile({
      ...profile,
      skills
    });
  };
  
  const handleInterestsChange = (e) => {
    const interests = e.target.value.split(',').map(interest => interest.trim());
    setProfile({
      ...profile,
      interests
    });
  };
  
  const toggleEdit = () => {
    dispatch(setIsEditing(!isEditing));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (!profile.id) {
        profile.id = user.id;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          skills: profile.skills,
          photo: profile.photo,
          bio: profile.bio,
          interests: profile.interests,
          education: profile.education,
          experience: profile.experience,
          cv_url: profile.cv_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      dispatch(updateProfile(profile as ExtendedProfile));
      dispatch(setIsEditing(false));
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
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
                  {profile.photo ? (
                    <AvatarImage src={profile.photo} alt={profile.full_name} />
                  ) : (
                    <AvatarFallback>{profile.full_name.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
              </div>
              <CardTitle>{profile.full_name || "Your Name"}</CardTitle>
              <p className="text-sm text-gray-500">{profile.email}</p>
              {isEditing && <p className="text-sm text-blue-500 font-medium">Editing</p>}
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="profileImageUpload">Profile Image</Label>
                <Input 
                  id="profileImageUpload" 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleImageUpload(e, setProfile)}
                  disabled={loading}
                />
              </div>

              {!isEditing && (
                <div>
                  <Label htmlFor="cvUpload">CV/Resume</Label>
                  <Input 
                    id="cvUpload" 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    onChange={(e) => handleCVUpload(e, setProfile)}
                    disabled={loading}
                  />
                  {profile.cv_url && (
                    <a 
                      href={profile.cv_url} 
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
                      value={profile.full_name} 
                      onChange={handleChange} 
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      value={profile.email} 
                      disabled={true} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={profile.phone} 
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
                    value={profile.bio} 
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
                    value={profile.skills.join(',')} 
                    onChange={handleSkillsChange}
                    rows={2}
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interests">Interests (comma-separated)</Label>
                  <Textarea 
                    id="interests" 
                    name="interests" 
                    value={profile.interests.join(',')} 
                    onChange={handleInterestsChange}
                    rows={2}
                    disabled={loading}
                  />
                </div>
                
                {!isEditing && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="education">Education</Label>
                      <Textarea 
                        id="education" 
                        name="education" 
                        value={profile.education} 
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
                        value={profile.experience} 
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
