
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Camera } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type UserProfileFormProps = {
  isNewUser?: boolean;
};

const UserProfileForm = ({ isNewUser = false }: UserProfileFormProps) => {
  const { toast } = useToast();
  
  // Sample user data - in a real app, this would come from Clerk and/or Firebase
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
    emergencyContactName: "Jane Doe",
    emergencyContactPhone: "+1 (555) 987-6543",
    emergencyContactRelation: "Spouse",
    medicalNotes: "No known allergies",
  });
  
  const [date, setDate] = useState<Date | undefined>(new Date(1990, 0, 1));
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.fullName || !formData.email || !date) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate saving profile data
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: isNewUser ? "Profile Created" : "Profile Updated",
        description: isNewUser 
          ? "Your profile has been created successfully." 
          : "Your changes have been saved successfully.",
      });
    }, 1000);
    
    // In a real app, save to Firebase Firestore
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile picture section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl text-gray-400">
                  {formData.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              )}
            </div>
            <label
              htmlFor="picture"
              className="absolute bottom-0 right-0 p-1 bg-medivault-purple text-white rounded-full cursor-pointer hover:bg-medivault-deep-purple transition-colors"
            >
              <Camera className="h-5 w-5" />
              <input
                type="file"
                id="picture"
                className="sr-only"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <p className="text-sm text-gray-500">
            Click the camera to upload a profile picture
          </p>
        </div>

        {/* Form fields */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="dob">Date of Birth *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-2">Emergency Contact</h3>
          </div>

          <div>
            <Label htmlFor="emergencyContactName">Name</Label>
            <Input
              id="emergencyContactName"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="emergencyContactPhone">Phone</Label>
            <Input
              id="emergencyContactPhone"
              name="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="emergencyContactRelation">Relationship</Label>
            <Input
              id="emergencyContactRelation"
              name="emergencyContactRelation"
              value={formData.emergencyContactRelation}
              onChange={handleInputChange}
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="medicalNotes">Medical Notes</Label>
            <Textarea
              id="medicalNotes"
              name="medicalNotes"
              value={formData.medicalNotes}
              onChange={handleInputChange}
              placeholder="Add allergies, conditions or other important medical information"
              rows={4}
            />
          </div>

          <div className="md:col-span-2">
            <Button
              type="submit"
              className="w-full bg-medivault-purple hover:bg-medivault-deep-purple"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : isNewUser ? "Create Profile" : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserProfileForm;
