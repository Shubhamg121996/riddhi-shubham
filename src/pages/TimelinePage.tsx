import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin } from "lucide-react";
import { events } from "@/lib/data";
import PageTransition from "@/components/PageTransition";
import BottomNav from "@/components/BottomNav";

const TimelinePage = () => {
  const [filter, setFilter] = useState<"all" | "personalized">("personalized");
  const navigate = useNavigate();

  const filteredEvents = filter === "all"
    ? events
    : events.filter((e) => e.category === "all" || e.category === "close-friends");

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24">
        <div className="px-6 pt-14 max-w-lg mx-auto">
          <h1 className="font-display text-3xl font-medium text-foreground mb-6">
            Your Itinerary
          </h1>

          {/* Filter */}
          <div className="flex gap-2 mb-8 sticky top-0 z-10 bg-background py-3">
            {(["personalized", "all"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`h-9 px-5 rounded-full text-xs uppercase tracking-[0.12em] font-semibold font-sans transition-all ${
                  filter === f
                    ? "bg-foreground text-background"
                    : "bg-card text-muted-foreground shadow-paper"
                }`}
              >
                {f === "personalized" ? "For You" : "All Events"}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-3 top-2 bottom-2 w-[1px] bg-border" />

            {filteredEvents.map((event, i) => (
              <motion.div
                key={event.id}
                className="ml-10 mb-10 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/event/${event.id}`)}
              >
                {/* Dot */}
                <div className="absolute left-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background" style={{ marginTop: 6 }} />

                <div className="overflow-hidden rounded-2xl bg-card shadow-paper">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-5">
                    <p className="text-label text-muted-foreground mb-2">{event.date}</p>
                    <h3 className="font-display text-xl font-medium text-foreground mb-2">
                      {event.name}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground font-sans mb-3">
                      <span className="flex items-center gap-1">
                        <Clock size={12} strokeWidth={1.5} />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} strokeWidth={1.5} />
                        {event.venue}
                      </span>
                    </div>
                    <span className="inline-block bg-muted text-muted-foreground text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-full">
                      {event.dressCode}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default TimelinePage;
