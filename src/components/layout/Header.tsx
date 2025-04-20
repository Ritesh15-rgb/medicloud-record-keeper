
import React from "react";
import { Search, Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/providers/ThemeProvider";
import { Link, useNavigate } from "react-router-dom";
import NotificationsPopover from "@/components/notifications/NotificationsPopover";

type HeaderProps = {
  title: string;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
};

const Header = ({ title, showSearch = false, onSearch }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();

  // Mock user data
  const user = {
    fullName: "John Doe",
    imageUrl: ""
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Navigation items for the mobile menu
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Upload Record", path: "/upload" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b py-3 px-4 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Mobile Navigation Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.path} className="cursor-pointer" onClick={() => navigate(item.path)}>
                  {item.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/signin")}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
        </div>

        <div className="flex items-center space-x-3 md:space-x-4">
          {showSearch && (
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search records..."
                  className="w-[200px] lg:w-[300px] pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          )}

          <NotificationsPopover />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-500"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
                  <AvatarFallback>
                    {user.fullName ? getInitials(user.fullName) : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Link to="/profile" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link to="/settings" className="w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link to="/signin" className="w-full">Sign Out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
