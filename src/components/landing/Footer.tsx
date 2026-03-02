import { Link } from "react-router-dom";
import { ArrowLeftRight, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <ArrowLeftRight className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">Skill Swap</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The peer-to-peer skill exchange platform. Learn what you want by teaching what you know.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/dashboard/skills" className="hover:text-foreground transition-colors">Browse Skills</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/auth/signup" className="hover:text-foreground transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="hover:text-foreground cursor-pointer transition-colors">About</span></li>
              <li><span className="hover:text-foreground cursor-pointer transition-colors">Blog</span></li>
              <li><span className="hover:text-foreground cursor-pointer transition-colors">Careers</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <div key={i} className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2026 Skill Swap. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
