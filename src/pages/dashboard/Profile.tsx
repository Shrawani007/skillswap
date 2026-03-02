import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Edit, MapPin, Calendar } from "lucide-react";

const Profile = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div className="glass-card rounded-2xl p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="gradient-primary text-primary-foreground text-2xl font-bold">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold font-display">John Doe</h1>
                <p className="text-muted-foreground">Full Stack Developer & Lifelong Learner</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> San Francisco</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Joined Jan 2026</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-lg">
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Button>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={`w-4 h-4 ${i <= 4 ? "fill-primary text-primary" : "text-muted"}`} />
              ))}
              <span className="text-sm text-muted-foreground ml-2">4.8 (24 reviews)</span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-muted-foreground leading-relaxed">
          Passionate developer with 5+ years of experience in React and Node.js. Love sharing knowledge and learning new skills from the community. Currently exploring photography and Spanish.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        <motion.div className="glass-card rounded-2xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-display font-bold text-lg mb-4">Skills Offered</h2>
          <div className="flex flex-wrap gap-2">
            {["React", "Node.js", "TypeScript", "UI Design", "Git"].map((s) => (
              <Badge key={s} className="gradient-primary text-primary-foreground border-transparent">{s}</Badge>
            ))}
          </div>
        </motion.div>

        <motion.div className="glass-card rounded-2xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="font-display font-bold text-lg mb-4">Skills Wanted</h2>
          <div className="flex flex-wrap gap-2">
            {["Photography", "Spanish", "Data Science", "Piano"].map((s) => (
              <Badge key={s} variant="outline">{s}</Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
