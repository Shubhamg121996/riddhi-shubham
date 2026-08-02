import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Upload, Loader2, ImageIcon } from "lucide-react";
import { googleDriveGalleryUrl } from "@/lib/data";
import { DrivePhoto, driveImageUrl, fetchGalleryPhotos, uploadGalleryPhoto } from "@/lib/gallery";
import { getGuestName } from "@/lib/guest";
import { toast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";
import BottomNav from "@/components/BottomNav";

const GalleryPage = () => {
  const [photos, setPhotos] = useState<DrivePhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [selected, setSelected] = useState<DrivePhoto | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    try {
      setPhotos(await fetchGalleryPhotos());
    } catch {
      toast({ title: "Couldn't load the gallery", description: "Please try again in a moment." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (list.length === 0) return;

    setUploading(true);
    setProgress({ done: 0, total: list.length });
    let failed = 0;
    for (let i = 0; i < list.length; i++) {
      try {
        await uploadGalleryPhoto(list[i], getGuestName());
      } catch {
        failed++;
      }
      setProgress({ done: i + 1, total: list.length });
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
    toast({
      title: failed ? `${list.length - failed} of ${list.length} photos uploaded` : "Photos uploaded",
      description: failed ? "Some photos couldn't be uploaded." : "Thank you for sharing your memories.",
    });
    await load();
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24">
        <div className="px-6 pt-14 max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-display text-3xl font-medium text-foreground">Gallery</h1>
            <button
              onClick={() => window.open(googleDriveGalleryUrl, "_blank")}
              className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center"
              aria-label="Open shared Drive folder"
            >
              <ExternalLink size={18} strokeWidth={1.5} />
            </button>
          </div>

          <p className="text-sm text-muted-foreground font-sans mb-6">
            A shared album — every photo you add here is visible to everyone.
          </p>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <motion.button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            whileTap={{ scale: 0.98 }}
            className="w-full mb-8 py-4 rounded-2xl bg-primary text-primary-foreground shadow-elevated text-xs font-sans font-semibold uppercase tracking-[0.14em] flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {uploading ? (
              <>
                <Loader2 size={15} strokeWidth={1.5} className="animate-spin" />
                Uploading {progress.done}/{progress.total}
              </>
            ) : (
              <>
                <Upload size={15} strokeWidth={1.5} />
                Upload Photos
              </>
            )}
          </motion.button>

          {loading ? (
            <div className="flex flex-col items-center py-16 text-muted-foreground">
              <Loader2 size={22} strokeWidth={1.5} className="animate-spin" />
              <p className="mt-3 text-sm font-sans">Loading memories…</p>
            </div>
          ) : photos.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-muted-foreground text-center">
              <ImageIcon size={24} strokeWidth={1.5} />
              <p className="mt-3 text-sm font-sans">No photos yet — be the first to share one.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  className="cursor-pointer overflow-hidden rounded-2xl bg-card shadow-paper"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: Math.min(i, 8) * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelected(photo)}
                >
                  <img
                    src={driveImageUrl(photo.id)}
                    alt={photo.name}
                    loading="lazy"
                    className="w-full aspect-square object-cover"
                  />
                  <p className="px-3 py-2 text-[10px] uppercase tracking-[0.1em] text-muted-foreground font-sans truncate">
                    Uploaded by: {photo.uploadedBy || "Guest"}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-[60] bg-foreground/90 flex flex-col items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <button className="absolute top-12 right-5 w-10 h-10 rounded-full bg-background/20 text-background flex items-center justify-center">
                <X size={18} strokeWidth={1.5} />
              </button>
              <motion.img
                src={driveImageUrl(selected.id)}
                alt={selected.name}
                className="max-w-full max-h-[75vh] rounded-2xl object-contain"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <p className="mt-4 text-xs uppercase tracking-[0.12em] text-background/70 font-sans">
                Uploaded by: {selected.uploadedBy || "Guest"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default GalleryPage;
