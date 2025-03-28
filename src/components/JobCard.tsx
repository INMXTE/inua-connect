
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookmarkCheck, Bookmark, MapPin, Building, CalendarDays, Briefcase } from 'lucide-react';
import { JobProps } from '@/types/jobs';
import { cn } from '@/lib/utils';

const JobCard = (props: JobProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300",
      isExpanded ? "shadow-xl" : "shadow-md",
      "hover:shadow-xl hover:translate-y-[-4px]"
    )}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{props.title}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              {props.company}
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleSave}
            className="text-muted-foreground hover:text-primary"
          >
            {isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {props.location}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              {props.type}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              {props.postedDate}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {props.skills?.map((skill, index) => (
              <Badge key={index} variant="secondary">{skill}</Badge>
            ))}
          </div>
          
          <p className={cn(
            "text-gray-600",
            isExpanded ? "" : "line-clamp-2"
          )}>{props.description}</p>
          
          {isExpanded && (
            <div className="space-y-4 animate-in fade-in-50 duration-300">
              <div>
                <h4 className="font-medium mb-2">Requirements:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {props.requirements.map((req, index) => (
                    <li key={index} className="text-gray-600">{req}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Benefits:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {props.benefits?.map((benefit, index) => (
                    <li key={index} className="text-gray-600">{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1"
        >
          {isExpanded ? "Show Less" : "View Details"}
        </Button>
        <Button className="flex-1">Apply Now</Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
