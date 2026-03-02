import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, MessageSquare } from "lucide-react";

const swapsData = {
  pending: [
    { id: 1, user: "Nina Patel", initials: "NP", give: "React", get: "UI/UX Design", date: "2 hours ago", incoming: true },
    { id: 2, user: "Carlos Ruiz", initials: "CR", give: "Python", get: "Public Speaking", date: "1 day ago", incoming: false },
  ],
  accepted: [
    { id: 3, user: "Sarah Chen", initials: "SC", give: "React", get: "Python", date: "3 days ago", progress: 65 },
    { id: 4, user: "Liam O'Brien", initials: "LO", give: "UI Design", get: "Photography", date: "1 week ago", progress: 30 },
  ],
  completed: [
    { id: 5, user: "Priya Patel", initials: "PP", give: "Data Analysis", get: "Spanish", date: "2 weeks ago", rating: 5 },
    { id: 6, user: "Yuki Tanaka", initials: "YT", give: "JavaScript", get: "Data Science", date: "1 month ago", rating: 4 },
  ],
};

const statusColors: Record<string, string> = {
  pending: "bg-primary/10 text-primary",
  accepted: "bg-accent/10 text-accent",
  completed: "bg-muted text-muted-foreground",
};

const MySwaps = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-display">My Swaps</h1>
        <p className="text-muted-foreground">Manage your skill exchange requests</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="bg-secondary/50 rounded-xl p-1">
          <TabsTrigger value="pending" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
            Pending ({swapsData.pending.length})
          </TabsTrigger>
          <TabsTrigger value="accepted" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
            Accepted ({swapsData.accepted.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
            Completed ({swapsData.completed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4 space-y-3">
          {swapsData.pending.map((swap, i) => (
            <motion.div key={swap.id} className="glass-card rounded-2xl p-5 flex items-center gap-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Avatar className="w-12 h-12">
                <AvatarFallback className="gradient-primary text-primary-foreground font-bold">{swap.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold">{swap.user}</div>
                <div className="text-sm text-muted-foreground">{swap.give} ↔ {swap.get}</div>
                <div className="text-xs text-muted-foreground mt-1">{swap.date} · {swap.incoming ? "Incoming" : "Sent"}</div>
              </div>
              {swap.incoming && (
                <div className="flex gap-2">
                  <Button size="sm" className="gradient-primary text-primary-foreground rounded-lg"><Check className="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline" className="rounded-lg"><X className="w-4 h-4" /></Button>
                </div>
              )}
              {!swap.incoming && <span className={`text-xs px-3 py-1 rounded-full ${statusColors.pending}`}>Waiting</span>}
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="accepted" className="mt-4 space-y-3">
          {swapsData.accepted.map((swap, i) => (
            <motion.div key={swap.id} className="glass-card rounded-2xl p-5 flex items-center gap-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Avatar className="w-12 h-12">
                <AvatarFallback className="gradient-primary text-primary-foreground font-bold">{swap.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold">{swap.user}</div>
                <div className="text-sm text-muted-foreground">{swap.give} ↔ {swap.get}</div>
                <div className="text-xs text-muted-foreground mt-1">{swap.date}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-primary">{swap.progress}%</div>
                <Button size="sm" variant="outline" className="rounded-lg mt-1"><MessageSquare className="w-4 h-4 mr-1" /> Chat</Button>
              </div>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="mt-4 space-y-3">
          {swapsData.completed.map((swap, i) => (
            <motion.div key={swap.id} className="glass-card rounded-2xl p-5 flex items-center gap-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Avatar className="w-12 h-12">
                <AvatarFallback className="gradient-primary text-primary-foreground font-bold">{swap.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold">{swap.user}</div>
                <div className="text-sm text-muted-foreground">{swap.give} ↔ {swap.get}</div>
                <div className="text-xs text-muted-foreground mt-1">{swap.date}</div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${statusColors.completed}`}>Completed</span>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MySwaps;
