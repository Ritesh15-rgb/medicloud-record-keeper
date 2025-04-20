import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import FilterBar from "@/components/ui/FilterBar";
import RecordCard, { Record as MedicalRecord } from "@/components/ui/RecordCard";
import { Card } from "@/components/ui/card";
import { FilePlus, Clock, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<MedicalRecord[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    sortOrder: "desc",
    date: undefined as Date | undefined,
  });
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchRecords = async () => {
      setIsLoading(true);
      try {
        const { data: recordsData, error } = await supabase
          .from('medical_records')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (recordsData) {
          const transformedRecords = recordsData.map(record => ({
            id: record.id,
            doctorName: record.doctor_name,
            reason: record.reason,
            date: record.date,
            category: record.category,
            location: record.location,
            imageUrl: `${supabase.storageUrl}/object/public/medical_records/${record.file_path}`,
            createdAt: record.created_at,
          }));
          
          setRecords(transformedRecords);
          setFilteredRecords(transformedRecords);
        }
      } catch (error: any) {
        toast({
          title: "Error fetching records",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, [toast]);

  useEffect(() => {
    let result = [...records];

    if (filters.category && filters.category !== "all") {
      result = result.filter((record) => record.category === filters.category);
    }

    if (filters.date) {
      const filterDate = new Date(filters.date);
      result = result.filter((record) => {
        const recordDate = new Date(record.date);
        return (
          recordDate.getDate() === filterDate.getDate() &&
          recordDate.getMonth() === filterDate.getMonth() &&
          recordDate.getFullYear() === filterDate.getFullYear()
        );
      });
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return filters.sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredRecords(result);
  }, [records, filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredRecords(records);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const result = records.filter(
      (record) =>
        record.doctorName.toLowerCase().includes(lowerQuery) ||
        record.reason.toLowerCase().includes(lowerQuery) ||
        record.category.toLowerCase().includes(lowerQuery) ||
        (record.location && record.location.toLowerCase().includes(lowerQuery))
    );

    setFilteredRecords(result);
  };

  const totalRecords = records.length;
  const recordsByCategory: Record<string, number> = records.reduce((acc, record) => {
    acc[record.category] = (acc[record.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const formatCategoryName = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-medivault-soft-purple/30">
      <Header title="Dashboard" showSearch onSearch={handleSearch} />

      <main className="flex-1 page-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 hover:scale-105 transition-all duration-300 bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg animate-fade-in">
            <div className="flex items-center space-x-4">
              <div className="bg-medivault-soft-purple p-3 rounded-full">
                <FilePlus className="h-6 w-6 text-medivault-purple animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Records</p>
                <h3 className="text-2xl font-bold">{totalRecords}</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 hover:scale-105 transition-all duration-300 bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center space-x-4">
              <div className="bg-medivault-soft-purple p-3 rounded-full">
                <PieChart className="h-6 w-6 text-medivault-purple animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Most Common</p>
                <h3 className="text-2xl font-bold">
                  {Object.keys(recordsByCategory).length > 0
                    ? formatCategoryName(
                        Object.entries(recordsByCategory).sort((a, b) => b[1] - a[1])[0][0]
                      )
                    : "None"}
                </h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 hover:scale-105 transition-all duration-300 bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center space-x-4">
              <div className="bg-medivault-soft-purple p-3 rounded-full">
                <Clock className="h-6 w-6 text-medivault-purple animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Last Updated</p>
                <h3 className="text-2xl font-bold">
                  {records.length > 0
                    ? new Date(
                        Math.max(
                          ...records.map((r) => new Date(r.createdAt).getTime())
                        )
                      ).toLocaleDateString()
                    : "Never"}
                </h3>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <FilterBar onFilterChange={handleFilterChange} />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-80 animate-pulse bg-white/50 backdrop-blur-sm">
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-t-lg" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                </div>
              </Card>
            ))}
          </div>
        ) : filteredRecords.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((record, index) => (
              <div 
                key={record.id} 
                className="animate-fade-in hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <RecordCard record={record} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-xl font-medium text-gray-500 mb-4">No records found</h3>
            <Button 
              onClick={() => navigate("/upload")}
              className="bg-medivault-purple hover:bg-medivault-deep-purple transform hover:scale-105 transition-all duration-300"
            >
              Upload New Record
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
