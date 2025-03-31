
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useMobile } from "@/hooks/use-mobile";
import { User, ChevronDown, Menu, X, Home, Briefcase, BookOpen, LayoutDashboard, FilePlus, UserCircle, LogOut } from "lucide-react";

interface NavbarProps {
  userRole?: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ userRole }) => {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMobile();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getNavigationLinks = () => {
    if (userRole === "admin") {
      return [
        { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
        { label: "Manage Jobs", href: "/manage-jobs", icon: <Briefcase className="h-4 w-4 mr-2" /> },
        { label: "Manage Resources", href: "/manage-resources", icon: <BookOpen className="h-4 w-4 mr-2" /> },
        { label: "Manage Partners", href: "/manage-partners", icon: <FilePlus className="h-4 w-4 mr-2" /> },
      ];
    } else if (userRole === "employer") {
      return [
        { label: "Dashboard", href: "/employer/dashboard", icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
        { label: "Content Management", href: "/employer/content", icon: <FilePlus className="h-4 w-4 mr-2" /> },
      ];
    } else {
      return [
        { label: "Home", href: "/", icon: <Home className="h-4 w-4 mr-2" /> },
        { label: "Find Jobs", href: "/jobs", icon: <Briefcase className="h-4 w-4 mr-2" /> },
        { label: "Resources", href: "/resources", icon: <BookOpen className="h-4 w-4 mr-2" /> },
      ];
    }
  };

  const navigationLinks = getNavigationLinks();

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">Inua Stude</span>
          </Link>

          {!isMobile && (
            <nav className="ml-4 flex items-center space-x-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center">
          {isMobile ? (
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 focus:ring-0"
                >
                  <UserCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {user?.email?.split("@")[0] || "Account"}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <UserCircle className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-white pb-20 shadow-xl animate-in slide-in-from-top-5">
          <div className="container mx-auto px-4 pt-4">
            <nav className="flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center py-2 text-base font-medium text-gray-900 hover:text-blue-600"
                  onClick={toggleMobileMenu}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              
              {user && (
                <>
                  <div className="h-px bg-gray-200 my-2" />
                  
                  <Link
                    to="/profile"
                    className="flex items-center py-2 text-base font-medium text-gray-900 hover:text-blue-600"
                    onClick={toggleMobileMenu}
                  >
                    <UserCircle className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="flex items-center py-2 text-base font-medium text-gray-900 hover:text-blue-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              )}
              
              {!user && (
                <>
                  <div className="h-px bg-gray-200 my-2" />
                  
                  <Link
                    to="/login"
                    className="flex items-center py-2 text-base font-medium text-gray-900 hover:text-blue-600"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </Link>
                  
                  <Link
                    to="/signup"
                    className="flex items-center py-2 text-base font-medium text-blue-600"
                    onClick={toggleMobileMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
