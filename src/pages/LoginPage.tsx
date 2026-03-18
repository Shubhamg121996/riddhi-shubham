import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-couple.jpg";
import { validateInviteCode, saveGuest } from "@/lib/guest";

const LoginPage = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (code.length < 4) return;
    setLoading(true);
    setError("");

    const guest = await validateInviteCode(code);
    if (guest) {
      saveGuest(guest);
      navigate("/home");
    } else {
      setError("Invalid invite code. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-sm w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="text-label text-muted-foreground mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          You're Invited
        </motion.p>

        <h1 className="font-display text-5xl font-medium text-foreground mb-2">
          Riddhi
        </h1>
        <p className="font-display text-2xl text-muted-foreground mb-1">&</p>
        <h1 className="font-display text-5xl font-medium text-foreground mb-10">
          Shubham
        </h1>

        <p className="text-sm text-muted-foreground mb-8 font-sans">
          Enter your invite code to continue
        </p>

        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError("");
          }}
          placeholder="• • • • • •"
          className="w-full text-center text-4xl tracking-[0.5em] font-display bg-transparent border-b-2 border-primary pb-4 mb-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-border"
        />

        {error && (
          <motion.p
            className="text-sm text-destructive mb-4 font-sans"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.p>
        )}

        <div className={error ? "" : "mt-7"}>
          <motion.button
            onClick={handleSubmit}
            className="h-12 px-10 rounded-full bg-foreground text-background text-xs uppercase tracking-[0.15em] font-semibold font-sans disabled:opacity-30 transition-opacity"
            disabled={code.length < 4 || loading}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {loading ? "Verifying..." : "Enter"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
