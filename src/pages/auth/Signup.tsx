import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftRight, Eye, EyeOff, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const skillOptions = ["React", "Python", "UI/UX Design", "Data Science", "Photography", "Public Speaking", "Spanish", "Cooking", "Video Editing", "DevOps"];

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [skillsOffered, setSkillsOffered] = useState<string[]>([]);
  const [skillsWanted, setSkillsWanted] = useState<string[]>([]);

  const toggleSkill = (skill: string, list: string[], setList: (s: string[]) => void) => {
    setList(list.includes(skill) ? list.filter((s) => s !== skill) : [...list, skill]);
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabels = ["", "Weak", "Good", "Strong"];
  const strengthColors = ["", "bg-destructive", "bg-accent", "bg-primary"];

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 gradient-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-violet/20 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="relative z-10 text-center text-primary-foreground max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-8">
            <ArrowLeftRight className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold font-display mb-4">Join Skill Swap</h2>
          <p className="text-primary-foreground/80">Start your journey of mutual learning. Share what you know, learn what you need.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background overflow-y-auto">
        <motion.div
          className="w-full max-w-md py-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <ArrowLeftRight className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">Skill Swap</span>
          </Link>

          <h1 className="text-3xl font-bold font-display mb-2">Create Account</h1>
          <p className="text-muted-foreground mb-8">Join the community and start swapping skills</p>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" className="h-12 rounded-xl" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="h-12 rounded-xl" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="h-12 rounded-xl pr-12" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map((level) => (
                      <div key={level} className={`h-1.5 flex-1 rounded-full transition-colors ${strength >= level ? strengthColors[strength] : "bg-muted"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{strengthLabels[strength]}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Skills You Offer</Label>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <Badge
                    key={skill}
                    variant={skillsOffered.includes(skill) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${skillsOffered.includes(skill) ? "gradient-primary text-primary-foreground border-transparent" : "hover:border-primary/50"}`}
                    onClick={() => toggleSkill(skill, skillsOffered, setSkillsOffered)}
                  >
                    {skill}
                    {skillsOffered.includes(skill) && <Check className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Skills You Want to Learn</Label>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <Badge
                    key={skill}
                    variant={skillsWanted.includes(skill) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${skillsWanted.includes(skill) ? "bg-accent text-accent-foreground border-transparent" : "hover:border-accent/50"}`}
                    onClick={() => toggleSkill(skill, skillsWanted, setSkillsWanted)}
                  >
                    {skill}
                    {skillsWanted.includes(skill) && <Check className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl gradient-primary text-primary-foreground text-base">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline font-medium">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
