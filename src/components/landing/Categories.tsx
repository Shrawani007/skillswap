import { motion } from "framer-motion";
import { Code, Users, Palette, Lightbulb } from "lucide-react";

const categories = [
  {
    icon: Code,
    title: "Technical",
    skills: ["Web Development", "Data Science", "Mobile Apps", "DevOps"],
    gradient: "from-primary to-violet",
  },
  {
    icon: Users,
    title: "Social",
    skills: ["Public Speaking", "Leadership", "Negotiation", "Networking"],
    gradient: "from-accent to-primary",
  },
  {
    icon: Palette,
    title: "Creative",
    skills: ["UI/UX Design", "Photography", "Video Editing", "Illustration"],
    gradient: "from-violet to-accent",
  },
  {
    icon: Lightbulb,
    title: "General",
    skills: ["Languages", "Finance", "Cooking", "Fitness"],
    gradient: "from-accent to-violet",
  },
];

const Categories = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Explore Skill <span className="gradient-text">Categories</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From coding to cooking — find and share skills across all domains
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              className="glass-card rounded-2xl p-6 hover-lift cursor-pointer group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <cat.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.skills.map((skill) => (
                  <li key={skill} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full gradient-primary" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
