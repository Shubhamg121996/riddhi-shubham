import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { galleryPhotos } from "@/lib/data";
import PageTransition from "@/components/PageTransition";
import BottomNav from "@/components/BottomNav";

const GalleryPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24">
        <div className="px-6 pt-14 max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-display text-3xl font-medium text-foreground">Gallery</h1>
            <button className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center">
              <Plus size={18} strokeWidth={1.5} />
            </button>
          </div>

          <p className="text-sm text-muted-foreground font-sans mb-8">
            A curated collection of moments from the celebration.
          </p>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-3">
            {galleryPhotos.map((photo, i) => (
              <motion.div
                key={photo.id}
                className="cursor-pointer overflow-hidden rounded-2xl aspect-square"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedPhoto(photo.src)}
              >
                <img
                  src={photo.src}
                  alt={photo.caption || ""}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-6 py-4 rounded-2xl bg-card shadow-paper text-sm text-muted-foreground font-sans font-semibold uppercase tracking-[0.1em]">
            Load More
          </button>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              className="fixed inset-0 z-[60] bg-foreground/90 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <button className="absolute top-12 right-5 w-10 h-10 rounded-full bg-background/20 text-background flex items-center justify-center">
                <X size={18} strokeWidth={1.5} />
              </button>
              <motion.img
                src={selectedPhoto}
                alt=""
                className="max-w-full max-h-[80vh] rounded-2xl object-contain"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default GalleryPage;
