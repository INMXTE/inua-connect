
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Briefcase, MapPin, Calendar, ExternalLink } from "lucide-react";

interface JobCardProps {
  id: string;
  title: string;
  company?: string;
  location?: string;
  type?: string;
  category?: string;
  description: string;
  postedDate?: string;
  applicationUrl?: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company = "Company Name",
  location = "Remote",
  type = "Full-time",
  category = "Technology",
  description,
  postedDate = "Posted 7 days ago",
  applicationUrl = "#",
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="text-sm mt-1">{company}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
            {type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-2" />
            <span>{category}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{postedDate}</span>
          </div>
        </div>
        <p className="text-sm line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Details</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription className="flex flex-col gap-1 pt-2">
                <span className="font-medium text-foreground">{company}</span>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{location}</span>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {type}
              </Badge>
              <Badge variant="outline" className="bg-gray-50">
                {category}
              </Badge>
              <Badge variant="outline" className="bg-gray-50">
                {postedDate}
              </Badge>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Job Description</h4>
                <p className="text-sm">{description}</p>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button 
                className="w-full flex items-center gap-2"
                onClick={() => window.open(applicationUrl, '_blank')}
              >
                Apply for Position
                <ExternalLink className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
