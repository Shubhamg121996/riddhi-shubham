import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { isLoggedIn } from "@/lib/guest";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TimelinePage from "./pages/TimelinePage";
import EventDetailPage from "./pages/EventDetailPage";
import GalleryPage from "./pages/GalleryPage";
import StoryPage from "./pages/StoryPage";
import NotFound from "./pages/NotFound";
import RSVPPage from "./pages/RSVPPage";

const queryClient = new QueryClient();

const RequireGuest = ({ children }: { children: JSX.Element }) =>
  isLoggedIn() ? children : <Navigate to="/" replace />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<RequireGuest><HomePage /></RequireGuest>} />
            <Route path="/timeline" element={<RequireGuest><TimelinePage /></RequireGuest>} />
            <Route path="/event/:id" element={<RequireGuest><EventDetailPage /></RequireGuest>} />
            <Route path="/gallery" element={<RequireGuest><GalleryPage /></RequireGuest>} />
            <Route path="/story" element={<RequireGuest><StoryPage /></RequireGuest>} />
            <Route path="/rsvp" element={<RequireGuest><RSVPPage /></RequireGuest>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
