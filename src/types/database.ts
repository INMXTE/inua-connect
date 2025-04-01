
import { Resource } from './resource';
import { UserRole, Profile, Partner } from './supabase';

// Extend Supabase generated types with any additional properties
export interface ExtendedProfile extends Profile {
  id: string; // Make id required for ExtendedProfile
  email?: string;
}

// Other database entity types
export interface JobApplication {
  id: string;
  job_id: string;
  applicant_id: string;
  match_score?: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface JobPosting {
  id: string;
  title: string;
  description: string;
  requirements: any;
  posted_by: string;
  status: string;
  application_url?: string;
  created_at?: string;
  updated_at?: string;
}

// Job props type for components
export interface JobProps {
  id: string;
  title: string;
  company?: string;
  location?: string;
  type?: string;
  category?: string;
  salary?: string;
  postedDate?: string;
  deadline?: string;
  description: string;
  requirements?: any;
  responsibilities?: string[];
  qualifications?: string[];
  benefits?: string[];
  status?: string;
  application_url?: string;
}

export type JobType = 'full-time' | 'part-time' | 'internship' | 'contract';

// Certificate type
export interface Certificate {
  id: string;
  user_id: string;
  title: string;
  issuing_authority: string;
  issue_date: string;
  expiry_date?: string;
  file_url: string;
  metadata?: any;
  created_at?: string;
  updated_at?: string;
}

// Define extended UserRole type to match what's used in ManageJobs
export type ExtendedUserRole = UserRole | 'admin';

// For reference to supported table types in Supabase
export type TableName = 'profiles' | 'job_postings' | 'certificates' | 
  'headcount_reports' | 'job_applications' | 'users' | 'resources' | 'partners';
