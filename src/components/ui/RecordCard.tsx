
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin, FileText, Download, Share2, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export type Record = {
  id: string;
  doctorName: string;
  reason: string;
  date: string;
  category: string;
  location?: string;
  imageUrl: string;
  createdAt: string;
};

type RecordCardProps = {
  record: Record;
};

const RecordCard = ({ record }: RecordCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/record/${record.id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <Card className="h-full overflow-hidden card-hover cursor-pointer" onClick={handleCardClick}>
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
          <img
            src={record.imageUrl}
            alt={record.reason}
            className="object-cover w-full h-full"
          />
          <Badge
            className="absolute top-3 right-3 bg-medivault-purple hover:bg-medivault-deep-purple"
          >
            {record.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{record.doctorName}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {record.reason}
        </p>
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formatDate(record.date)}</span>
        </div>
        {record.location && (
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="truncate">{record.location}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 px-4 pb-4 flex justify-between">
        <div className="text-xs text-gray-400">
          Added {formatDate(record.createdAt)}
        </div>
        <div className="flex space-x-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecordCard;
