import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import heroImg from "@/assets/hero-couple.jpg";
import { coupleName, weddingDate, events } from "@/lib/data";
import { getGuestName } from "@/lib/guest";
import PageTransition from "@/components/PageTransition";
import BottomNav from "@/components/BottomNav";
import { useEffect, useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const update = () => {
      const diff = weddingDate.getTime() - Date.now();
      if (diff <= 0) return;
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
      });
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const nextEvent = events[3]; // wedding ceremony

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24">
        {/* Hero */}
        <div className="relative h-[45vh] overflow-hidden">
          <img src={heroImg} alt={coupleName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
          <div className="absolute inset-0 shadow-[inset_0_-40px_40px_-20px_hsl(45,20%,96%)]" />
        </div>

        <div className="px-6 -mt-8 relative z-10 max-w-lg mx-auto">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-3xl font-medium text-foreground mb-1" style={{ textWrap: "balance" as any }}>
              We are so glad you're here, {guestName}.
            </h1>
            <p className="text-sm text-muted-foreground font-sans mt-3">
              {coupleName}'s celebration awaits you.
            </p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            className="flex justify-between mt-8 py-5 px-6 bg-card rounded-2xl shadow-paper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { val: countdown.days, label: "Days" },
              { val: countdown.hours, label: "Hours" },
              { val: countdown.mins, label: "Minutes" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <span className="font-display text-4xl font-medium tabular-nums text-foreground">
                  {String(item.val).padStart(2, "0")}
                </span>
                <span className="text-label text-muted-foreground mt-1">{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Now Card */}
          <motion.div
            className="mt-6 p-6 rounded-3xl bg-primary shadow-elevated cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/event/${nextEvent.id}`)}
          >
            <p className="text-label text-primary-foreground/60 mb-3">Up Next</p>
            <h2 className="font-display text-2xl font-medium text-primary-foreground mb-2">
              {nextEvent.name}
            </h2>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/70 font-sans">
              <span className="flex items-center gap-1.5">
                <Clock size={14} strokeWidth={1.5} />
                {nextEvent.time}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} strokeWidth={1.5} />
                {nextEvent.venue}
              </span>
            </div>
            <button
              className="mt-4 h-10 px-6 rounded-full bg-foreground text-background text-xs uppercase tracking-[0.12em] font-semibold font-sans"
              onClick={(e) => {
                e.stopPropagation();
                window.open(nextEvent.mapUrl, "_blank");
              }}
            >
              Get Directions
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="mt-6 grid grid-cols-2 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={() => navigate("/timeline")}
              className="p-5 rounded-2xl bg-card shadow-paper text-left"
            >
              <p className="text-label text-muted-foreground mb-2">Schedule</p>
              <p className="font-display text-lg text-foreground">{events.length} Events</p>
            </button>
            <button
              onClick={() => navigate("/gallery")}
              className="p-5 rounded-2xl bg-card shadow-paper text-left"
            >
              <p className="text-label text-muted-foreground mb-2">Gallery</p>
              <p className="font-display text-lg text-foreground">Memories</p>
            </button>
          </motion.div>
        </div>

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default HomePage;
