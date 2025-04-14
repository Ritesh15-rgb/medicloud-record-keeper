
import React from "react";
import Header from "@/components/layout/Header";
import UserProfileForm from "@/components/auth/UserProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/clerk-react";

const Profile = () => {
  const { isLoaded, user } = useUser();
  
  // Check if this is a new user by looking at when the account was created
  // In a real app, you would check if the user has a profile in Firestore
  const isNewUser = user?.createdAt
    ? new Date().getTime() - new Date(user.createdAt).getTime() < 86400000 // Less than 24 hours
    : false;

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
              <UserProfileForm isNewUser={isNewUser} />
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

export default Profile;
