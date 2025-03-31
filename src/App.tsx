
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/RequireAuth";
import Navbar from "./components/Navbar";
import IndexPage from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Jobs from "./pages/Jobs";
import Resources from "./pages/Resources";
import Admin from "./pages/Admin";
import AdminResources from "./pages/AdminResources";
import ManageJobs from "./pages/ManageJobs";
import ManageResources from "./pages/ManageResources";
import ManagePartners from "./pages/ManagePartners";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerContent from "./pages/EmployerContent";
import { supabase } from "./integrations/supabase/client";

// Create a client
const queryClient = new QueryClient();

function App() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          if (data) {
            setUserRole(data.role);
          }
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserRole();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          setUserRole(data?.role || null);
        } else {
          setUserRole(null);
        }
        setLoading(false);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Conditional redirect based on user role
  const RoleBasedRedirect = ({ children }: { children: React.ReactNode }) => {
    if (loading) return <div>Loading...</div>;
    
    if (userRole === "employer") {
      return <Navigate to="/employer/dashboard" replace />;
    }
    
    if (userRole === "admin") {
      return <Navigate to="/admin" replace />;
    }
    
    return <>{children}</>;
  };
  
  const RoleBasedNavbar = () => {
    return <Navbar userRole={userRole} />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <TooltipProvider>
          <BrowserRouter>
            <AuthProvider>
              <RoleBasedNavbar />
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<IndexPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                
                {/* Student routes */}
                <Route path="/jobs" element={
                  <RequireAuth>
                    <RoleBasedRedirect>
                      <Jobs />
                    </RoleBasedRedirect>
                  </RequireAuth>
                } />
                <Route path="/resources" element={
                  <RequireAuth>
                    <RoleBasedRedirect>
                      <Resources />
                    </RoleBasedRedirect>
                  </RequireAuth>
                } />
                
                {/* Employer routes */}
                <Route path="/employer/dashboard" element={
                  <RequireAuth>
                    <EmployerDashboard />
                  </RequireAuth>
                } />
                <Route path="/employer/content" element={
                  <RequireAuth>
                    <EmployerContent />
                  </RequireAuth>
                } />
                
                {/* Admin routes */}
                <Route path="/admin" element={
                  <RequireAuth>
                    <Admin />
                  </RequireAuth>
                } />
                <Route path="/admin/resources" element={
                  <RequireAuth>
                    <AdminResources />
                  </RequireAuth>
                } />
                <Route path="/manage-jobs" element={
                  <RequireAuth>
                    <ManageJobs />
                  </RequireAuth>
                } />
                <Route path="/manage-resources" element={
                  <RequireAuth>
                    <ManageResources />
                  </RequireAuth>
                } />
                <Route path="/manage-partners" element={
                  <RequireAuth>
                    <ManagePartners />
                  </RequireAuth>
                } />
                
                {/* Common routes */}
                <Route path="/profile" element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                } />
                
                {/* Not found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
