
import React from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Patient = () => {
  // Mock patient data
  const patients = [
    { id: 1, name: "Sarah Johnson", age: 42, lastVisit: "2023-04-10", condition: "Dental Checkup" },
    { id: 2, name: "Michael Chen", age: 35, lastVisit: "2023-04-05", condition: "Root Canal" },
    { id: 3, name: "Emma Wilson", age: 28, lastVisit: "2023-04-01", condition: "Teeth Whitening" },
    { id: 4, name: "Robert Garcia", age: 56, lastVisit: "2023-03-28", condition: "Dental Implant" },
    { id: 5, name: "Jennifer Lee", age: 31, lastVisit: "2023-03-22", condition: "Cavity Filling" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Patients" />

      <main className="flex-1 page-container">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Patient Records</h1>
            <Button className="bg-medivault-purple hover:bg-medivault-deep-purple">
              Add New Patient
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Patients List</CardTitle>
              <CardDescription>
                View and manage your patient records.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-2">Name</th>
                      <th className="text-left py-4 px-2">Age</th>
                      <th className="text-left py-4 px-2">Last Visit</th>
                      <th className="text-left py-4 px-2">Condition</th>
                      <th className="text-left py-4 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr key={patient.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-4 px-2 font-medium">{patient.name}</td>
                        <td className="py-4 px-2">{patient.age}</td>
                        <td className="py-4 px-2">{patient.lastVisit}</td>
                        <td className="py-4 px-2">
                          <Badge variant="dental">{patient.condition}</Badge>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex gap-2">
                            <Link to={`/patients/${patient.id}`}>
                              <Button variant="outline" size="sm">View</Button>
                            </Link>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Patient;
