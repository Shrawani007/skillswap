import { motion } from "framer-motion";
import { Search, ArrowLeftRight, GraduationCap } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Skills",
    description: "Explore thousands of skills offered by community members across different categories.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: ArrowLeftRight,
    title: "Send Swap Request",
    description: "Found someone with the skill you want? Send them a swap request with your offering.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: GraduationCap,
    title: "Learn & Share",
    description: "Once accepted, start your skill exchange journey. Learn, teach, and grow together.",
    color: "bg-violet/10 text-violet",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            How <span className="gradient-text">Skill Swap</span> Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Three simple steps to start exchanging skills with amazing people
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="glass-card rounded-2xl p-8 hover-lift h-full">
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-6`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="text-sm font-bold text-primary mb-2">Step {index + 1}</div>
                <h3 className="text-xl font-bold font-display mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 text-muted-foreground/30 text-2xl">→</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
