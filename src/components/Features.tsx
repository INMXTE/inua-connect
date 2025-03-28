
import { BriefcaseIcon, UserIcon, GraduationCap, MessageSquare, FileText } from 'lucide-react';

const features = [
  {
    icon: <BriefcaseIcon className="h-10 w-10 text-primary" />,
    title: 'Job Matching',
    description: 'Smart algorithms match you with internships, apprenticeships, and jobs based on your skills and preferences.'
  },
  {
    icon: <UserIcon className="h-10 w-10 text-primary" />,
    title: 'Mentorship',
    description: 'One-on-one guidance from industry professionals on career growth and entrepreneurship.'
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: 'Networking Events',
    description: 'Connect with recruiters and professionals through virtual and in-person networking opportunities.'
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-primary" />,
    title: 'Skills Workshops',
    description: 'Interactive sessions on resume writing, interview skills, and essential soft skills training.'
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: 'CV Assistance',
    description: 'Get help with CV creation and submission to potential employers to maximize your chances.'
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Inua Stude Helps You Succeed</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform offers a comprehensive set of tools and resources to support your transition from education to employment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow animate-fade-in-delay-${index % 3}`}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
