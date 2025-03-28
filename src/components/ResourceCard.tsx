
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, GraduationCap, MessageSquare, FileText, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type ResourceType = 'Workshop' | 'Mentorship' | 'CV Assistance' | 'Article';

export interface ResourceProps {
  id: string;
  title: string;
  type: ResourceType;
  description: string;
  date?: string;
  icon?: 'workshop' | 'mentorship' | 'cv' | 'article';
  featured?: boolean;
}

interface ResourceCardProps {
  resource: ResourceProps;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const getIcon = () => {
    switch (resource.icon) {
      case 'workshop':
        return <GraduationCap className="h-6 w-6" />;
      case 'mentorship':
        return <User className="h-6 w-6" />;
      case 'cv':
        return <FileText className="h-6 w-6" />;
      case 'article':
        return <MessageSquare className="h-6 w-6" />;
      default:
        return <GraduationCap className="h-6 w-6" />;
    }
  };

  return (
    <Card className={cn(
      "h-full flex flex-col transition-shadow hover:shadow-md",
      resource.featured && "border-primary bg-primary/5"
    )}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className={cn(
            "p-2 rounded-md",
            resource.featured ? "bg-primary text-white" : "bg-gray-100"
          )}>
            {getIcon()}
          </div>
          {resource.type && (
            <div className={cn(
              "text-sm font-medium",
              resource.featured ? "text-primary" : "text-gray-500"
            )}>
              {resource.type}
            </div>
          )}
        </div>
        <CardTitle className="mt-4">{resource.title}</CardTitle>
        {resource.date && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" /> {resource.date}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{resource.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          variant={resource.featured ? "default" : "outline"} 
          className="w-full"
        >
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
