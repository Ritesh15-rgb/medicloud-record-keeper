
import React from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Appointments = () => {
  // Mock appointments data
  const upcomingAppointments = [
    { id: 1, patient: "Sarah Johnson", date: "2023-05-15", time: "10:00 AM", type: "Dental Checkup", status: "confirmed" },
    { id: 2, patient: "Michael Chen", date: "2023-05-16", time: "2:30 PM", type: "Root Canal", status: "confirmed" },
    { id: 3, patient: "Emma Wilson", date: "2023-05-17", time: "9:15 AM", type: "Teeth Whitening", status: "pending" },
    { id: 4, patient: "Robert Garcia", date: "2023-05-18", time: "11:45 AM", type: "Dental Implant", status: "confirmed" },
  ];

  const pastAppointments = [
    { id: 5, patient: "Jennifer Lee", date: "2023-04-10", time: "3:00 PM", type: "Cavity Filling", status: "completed" },
    { id: 6, patient: "David Brown", date: "2023-04-05", time: "1:15 PM", type: "Dental Checkup", status: "completed" },
    { id: 7, patient: "Lisa Wong", date: "2023-04-01", time: "10:30 AM", type: "Wisdom Tooth Extraction", status: "canceled" },
  ];
  
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Appointments" />

      <main className="flex-1 page-container">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Appointments</h1>
            <Button className="bg-medivault-purple hover:bg-medivault-deep-purple">
              Schedule New Appointment
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="upcoming">
                <TabsList className="mb-4">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Appointments</CardTitle>
                      <CardDescription>
                        View and manage appointments scheduled for the future.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-4 px-2">Patient</th>
                              <th className="text-left py-4 px-2">Date</th>
                              <th className="text-left py-4 px-2">Time</th>
                              <th className="text-left py-4 px-2">Type</th>
                              <th className="text-left py-4 px-2">Status</th>
                              <th className="text-left py-4 px-2">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {upcomingAppointments.map((appointment) => (
                              <tr key={appointment.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="py-4 px-2 font-medium">{appointment.patient}</td>
                                <td className="py-4 px-2">{appointment.date}</td>
                                <td className="py-4 px-2">{appointment.time}</td>
                                <td className="py-4 px-2">
                                  <Badge variant="dental">{appointment.type}</Badge>
                                </td>
                                <td className="py-4 px-2">
                                  <Badge variant={appointment.status === "confirmed" ? "treatment" : "alert"}>
                                    {appointment.status}
                                  </Badge>
                                </td>
                                <td className="py-4 px-2">
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Details</Button>
                                    <Button variant="outline" size="sm">Reschedule</Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="past">
                  <Card>
                    <CardHeader>
                      <CardTitle>Past Appointments</CardTitle>
                      <CardDescription>
                        View appointment history and patient records.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-4 px-2">Patient</th>
                              <th className="text-left py-4 px-2">Date</th>
                              <th className="text-left py-4 px-2">Time</th>
                              <th className="text-left py-4 px-2">Type</th>
                              <th className="text-left py-4 px-2">Status</th>
                              <th className="text-left py-4 px-2">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pastAppointments.map((appointment) => (
                              <tr key={appointment.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="py-4 px-2 font-medium">{appointment.patient}</td>
                                <td className="py-4 px-2">{appointment.date}</td>
                                <td className="py-4 px-2">{appointment.time}</td>
                                <td className="py-4 px-2">
                                  <Badge variant="dental">{appointment.type}</Badge>
                                </td>
                                <td className="py-4 px-2">
                                  <Badge 
                                    variant={
                                      appointment.status === "completed" ? "treatment" : 
                                      appointment.status === "canceled" ? "destructive" : "secondary"
                                    }
                                  >
                                    {appointment.status}
                                  </Badge>
                                </td>
                                <td className="py-4 px-2">
                                  <Button variant="outline" size="sm">View Notes</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>
                    View appointments by date
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-full"
                  />
                  
                  <div className="mt-4">
                    <h3 className="font-medium text-sm mb-2">Appointments on {date?.toLocaleDateString()}</h3>
                    <div className="space-y-2">
                      {upcomingAppointments
                        .filter(app => app.date === date?.toISOString().split('T')[0])
                        .map((app) => (
                          <div key={app.id} className="p-2 border rounded-md">
                            <div className="flex justify-between">
                              <span className="font-medium">{app.time}</span>
                              <Badge variant="dental" className="text-xs">{app.type}</Badge>
                            </div>
                            <div className="text-sm">{app.patient}</div>
                          </div>
                        ))}
                      {!upcomingAppointments.some(app => app.date === date?.toISOString().split('T')[0]) && (
                        <p className="text-sm text-gray-500">No appointments scheduled for this date.</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Appointments;
