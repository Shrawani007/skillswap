import { motion } from "framer-motion";
import { Heart, DollarSign, Target, Users } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Peer-to-Peer Learning",
    description: "Learn directly from real practitioners, not just theory. Get hands-on guidance from people who do it daily.",
  },
  {
    icon: DollarSign,
    title: "Cost-Effective",
    description: "No expensive courses or tutors. Exchange your knowledge for the skills you need — completely free.",
  },
  {
    icon: Target,
    title: "Personalized Experience",
    description: "Learn at your own pace with one-on-one sessions tailored to your specific goals and skill level.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description: "Join a thriving community of learners and teachers who believe in the power of knowledge sharing.",
  },
];

const Benefits = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Why Choose <span className="gradient-text">Skill Swap</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            The smarter way to learn and grow your skillset
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="flex gap-5 p-6 rounded-2xl glass-card hover-lift"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
