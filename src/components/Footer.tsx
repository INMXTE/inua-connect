
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Link as LinkIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-white">Inua Stude</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Empowering university students and recent graduates with career guidance, 
              practical experience, and networking opportunities.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">Find Jobs</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-400 hover:text-white transition-colors">Sign Up</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">For Students</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition-colors">Workshops</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition-colors">Mentorship</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition-colors">CV Assistance</Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">Internships</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <a href="mailto:info@inuastude.com" className="text-gray-400 hover:text-white transition-colors">
                  info@inuastude.com
                </a>
              </li>
              <li className="flex items-center">
                <LinkIcon className="h-5 w-5 mr-2 text-gray-400" />
                <a href="https://inuastude.com" className="text-gray-400 hover:text-white transition-colors">
                  www.inuastude.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Inua Stude. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
