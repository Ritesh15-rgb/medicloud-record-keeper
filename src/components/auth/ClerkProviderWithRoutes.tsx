
import { ClerkProvider, RedirectToSignIn, SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Upload from "@/pages/Upload";
import Profile from "@/pages/Profile";
import Record from "@/pages/Record";
import LandingPage from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { useTheme } from "@/providers/ThemeProvider";
import MainLayout from "@/components/layout/MainLayout";

// Placeholder for Clerk publishable key
// In a real environment, you would use an environment variable
const PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_Y2xlcmsuZGV2LmxvdmFibGUtOTguY2xlcmt0ZXN0LmFjY291bnRzLmRldiQ"; // Using a placeholder test key

export const ClerkProviderWithRoutes = () => {
  const { theme } = useTheme();
  
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: theme === "dark" ? "dark" : "light" as const,
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
        
        {/* Protected routes with MainLayout */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/record/:id" element={<Record />} />
        </Route>
        
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

export default ClerkProviderWithRoutes;
