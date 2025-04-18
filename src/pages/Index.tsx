
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  ShieldCheck, Upload, User, Search, Lock, 
  ChevronRight, Crown, HeartPulse, Activity
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const LandingPage = () => {
  const navigate = useNavigate();
  const isSignedIn = false;

  const testimonials = [
    {
      name: "Dr. Sarah Wilson",
      role: "Dental Surgeon",
      text: "MediVault has transformed how I manage patient records. It's intuitive and secure.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop"
    },
    {
      name: "James Thompson",
      role: "Patient",
      text: "Managing my medical history has never been easier. Highly recommended!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop"
    },
    {
      name: "Dr. Emily Chen",
      role: "Medical Director",
      text: "The security features and ease of use make this platform outstanding.",
      image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=300&h=300&fit=crop"
    }
  ];

  const stats = [
    { label: "Active Users", value: "10K+", icon: User },
    { label: "Records Stored", value: "1M+", icon: Upload },
    { label: "Success Rate", value: "99.9%", icon: Activity },
    { label: "Data Security", value: "256-bit", icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-medivault-soft-purple overflow-x-hidden">
      {/* Navigation */}
      <nav className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <ShieldCheck className="h-8 w-8 text-medivault-purple animate-pulse" />
          <span className="ml-2 text-xl font-bold bg-gradient-to-r from-medivault-purple to-medivault-deep-purple bg-clip-text text-transparent">
            MediVault
          </span>
        </div>
        <div>
          {isSignedIn ? (
            <Button 
              onClick={() => navigate("/dashboard")}
              className="bg-medivault-purple hover:bg-medivault-deep-purple transition-all duration-300"
            >
              Dashboard
            </Button>
          ) : (
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/signin")}
                className="border-medivault-purple text-medivault-purple hover:bg-medivault-soft-purple"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate("/signup")}
                className="bg-medivault-purple hover:bg-medivault-deep-purple transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-medivault-deep-purple to-medivault-purple bg-clip-text text-transparent leading-tight">
              Your Medical Records, Secured & Accessible
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              MediVault empowers you with seamless control over your medical history. 
              Experience the future of healthcare record management.
            </p>
            <div className="flex gap-4 pt-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/signup")}
                className="bg-medivault-purple hover:bg-medivault-deep-purple transition-all duration-300 group"
              >
                Get Started Free 
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-medivault-purple text-medivault-purple hover:bg-medivault-soft-purple"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative animate-fade-in">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-medivault-purple to-medivault-deep-purple rounded-lg blur opacity-30"></div>
            <img
              src="/lovable-uploads/afce7e8b-9391-41fb-b594-24d62500d04d.png"
              alt="Medical records visualization"
              className="relative rounded-lg shadow-2xl w-full hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white/50 backdrop-blur-sm rounded-lg shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <stat.icon className="h-8 w-8 text-medivault-purple mb-4" />
              <div className="text-3xl font-bold text-medivault-deep-purple">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-medivault-deep-purple to-medivault-purple bg-clip-text text-transparent">
          Why Choose MediVault?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="bg-medivault-soft-purple p-4 rounded-full inline-flex justify-center mb-4">
              <Upload className="h-8 w-8 text-medivault-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-medivault-deep-purple">Easy Upload</h3>
            <p className="text-gray-600">
              Quickly upload and categorize medical records, prescriptions, and receipts.
            </p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="bg-medivault-soft-purple p-4 rounded-full inline-flex justify-center mb-4">
              <Search className="h-8 w-8 text-medivault-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-medivault-deep-purple">Smart Search</h3>
            <p className="text-gray-600">
              Find records instantly with powerful filtering and search capabilities.
            </p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="bg-medivault-soft-purple p-4 rounded-full inline-flex justify-center mb-4">
              <Lock className="h-8 w-8 text-medivault-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-medivault-deep-purple">Secure Storage</h3>
            <p className="text-gray-600">
              End-to-end encryption ensures your sensitive medical data stays private.
            </p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="bg-medivault-soft-purple p-4 rounded-full inline-flex justify-center mb-4">
              <HeartPulse className="h-8 w-8 text-medivault-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-medivault-deep-purple">Health Tracking</h3>
            <p className="text-gray-600">
              Monitor your health progress and medical history over time.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-medivault-deep-purple to-medivault-purple bg-clip-text text-transparent">
          What Our Users Say
        </h2>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-xl font-semibold text-medivault-deep-purple">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 italic">"{testimonial.text}"</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-medivault-deep-purple to-medivault-purple text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Crown className="h-12 w-12 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Take Control of Your Medical Records?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of users who have simplified managing their healthcare documentation.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-medivault-deep-purple hover:bg-white/90 transition-all duration-300"
              onClick={() => navigate("/signup")}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-10">
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
