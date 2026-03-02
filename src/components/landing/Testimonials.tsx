import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "UI Designer → Learned Python",
    content: "I taught UI design and learned Python in return. Skill Swap made it so easy to find the perfect learning partner!",
    rating: 5,
    initials: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Developer → Learned Photography",
    content: "Amazing platform! I exchanged my React knowledge for photography lessons. Best learning experience I've ever had.",
    rating: 5,
    initials: "MJ",
  },
  {
    name: "Priya Patel",
    role: "Data Analyst → Learned Spanish",
    content: "The community is incredible. I found a Spanish tutor who wanted to learn data analysis. Win-win!",
    rating: 5,
    initials: "PP",
  },
];

const Testimonials = () => {
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
            Loved by <span className="gradient-text">Learners</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Hear from our community of skill swappers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              className="glass-card rounded-2xl p-6 hover-lift"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/90 mb-6 leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="gradient-primary text-primary-foreground text-sm font-bold">
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
