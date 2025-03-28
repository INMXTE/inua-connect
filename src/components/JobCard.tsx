import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  isSaved?: boolean;
  onSave?: (id: string) => void;
}

export default function JobCard({ id, title, company, location, type, description, requirements, isSaved, onSave }: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={cn(
      "transition-all duration-300 ease-in-out",
      isExpanded && "scale-[1.02]"
    )}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{company} • {location}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSave?.(id)}
            className={cn(
              "transition-colors",
              isSaved && "text-red-500 hover:text-red-600"
            )}
          >
            <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
          </Button>
        </div>
        <Badge variant="secondary">{type}</Badge>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2">{description}</p>
        {isExpanded && (
          <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-4">
            <div>
              <h4 className="font-semibold mb-2">Requirements:</h4>
              <ul className="list-disc list-inside space-y-1">
                {requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
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
}