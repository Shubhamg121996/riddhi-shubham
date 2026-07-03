import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Sparkles, Calendar, Pencil, Check } from "lucide-react";
import heroAsset from "@/assets/home-bg.png.asset.json";
const heroImg = heroAsset.url;
import { coupleName, weddingDate, events } from "@/lib/data";
import { getGuestName } from "@/lib/guest";
import { fetchExistingRsvp, RsvpPayload } from "@/lib/rsvp";
import PageTransition from "@/components/PageTransition";
import BottomNav from "@/components/BottomNav";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0 });
  const guestName = getGuestName();
  const [rsvp, setRsvp] = useState<RsvpPayload | null>(null);
  const [rsvpLoading, setRsvpLoading] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);

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

  useEffect(() => {
    const code =
      typeof window !== "undefined"
        ? localStorage.getItem("wedding_guest_code") ?? ""
        : "";
    if (!code) {
      setRsvpLoading(false);
      return;
    }
    (async () => {
      const existing = await fetchExistingRsvp(code);
      setRsvp(existing);
      setRsvpLoading(false);
      // Only show the popup once per session, and only if no RSVP yet
      const alreadyShown = sessionStorage.getItem("rsvp_prompt_shown") === "1";
      if (!existing && !alreadyShown) {
        setShowPrompt(true);
        sessionStorage.setItem("rsvp_prompt_shown", "1");
      }
    })();
  }, []);

  const nextEvent = events[3]; // wedding ceremony
  const hasAttendingRsvp = rsvp?.attendance === "Yes";
  const hasDeclinedRsvp = rsvp?.attendance === "No";

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24">
        {/* Hero */}
        <div className="relative h-[60vh] overflow-hidden">
          <img src={heroImg} alt={coupleName} className="w-full h-full object-cover object-top" />
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

          {/* RSVP CTA — dynamic based on whether guest has responded */}
          <AnimatePresence mode="wait">
            {rsvpLoading ? (
              <motion.div
                key="rsvp-skel"
                className="mt-8 h-[112px] rounded-2xl bg-warm-cream/60 animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            ) : hasAttendingRsvp ? (
              <motion.button
                key="rsvp-confirmed"
                onClick={() => navigate("/rsvp?edit=1")}
                className="mt-8 w-full p-5 rounded-2xl bg-card shadow-paper text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center">
                      <Check size={14} strokeWidth={2.5} />
                    </span>
                    <p className="text-label text-muted-foreground">RSVP Confirmed</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-sans">
                    <Pencil size={12} strokeWidth={1.5} /> Edit
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
                      Arrival Date
                    </p>
                    <p className="font-display text-lg text-foreground mt-1">
                      {rsvp?.arrivalDate || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
                      Arrival Time
                    </p>
                    <p className="font-display text-lg text-foreground mt-1">
                      {rsvp?.arrivalTime || "—"}
                    </p>
                  </div>
                </div>
              </motion.button>
            ) : hasDeclinedRsvp ? (
              <motion.button
                key="rsvp-declined"
                onClick={() => navigate("/rsvp")}
                className="mt-8 w-full p-5 rounded-2xl bg-card shadow-paper text-left flex items-center justify-between gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.99 }}
              >
                <div>
                  <p className="text-label text-muted-foreground mb-1">RSVP Received</p>
                  <p className="font-display text-lg text-foreground">You'll be dearly missed</p>
                  <p className="text-xs text-muted-foreground mt-1">Tap to change your response</p>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-sans">
                  <Pencil size={12} strokeWidth={1.5} /> Edit
                </span>
              </motion.button>
            ) : (
              <motion.button
                key="rsvp-cta"
                onClick={() => navigate("/rsvp")}
                className="mt-8 w-full p-5 rounded-2xl bg-primary shadow-elevated text-left flex items-center justify-between gap-4 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.99 }}
              >
                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-warm-cream/20 blur-2xl"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={12} className="text-primary-foreground/80" strokeWidth={1.5} />
                    <p className="text-[10px] uppercase tracking-[0.16em] text-primary-foreground/80 font-semibold">
                      Reserve Your Seat at the Celebration
                    </p>
                  </div>
                  <p className="font-display text-2xl text-primary-foreground leading-tight">
                    Will you be joining us?
                  </p>
                  <p className="text-xs text-primary-foreground/70 mt-1.5 font-sans">
                    A minute to RSVP · Change anytime
                  </p>
                </div>
                <motion.span
                  className="w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center shrink-0 text-lg relative"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Countdown */}
          <motion.div
            className="flex justify-between mt-6 py-5 px-6 bg-card rounded-2xl shadow-paper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            <h2 className="font-display text-3xl font-medium text-primary-foreground mb-3 uppercase tracking-wide">
              {nextEvent.name}
            </h2>
            <div className="flex flex-col gap-1.5 text-sm text-primary-foreground/70 font-sans">
              <span className="flex items-center gap-1.5">
                <Clock size={14} strokeWidth={1.5} />
                {nextEvent.date} · {nextEvent.time}
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
            className="mt-4 grid grid-cols-2 gap-3"
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

        {/* First-visit RSVP prompt */}
        <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
          <DialogContent className="max-w-sm rounded-3xl border-none p-0 overflow-hidden bg-card">
            <div className="p-7 text-center">
              <motion.div
                className="mx-auto w-14 h-14 rounded-full bg-warm-cream flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Calendar size={22} strokeWidth={1.5} className="text-foreground" />
              </motion.div>
              <p className="mt-5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-semibold">
                A gentle reminder
              </p>
              <h2 className="font-display text-3xl text-foreground mt-2 leading-tight">
                Will you be joining us?
              </h2>
              <p className="mt-3 text-sm text-muted-foreground font-sans leading-relaxed">
                Kindly let us know your travel plans so we can arrange a warm welcome for you.
              </p>
              <p className="mt-2 text-xs text-muted-foreground/80 font-sans italic">
                Don't worry — if your plans change, you can always edit later.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setShowPrompt(false);
                    navigate("/rsvp");
                  }}
                  className="w-full h-12 rounded-full bg-foreground text-background text-xs uppercase tracking-[0.14em] font-semibold font-sans"
                >
                  RSVP Now
                </button>
                <button
                  onClick={() => setShowPrompt(false)}
                  className="w-full h-11 text-xs uppercase tracking-[0.14em] text-muted-foreground font-sans"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default HomePage;
