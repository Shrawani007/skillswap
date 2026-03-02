import { motion } from "framer-motion";
import { ArrowLeftRight, Clock, CheckCircle, TrendingUp, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const stats = [
  { label: "Active Swaps", value: "4", icon: ArrowLeftRight, change: "+2 this week" },
  { label: "Pending Requests", value: "7", icon: Clock, change: "3 incoming" },
  { label: "Completed", value: "12", icon: CheckCircle, change: "+5 this month" },
  { label: "Learning Progress", value: "68%", icon: TrendingUp, change: "On track" },
];

const recentSwaps = [
  { user: "Sarah C.", skillGive: "React", skillGet: "Python", status: "active", initials: "SC" },
  { user: "Marcus J.", skillGive: "UI Design", skillGet: "Photography", status: "pending", initials: "MJ" },
  { user: "Priya P.", skillGive: "Data Analysis", skillGet: "Spanish", status: "active", initials: "PP" },
];

const DashboardHome = () => {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold font-display">Welcome back, John! 👋</h1>
        <p className="text-muted-foreground">Here's your skill swap overview</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass-card rounded-2xl p-5 hover-lift"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="text-2xl font-bold font-display">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
            <div className="text-xs text-primary mt-1">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button asChild className="gradient-primary text-primary-foreground rounded-xl">
          <Link to="/dashboard/skills">
            <Search className="w-4 h-4 mr-2" />
            Browse Skills
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-xl">
          <Link to="/dashboard/request">
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Link>
        </Button>
      </div>

      {/* Recent Swaps & Learning Progress */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          className="glass-card rounded-2xl p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display font-bold text-lg mb-4">Recent Swaps</h2>
          <div className="space-y-4">
            {recentSwaps.map((swap) => (
              <div key={swap.user} className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold flex-shrink-0">
                  {swap.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{swap.user}</div>
                  <div className="text-xs text-muted-foreground">{swap.skillGive} ↔ {swap.skillGet}</div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  swap.status === "active" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                }`}>
                  {swap.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="glass-card rounded-2xl p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-display font-bold text-lg mb-4">Learning Progress</h2>
          <div className="space-y-5">
            {[
              { skill: "Python Basics", progress: 75 },
              { skill: "Photography", progress: 45 },
              { skill: "Spanish A1", progress: 90 },
            ].map((item) => (
              <div key={item.skill}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{item.skill}</span>
                  <span className="text-muted-foreground">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2 rounded-full" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;
