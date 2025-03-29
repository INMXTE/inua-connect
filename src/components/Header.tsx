
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          YourLogo
        </Link>
        <nav className="flex gap-4">
          <Link to="/jobs">
            <Button variant="ghost">Find Jobs</Button>
          </Link>
          <Link to="/resources">
            <Button variant="ghost">Resources</Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost">Profile</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
