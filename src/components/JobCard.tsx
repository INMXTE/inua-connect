
import { useState } from 'react';
import { Bookmark, BookmarkCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSavedJob } from '@/store/jobsSlice';
import { RootState } from '@/store';

export type JobType = 'Full-time' | 'Part-time' | 'Internship' | 'Apprenticeship';

export interface JobProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  salary?: string;
  posted: string;
  skills: string[];
  description: string;
}

interface JobCardProps {
  job: JobProps;
  compact?: boolean;
}

const JobCard = ({ job, compact = false }: JobCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const savedJobs = useSelector((state: RootState) => state.jobs.savedJobs);
  const isSaved = savedJobs.some(savedJob => savedJob.id === job.id);
  
  const toggleExpand = () => {
    setExpanded(prev => !prev);
  };

  const handleSaveToggle = () => {
    dispatch(toggleSavedJob(job));
  };
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <div className="text-muted-foreground">{job.company} • {job.location}</div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSaveToggle}
              className="h-8 w-8"
            >
              {isSaved ? (
                <BookmarkCheck className="h-5 w-5 text-primary" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </Button>
            <Badge variant={job.type === 'Internship' ? 'outline' : 'default'}>
              {job.type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground gap-4 mb-4">
          {job.salary && (
            <div className="flex items-center">
              <span className="mr-1">💰</span> {job.salary}
            </div>
          )}
          <div className="flex items-center">
            <span className="mr-1">📅</span> Posted {job.posted}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          {expanded ? job.description : `${job.description.slice(0, 150)}...`}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {job.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          onClick={toggleExpand}
          className="w-full flex items-center justify-center gap-2"
        >
          {expanded ? (
            <>Show Less <ChevronUp className="h-4 w-4" /></>
          ) : (
            <>View Details <ChevronDown className="h-4 w-4" /></>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
