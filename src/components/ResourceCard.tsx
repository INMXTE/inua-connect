
import React from 'react';
import { Calendar, Clock, MapPin, Users, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/ui/hover-card';
import { ResourceProps } from '@/types/resources';

interface ResourceCardProps {
  resource: ResourceProps;
  onClick?: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClick }) => {
  const { title, type, date, location, capacity, description, tags, imageUrl, learningOutcomes } = resource;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
      {imageUrl && (
        <div className="h-48 overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <div className="mb-2">
          <Badge variant={type === 'Workshop' || type === 'Webinar' ? 'default' : 'secondary'}>
            {type}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-gray-50">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {(date || location || capacity) && (
          <div className="text-sm text-gray-500 space-y-2 mb-4">
            {date && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{date}</span>
              </div>
            )}
            {type === 'Workshop' && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>2 hours</span>
              </div>
            )}
            {location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{location}</span>
              </div>
            )}
            {capacity && (
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>{capacity} seats available</span>
              </div>
            )}
          </div>
        )}

        {learningOutcomes && learningOutcomes.length > 0 && (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button 
                variant="link" 
                className="text-primary p-0 h-auto flex items-center hover:text-primary/80"
              >
                <FileText className="h-4 w-4 mr-1" /> Learning outcomes
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Learning Outcomes:</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  {learningOutcomes.map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </HoverCardContent>
          </HoverCard>
        )}

        <div className="mt-4">
          <Button onClick={onClick} variant="outline" className="w-full">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
