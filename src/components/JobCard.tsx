
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, BookmarkCheck } from "lucide-react";

export interface JobProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";

const JobCard = (props: JobProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In a real app, save to backend
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{props.title}</CardTitle>
            <CardDescription>{props.company}</CardDescription>
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
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{props.location}</span>
            <span>•</span>
            <span>{props.type}</span>
            <span>•</span>
            <span>{props.salary}</span>
          </div>
          
          <p className="line-clamp-2">{props.description}</p>
          
          {isExpanded && (
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-medium mb-2">Requirements:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {props.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-muted-foreground">
                Posted: {props.postedDate}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full"
        >
          {isExpanded ? "Show Less" : "View Details"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
