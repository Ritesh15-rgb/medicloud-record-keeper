
import React from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
  // Mock user data
  const isNewUser = false;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="My Profile" />

      <main className="flex-1 page-container">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{isNewUser ? "Complete Your Profile" : "My Profile"}</CardTitle>
              <CardDescription>
                {isNewUser
                  ? "Please complete your profile information to get started."
                  : "View and manage your personal information."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Mock profile form */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md" 
                      defaultValue="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md" 
                      defaultValue="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border rounded-md" 
                    defaultValue="john.doe@example.com"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-3 py-2 border rounded-md" 
                    defaultValue="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <textarea 
                    className="w-full px-3 py-2 border rounded-md" 
                    defaultValue="123 Main Street, Anytown, CA 12345"
                    rows={3}
                  />
                </div>
                
                <Button 
                  className="bg-medivault-purple hover:bg-medivault-deep-purple text-white py-2 px-4 rounded-md"
                  onClick={() => alert('Profile updated successfully!')}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {!isNewUser && (
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Password</h4>
                      <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                    </div>
                    <button 
                      className="text-medivault-purple hover:text-medivault-deep-purple font-medium text-sm"
                    >
                      Change Password
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Enhanced security for your account</p>
                    </div>
                    <button 
                      className="text-medivault-purple hover:text-medivault-deep-purple font-medium text-sm"
                    >
                      Set Up
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Login History</h4>
                      <p className="text-sm text-gray-500">View your recent account activity</p>
                    </div>
                    <button 
                      className="text-medivault-purple hover:text-medivault-deep-purple font-medium text-sm"
                    >
                      View History
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Add the missing Button component
const Button = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Profile;
