import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, Navigation } from "lucide-react";
import { events } from "@/lib/data";
import PageTransition from "@/components/PageTransition";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === id);

  if (!event) return null;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Header Image */}
        <div className="relative h-[50vh]">
          <img src={event.image} alt={event.name} className="w-full h-full object-cover object-[center_30%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-transparent to-background" />

          <button
            onClick={() => navigate(-1)}
            className="absolute top-12 left-5 w-10 h-10 rounded-full glass-nav flex items-center justify-center"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="px-6 -mt-8 relative z-10 max-w-lg mx-auto pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.15em] font-semibold px-4 py-1.5 rounded-full mb-4">
              Attire: {event.dressCode}
            </span>

            <h1 className="font-display text-4xl font-medium text-foreground mb-3">
              {event.name}
            </h1>

            <div className="flex flex-col gap-3 text-sm text-muted-foreground font-sans mb-6">
              <span className="flex items-center gap-2">
                <Clock size={16} strokeWidth={1.5} />
                {event.date} · {event.time}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} strokeWidth={1.5} />
                {event.venue}
              </span>
              <span className="text-xs">{event.venueAddress}</span>
            </div>

            <p className="text-base text-foreground/80 font-sans leading-relaxed mb-8">
              {event.description}
            </p>

            {event.meal && (
              <div className="p-5 rounded-2xl bg-warm-cream mb-4">
                <p className="text-label text-muted-foreground mb-2">Meal</p>
                <p className="text-sm text-foreground font-sans">{event.meal}</p>
              </div>
            )}

            {event.timeline && event.timeline.length > 0 && (
              <div className="p-5 rounded-2xl bg-warm-cream mb-4">
                <p className="text-label text-muted-foreground mb-4">Ceremony Timeline</p>
                <div className="relative">
                  <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-border" />
                  {event.timeline.map((step, idx) => (
                    <div key={idx} className="relative pl-6 pb-4 last:pb-0">
                      <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full bg-primary border-2 border-warm-cream" />
                      <p className="text-xs uppercase tracking-[0.15em] font-semibold text-primary font-sans mb-0.5">{step.time}</p>
                      <p className="text-sm text-foreground font-sans">{step.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.notes && (
              <div className="p-5 rounded-2xl bg-warm-cream mb-8">
                <p className="text-label text-muted-foreground mb-2">Note</p>
                <p className="text-sm text-foreground font-sans">{event.notes}</p>
              </div>
            )}

            {/* Map action */}
            <motion.button
              onClick={() => window.open(event.mapUrl, "_blank")}
              className="w-full h-14 rounded-full bg-foreground text-background text-xs uppercase tracking-[0.15em] font-semibold font-sans flex items-center justify-center gap-2"
              whileTap={{ scale: 0.98 }}
            >
              <Navigation size={16} strokeWidth={1.5} />
              Open in Maps
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default EventDetailPage;
