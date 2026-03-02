import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const skillsData = [
  { id: 1, name: "React Development", category: "Technical", level: "Advanced", user: "Alex Kim", initials: "AK" },
  { id: 2, name: "UI/UX Design", category: "Creative", level: "Intermediate", user: "Nina Patel", initials: "NP" },
  { id: 3, name: "Public Speaking", category: "Social", level: "Beginner", user: "Carlos Ruiz", initials: "CR" },
  { id: 4, name: "Python Data Science", category: "Technical", level: "Advanced", user: "Yuki Tanaka", initials: "YT" },
  { id: 5, name: "Photography", category: "Creative", level: "Intermediate", user: "Liam O'Brien", initials: "LO" },
  { id: 6, name: "Spanish Language", category: "General", level: "Beginner", user: "Emma Wilson", initials: "EW" },
  { id: 7, name: "Video Editing", category: "Creative", level: "Advanced", user: "Jake Torres", initials: "JT" },
  { id: 8, name: "Leadership Skills", category: "Social", level: "Intermediate", user: "Aisha Hassan", initials: "AH" },
  { id: 9, name: "Machine Learning", category: "Technical", level: "Advanced", user: "Dev Sharma", initials: "DS" },
];

const categories = ["All", "Technical", "Creative", "Social", "General"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const levelColors: Record<string, string> = {
  Beginner: "bg-accent/10 text-accent",
  Intermediate: "bg-primary/10 text-primary",
  Advanced: "bg-violet/10 text-violet",
};

const BrowseSkills = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const filtered = skillsData.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.user.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All" || s.category === selectedCategory;
    const matchLevel = selectedLevel === "All" || s.level === selectedLevel;
    return matchSearch && matchCat && matchLevel;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold font-display">Browse Skills</h1>
        <p className="text-muted-foreground">Find skills offered by community members</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search skills or users..." className="pl-10 h-11 rounded-xl" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              className={`rounded-lg ${selectedCategory === cat ? "gradient-primary text-primary-foreground" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground mt-1" />
        {levels.map((level) => (
          <Badge
            key={level}
            variant={selectedLevel === level ? "default" : "outline"}
            className={`cursor-pointer ${selectedLevel === level ? "gradient-primary text-primary-foreground border-transparent" : ""}`}
            onClick={() => setSelectedLevel(level)}
          >
            {level}
          </Badge>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((skill, i) => (
          <motion.div
            key={skill.id}
            className="glass-card rounded-2xl p-5 hover-lift cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-start justify-between mb-4">
              <Badge variant="outline" className="text-xs">{skill.category}</Badge>
              <span className={`text-xs px-2 py-0.5 rounded-full ${levelColors[skill.level]}`}>{skill.level}</span>
            </div>
            <h3 className="font-display font-bold text-lg mb-3">{skill.name}</h3>
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-bold">{skill.initials}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{skill.user}</span>
            </div>
            <Button size="sm" className="w-full rounded-xl gradient-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              Send Swap Request
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="font-display font-bold text-lg">No skills found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default BrowseSkills;
