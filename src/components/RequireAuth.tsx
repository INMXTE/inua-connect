
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface RequireAuthProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const RequireAuth = ({ children, requireAdmin = false }: RequireAuthProps) => {
  const { isAuthenticated, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        toast.error("Please sign in to access this page");
        navigate("/login", { 
          state: { from: location },
          replace: true 
        });
      } else if (requireAdmin) {
        // For now, we don't have a way to check if the user is admin
        // This will be enhanced when we add user roles
        // For now, accept all authenticated users
      }
    }
  }, [isAuthenticated, loading, navigate, location, requireAdmin, user]);

  if (loading) {
    // Return a loading spinner or placeholder
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default RequireAuth;
