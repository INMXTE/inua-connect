
import { useState } from 'react';
import { Bookmark, BookmarkCheck, Briefcase, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

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
  onSave?: (jobId: string) => void;
  isSaved?: boolean;
}

const JobCard = ({ job, compact = false, onSave, isSaved = false }: JobCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(isSaved);
  
  const toggleExpand = () => {
    setExpanded(prev => !prev);
  };

  const handleSave = () => {
    setSaved(prev => !prev);
    if (onSave) {
      onSave(job.id);
    }
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
              onClick={handleSave}
              className="text-muted-foreground hover:text-primary"
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
            <Calendar className="h-4 w-4 mr-1" /> Posted {job.posted}
          </div>
        </div>
        
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-gray-600 mb-4">
                {job.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
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
          className="w-full"
        >
          {expanded ? (
            <>Hide Details <ChevronUp className="ml-2 h-4 w-4" /></>
          ) : (
            <>View Details <ChevronDown className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
