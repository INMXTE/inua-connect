
export interface ResourceProps {
  id: string;
  title: string;
  type: 'Workshop' | 'Article' | 'Video' | 'Course' | 'Webinar'; 
  date?: string;
  location?: string;
  capacity?: number;
  description: string;
  tags: string[];
  imageUrl?: string;
  learningOutcomes?: string[];
}
