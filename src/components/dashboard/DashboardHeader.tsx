import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/ThemeToggle";

const DashboardHeader = () => {
  return (
    <header className="h-16 border-b border-border/50 bg-card/50 backdrop-blur-sm flex items-center px-4 gap-4">
      <SidebarTrigger />

      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search skills, users..." className="pl-10 h-10 rounded-xl bg-secondary/50 border-border/50" />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <ThemeToggle />
        <button className="relative w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full gradient-primary flex items-center justify-center">
            <span className="text-[10px] text-primary-foreground font-bold">3</span>
          </div>
        </button>
        <Avatar className="w-9 h-9 cursor-pointer">
          <AvatarFallback className="gradient-primary text-primary-foreground text-sm font-bold">JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default DashboardHeader;
