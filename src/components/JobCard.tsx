import { useState } from 'react';
import { Bookmark, BookmarkCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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
  onSave: (id: string) => void;
  isSaved: boolean;
}

const JobCard = ({ job, compact = false, onSave, isSaved = false }: JobCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(isSaved);

  const handleSave = () => {
    setSaved(prev => !prev);
    if (onSave) {
      onSave(job.id);
    }
  };

  return (
    <Card className="overflow-hidden">
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
              onClick={handleSave}
              className={`text-muted-foreground hover:text-primary ${saved ? 'text-primary' : ''}`}
            >
              {saved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
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

        <div className={`${expanded ? '' : 'line-clamp-2'}`}>
          <p className="text-sm text-muted-foreground">{job.description}</p>
        </div>

        {!compact && (
          <div className="flex flex-wrap gap-2 mt-4">
            {job.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <Button variant="link" onClick={() => setExpanded(!expanded)} className="px-0">
          {expanded ? (
            <>View Less <ChevronUp className="ml-1 h-4 w-4" /></>
          ) : (
            <>View More <ChevronDown className="ml-1 h-4 w-4" /></>
          )}
        </Button>
        <Button>Apply Now</Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;