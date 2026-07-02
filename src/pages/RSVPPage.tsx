import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Minus, Plus, Heart, Loader2 } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { getGuestName, isLoggedIn } from "@/lib/guest";
import { fetchExistingRsvp, submitRsvp, RsvpPayload } from "@/lib/rsvp";
import { toast } from "@/hooks/use-toast";

const ARRIVAL_DATES = [
  { id: "2 December", title: "2 December", sub: "Arriving early" },
  { id: "3 December", title: "3 December", sub: "Arriving a day before the celebrations" },
  {
    id: "4 December",
    title: "4 December",
    sub: "Morning – Haldi · Evening – Ring Ceremony · Night – Sangeet",
  },
  {
    id: "5 December",
    title: "5 December",
    sub: "Morning & Afternoon – Wedding Ceremony · Night – Reception",
  },
];

const ARRIVAL_TIMES = [
  "Before 9:00 AM",
  "9:00 AM – 12:00 PM",
  "12:00 PM – 3:00 PM",
  "3:00 PM – 6:00 PM",
  "After 6:00 PM",
  "Not sure yet",
];

const TRAVEL_MODES = [
  { id: "Car", emoji: "🚗" },
  { id: "Flight", emoji: "✈️" },
  { id: "Train", emoji: "🚆" },
  { id: "Bus", emoji: "🚌" },
  { id: "Taxi", emoji: "🚕" },
  { id: "Not decided yet", emoji: "🤔" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const RSVPPage = () => {
  const navigate = useNavigate();
  const guestName = getGuestName();
  const code =
    typeof window !== "undefined"
      ? localStorage.getItem("wedding_guest_code") ?? ""
      : "";

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [wasUpdate, setWasUpdate] = useState(false);
  const [hasExisting, setHasExisting] = useState(false);

  const [state, setState] = useState<RsvpPayload>({
    code,
    name: guestName,
    attendance: "",
    adults: 1,
    children: 0,
    arrivalDate: "",
    arrivalTime: "",
    travelMode: "",
    specialRequirements: "",
    declineMessage: "",
  });

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/", { replace: true });
      return;
    }
    (async () => {
      const existing = await fetchExistingRsvp(code);
      if (existing) {
        setState((s) => ({ ...s, ...existing, code, name: existing.name || guestName }));
        setHasExisting(true);
      }
      setLoading(false);
    })();
  }, [code, guestName, navigate]);

  const familyName = useMemo(() => {
    const n = (state.name || guestName || "").trim();
    if (!n) return "";
    // strip trailing "family" if already present
    return n.replace(/\s+family\s*$/i, "");
  }, [state.name, guestName]);

  // Step flow — Yes-path uses 8 steps (0..7), No-path collapses to 3 steps (welcome, attendance, message+submit, thanks)
  const totalYes = 8;
  const totalNo = 4;
  const totalSteps = state.attendance === "No" ? totalNo : totalYes;

  const stepNumberDisplay = () => {
    if (done) return null;
    const total = totalSteps - 1;
    const current = Math.min(Math.max(step, 0), total) + 1;
    return `Step ${current} of ${total + 1}`;
  };

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async (attendance: "Yes" | "No") => {
    setSubmitting(true);
    const payload: RsvpPayload = {
      ...state,
      code,
      name: state.name || guestName,
      attendance,
    };
    const res = await submitRsvp(payload);
    setSubmitting(false);
    if (!res.ok) {
      toast({
        title: "Something went wrong",
        description: res.error ?? "Please try again in a moment.",
        variant: "destructive",
      });
      return;
    }
    setWasUpdate(hasExisting);
    setHasExisting(true);
    setDone(true);
  };

  const progress = () => {
    if (done) return 100;
    const total = totalSteps - 1;
    return Math.min(100, Math.round((step / total) * 100));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Top bar */}
        <div className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border">
          <div className="max-w-lg mx-auto px-5 py-4 flex items-center gap-3">
            <button
              onClick={() => (step === 0 || done ? navigate("/home") : back())}
              className="w-9 h-9 rounded-full bg-card shadow-paper flex items-center justify-center text-foreground"
              aria-label="Back"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
                RSVP
              </p>
              <p className="text-xs text-foreground/70 font-sans">
                {stepNumberDisplay() ?? (done ? "Confirmed" : "Welcome")}
              </p>
            </div>
          </div>
          <div className="h-[2px] bg-border/60">
            <motion.div
              className="h-full bg-foreground"
              initial={false}
              animate={{ width: `${progress()}%` }}
              transition={{ duration: 0.4, ease }}
            />
          </div>
        </div>

        <div className="max-w-lg mx-auto px-5 pb-32 pt-8">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="animate-spin" size={20} />
            </div>
          ) : done ? (
            <ThankYou isUpdate={wasUpdate} onFinish={() => navigate("/home")} />)
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${state.attendance}-${step}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </PageTransition>
  );

  function renderStep() {
    // Welcome
    if (step === 0) {
      return (
        <div>
          <h1 className="font-display text-4xl font-medium text-foreground leading-tight">
            Dear {familyName || "Guest"} Family,
          </h1>
          <p className="mt-6 text-foreground/85 font-sans leading-relaxed">
            We're so happy you're here!
          </p>
          <p className="mt-4 text-foreground/75 font-sans leading-relaxed">
            Thank you for taking the time to celebrate this special occasion with us.
          </p>
          <p className="mt-4 text-foreground/75 font-sans leading-relaxed">
            Before you leave, we'd love to know your travel plans so we can make the
            necessary arrangements for your visit.
          </p>
          <p className="mt-4 text-muted-foreground font-sans leading-relaxed text-sm">
            This will only take a minute.
          </p>
          <PrimaryButton onClick={next} className="mt-10">
            Start RSVP
          </PrimaryButton>
        </div>
      );
    }

    // Attendance
    if (step === 1) {
      return (
        <div>
          <QuestionTitle>Will you be joining us?</QuestionTitle>
          <div className="mt-6 space-y-3">
            <SelectableCard
              selected={state.attendance === "Yes"}
              onClick={() => {
                setState((s) => ({ ...s, attendance: "Yes" }));
                setTimeout(next, 180);
              }}
            >
              <span className="text-2xl">❤️</span>
              <div>
                <p className="font-display text-xl text-foreground">Yes, we'll be there!</p>
                <p className="text-xs text-muted-foreground mt-0.5">Can't wait to celebrate</p>
              </div>
            </SelectableCard>
            <SelectableCard
              selected={state.attendance === "No"}
              onClick={() => {
                setState((s) => ({ ...s, attendance: "No" }));
                setTimeout(next, 180);
              }}
            >
              <span className="text-2xl">😔</span>
              <div>
                <p className="font-display text-xl text-foreground">
                  Sorry, we won't be able to attend.
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">You'll be missed</p>
              </div>
            </SelectableCard>
          </div>
        </div>
      );
    }

    // NO PATH
    if (state.attendance === "No") {
      if (step === 2) {
        return (
          <div>
            <QuestionTitle>Leave us a message</QuestionTitle>
            <p className="text-sm text-muted-foreground mt-2 font-sans">Optional</p>
            <textarea
              value={state.declineMessage}
              onChange={(e) => setState((s) => ({ ...s, declineMessage: e.target.value }))}
              placeholder="A note for the couple…"
              rows={6}
              className="mt-4 w-full rounded-2xl bg-card shadow-paper p-5 text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-foreground/20 resize-none"
            />
            <PrimaryButton
              onClick={() => handleSubmit("No")}
              disabled={submitting}
              className="mt-8"
            >
              {submitting ? <Loader2 className="animate-spin" size={16} /> : "Submit"}
            </PrimaryButton>
          </div>
        );
      }
    }

    // YES PATH
    if (state.attendance === "Yes") {
      if (step === 2) {
        return (
          <div>
            <QuestionTitle>How many family members will be attending?</QuestionTitle>
            <div className="mt-8 space-y-4">
              <Stepper
                label="Adults"
                sub="10 years and above"
                value={state.adults}
                onChange={(v) => setState((s) => ({ ...s, adults: v }))}
                min={0}
              />
              <Stepper
                label="Children"
                sub="Below 10 years"
                value={state.children}
                onChange={(v) => setState((s) => ({ ...s, children: v }))}
                min={0}
              />
            </div>
            <PrimaryButton
              onClick={next}
              disabled={state.adults + state.children < 1}
              className="mt-10"
            >
              Continue <ArrowRight size={16} />
            </PrimaryButton>
          </div>
        );
      }
      if (step === 3) {
        return (
          <div>
            <QuestionTitle>When are you planning to arrive?</QuestionTitle>
            <div className="mt-6 space-y-3">
              {ARRIVAL_DATES.map((d) => (
                <SelectableCard
                  key={d.id}
                  selected={state.arrivalDate === d.id}
                  onClick={() => setState((s) => ({ ...s, arrivalDate: d.id }))}
                >
                  <div className="w-14 h-14 rounded-xl bg-warm-cream flex flex-col items-center justify-center shrink-0">
                    <span className="font-display text-2xl leading-none text-foreground">
                      {d.id.split(" ")[0]}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground mt-0.5">
                      Dec
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-lg text-foreground">{d.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{d.sub}</p>
                  </div>
                </SelectableCard>
              ))}
            </div>
            <PrimaryButton onClick={next} disabled={!state.arrivalDate} className="mt-8">
              Continue <ArrowRight size={16} />
            </PrimaryButton>
          </div>
        );
      }
      if (step === 4) {
        return (
          <div>
            <QuestionTitle>Approximately what time do you expect to arrive?</QuestionTitle>
            <div className="mt-6 grid grid-cols-1 gap-3">
              {ARRIVAL_TIMES.map((t) => (
                <SelectableCard
                  key={t}
                  selected={state.arrivalTime === t}
                  onClick={() => setState((s) => ({ ...s, arrivalTime: t }))}
                >
                  <span className="font-sans text-foreground">{t}</span>
                </SelectableCard>
              ))}
            </div>
            <PrimaryButton onClick={next} disabled={!state.arrivalTime} className="mt-8">
              Continue <ArrowRight size={16} />
            </PrimaryButton>
          </div>
        );
      }
      if (step === 5) {
        return (
          <div>
            <QuestionTitle>How will you be travelling?</QuestionTitle>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {TRAVEL_MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setState((s) => ({ ...s, travelMode: m.id }))}
                  className={`p-5 rounded-2xl shadow-paper text-left transition-all ${
                    state.travelMode === m.id
                      ? "bg-foreground text-background scale-[0.98]"
                      : "bg-card text-foreground"
                  }`}
                >
                  <span className="text-3xl block">{m.emoji}</span>
                  <span className="font-sans text-sm mt-3 block">{m.id}</span>
                </button>
              ))}
            </div>
            <PrimaryButton onClick={next} disabled={!state.travelMode} className="mt-8">
              Continue <ArrowRight size={16} />
            </PrimaryButton>
          </div>
        );
      }
      if (step === 6) {
        return (
          <div>
            <QuestionTitle>Is there anything you'd like us to know?</QuestionTitle>
            <p className="text-sm text-muted-foreground mt-2 font-sans">Optional</p>
            <textarea
              value={state.specialRequirements}
              onChange={(e) =>
                setState((s) => ({ ...s, specialRequirements: e.target.value }))
              }
              placeholder="Dietary preferences, senior citizens travelling, wheelchair assistance, infant requirements, or anything else."
              rows={7}
              className="mt-4 w-full rounded-2xl bg-card shadow-paper p-5 text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-foreground/20 resize-none"
            />
            <PrimaryButton
              onClick={() => handleSubmit("Yes")}
              disabled={submitting}
              className="mt-8"
            >
              {submitting ? <Loader2 className="animate-spin" size={16} /> : "Submit RSVP"}
            </PrimaryButton>
          </div>
        );
      }
    }

    return null;
  }
};

const QuestionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-3xl font-medium text-foreground leading-snug">
    {children}
  </h2>
);

const PrimaryButton = ({
  children,
  className = "",
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full h-14 rounded-full bg-foreground text-background font-sans text-sm uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

const SelectableCard = ({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-5 rounded-2xl shadow-paper flex items-center gap-4 transition-all active:scale-[0.99] ${
      selected
        ? "bg-warm-cream ring-2 ring-foreground/70"
        : "bg-card hover:bg-warm-cream/60"
    }`}
  >
    {children}
    {selected && (
      <span className="ml-auto w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center shrink-0">
        <Check size={14} strokeWidth={2.5} />
      </span>
    )}
  </button>
);

const Stepper = ({
  label,
  sub,
  value,
  onChange,
  min = 0,
}: {
  label: string;
  sub?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) => (
  <div className="flex items-center justify-between p-5 rounded-2xl bg-card shadow-paper">
    <div>
      <p className="font-display text-xl text-foreground">{label}</p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-10 h-10 rounded-full bg-warm-cream text-foreground flex items-center justify-center active:scale-95 disabled:opacity-40"
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
      >
        <Minus size={16} />
      </button>
      <span className="font-display text-2xl w-8 text-center tabular-nums text-foreground">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center active:scale-95"
        aria-label={`Increase ${label}`}
      >
        <Plus size={16} />
      </button>
    </div>
  </div>
);

const ThankYou = ({ onFinish }: { onFinish: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease }}
    className="text-center py-8"
  >
    <div className="w-20 h-20 mx-auto rounded-full bg-warm-cream flex items-center justify-center shadow-paper">
      <Heart size={32} strokeWidth={1.4} className="text-foreground" />
    </div>
    <h1 className="font-display text-4xl font-medium text-foreground mt-8">
      Thank You <span aria-hidden>❤️</span>
    </h1>
    <p className="mt-5 text-foreground/80 font-sans leading-relaxed">
      We've received your RSVP.
    </p>
    <p className="mt-3 text-foreground/70 font-sans leading-relaxed">
      We're excited to celebrate this wonderful occasion with you and your family.
    </p>
    <p className="mt-3 text-muted-foreground font-sans">Safe travels, and see you soon!</p>
    <div className="mt-10">
      <PrimaryButton onClick={onFinish}>Finish</PrimaryButton>
    </div>
  </motion.div>
);

export default RSVPPage;
