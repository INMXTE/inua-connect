
import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const companies = [
  {
    id: 1,
    name: 'Amka Africa',
    logo: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500',
    description: 'Legal aid and development organization offering internships for law students.'
  },
  {
    id: 2,
    name: 'TechVentures',
    logo: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500',
    description: 'Technology company specializing in innovative solutions and digital transformation.'
  },
  {
    id: 3,
    name: 'ProDev Solutions',
    logo: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500',
    description: 'Software development firm with opportunities in programming and project management.'
  },
  {
    id: 4,
    name: 'EcoInnovate',
    logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500',
    description: 'Sustainable business solutions company with green technology internships.'
  },
  {
    id: 5,
    name: 'ConsultPlus',
    logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500',
    description: 'Consulting firm providing business strategy and financial advisory services.'
  }
];

const CompanyShowcase = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Partner Companies</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with leading organizations offering opportunities for students and graduates.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white shadow-md"
              onClick={() => handleScroll('left')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide px-4 py-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {companies.map((company) => (
              <div 
                key={company.id} 
                className="flex-shrink-0 w-[300px] bg-white rounded-lg shadow-md overflow-hidden animate-fade-in"
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2">{company.name}</h3>
                  <p className="text-sm text-gray-600">{company.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white shadow-md"
              onClick={() => handleScroll('right')}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyShowcase;
