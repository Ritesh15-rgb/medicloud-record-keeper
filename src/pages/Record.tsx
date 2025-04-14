
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  Download,
  Share2,
  Printer,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Clock,
  FileText,
  User,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Record } from "@/components/ui/RecordCard";
import { useToast } from "@/hooks/use-toast";

const RecordDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [record, setRecord] = useState<Record | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching record from Firebase
    setTimeout(() => {
      // Mock data for demonstration
      const mockRecord: Record = {
        id: id || "1",
        doctorName: "Dr. Sarah Johnson",
        reason: "Annual checkup and blood work",
        date: "2023-04-15",
        category: "consultation",
        location: "City Medical Center, 123 Healthcare Ave, Suite 300, Medical City, CA 92000",
        imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2",
        createdAt: "2023-04-15T14:30:00",
      };

      setRecord(mockRecord);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleDelete = () => {
    // In a real app, delete from Firebase here
    toast({
      title: "Record Deleted",
      description: "The record has been permanently deleted.",
    });
    navigate("/dashboard");
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your medical record is being downloaded.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "A secure link has been copied to your clipboard.",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title="Loading Record..." />
        <main className="flex-1 page-container flex items-center justify-center">
          <div className="animate-pulse space-y-4 w-full max-w-3xl">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title="Record Not Found" />
        <main className="flex-1 page-container flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Record Not Found</h2>
            <p className="text-gray-500 mb-6">
              The record you're looking for doesn't exist or has been deleted.
            </p>
            <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Record Details" />

      <main className="flex-1 page-container">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/dashboard")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <Card>
            <CardContent className="p-6">
              {/* Record header */}
              <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                <div>
                  <div className="flex items-center mb-2">
                    <h2 className="text-2xl font-bold mr-3">{record.doctorName}</h2>
                    <Badge className="bg-medivault-purple hover:bg-medivault-deep-purple">
                      {record.category.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{record.reason}</p>
                </div>

                <div className="flex space-x-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Record</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this record? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => {}}>
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleDelete}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Record image */}
              <div className="mb-8">
                <div
                  className="relative h-80 w-full rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setIsImageOpen(true)}
                >
                  <img
                    src={record.imageUrl}
                    alt={record.reason}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center">
                    <span className="text-white opacity-0 hover:opacity-100 font-medium">
                      Click to expand
                    </span>
                  </div>
                </div>
              </div>

              {/* Record details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Date</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {formatDate(record.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Time</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {formatTime(record.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Category</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {record.category.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Provider</h3>
                    <p className="text-gray-600 dark:text-gray-400">{record.doctorName}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:col-span-2">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-gray-600 dark:text-gray-400">{record.location}</p>
                  </div>
                </div>
              </div>

              {/* Edit button */}
              <div className="mt-8 pt-6 border-t">
                <Button className="bg-medivault-purple hover:bg-medivault-deep-purple">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Record
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Fullscreen image viewer */}
      {isImageOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageOpen(false)}
        >
          <div className="relative max-w-5xl max-h-screen">
            <img
              src={record.imageUrl}
              alt={record.reason}
              className="max-w-full max-h-screen object-contain"
            />
            <Button
              className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70"
              variant="secondary"
              size="sm"
              onClick={() => setIsImageOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordDetailPage;
