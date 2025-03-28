
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="hero-gradient text-white py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Empowering Youth Through Opportunities
          </h1>
          <p className="text-lg md:text-xl mb-8 md:mb-10 opacity-90 animate-fade-in-delay-1">
            Connecting young Kenyans with internships, apprenticeships, and job opportunities to develop skills and build careers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-delay-2">
            <Link to="/jobs">
              <Button 
                className="text-primary hover:text-white hover:bg-primary/90 bg-white"
                size="lg"
              >
                Explore Opportunities
              </Button>
            </Link>
            <Link to="/resources">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent text-white hover:bg-white hover:text-primary border-white"
              >
                Browse Resources
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
