
import React from "react";
import Header from "@/components/layout/Header";
import UploadForm from "@/components/upload/UploadForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, ShieldCheck, FileCheck } from "lucide-react";

const Upload = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Upload Record" />

      <main className="flex-1 page-container">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Medical Record</CardTitle>
              <CardDescription>
                Upload documents, prescriptions, lab reports, or receipts securely to your medical vault.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadForm />
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border flex items-start space-x-4">
              <div className="bg-medivault-soft-purple p-2 rounded-full">
                <ShieldCheck className="h-5 w-5 text-medivault-purple" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Secure Storage</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  All your documents are encrypted and stored securely.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border flex items-start space-x-4">
              <div className="bg-medivault-soft-purple p-2 rounded-full">
                <Lock className="h-5 w-5 text-medivault-purple" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Privacy Protected</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your medical data is private and only accessible by you.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border flex items-start space-x-4">
              <div className="bg-medivault-soft-purple p-2 rounded-full">
                <FileCheck className="h-5 w-5 text-medivault-purple" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Easy Organization</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Categorize and find your records whenever you need them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;
