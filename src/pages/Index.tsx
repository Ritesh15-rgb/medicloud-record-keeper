
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Upload, User, Search, Lock } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  // Simple mock auth state for demonstration
  const isSignedIn = false;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-medivault-soft-purple">
      {/* Navigation */}
      <nav className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <ShieldCheck className="h-8 w-8 text-medivault-purple" />
          <span className="ml-2 text-xl font-bold text-medivault-deep-purple">MediVault</span>
        </div>
        <div>
          {isSignedIn ? (
            <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
          ) : (
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => navigate("/signin")}>Sign In</Button>
              <Button onClick={() => navigate("/signup")}>Get Started</Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero section */}
      <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Securely Store & Access Your Medical Records
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            MediVault helps you organize all your medical records and receipts in one secure, 
            easy-to-access place. Never lose an important document again.
          </p>
          <Button size="lg" onClick={() => navigate("/signup")}>
            Get Started for Free
          </Button>
        </div>
        <div className="md:w-1/2 md:pl-10">
          <img
            src="/lovable-uploads/afce7e8b-9391-41fb-b594-24d62500d04d.png"
            alt="Medical records visualization"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </section>

      {/* Features section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-medivault-soft-purple p-4 rounded-full inline-flex justify-center mb-4">
              <Upload className="h-8 w-8 text-medivault-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Upload</h3>
            <p className="text-gray-600">
              Quickly upload and categorize medical records, prescriptions, and receipts.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-medivault-soft-purple p-4 rounded-full inline-flex justify-center mb-4">
              <Search className="h-8 w-8 text-medivault-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
            <p className="text-gray-600">
              Find records instantly with powerful filtering and search capabilities.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-medivault-soft-purple p-4 rounded-full inline-flex justify-center mb-4">
              <Lock className="h-8 w-8 text-medivault-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
            <p className="text-gray-600">
              End-to-end encryption ensures your sensitive medical data stays private.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-medivault-soft-purple p-4 rounded-full inline-flex justify-center mb-4">
              <User className="h-8 w-8 text-medivault-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">User Profiles</h3>
            <p className="text-gray-600">
              Create detailed profiles with emergency contact information.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-medivault-deep-purple text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Take Control of Your Medical Records?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have simplified managing their healthcare documentation.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-medivault-deep-purple"
            onClick={() => navigate("/signup")}
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <ShieldCheck className="h-6 w-6 text-medivault-purple" />
              <span className="ml-2 text-lg font-semibold text-medivault-deep-purple">
                MediVault
              </span>
            </div>
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} MediVault. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
