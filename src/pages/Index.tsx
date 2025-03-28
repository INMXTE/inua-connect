
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CompanyShowcase from "@/components/CompanyShowcase";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      
      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our simple process connects you with opportunities in just a few steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 animate-fade-in-delay-1">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and build a detailed profile with your education, skills, and career interests.
              </p>
            </div>
            
            <div className="text-center p-6 animate-fade-in-delay-2">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Matched</h3>
              <p className="text-gray-600">
                Our platform matches you with internships, jobs, and mentorship opportunities that fit your profile.
              </p>
            </div>
            
            <div className="text-center p-6 animate-fade-in-delay-3">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Apply & Connect</h3>
              <p className="text-gray-600">
                Apply for positions, attend events, and connect with mentors to jumpstart your career.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/signup">
              <Button size="lg">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <CompanyShowcase />
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from students and graduates who have transformed their careers with Inua Stude.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 animate-fade-in">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Grace Mwangi</h4>
                  <p className="text-gray-600 text-sm">Computer Science Graduate</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Through Inua Stude, I secured an internship at a leading tech company that led to a full-time position. The mentorship and CV assistance were invaluable."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 animate-fade-in-delay-1">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">James Ochieng</h4>
                  <p className="text-gray-600 text-sm">Business Administration Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The networking events helped me build connections with industry professionals. I'm now working part-time while completing my studies thanks to Inua Stude."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 animate-fade-in-delay-2">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Linda Kamau</h4>
                  <p className="text-gray-600 text-sm">Engineering Graduate</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The workshops improved my interview skills significantly. I now work at my dream company after being matched through the Inua Stude platform."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Ready to Launch Your Career?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in-delay-1">
            Join thousands of students and graduates who have found success through Inua Stude.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 animate-fade-in-delay-2">
              Sign Up Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
