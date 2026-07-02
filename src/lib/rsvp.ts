import { supabase } from "@/integrations/supabase/client";

export interface RsvpPayload {
  code: string;
  name: string;
  attendance: "Yes" | "No" | "";
  adults: number;
  children: number;
  arrivalDate: string;
  arrivalTime: string;
  travelMode: string;
  specialRequirements: string;
  declineMessage: string;
}

export async function fetchExistingRsvp(code: string): Promise<RsvpPayload | null> {
  const { data, error } = await supabase.functions.invoke("get-rsvp", {
    body: { code },
  });
  if (error) {
    console.error("fetchExistingRsvp error", error);
    return null;
  }
  if (!data?.rsvp) return null;
  const r = data.rsvp;
  return {
    code: r.code,
    name: r.name,
    attendance: r.attendance,
    adults: r.adults,
    children: r.children,
    arrivalDate: r.arrivalDate,
    arrivalTime: r.arrivalTime,
    travelMode: r.travelMode,
    specialRequirements: r.specialRequirements,
    declineMessage: r.declineMessage,
  };
}

export async function submitRsvp(payload: RsvpPayload): Promise<{ ok: boolean; error?: string }> {
  const { data, error } = await supabase.functions.invoke("submit-rsvp", {
    body: payload,
  });
  if (error) {
    // Try to extract server-side error body for a descriptive message
    let serverMsg: string | undefined;
    try {
      const ctx = (error as { context?: Response }).context;
      if (ctx && typeof ctx.text === "function") {
        const txt = await ctx.text();
        try {
          const parsed = JSON.parse(txt);
          serverMsg = parsed?.error ?? txt;
        } catch {
          serverMsg = txt;
        }
      }
    } catch (e) {
      console.error("submitRsvp: could not read error context", e);
    }
    console.error("submitRsvp failed:", serverMsg ?? error.message);
    return { ok: false, error: serverMsg ?? error.message ?? "Failed to submit RSVP" };
  }
  if (data?.error) {
    console.error("submitRsvp server error:", data.error);
    return { ok: false, error: data.error };
  }
  return { ok: true };
}
