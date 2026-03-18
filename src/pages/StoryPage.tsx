import { motion } from "framer-motion";
import { coupleName, coupleStory } from "@/lib/data";
import heroImg from "@/assets/hero-couple.jpg";
import PageTransition from "@/components/PageTransition";
import BottomNav from "@/components/BottomNav";

const StoryPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24">
        {/* Hero */}
        <div className="relative h-[40vh] overflow-hidden">
          <img src={heroImg} alt={coupleName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="px-6 -mt-12 relative z-10 max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-3xl font-medium text-foreground mb-2">Our Story</h1>
            <p className="text-sm text-muted-foreground font-sans mb-10">
              The journey of {coupleName}
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-3 top-2 bottom-2 w-[1px] bg-border" />

            {coupleStory.map((item, i) => (
              <motion.div
                key={item.year}
                className="ml-10 mb-10 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + i * 0.12,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="absolute -left-[34px] w-3 h-3 rounded-full bg-primary border-2 border-background" style={{ top: 4 }} />

                <p className="text-label text-muted-foreground mb-2">{item.year}</p>
                <h3 className="font-display text-xl font-medium text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default StoryPage;
