
export interface Resource {
  id: string;
  title: string;
  description?: string;
  category?: string;
  type?: string;
  image_url?: string;
  resource_url?: string;
  created_by?: string;
  views?: number;
  created_at?: string;
  updated_at?: string;
}
