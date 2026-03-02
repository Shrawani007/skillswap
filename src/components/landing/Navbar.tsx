import { Link } from "react-router-dom";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <ArrowLeftRight className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">Skill Swap</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/dashboard/skills" className="text-muted-foreground hover:text-foreground transition-colors">Browse Skills</Link>
          <Link to="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <Link to="/auth/login">Sign In</Link>
          </Button>
          <Button asChild size="sm" className="gradient-primary text-primary-foreground rounded-lg">
            <Link to="/auth/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
