
export type UserRole = 'worker' | 'employer' | 'admin' | 'hr_admin';

export interface Profile {
  id: string;
  role: UserRole;
  job_preferences?: any;
  created_at?: string;
  updated_at?: string;
  full_name?: string;
  phone?: string;
  skills?: string[];
  photo?: string;
  bio?: string;
  education?: string;
  experience?: string;
  interests?: string[];
  cv_url?: string;
}

export interface Partner {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  website_url?: string;
  created_at?: string;
  updated_at?: string;
}
