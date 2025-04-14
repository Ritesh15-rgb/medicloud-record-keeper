
import { ClerkProvider, RedirectToSignIn, SignIn, SignUp } from "@clerk/clerk-react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Upload from "@/pages/Upload";
import Profile from "@/pages/Profile";
import Record from "@/pages/Record";
import LandingPage from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { dark } from "@clerk/themes";
import { useTheme } from "@/providers/ThemeProvider";

// Placeholder for Clerk publishable key
// In a real environment, you would use an environment variable
const PUBLISHABLE_KEY = "YOUR_CLERK_PUBLISHABLE_KEY";

export const ClerkProviderWithRoutes = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        elements: {
          formButtonPrimary: 
            "bg-medivault-purple hover:bg-medivault-deep-purple text-sm normal-case",
        },
      }}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" redirectUrl="/dashboard" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" redirectUrl="/profile" />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/record/:id"
          element={
            <ProtectedRoute>
              <Record />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ClerkProvider>
  );
};

// Component to protect routes that require authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }
  
  return <>{children}</>;
};

// Mock useAuth hook for now - will be replaced with actual Clerk hook
const useAuth = () => {
  return {
    isSignedIn: true, // For development, set to true to bypass authentication
    isLoaded: true
  };
};

export default ClerkProviderWithRoutes;
