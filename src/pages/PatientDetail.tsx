
import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock patient data (in a real app, you would fetch this based on the ID)
  const patient = {
    id: parseInt(id || "1"),
    name: "Sarah Johnson",
    age: 42,
    gender: "Female",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
    lastVisit: "2023-04-10",
    nextAppointment: "2023-05-15",
    medicalHistory: [
      { date: "2023-04-10", procedure: "Dental Checkup", notes: "Regular checkup, cleaning performed" },
      { date: "2022-10-22", procedure: "Cavity Filling", notes: "Filled cavity on lower right molar" },
      { date: "2022-05-15", procedure: "X-Ray", notes: "Full dental X-ray, no major issues found" }
    ],
    medications: [
      { name: "Fluoride Mouthwash", dosage: "Once daily", prescribed: "2023-04-10" }
    ],
    allergies: ["Penicillin"]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title={`Patient: ${patient.name}`} />

      <main className="flex-1 page-container">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link to="/patients" className="text-medivault-purple hover:underline mb-2 inline-block">
              ← Back to Patients
            </Link>
            
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{patient.name}</h1>
              <div className="flex gap-2">
                <Button variant="outline">Edit Patient</Button>
                <Button className="bg-medivault-purple hover:bg-medivault-deep-purple">
                  Schedule Appointment
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Age:</span>
                  <span>{patient.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Gender:</span>
                  <span>{patient.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="text-right">{patient.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span>{patient.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Address:</span>
                  <span className="text-right">{patient.address}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Appointments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Visit:</span>
                  <span>{patient.lastVisit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Next Appointment:</span>
                  <span>{patient.nextAppointment}</span>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">View All Appointments</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Medical Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Allergies:</span>
                  <div>
                    {patient.allergies.map((allergy, index) => (
                      <Badge key={index} variant="alert" className="ml-1">{allergy}</Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">Add Alert</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="history">
            <TabsList className="mb-4">
              <TabsTrigger value="history">Medical History</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="records">Dental Records</TabsTrigger>
            </TabsList>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Medical History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patient.medicalHistory.map((item, index) => (
                      <div key={index} className="border-b pb-4">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-medium">{item.procedure}</h3>
                          <span className="text-gray-500">{item.date}</span>
                        </div>
                        <p className="text-gray-600">{item.notes}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="medications">
              <Card>
                <CardHeader>
                  <CardTitle>Medications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patient.medications.map((med, index) => (
                      <div key={index} className="border-b pb-4">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-medium">{med.name}</h3>
                          <span className="text-gray-500">Prescribed: {med.prescribed}</span>
                        </div>
                        <p className="text-gray-600">Dosage: {med.dosage}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="records">
              <Card>
                <CardHeader>
                  <CardTitle>Dental Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-32 flex flex-col items-center justify-center border-dashed">
                      <span className="text-lg mb-2">+</span>
                      <span>Upload New Record</span>
                    </Button>
                    
                    {/* Placeholder for dental records/images */}
                    <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                      <span className="text-gray-500">X-Ray (2022-05-15)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default PatientDetail;
