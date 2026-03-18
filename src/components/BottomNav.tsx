import { Home, CalendarDays, Camera, BookOpen } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { path: "/home", icon: Home, label: "Home" },
  { path: "/timeline", icon: CalendarDays, label: "Events" },
  { path: "/gallery", icon: Camera, label: "Gallery" },
  { path: "/story", icon: BookOpen, label: "Story" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-nav border-t border-border">
      <div className="flex items-center justify-around h-20 max-w-lg mx-auto px-4">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-1 py-2 px-3 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-foreground rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <tab.icon
                size={20}
                strokeWidth={1.5}
                className={isActive ? "text-foreground" : "text-muted-foreground"}
              />
              <span
                className={`text-[10px] uppercase tracking-[0.12em] font-semibold ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
