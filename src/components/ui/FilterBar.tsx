
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Filter, SortAsc, SortDesc } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type FilterBarProps = {
  onFilterChange: (filters: any) => void;
};

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [category, setCategory] = React.useState<string>("");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onFilterChange({ category: value, sortOrder, date });
  };

  const handleSortToggle = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    onFilterChange({ category, sortOrder: newOrder, date });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onFilterChange({ category, sortOrder, date: selectedDate });
  };

  const handleReset = () => {
    setCategory("");
    setSortOrder("desc");
    setDate(undefined);
    onFilterChange({ category: "", sortOrder: "desc", date: undefined });
  };

  return (
    <div className="flex flex-wrap gap-3 pb-6">
      <Select value={category} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-[180px]">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by category" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="prescription">Prescription</SelectItem>
          <SelectItem value="lab-report">Lab Report</SelectItem>
          <SelectItem value="consultation">Consultation</SelectItem>
          <SelectItem value="imaging">Imaging</SelectItem>
          <SelectItem value="receipt">Receipt</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Filter by date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Button variant="outline" onClick={handleSortToggle}>
        {sortOrder === "asc" ? (
          <>
            <SortAsc className="mr-2 h-4 w-4" /> Oldest First
          </>
        ) : (
          <>
            <SortDesc className="mr-2 h-4 w-4" /> Newest First
          </>
        )}
      </Button>

      <Button variant="ghost" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterBar;
