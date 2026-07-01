## RSVP Flow — Implementation Plan

A new 8-step RSVP wizard reachable from the Home page (and directly at `/rsvp`). Guest is already authenticated via invite code, so the family name comes from the existing `guest` in localStorage — no re-login.

### User-facing behavior

- **Entry point**: New "RSVP" button on HomePage + bottom nav item.
- **Wizard**: 8 pages with a progress bar ("Step X of Y"), smooth framer-motion slide transitions, warm cream/champagne styling matching the rest of the site, mobile-first cards, back/next buttons.
- **Branching**: "No" attendance → jump to optional message → Submit → Thank You. "Yes" → full 7-step flow.
- **Pre-fill**: If an RSVP already exists for this invite code, load prior answers and let the guest edit; resubmit overwrites the same row.
- **Validation**: Each step requires its answer before "Next" is enabled (except optional message and special requirements).
- **Thank-you page**: Final confirmation with a Finish button that returns to Home.

### Pages (matches your spec exactly)

1. Welcome — "Dear \<Family\> Family…" + Start RSVP
2. Attendance — Yes / No (No shows optional message → Submit)
3. Guests — Adults & Children steppers (± controls, min 0)
4. Arrival Date — 4 date cards (2/3/4/5 Dec) with sub-labels
5. Arrival Time — 6 time-window options
6. Mode of Travel — 6 emoji cards
7. Special Requirements — optional textarea
8. Thank You — confirmation + Finish

### Data storage

Google Sheets is read-only via public CSV today. Writing requires authenticated access, so:

- **Enable Lovable Cloud** (needed to run a server-side write function without exposing credentials).
- **Link the Google Sheets connector** to a Google account that has **edit access** to your sheet `19I_1J2xh4ZyGDheAUdYBJDw8NX8BUHCqKg219O3069A`. You'll be prompted to authorize; the account you connect must be able to edit the sheet.
- Add an `RSVP` tab to the sheet with columns:
  `Code | Name | Attendance | Adults | Children | Arrival Date | Arrival Time | Travel Mode | Special Requirements | Decline Message | Last Updated`
  (I can create this tab automatically on first submission.)
- **Edge function `submit-rsvp`**: takes the RSVP payload + invite code, looks up existing row in the `RSVP` tab, and either updates it (overwrite) or appends a new row via Google Sheets API through the connector gateway.
- **Edge function `get-rsvp`**: fetches existing RSVP for a code so the wizard can pre-fill.
- Guest code + name come from the already-stored localStorage session; no re-auth.

### Technical bits

- New file `src/pages/RSVPPage.tsx` (single page with internal step state; keeps things simple and enables prev/next animation).
- New small components inside the file for each step to keep the file readable.
- Route `/rsvp` added to `App.tsx`.
- `src/lib/rsvp.ts`: types + `fetchExistingRsvp(code)` and `submitRsvp(payload)` calling the two edge functions.
- `supabase/functions/get-rsvp/index.ts` and `supabase/functions/submit-rsvp/index.ts` using the Google Sheets connector gateway (`values:append`, `values:batchUpdate`, `values` read).
- HomePage: add "RSVP" CTA card above / near the countdown block.

### What I need from you before building

1. **Confirm I can enable Lovable Cloud** (required for the write function).
2. **Confirm you'll connect the Google Sheets connector** with an account that can edit your sheet. If you prefer, you can instead share the sheet with the connector's service account after connecting — I'll show the exact steps then.
3. **Family Name source**: your current sheet has `Name` + `Code`. Should the greeting use the `Name` column as-is (e.g., "Dear Sharma Family"), or do you want me to add a `Family Name` column to the sheet?

Once you confirm, I'll implement everything in one go.
