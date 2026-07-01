import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TimelinePage from "./pages/TimelinePage";
import EventDetailPage from "./pages/EventDetailPage";
import GalleryPage from "./pages/GalleryPage";
import StoryPage from "./pages/StoryPage";
import NotFound from "./pages/NotFound";
import RSVPPage from "./pages/RSVPPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/rsvp" element={<RSVPPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
